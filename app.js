/* ══════════════════════════════════════════
   BudgetTrack — app.js
   Features:
   - Add / delete transactions (expense & income)
   - Validate all fields
   - LocalStorage persistence
   - Automatic balance, income, expense totals
   - Pie chart (Chart.js) by category
   - Optional #1: Custom categories
   - Optional #2: Sort by date / amount / category
   - Optional #3: Dark / light mode toggle
   - Optional bonus: Spending limit highlight
══════════════════════════════════════════ */

'use strict';

// ── DOM REFS ─────────────────────────────
const form              = document.getElementById('transactionForm');
const inputName         = document.getElementById('itemName');
const inputAmount       = document.getElementById('amount');
const inputType         = document.getElementById('type');
const inputCategory     = document.getElementById('category');
const inputCustomCat    = document.getElementById('customCategory');
const customCatGroup    = document.getElementById('customCategoryGroup');
const inputLimit        = document.getElementById('spendingLimit');
const limitWarning      = document.getElementById('limitWarning');

const totalBalanceEl    = document.getElementById('totalBalance');
const totalIncomeEl     = document.getElementById('totalIncome');
const totalExpenseEl    = document.getElementById('totalExpense');

const listEl            = document.getElementById('transactionList');
const listEmpty         = document.getElementById('listEmpty');
const chartEmpty        = document.getElementById('chartEmpty');
const themeToggle       = document.getElementById('themeToggle');

const errorName         = document.getElementById('errorName');
const errorAmount       = document.getElementById('errorAmount');
const errorCategory     = document.getElementById('errorCategory');

const sortBtns          = document.querySelectorAll('.btn-sort');

// ── STATE ────────────────────────────────
let transactions = loadFromStorage('bt_transactions') || [];
let customCategories = loadFromStorage('bt_customCats') || [];
let currentSort = 'date';
let spendingLimit = parseFloat(loadFromStorage('bt_limit')) || 0;
let chartInstance = null;

// ── CATEGORY CONFIG ──────────────────────
const DEFAULT_CATEGORIES = {
  Food:      '🍔',
  Transport: '🚌',
  Fun:       '🎮',
};

function getCategoryIcon(cat) {
  const all = { ...DEFAULT_CATEGORIES };
  customCategories.forEach(c => { all[c] = '🏷️'; });
  return all[cat] || '💰';
}

// ── LOCAL STORAGE HELPERS ────────────────
function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn('localStorage unavailable');
  }
}

// ── INIT ─────────────────────────────────
function init() {
  restoreTheme();
  restoreLimit();
  populateCategoryOptions();
  renderAll();
}

// ── THEME TOGGLE (Optional #3) ───────────
function restoreTheme() {
  const saved = loadFromStorage('bt_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.textContent = saved === 'dark' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  saveToStorage('bt_theme', next);

  // Rebuild chart so colors update
  renderChart();
});

// ── SPENDING LIMIT (Optional bonus) ──────
function restoreLimit() {
  if (spendingLimit > 0) {
    inputLimit.value = spendingLimit;
  }
}

inputLimit.addEventListener('input', () => {
  spendingLimit = parseFloat(inputLimit.value) || 0;
  saveToStorage('bt_limit', spendingLimit);
  renderLimitWarning();
  renderList(); // re-highlight items
});

function renderLimitWarning() {
  const totalExp = getTotals().expense;
  if (spendingLimit > 0 && totalExp > spendingLimit) {
    limitWarning.style.display = 'block';
    limitWarning.textContent =
      `⚠️ You've exceeded your spending limit! (${formatRp(totalExp)} / ${formatRp(spendingLimit)})`;
  } else {
    limitWarning.style.display = 'none';
  }
}

// ── CUSTOM CATEGORIES (Optional #1) ──────
function populateCategoryOptions() {
  // Remove old custom options (keep first 4: placeholder + 3 defaults)
  const select = inputCategory;
  while (select.options.length > 4) {
    select.remove(4);
  }

  // Add custom categories
  customCategories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = `🏷️ ${cat}`;
    select.appendChild(opt);
  });

  // Add "custom" option at end
  const addOpt = document.createElement('option');
  addOpt.value = '__custom__';
  addOpt.textContent = '+ Add custom category…';
  select.appendChild(addOpt);
}

inputCategory.addEventListener('change', () => {
  if (inputCategory.value === '__custom__') {
    customCatGroup.style.display = 'block';
    inputCustomCat.focus();
  } else {
    customCatGroup.style.display = 'none';
  }
});

// ── FORM SUBMIT ───────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  // Resolve category
  let category = inputCategory.value;
  if (category === '__custom__') {
    const newCat = inputCustomCat.value.trim();
    if (newCat && !customCategories.includes(newCat)) {
      customCategories.push(newCat);
      saveToStorage('bt_customCats', customCategories);
      populateCategoryOptions();
    }
    category = newCat || 'Other';
  }

  const transaction = {
    id:       Date.now(),
    name:     inputName.value.trim(),
    amount:   parseFloat(inputAmount.value),
    type:     inputType.value,      // 'income' | 'expense'
    category: category,
    date:     new Date().toISOString(),
  };

  transactions.unshift(transaction);
  saveToStorage('bt_transactions', transactions);

  resetForm();
  renderAll();
});

function validateForm() {
  let valid = true;

  errorName.textContent = '';
  errorAmount.textContent = '';
  errorCategory.textContent = '';

  if (!inputName.value.trim()) {
    errorName.textContent = 'Item name is required.';
    valid = false;
  }

  const amt = parseFloat(inputAmount.value);
  if (!inputAmount.value || isNaN(amt) || amt <= 0) {
    errorAmount.textContent = 'Enter a valid amount greater than 0.';
    valid = false;
  }

  const cat = inputCategory.value;
  if (!cat || cat === '') {
    errorCategory.textContent = 'Please select a category.';
    valid = false;
  } else if (cat === '__custom__') {
    if (!inputCustomCat.value.trim()) {
      errorCategory.textContent = 'Please enter a custom category name.';
      valid = false;
    }
  }

  return valid;
}

function resetForm() {
  inputName.value    = '';
  inputAmount.value  = '';
  inputCategory.value = '';
  inputCustomCat.value = '';
  customCatGroup.style.display = 'none';
  errorName.textContent = '';
  errorAmount.textContent = '';
  errorCategory.textContent = '';
}

// ── DELETE ────────────────────────────────
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveToStorage('bt_transactions', transactions);
  renderAll();
}

// ── SORT (Optional #2) ────────────────────
sortBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sortBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    renderList();
  });
});

function getSortedTransactions() {
  const sorted = [...transactions];
  if (currentSort === 'amount') {
    sorted.sort((a, b) => b.amount - a.amount);
  } else if (currentSort === 'category') {
    sorted.sort((a, b) => a.category.localeCompare(b.category));
  } else {
    // date — newest first (already inserted at front, but sort to be safe)
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  return sorted;
}

// ── TOTALS ────────────────────────────────
function getTotals() {
  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  });
  return { income, expense, balance: income - expense };
}

// ── FORMAT HELPERS ────────────────────────
function formatRp(num) {
  return 'Rp ' + Math.abs(num).toLocaleString('id-ID');
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── RENDER ALL ────────────────────────────
function renderAll() {
  renderBalance();
  renderList();
  renderChart();
  renderLimitWarning();
}

// ── RENDER BALANCE ────────────────────────
function renderBalance() {
  const { income, expense, balance } = getTotals();
  totalBalanceEl.textContent = formatRp(balance);
  totalBalanceEl.style.color = balance < 0 ? 'var(--expense-color)' : 'var(--text-primary)';
  totalIncomeEl.textContent  = formatRp(income);
  totalExpenseEl.textContent = formatRp(expense);
}

// ── RENDER LIST ───────────────────────────
function renderList() {
  const sorted = getSortedTransactions();

  if (sorted.length === 0) {
    listEl.innerHTML = '';
    listEl.appendChild(listEmpty);
    listEmpty.style.display = 'block';
    return;
  }

  listEmpty.style.display = 'none';
  listEl.innerHTML = '';

  const totalExp = getTotals().expense;
  const overLimit = spendingLimit > 0 && totalExp > spendingLimit;

  sorted.forEach(t => {
    const item = document.createElement('div');
    item.className = 'transaction-item';
    item.setAttribute('role', 'listitem');

    const isOverItem = overLimit && t.type === 'expense';
    const amountClass = isOverItem
      ? 'item-amount expense over-limit'
      : `item-amount ${t.type}`;

    const sign = t.type === 'income' ? '+' : '−';

    item.innerHTML = `
      <div class="item-left">
        <span class="item-icon">${getCategoryIcon(t.category)}</span>
        <div class="item-info">
          <div class="item-name">${escapeHtml(t.name)}</div>
          <div class="item-meta">${escapeHtml(t.category)} · ${formatDate(t.date)}</div>
        </div>
      </div>
      <div class="item-right">
        <span class="${amountClass}">${sign} ${formatRp(t.amount)}</span>
        <button class="btn-delete" data-id="${t.id}" aria-label="Delete ${escapeHtml(t.name)}">🗑️</button>
      </div>
    `;

    listEl.appendChild(item);
  });

  // Event delegation for delete buttons
  listEl.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteTransaction(Number(btn.dataset.id)));
  });
}

// ── RENDER CHART ──────────────────────────
function renderChart() {
  const expenses = transactions.filter(t => t.type === 'expense');

  // Aggregate by category
  const totals = {};
  expenses.forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });

  const labels = Object.keys(totals);
  const data   = Object.values(totals);

  if (labels.length === 0) {
    chartEmpty.style.display = 'block';
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    return;
  }

  chartEmpty.style.display = 'none';

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  const PALETTE = [
    '#e94560', '#a78bfa', '#34d399', '#fbbf24',
    '#60a5fa', '#f472b6', '#fb923c', '#2dd4bf',
  ];

  const backgroundColors = labels.map((_, i) => PALETTE[i % PALETTE.length] + 'cc');
  const borderColors     = labels.map((_, i) => PALETTE[i % PALETTE.length]);

  const ctx = document.getElementById('spendingChart').getContext('2d');

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.data.datasets[0].borderColor = borderColors;
    chartInstance.options.plugins.legend.labels.color = isDark ? '#ccc' : '#333';
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: isDark ? '#ccc' : '#333',
            padding: 12,
            font: { size: 11 },
            boxWidth: 12,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const val = ctx.parsed;
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((val / total) * 100).toFixed(1);
              return ` ${formatRp(val)} (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

// ── SECURITY HELPER ───────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── START ─────────────────────────────────
init();
