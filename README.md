# 💸 BudgetTrack — Expense & Budget Visualizer

Aplikasi web sederhana untuk melacak pengeluaran dan pemasukan harian. Dibuat dengan HTML, CSS, dan Vanilla JavaScript murni — tanpa framework, tanpa backend.

🔗 **Live Demo:** [https://fajaran12.github.io/Codechamp-Revou](https://fajaran12.github.io/Codechamp-Revou)

---

## Tampilan Fitur

| Fitur | Deskripsi |
|---|---|
| 💰 Total Balance | Saldo otomatis update setiap ada transaksi |
| ➕ Input Form | Tambah transaksi dengan validasi lengkap |
| 📋 Transaction List | Daftar semua transaksi, bisa di-scroll dan dihapus |
| 🥧 Pie Chart | Grafik pengeluaran per kategori (Chart.js) |
| 🏷️ Custom Category | Tambah kategori sendiri selain default |
| 🔃 Sort Transaksi | Urutkan berdasarkan tanggal, nominal, atau kategori |
| 🌙 Dark / Light Mode | Toggle tema, tersimpan otomatis |
| ⚠️ Spending Limit | Peringatan jika pengeluaran melebihi batas yang ditentukan |

---

## Struktur Folder

```
Codechamp-Revou/
├── index.html       # Struktur halaman (Semantic HTML)
├── css/
│   └── style.css    # Semua styling (glassmorphism, tema, responsif)
└── js/
    └── app.js       # Semua logika aplikasi (Vanilla JS)
```

---

## Cara Menjalankan

Tidak perlu instalasi apapun. Cukup:

1. Clone atau download repository ini
2. Buka file `index.html` langsung di browser
3. Aplikasi siap digunakan

```bash
git clone https://github.com/Fajaran12/Codechamp-Revou.git
cd Codechamp-Revou
# Buka index.html di browser
```

---

## Cara Menggunakan Aplikasi

### Menambah Transaksi
1. Isi **Item Name** — nama pengeluaran/pemasukan (wajib diisi)
2. Isi **Amount** — nominal dalam Rupiah, harus lebih dari 0
3. Pilih **Type** — `Expense (−)` untuk pengeluaran, `Income (+)` untuk pemasukan
4. Pilih **Category** — Food, Transport, Fun, atau kategori custom
5. Klik tombol **+ Add Transaction**

> Jika ada field yang kosong atau tidak valid, akan muncul pesan error di bawah field tersebut.

### Menghapus Transaksi
Klik ikon 🗑️ di sebelah kanan transaksi yang ingin dihapus.

### Mengurutkan Transaksi
Klik tombol sort di bawah form:
- **Date** — urut dari terbaru
- **Amount** — urut dari terbesar
- **Category** — urut alfabetis

### Menambah Kategori Custom
1. Buka dropdown **Category**
2. Pilih **+ Add custom category…**
3. Isi nama kategori baru di field yang muncul
4. Klik **+ Add Transaction** — kategori otomatis tersimpan

### Mengatur Spending Limit
1. Isi field **⚠️ Spending Limit** di bawah form
2. Jika total pengeluaran melebihi batas, muncul peringatan kuning dan nominal pengeluaran berubah warna

### Toggle Dark / Light Mode
Klik tombol 🌙 / ☀️ di pojok kanan header.

---

## Penjelasan Teknis

### `index.html` — Struktur Semantic HTML
Halaman dibangun menggunakan tag HTML semantik sesuai standar:

```
<header>        — Navigasi dan tombol tema
  <nav>         — Menu / kontrol header
<main>
  <section>     — Balance, Form, Chart, Transaction List
    <article>   — (digunakan sebagai container form)
    <figure>    — Canvas pie chart
<footer>        — Info copyright
```

### `css/style.css` — Styling

**Glassmorphism** diterapkan pada semua card menggunakan:
```css
.glass {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.14);
}
```

**Gradient background** menggunakan CSS custom properties agar bisa berubah saat ganti tema:
```css
body {
  background: linear-gradient(135deg,
    var(--bg-grad-start),   /* #0f0c29 */
    var(--bg-grad-mid),     /* #302b63 */
    var(--bg-grad-end));    /* #24243e */
}
```

**Dark / Light theme** dikendalikan lewat atribut `data-theme` di `<html>`:
```css
:root { /* dark */ }
[data-theme="light"] { /* override variabel */ }
```

**Responsif** menggunakan CSS Grid dan media query:
```css
.row-two { grid-template-columns: 1fr 1fr; }

@media (max-width: 680px) {
  .row-two { grid-template-columns: 1fr; }
}
```

---

### `js/app.js` — Logika Aplikasi

#### State & Data
Semua data disimpan di `localStorage` agar tetap ada saat halaman di-refresh:

| Key | Isi |
|---|---|
| `bt_transactions` | Array semua transaksi |
| `bt_customCats` | Array nama kategori custom |
| `bt_limit` | Nilai spending limit |
| `bt_theme` | Tema aktif (`dark` / `light`) |

Struktur satu transaksi:
```js
{
  id:       1234567890,       // timestamp sebagai ID unik
  name:     "Nasi Padang",
  amount:   25000,
  type:     "expense",        // "expense" | "income"
  category: "Food",
  date:     "2026-08-18T..."  // ISO string
}
```

#### Alur Kerja

```
User isi form → validateForm()
      ↓ valid
  Buat objek transaksi → simpan ke localStorage
      ↓
  renderAll()
  ├── renderBalance()   → hitung & tampilkan saldo, income, expense
  ├── renderList()      → render semua item + tombol delete
  ├── renderChart()     → agregasi per kategori → update pie chart
  └── renderLimitWarning() → cek apakah expense > limit
```

#### Pie Chart (Chart.js)
Chart hanya menghitung transaksi bertipe `expense`. Data diagregasi per kategori:
```js
const totals = {};
expenses.forEach(t => {
  totals[t.category] = (totals[t.category] || 0) + t.amount;
});
```
Chart di-update (bukan dibuat ulang) setiap ada perubahan data, kecuali saat toggle tema.

#### Keamanan
Semua input user di-escape sebelum dimasukkan ke DOM untuk mencegah XSS:
```js
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
```

---

## Teknologi

| Teknologi | Versi | Kegunaan |
|---|---|---|
| HTML5 | — | Struktur halaman (Semantic HTML) |
| CSS3 | — | Styling, glassmorphism, responsif |
| JavaScript | ES6+ | Logika aplikasi |
| [Chart.js](https://www.chartjs.org/) | 4.4.0 | Pie chart visualisasi |
| localStorage API | — | Penyimpanan data di browser |

---

## Optional Challenges yang Diimplementasikan

- [x] **Custom Categories** — tambah kategori pengeluaran sendiri
- [x] **Sort Transactions** — urutkan berdasarkan tanggal, nominal, atau kategori
- [x] **Dark/Light Mode Toggle** — ganti tema dengan satu klik
- [x] **Spending Limit Highlight** *(bonus)* — highlight pengeluaran yang melebihi batas

---

## Deploy ke GitHub Pages

1. Push semua file ke branch `main`
2. Buka **Settings → Pages** di repository GitHub
3. Source: **Deploy from a branch**, branch: `main`, folder: `/ (root)`
4. Klik **Save** — site live dalam beberapa menit

---

## Author

**Fajar** — Codechamp Revou  
GitHub: [@Fajaran12](https://github.com/Fajaran12)
