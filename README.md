# Moneta — Personal Finance

A private, responsive personal finance workspace built with semantic HTML, CSS and vanilla JavaScript. No build step, framework, account or backend is required. Finance data is stored in the browser using `localStorage`.

**Live demo:** [fajaran12.github.io/Codechamp-Revou](https://fajaran12.github.io/Codechamp-Revou)

## Features

- Financial overview with estimated net worth, monthly income, spending and savings rate
- Add, edit, search, filter and delete income and expense transactions
- Wallets with opening balances and transaction-linked running balances
- Asset and outstanding-debt tracking
- Savings goals with progress tracking and contributions
- Monthly category budgets plus a 50/30/20 planner for needs, wants and savings, with editable category groups and automatic income-based allocation
- Category spending and six-month cash-flow charts using Chart.js
- Light and dark themes, responsive layouts and print-friendly reports
- English and Bahasa Indonesia interface, with the selected language saved on this device
- CSV transaction export, printable/PDF reports and JSON backup/restore
- Legacy BudgetTrack transaction, category, spending-limit and theme data migration

## Project structure

```text
Codechamp-Revou/
├── index.html   # Semantic app shell, navigation, dialog and CDN dependencies
├── style.css    # Design tokens, responsive components, themes and print styles
├── app.js       # State, finance calculations, reusable view renderers and workflows
└── README.md
```

The application separates data access, finance calculations, view rendering, form handling and export/restore workflows into focused functions. Shared render helpers keep dashboard cards, transaction rows, progress indicators and forms consistent. The data model is stored as one versioned object (`moneta_state_v1`) so a future API adapter or framework migration can replace persistence without changing the user-facing data concepts.

## Run locally

Open `index.html` in a current browser. Chart.js is loaded from jsDelivr; charts need an internet connection. If you prefer a local web server, run a static server from the project directory and open its local URL.

## Data and privacy

All records stay in the current browser profile. Clearing site data or changing browsers removes access to the saved information, so download a JSON backup from **Settings & backup** periodically. Restoring a backup replaces the current data after confirmation.

The JSON database contains these collections:

```text
transactions  wallets  assets  goals  debts  budgets
theme         language         customCategories
```

Transaction amounts are stored as positive IDR values; `type` determines whether a transaction is income or expense. A transaction can optionally reference a wallet. Wallet balances are derived from their opening balance and linked transactions.

## Reports and exports

- **CSV:** exports transaction date, description, type, category, amount, wallet and note.
- **PDF:** use **Save as PDF** in Reports to open the browser print dialog, then select “Save as PDF”.
- **JSON:** use **Download backup** in Settings & backup to export all finance data.

The 50/30/20 planner is an optional tool in Budgets; monthly category limits remain the default budgeting workflow. When opened, it calculates targets from recorded income: 50% for needs, 30% for wants and 20% for savings. Expense categories can be reassigned to fit your situation. Savings is calculated as income left after needs and wants; transactions assigned to the savings category are treated as saved rather than spending. **Build a 50/30/20 plan** distributes each envelope across category limits, using even allocations until every category in an envelope has spending history. Suggested plans are editable estimates, not financial advice.

## Deploy

The app is static and can be deployed to GitHub Pages:

1. Push the project to the `main` branch.
2. In repository **Settings → Pages**, choose **Deploy from a branch**.
3. Select `main` and the repository root folder.
4. Save and open the Pages URL once deployment completes.

## Author

**Fajar** — Codechamp Revou
GitHub: [@Fajaran12](https://github.com/Fajaran12)
