'use strict';

const STORAGE_KEY = 'moneta_state_v1';
const LEGACY_KEYS = { transactions: 'bt_transactions', categories: 'bt_customCats', limit: 'bt_limit', theme: 'bt_theme' };
const COLORS = ['#7869df', '#43af8a', '#f0ae55', '#e87979', '#58a7c7', '#d477b7', '#8795a7', '#c5b35d'];
const CATEGORIES = ['Food', 'Transport', 'Housing', 'Health', 'Shopping', 'Fun', 'Bills', 'Education', 'Other', 'Savings'];
const CATEGORY_ICONS = { Food: '🍜', Transport: '🚇', Housing: '⌂', Health: '✚', Shopping: '◇', Fun: '✳', Bills: '▤', Education: '⌑', Other: '◈', Savings: '◎', Salary: '↗', Freelance: '✳', Investment: '◈', Gift: '♡' };
const BUDGET_ENVELOPES = [
  { id: 'needs', percent: 50, defaults: ['Housing', 'Food', 'Transport', 'Health', 'Bills', 'Education'] },
  { id: 'wants', percent: 30, defaults: ['Shopping', 'Fun', 'Other'] },
  { id: 'savings', percent: 20, defaults: ['Savings'] }
];
const VIEW_TITLES = { dashboard: 'Overview', transactions: 'Transactions', wallets: 'Wallets', assets: 'Assets', budgets: 'Budgets', goals: 'Financial goals', debts: 'Debt tracking', reports: 'Reports', settings: 'Settings & backup' };
const INDONESIAN = {
  'Moneta — Personal finance': 'Moneta — Keuangan pribadi',
  'Moneta home': 'Beranda Moneta',
  'WORKSPACE': 'RUANG KERJA',
  'Main navigation': 'Navigasi utama',
  'Overview': 'Ringkasan',
  'Transactions': 'Transaksi',
  'Wallets': 'Dompet',
  'Assets': 'Aset',
  'Budgets': 'Anggaran',
  'Financial goals': 'Target keuangan',
  'Goals': 'Target',
  'Debt tracking': 'Pelacakan utang',
  'Reports': 'Laporan',
  'Settings & backup': 'Pengaturan & cadangan',
  'Your money, your device': 'Uang Anda, perangkat Anda',
  'Data stays in this browser': 'Data tersimpan di browser ini',
  'My finances': 'Keuangan saya',
  'Personal workspace': 'Ruang kerja pribadi',
  'Open navigation': 'Buka navigasi',
  'Workspace': 'Ruang kerja',
  'Language': 'Bahasa',
  'Switch color theme': 'Ganti tema warna',
  'Switch to dark theme': 'Ganti ke tema gelap',
  'Switch to light theme': 'Ganti ke tema terang',
  'Add transaction': 'Tambah transaksi',
  'Add': 'Tambah',
  'Edit': 'Ubah',
  'transaction': 'transaksi',
  'financial goal': 'target keuangan',
  'budget': 'anggaran',
  'debt': 'utang',
  'asset': 'aset',
  'added': 'ditambahkan',
  'updated': 'diperbarui',
  'Your financial life, a little clearer.': 'Kehidupan finansial Anda, lebih jelas.',
  'A clearer view of your money.': 'Lihat keuangan Anda dengan lebih jelas.',
  'Estimated net worth': 'Estimasi kekayaan bersih',
  'Income this month': 'Pemasukan bulan ini',
  'Spending this month': 'Pengeluaran bulan ini',
  'Monthly savings rate': 'Rasio tabungan bulanan',
  'Income entries': 'catatan pemasukan',
  'expense entries': 'catatan pengeluaran',
  'spent': 'terpakai',
  'left': 'tersisa',
  'Spending against limits': 'Pengeluaran dibanding batas',
  'Choose the language used throughout Moneta.': 'Pilih bahasa yang digunakan di Moneta.',
  'Income minus spending': 'Pemasukan dikurangi pengeluaran',
  'Add income to calculate': 'Tambahkan pemasukan untuk menghitung',
  'assets less debt': 'aset dikurangi utang',
  'wallet': 'dompet',
  'wallets': 'dompet',
  'Spending breakdown': 'Rincian pengeluaran',
  'A look at where your money went this month.': 'Lihat ke mana uang Anda digunakan bulan ini.',
  'No expenses recorded this month yet.': 'Belum ada pengeluaran yang dicatat bulan ini.',
  'Monthly budgets': 'Anggaran bulanan',
  'Keep spending on the path you set.': 'Jaga pengeluaran tetap sesuai rencana.',
  'Manage →': 'Kelola →',
  'No budgets yet': 'Belum ada anggaran',
  'Set a monthly budget or let Moneta suggest one.': 'Atur anggaran bulanan atau biarkan Moneta memberi saran.',
  'Set up a budget →': 'Atur anggaran →',
  'Recent activity': 'Aktivitas terbaru',
  'Your latest income and expenses.': 'Pemasukan dan pengeluaran terbaru Anda.',
  'View all →': 'Lihat semua →',
  'Your money story starts here': 'Perjalanan keuangan Anda dimulai di sini',
  'Add a transaction to see your spending and income here.': 'Tambahkan transaksi untuk melihat pemasukan dan pengeluaran Anda.',
  'A goal in focus': 'Target pilihan',
  'Small steps add up.': 'Langkah kecil tetap berarti.',
  'Make room for a goal': 'Mulai wujudkan target',
  'Turn a future plan into a savings target.': 'Ubah rencana masa depan menjadi target tabungan.',
  'Manage goals →': 'Kelola target →',
  'Create a goal →': 'Buat target →',
  'saved': 'tersimpan',
  'goal': 'target',
  'to go': 'lagi',
  'complete': 'tercapai',
  'by': 'pada',
  'savings goal': 'target tabungan',
  'Here’s your financial snapshot for': 'Berikut ringkasan keuangan Anda untuk',
  'Transactions': 'Transaksi',
  'A searchable history of every inflow and outflow.': 'Riwayat pemasukan dan pengeluaran yang dapat dicari.',
  'Spent this month': 'Pengeluaran bulan ini',
  'Net cash flow': 'Arus kas bersih',
  'Search transactions…': 'Cari transaksi…',
  'Search transactions': 'Cari transaksi',
  'All activity': 'Semua aktivitas',
  'Income only': 'Pemasukan saja',
  'Expenses only': 'Pengeluaran saja',
  'Export CSV': 'Ekspor CSV',
  'No matching transactions': 'Transaksi tidak ditemukan',
  'Try another search or filter.': 'Coba kata pencarian atau filter lain.',
  'Nothing recorded yet': 'Belum ada catatan',
  'Add your first transaction to start building a clear picture.': 'Tambahkan transaksi pertama untuk mulai memahami keuangan Anda.',
  'Try another search or add your first transaction.': 'Coba pencarian lain atau tambahkan transaksi pertama.',
  'Your budget, built around you': 'Anggaran yang sesuai untuk Anda',
  'Create category limits yourself or generate a starting point from your recent income.': 'Atur batas kategori sendiri atau buat saran awal berdasarkan pemasukan terbaru.',
  '✦ Build a suggested budget': '✦ Buat saran anggaran',
  'Transaction totals for the selected month.': 'Total transaksi untuk bulan yang dipilih.',
  'Build a suggested budget': 'Buat saran anggaran',
  'Switch to dark mode': 'Ganti ke mode gelap',
  'Switch to light mode': 'Ganti ke mode terang',
  '＋ Add a wallet': '＋ Tambah dompet',
  '＋ Add an asset': '＋ Tambah aset',
  '＋ Add a debt': '＋ Tambah utang',
  '＋ Create a goal': '＋ Buat target',
  '＋ Create a goal': '＋ Buat target',
  '＋ Create goal': '＋ Buat target',
  '＋ Add transaction': '＋ Tambah transaksi',
  '＋ Add wallet': '＋ Tambah dompet',
  '＋ Add asset': '＋ Tambah aset',
  '＋ Add debt': '＋ Tambah utang',
  '＋ Add category': '＋ Tambah kategori',
  '↓ CSV': '↓ CSV',
  '▤ Save as PDF': '▤ Simpan sebagai PDF',
  'Auto-plan': 'Susun otomatis',
  'Your wallets': 'Dompet Anda',
  'Bring your everyday accounts together in one private view.': 'Satukan akun sehari-hari dalam satu tampilan pribadi.',
  'Add wallet': 'Tambah dompet',
  'Account': 'Akun',
  'Total tracked wallet balances': 'Total saldo dompet tercatat',
  'No wallets yet': 'Belum ada dompet',
  'Add your bank account, cash wallet or digital wallet to keep balances together.': 'Tambahkan rekening bank, uang tunai, atau dompet digital agar saldo mudah dipantau.',
  'Add a wallet': 'Tambah dompet',
  'How wallet balances work': 'Cara kerja saldo dompet',
  'Each wallet starts with its opening balance. New transactions linked to a wallet update its displayed balance automatically. Transactions without a wallet remain in your overall cash-flow history.': 'Setiap dompet dimulai dari saldo awal. Transaksi baru yang ditautkan ke dompet akan memperbarui saldonya secara otomatis. Transaksi tanpa dompet tetap tercatat dalam riwayat arus kas.',
  'Assets': 'Aset',
  'Keep an eye on what you own, alongside what you spend.': 'Pantau aset yang Anda miliki sekaligus pengeluaran Anda.',
  'Add asset': 'Tambah aset',
  'Total estimated asset value': 'Estimasi total nilai aset',
  'No assets added': 'Belum ada aset',
  'Track investments, property, vehicles or valuables at their estimated current value.': 'Catat investasi, properti, kendaraan, atau barang berharga berdasarkan estimasi nilainya saat ini.',
  'Add an asset': 'Tambah aset',
  'Other asset': 'Aset lainnya',
  'Asset estimates are entered by you and are not live market valuations.': 'Estimasi aset diisi oleh Anda dan bukan nilai pasar terkini.',
  'Goals worth saving for': 'Target yang layak diperjuangkan',
  'Give the things that matter a place in your financial plan.': 'Masukkan hal-hal penting ke dalam rencana keuangan Anda.',
  'Create goal': 'Buat target',
  'Saved across goals': 'Total tabungan target',
  'Combined targets': 'Total target',
  'Goals in progress': 'Target berjalan',
  'Start with something you’re looking forward to': 'Mulai dari hal yang Anda nantikan',
  'Add a target, a timeline and your current savings. You can update it as you go.': 'Tambahkan target, tenggat, dan jumlah tabungan saat ini. Perbarui kapan saja.',
  'Create a goal': 'Buat target',
  'Add savings': 'Tambah tabungan',
  'of': 'dari',
  'to go': 'lagi',
  'See outstanding balances clearly and keep repayment on your radar.': 'Pantau saldo utang dengan jelas dan ingat jadwal pembayarannya.',
  'Add debt': 'Tambah utang',
  'You owe': 'Utang Anda',
  'Owed to you': 'Piutang Anda',
  'Net debt': 'Utang bersih',
  'You owe': 'Utang Anda',
  'Owed to you': 'Piutang Anda',
  'Due': 'Jatuh tempo',
  'Update balance': 'Perbarui saldo',
  'A simple view of what’s owed': 'Ringkasan utang dan piutang',
  'Track money you owe or money owed to you, including due dates.': 'Catat uang yang Anda utang atau yang dipinjam dari Anda, termasuk tanggal jatuh tempo.',
  'A simple view of what’s owed': 'Ringkasan utang dan piutang',
  'Budget planner': 'Perencana anggaran',
  'Set monthly spending limits and see how your actuals compare.': 'Atur batas pengeluaran bulanan dan bandingkan dengan pengeluaran aktual.',
  'Add category': 'Tambah kategori',
  'Your monthly plan': 'Rencana bulanan Anda',
  'Spending against limits': 'Pengeluaran dibanding batas',
  'Auto-plan': 'Susun otomatis',
  '✦ Auto-plan': '✦ Susun otomatis',
  'Category': 'Kategori',
  'Monthly limit': 'Batas bulanan',
  'Spent this month': 'Terpakai bulan ini',
  'Remaining': 'Sisa',
  'The suggested plan uses your recent monthly income as a starting point—not financial advice. Adjust every category to fit your needs.': 'Rencana saran menggunakan pemasukan bulanan terbaru sebagai titik awal, bukan nasihat keuangan. Sesuaikan setiap kategori dengan kebutuhan Anda.',
  'Reports & insights': 'Laporan & analisis',
  'Understand your cash flow over time and take a copy with you.': 'Pahami arus kas dari waktu ke waktu dan simpan salinannya.',
  'Income': 'Pemasukan',
  'Expenses': 'Pengeluaran',
  'Six-month cash flow': 'Arus kas enam bulan',
  'Monthly income and expenses from your recorded transactions.': 'Pemasukan dan pengeluaran bulanan dari transaksi yang tercatat.',
  'Activity in': 'Aktivitas pada',
  'SAVINGS RATE': 'RASIO TABUNGAN',
  'Save as PDF': 'Simpan sebagai PDF',
  'Your data. Your call.': 'Data Anda, kendali Anda.',
  'Your finance data stays in this browser. Export a backup any time.': 'Data keuangan Anda tersimpan di browser ini. Ekspor cadangan kapan saja.',
  'Backup your data': 'Cadangkan data',
  'Download a JSON copy of your transactions, wallets, goals and settings.': 'Unduh salinan JSON transaksi, dompet, target, dan pengaturan Anda.',
  '↓ Download backup': '↓ Unduh cadangan',
  '↓ Export transactions CSV': '↓ Ekspor transaksi CSV',
  'Restore a backup': 'Pulihkan cadangan',
  'Import a Moneta JSON backup from this device. Restoring replaces the current data.': 'Impor cadangan JSON Moneta dari perangkat ini. Pemulihan akan mengganti data saat ini.',
  '↑ Choose backup file': '↑ Pilih file cadangan',
  'Appearance': 'Tampilan',
  'Choose the display that feels comfortable. Your preference is saved on this device.': 'Pilih tampilan yang nyaman. Preferensi Anda tersimpan di perangkat ini.',
  'Switch to dark mode': 'Ganti ke mode gelap',
  'Switch to light mode': 'Ganti ke mode terang',
  'About local storage': 'Tentang penyimpanan lokal',
  'Moneta runs entirely in your browser—there is no account or cloud sync. Clearing browser data will remove saved information, so keep a backup.': 'Moneta berjalan sepenuhnya di browser—tanpa akun atau sinkronisasi cloud. Menghapus data browser akan menghapus informasi tersimpan, jadi simpan cadangan.',
  'Private by design': 'Privat sejak awal',
  'No account required': 'Tidak perlu akun',
  'Edit': 'Ubah',
  'Delete': 'Hapus',
  'Edit transaction': 'Ubah transaksi',
  'Delete transaction': 'Hapus transaksi',
  'Edit wallet': 'Ubah dompet',
  'Delete wallet': 'Hapus dompet',
  'Edit asset': 'Ubah aset',
  'Delete asset': 'Hapus aset',
  'Edit goal': 'Ubah target',
  'Delete goal': 'Hapus target',
  'Edit debt': 'Ubah utang',
  'Delete debt': 'Hapus utang',
  'Edit budget': 'Ubah anggaran',
  'Delete budget': 'Hapus anggaran',
  'Description': 'Deskripsi',
  'Amount (IDR)': 'Jumlah (IDR)',
  'Wallet': 'Dompet',
  'Note': 'Catatan',
  'Type': 'Jenis',
  'Expense': 'Pengeluaran',
  'Category': 'Kategori',
  'Date': 'Tanggal',
  'Wallet (optional)': 'Dompet (opsional)',
  'No wallet': 'Tanpa dompet',
  'Note (optional)': 'Catatan (opsional)',
  'e.g. Monthly salary or coffee': 'cth. Gaji bulanan atau kopi',
  'Add a little context…': 'Tambahkan sedikit konteks…',
  'Wallet name': 'Nama dompet',
  'e.g. Everyday account': 'cth. Rekening harian',
  'Account type': 'Jenis akun',
  'Bank account': 'Rekening bank',
  'Cash': 'Tunai',
  'E-wallet': 'Dompet digital',
  'Savings': 'Tabungan',
  'Investment': 'Investasi',
  'Opening balance (IDR)': 'Saldo awal (IDR)',
  'Bank or provider (optional)': 'Bank atau penyedia (opsional)',
  'Asset name': 'Nama aset',
  'e.g. Index fund': 'cth. Reksadana indeks',
  'Asset type': 'Jenis aset',
  'Property': 'Properti',
  'Vehicle': 'Kendaraan',
  'Valuables': 'Barang berharga',
  'Estimated value (IDR)': 'Estimasi nilai (IDR)',
  'Note (optional)': 'Catatan (opsional)',
  'Goal name': 'Nama target',
  'e.g. Emergency fund': 'cth. Dana darurat',
  'Target amount (IDR)': 'Jumlah target (IDR)',
  'Already saved (IDR)': 'Tabungan saat ini (IDR)',
  'Target date (optional)': 'Tanggal target (opsional)',
  'Icon (optional)': 'Ikon (opsional)',
  'Person or account': 'Orang atau akun',
  'e.g. Student loan': 'cth. Pinjaman pendidikan',
  'This balance is…': 'Saldo ini adalah…',
  'Money I owe': 'Utang saya',
  'Money owed to me': 'Piutang saya',
  'Outstanding balance (IDR)': 'Sisa saldo (IDR)',
  'Due date (optional)': 'Tanggal jatuh tempo (opsional)',
  'Expense category': 'Kategori pengeluaran',
  'Monthly limit (IDR)': 'Batas bulanan (IDR)',
  'Choose a category': 'Pilih kategori',
  'New category name': 'Nama kategori baru',
  '＋ Add new category…': '＋ Tambah kategori baru…',
  '＋ Add new category…': '＋ Tambah kategori baru…',
  'Add transaction': 'Tambah transaksi',
  'Add wallet': 'Tambah dompet',
  'Add asset': 'Tambah aset',
  'Add financial goal': 'Tambah target keuangan',
  'Add debt': 'Tambah utang',
  'Add budget': 'Tambah anggaran',
  'Saved privately on this device.': 'Tersimpan secara privat di perangkat ini.',
  'Cancel': 'Batal',
  'Save changes': 'Simpan perubahan',
  'Save': 'Simpan',
  'Add a contribution': 'Tambah tabungan',
  'Contribution amount (IDR) *': 'Jumlah tabungan (IDR) *',
  'Add savings': 'Tambah tabungan',
  'No expenses recorded in': 'Tidak ada pengeluaran tercatat pada',
  'Chart library unavailable. Connect to the internet to view charts.': 'Pustaka grafik tidak tersedia. Sambungkan ke internet untuk melihat grafik.',
  'Could not save your changes. Check browser storage and available space.': 'Perubahan tidak dapat disimpan. Periksa penyimpanan browser dan ruang yang tersedia.',
  'Please enter a valid': 'Masukkan',
  'Amount must be greater than zero.': 'Jumlah harus lebih besar dari nol.',
  'A goal target must be greater than zero.': 'Target keuangan harus lebih besar dari nol.',
  'Choose or enter a category.': 'Pilih atau masukkan kategori.',
  'A budget for this category already exists. Edit the existing one instead.': 'Anggaran untuk kategori ini sudah ada. Ubah anggaran yang sudah tersedia.',
  'Delete': 'Hapus',
  'This cannot be undone.': 'Tindakan ini tidak dapat dibatalkan.',
  'transaction added.': 'transaksi ditambahkan.',
  'transaction updated.': 'transaksi diperbarui.',
  'wallet added.': 'dompet ditambahkan.',
  'wallet updated.': 'dompet diperbarui.',
  'asset added.': 'aset ditambahkan.',
  'asset updated.': 'aset diperbarui.',
  'financial goal added.': 'target keuangan ditambahkan.',
  'financial goal updated.': 'target keuangan diperbarui.',
  'debt added.': 'utang ditambahkan.',
  'debt updated.': 'utang diperbarui.',
  'budget added.': 'anggaran ditambahkan.',
  'budget updated.': 'anggaran diperbarui.',
  'transaction deleted.': 'transaksi dihapus.',
  'wallet deleted.': 'dompet dihapus.',
  'asset deleted.': 'aset dihapus.',
  'financial goal deleted.': 'target keuangan dihapus.',
  'debt deleted.': 'utang dihapus.',
  'budget deleted.': 'anggaran dihapus.',
  'Enter a contribution greater than zero.': 'Masukkan jumlah tabungan lebih besar dari nol.',
  'Savings goal updated.': 'Target tabungan diperbarui.',
  'Add income first. Moneta uses your latest month with income to suggest category limits.': 'Tambahkan pemasukan terlebih dahulu. Moneta menggunakan bulan terakhir dengan pemasukan untuk menyarankan batas kategori.',
  'Could not read that file. Please choose a valid Moneta backup.': 'File tidak dapat dibaca. Pilih cadangan Moneta yang valid.',
  'The backup is missing required data.': 'Cadangan tidak memiliki data yang diperlukan.',
  'The backup contains an invalid transaction.': 'Cadangan berisi transaksi yang tidak valid.',
  'The backup contains an invalid wallet.': 'Cadangan berisi dompet yang tidak valid.',
  'The backup contains an invalid asset.': 'Cadangan berisi aset yang tidak valid.',
  'The backup contains an invalid goal.': 'Cadangan berisi target yang tidak valid.',
  'The backup contains an invalid debt.': 'Cadangan berisi utang yang tidak valid.',
  'The backup contains an invalid budget.': 'Cadangan berisi anggaran yang tidak valid.',
  'Restore this backup? Your current Moneta data will be replaced.': 'Pulihkan cadangan ini? Data Moneta saat ini akan diganti.',
  'Backup restored successfully.': 'Cadangan berhasil dipulihkan.',
  'Backup could not be restored:': 'Cadangan tidak dapat dipulihkan:',
  'Finance data updated in another tab.': 'Data keuangan diperbarui di tab lain.',
  'Unknown date': 'Tanggal tidak diketahui',
  'All activity': 'Semua aktivitas',
  'Income only': 'Pemasukan saja',
  'Expenses only': 'Pengeluaran saja',
  'Food': 'Makanan',
  'Transport': 'Transportasi',
  'Housing': 'Tempat tinggal',
  'Health': 'Kesehatan',
  'Shopping': 'Belanja',
  'Fun': 'Hiburan',
  'Bills': 'Tagihan',
  'Education': 'Pendidikan',
  'Other': 'Lainnya',
  'Salary': 'Gaji',
  'Freelance': 'Freelance',
  'Gift': 'Hadiah',
  'Choose a category': 'Pilih kategori'
};
Object.assign(INDONESIAN, {
  '50/30/20 budget rule': 'Aturan anggaran 50/30/20',
  'Give every part of your income a clear purpose.': 'Tentukan tujuan untuk setiap bagian pemasukan Anda.',
  'Give every part of your income a clear purpose. Set category groups below so your real spending follows your plan.': 'Tentukan tujuan untuk setiap bagian pemasukan Anda. Atur kelompok kategori di bawah agar pengeluaran mengikuti rencana.',
  'Needs': 'Kebutuhan',
  'Wants': 'Keinginan',
  'Savings': 'Tabungan',
  'Needs · 50%': 'Kebutuhan · 50%',
  'Wants · 30%': 'Keinginan · 30%',
  'Savings · 20%': 'Tabungan · 20%',
  'Spent': 'Terpakai',
  'Saved': 'Tersimpan',
  'of income': 'dari pemasukan',
  'left in this envelope': 'tersisa di alokasi ini',
  'over the target': 'melebihi target',
  'Record income this month to calculate your 50/30/20 targets.': 'Catat pemasukan bulan ini untuk menghitung target 50/30/20 Anda.',
  'Target allocation': 'Alokasi target',
  'Set category groups': 'Atur kelompok kategori',
  'Choose whether each expense category is a need, want, or savings contribution.': 'Pilih apakah kategori pengeluaran termasuk kebutuhan, keinginan, atau tabungan.',
  'Category group': 'Kelompok kategori',
  'Category': 'Kategori',
  'Apply 50/30/20 plan': 'Terapkan rencana 50/30/20',
  'Build category limits from this month’s income, split across the 50/30/20 envelopes.': 'Buat batas kategori dari pemasukan bulan ini, dibagi ke alokasi 50/30/20.',
  'Build a 50/30/20 plan': 'Buat rencana 50/30/20',
  'Add income first. Moneta uses your latest month with income to suggest category limits.': 'Catat pemasukan bulan ini terlebih dahulu untuk membuat rencana 50/30/20.',
  'Add income first': 'Catat pemasukan terlebih dahulu',
  'Suggested budgets based on': 'Saran anggaran berdasarkan',
  'Your category limits': 'Batas per kategori',
  'Optional category-by-category limits.': 'Batas tambahan untuk setiap kategori.',
  'Monthly plan': 'Rencana bulanan',
  'Needs budget': 'Anggaran kebutuhan',
  'Wants budget': 'Anggaran keinginan',
  'Savings target': 'Target tabungan',
  'Manage monthly limits by category.': 'Atur batas bulanan untuk setiap kategori.',
  'Optional tool': 'Fitur opsional',
  'Optional 50/30/20 planner': 'Perencana 50/30/20 opsional',
  'Set income-based targets when you want a 50/30/20 guideline.': 'Atur target berdasarkan pemasukan jika ingin menggunakan panduan 50/30/20.',
  'Open 50/30/20 planner': 'Buka perencana 50/30/20',
  'Close 50/30/20 planner': 'Tutup perencana 50/30/20',
  'Add a category budget to get started.': 'Tambahkan anggaran kategori untuk memulai.',
  'actual savings': 'tabungan aktual',
  'income': 'pemasukan',
  'No category budgets yet': 'Belum ada anggaran per kategori',
  'Apply the 50/30/20 plan to create category limits.': 'Terapkan rencana 50/30/20 untuk membuat batas per kategori.',
  'Category group updated.': 'Kelompok kategori diperbarui.',
  'Budget category': 'Kategori anggaran',
  'Below savings target': 'Di bawah target tabungan',
  'Needs includes essential expenses. Wants covers discretionary spending. Savings is income left after needs and wants, including savings transactions in their assigned category.': 'Kebutuhan mencakup pengeluaran pokok. Keinginan mencakup pengeluaran pilihan. Tabungan adalah sisa pemasukan setelah kebutuhan dan keinginan, termasuk transaksi tabungan pada kategori yang sesuai.',
  'Add income': 'Tambah pemasukan',
  'left to save': 'lagi untuk ditabung',
  'No category budgets yet': 'Belum ada anggaran per kategori',
  'Your budget, built around you': 'Anggaran yang sesuai untuk Anda',
  'Create category limits yourself or generate a starting point from your recent income.': 'Atur batas kategori sendiri atau buat saran awal berdasarkan pemasukan terbaru.',
  'Build a suggested budget': 'Buat saran anggaran',
  '✦ Build a suggested budget': '✦ Buat saran anggaran',
  'Transaction totals for the selected month.': 'Total transaksi untuk bulan yang dipilih.',
  '50/30/20': '50/30/20'
});
const ENGLISH = Object.entries(INDONESIAN).reduce((translations, [english, indonesian]) => {
  if (!translations[indonesian]) translations[indonesian] = english;
  return translations;
}, {});
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function emptyState() {
  const budgetGroups = Object.fromEntries(BUDGET_ENVELOPES.flatMap(envelope => envelope.defaults.map(category => [category, envelope.id])));
  return { transactions: [], wallets: [], assets: [], goals: [], debts: [], budgets: [], budgetGroups, theme: 'light', language: 'en', budgetMonth: '' };
}

function readState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeState(JSON.parse(raw));
    const migrated = emptyState();
    const oldTransactions = readLegacy(LEGACY_KEYS.transactions);
    if (Array.isArray(oldTransactions)) migrated.transactions = oldTransactions.filter(isTransaction).map(item => ({ ...item, walletId: item.walletId || '' }));
    const oldCategories = readLegacy(LEGACY_KEYS.categories);
    if (Array.isArray(oldCategories)) migrated.customCategories = oldCategories.filter(value => typeof value === 'string');
    const oldLimit = Number(readLegacy(LEGACY_KEYS.limit));
    if (oldLimit > 0) migrated.budgets.push({ id: makeId(), category: 'Other', amount: oldLimit, createdAt: new Date().toISOString() });
    const oldTheme = readLegacy(LEGACY_KEYS.theme);
    if (oldTheme === 'light' || oldTheme === 'dark') migrated.theme = oldTheme;
    return migrated;
  } catch (error) {
    console.error('Unable to load saved finance data.', error);
    return emptyState();
  }
}

function readLegacy(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(`Unable to migrate saved data (${key}).`, error);
    return null;
  }
}

function normalizeState(value) {
  const base = emptyState();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return base;
  for (const key of ['transactions', 'wallets', 'assets', 'goals', 'debts', 'budgets']) {
    base[key] = Array.isArray(value[key]) ? value[key].filter(item => item && typeof item === 'object' && !Array.isArray(item)) : [];
  }
  base.theme = value.theme === 'dark' ? 'dark' : 'light';
  base.language = value.language === 'id' ? 'id' : 'en';
  base.budgetMonth = typeof value.budgetMonth === 'string' ? value.budgetMonth : '';
  base.customCategories = Array.isArray(value.customCategories) ? value.customCategories.filter(item => typeof item === 'string') : [];
  if (value.budgetGroups && typeof value.budgetGroups === 'object' && !Array.isArray(value.budgetGroups)) {
    for (const [category, group] of Object.entries(value.budgetGroups)) {
      if (['needs', 'wants', 'savings'].includes(group)) base.budgetGroups[category] = group;
    }
  }
  return base;
}

let state = readState();
let language = state.language || 'en';
let activeView = 'dashboard';
let transactionQuery = '';
let transactionTypeFilter = 'all';
let budgetPlannerExpanded = false;
let reportMonth = currentMonth();
let charts = [];

function t(value) {
  return language === 'id' ? (INDONESIAN[value] || value) : (ENGLISH[value] || value);
}

function translateValue(value) {
  if (INDONESIAN[value] || ENGLISH[value]) return t(value);
  if (language !== 'id') return value;
  const iconPrefix = value.match(/^(＋|✦|↓|↑|▤|☼|☾)\s+/);
  if (iconPrefix) return `${iconPrefix[0]}${translateValue(value.slice(iconPrefix[0].length))}`;
  const countEntries = value.match(/^(\d+) (income|expense) entries$/);
  if (countEntries) return `${countEntries[1]} catatan ${countEntries[2] === 'income' ? 'pemasukan' : 'pengeluaran'}`;
  if (value.startsWith('Edit ')) return `${t('Edit')} ${value.slice(5)}`;
  if (value.startsWith('Delete ')) return `${t('Delete')} ${value.slice(7)}`;
  if (value.startsWith('No expenses recorded in ')) return `${t('No expenses recorded in')} ${value.slice('No expenses recorded in '.length)}.`;
  if (value.startsWith('Here’s your financial snapshot for ')) return `${t('Here’s your financial snapshot for')} ${value.slice('Here’s your financial snapshot for '.length)}`;
  if (value.startsWith('Activity in ')) return `${t('Activity in')} ${value.slice('Activity in '.length)}`;
  if (value.startsWith('Spending against limits · ')) return `${t('Spending against limits')} · ${value.slice('Spending against limits · '.length)}`;
  if (value.startsWith('Please enter a valid ')) return `Masukkan ${value.slice('Please enter a valid '.length)} yang valid.`;
  if (value.startsWith('Suggested budgets based on ')) {
    const match = value.match(/^Suggested budgets based on (.+) income in (.+)\.$/);
    if (match) return `Saran anggaran berdasarkan pemasukan ${match[1]} pada ${match[2]}.`;
  }
  if (value.startsWith('Backup could not be restored:')) return `${t('Backup could not be restored:')} ${value.slice('Backup could not be restored:'.length).trim()}`;
  if (value.endsWith(' downloaded.')) return `${value.slice(0, -' downloaded.'.length)} berhasil diunduh.`;
  return value;
}

function translateTree(root) {
  const excluded = '.row-title, .row-meta, .entity-card h3, .wallet-card small, .entity-meta';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (node.parentElement.closest(excluded) || node.parentElement.matches('option[data-user-value]') || node.parentElement.closest('select[name="walletId"]')) continue;
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (!trimmed) continue;
    const translated = translateValue(trimmed);
    if (translated !== trimmed) node.nodeValue = original.replace(trimmed, translated);
  }
  for (const element of root.querySelectorAll('[aria-label], [title], [placeholder]')) {
    for (const attribute of ['aria-label', 'title', 'placeholder']) {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, translateValue(element.getAttribute(attribute)));
    }
  }
}

function applyLanguage() {
  language = state.language === 'id' ? 'id' : 'en';
  document.documentElement.lang = language;
  document.title = t('Moneta — Personal finance');
  const locale = language === 'id' ? 'id-ID' : 'en-ID';
  $('#todayLabel').textContent = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date());
  $('#languageSelect').value = language;
  const settingsLanguage = $('#settingsLanguage');
  if (settingsLanguage) settingsLanguage.value = language;
  translateTree(document.body);
}

function setLanguage(value) {
  state.language = value === 'id' ? 'id' : 'en';
  language = state.language;
  persist();
  render();
}

function displayCategory(category) {
  return Object.prototype.hasOwnProperty.call(CATEGORY_ICONS, category) ? t(category) : category;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Unable to save finance data.', error);
    toast('Could not save your changes. Check browser storage and available space.');
    return false;
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isTransaction(item) {
  return item && typeof item === 'object' && typeof item.name === 'string' && Number.isFinite(Number(item.amount)) &&
    Number(item.amount) > 0 && ['income', 'expense'].includes(item.type) && typeof item.category === 'string';
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function formatMoney(value, compact = false) {
  return new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
    notation: compact && Math.abs(value) >= 1e9 ? 'compact' : 'standard'
  }).format(Number(value) || 0);
}

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(month) {
  const [year, value] = month.split('-').map(Number);
  return new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-ID', { month: 'long', year: 'numeric' }).format(new Date(year, value - 1, 1));
}

function formatDate(value, options = { day: 'numeric', month: 'short', year: 'numeric' }) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? t('Unknown date') : new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-ID', options).format(date);
}

function totalOf(items, field) {
  return items.reduce((sum, item) => sum + (Number(item[field]) || 0), 0);
}

function transactionsForMonth(month = currentMonth()) {
  return state.transactions.filter(item => String(item.date || '').slice(0, 7) === month);
}

function summarize(items) {
  const income = totalOf(items.filter(item => item.type === 'income'), 'amount');
  const expense = totalOf(items.filter(item => item.type === 'expense'), 'amount');
  return { income, expense, net: income - expense, savingsRate: income ? Math.max(-100, Math.round((income - expense) / income * 100)) : 0 };
}

function walletBalance(wallet) {
  const linked = state.transactions.filter(item => item.walletId === wallet.id);
  return Number(wallet.openingBalance || 0) + totalOf(linked.filter(item => item.type === 'income'), 'amount') - totalOf(linked.filter(item => item.type === 'expense'), 'amount');
}

function availableCategories() {
  return [...new Set([...CATEGORIES, ...(state.customCategories || []), ...state.transactions.map(item => item.category).filter(Boolean)])];
}

function getBudgetGroup(category) {
  if (state.budgetGroups[category]) return state.budgetGroups[category];
  if (BUDGET_ENVELOPES.some(envelope => envelope.defaults.includes(category))) {
    state.budgetGroups[category] = BUDGET_ENVELOPES.find(envelope => envelope.defaults.includes(category)).id;
  } else {
    state.budgetGroups[category] = 'wants';
  }
  return state.budgetGroups[category];
}

function getBudgetPlan(month = currentMonth()) {
  const monthTransactions = transactionsForMonth(month);
  const income = totalOf(monthTransactions.filter(item => item.type === 'income'), 'amount');
  const expenses = monthTransactions.filter(item => item.type === 'expense');
  const totals = { needs: 0, wants: 0, savings: 0 };
  for (const transaction of expenses) {
    const group = getBudgetGroup(transaction.category);
    if (group === 'needs' || group === 'wants') totals[group] += Number(transaction.amount) || 0;
  }
  totals.savings = income - totals.needs - totals.wants;
  return {
    income,
    envelopes: BUDGET_ENVELOPES.map(envelope => ({
      ...envelope,
      target: income * envelope.percent / 100,
      actual: totals[envelope.id],
      remaining: income * envelope.percent / 100 - totals[envelope.id]
    }))
  };
}

function budgetEnvelopeCard(envelope, income) {
  const hasIncome = income > 0;
  const isSavings = envelope.id === 'savings';
  const progress = hasIncome && envelope.target > 0
    ? Math.max(0, Math.min(100, Math.round(envelope.actual / envelope.target * 100)))
    : 0;
  const overTarget = envelope.remaining < 0 && !isSavings;
  const status = t(isSavings ? 'Saved' : 'Spent');
  const detail = isSavings
    ? (envelope.remaining < 0
      ? `${formatMoney(Math.abs(envelope.remaining))} ${t('over the target')}`
      : `${formatMoney(Math.max(0, envelope.remaining))} ${t('left to save')}`)
    : (overTarget
      ? `${formatMoney(Math.abs(envelope.remaining))} ${t('over the target')}`
      : `${formatMoney(Math.max(0, envelope.remaining))} ${t('left in this envelope')}`);
  return `<article class="envelope-card envelope-${envelope.id}"><div class="envelope-card-top"><span class="envelope-icon">${envelope.id === 'needs' ? '⌂' : envelope.id === 'wants' ? '✳' : '◎'}</span><span class="envelope-percent">${envelope.percent}%</span></div><h3>${t(envelope.id === 'needs' ? 'Needs' : envelope.id === 'wants' ? 'Wants' : 'Savings')}</h3><div class="envelope-target">${formatMoney(envelope.target)}</div><div class="envelope-caption">${t('of income')}</div>${progressMarkup(Math.max(0, envelope.actual), envelope.target, `${t(envelope.id === 'needs' ? 'Needs' : envelope.id === 'wants' ? 'Wants' : 'Savings')} ${envelope.percent}%`)}<div class="envelope-footer"><span>${status} · ${formatMoney(envelope.actual)}</span><strong class="${overTarget || (isSavings && envelope.actual < 0) ? 'tone-red' : isSavings && envelope.actual >= envelope.target && hasIncome ? 'tone-green' : ''}">${hasIncome ? detail : '—'}</strong></div></article>`;
}

function categoryIcon(category) {
  return CATEGORY_ICONS[category] || '◈';
}

function showEmpty(title, message, action = '') {
  return `<div class="empty-state"><strong>${escapeHtml(title)}</strong>${escapeHtml(message)}${action ? `<div style="margin-top:13px">${action}</div>` : ''}</div>`;
}

function cardHeading(title, subtitle = '', action = '') {
  return `<div class="card-heading"><div><h2>${title}</h2>${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}</div>${action}</div>`;
}

function viewHeader(title, description, action = '') {
  return `<div class="page-heading"><div><div class="eyebrow">${escapeHtml(VIEW_TITLES[activeView] || 'Workspace')}</div><h1>${title}</h1><p class="page-description">${description}</p></div>${action}</div>`;
}

function statCard(label, value, icon, foot, tone = '') {
  return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><strong class="stat-value ${tone}">${value}</strong><div class="stat-foot">${foot}</div></article>`;
}

function progressMarkup(current, target, label = '') {
  const pct = target > 0 ? Math.min(100, Math.round(current / target * 100)) : 0;
  const tone = pct >= 100 ? 'over' : pct >= 80 ? 'warning' : '';
  return `<div class="progress-track" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill ${tone}" style="width:${pct}%"></div></div>`;
}

function render() {
  charts.forEach(chart => chart.destroy());
  charts = [];
  language = state.language === 'id' ? 'id' : 'en';
  const content = $('#appContent');
  const renderers = {
    dashboard: renderDashboard, transactions: renderTransactionsView, wallets: renderWallets,
    assets: renderAssets, budgets: renderBudgets, goals: renderGoals, debts: renderDebts,
    reports: renderReports, settings: renderSettings
  };
  content.innerHTML = (renderers[activeView] || renderDashboard)();
  $('#pageTitle').textContent = t(VIEW_TITLES[activeView] || 'Overview');
  applyLanguage();
  $$('.nav-link[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === activeView));
  if (activeView === 'dashboard') drawExpenseChart('overviewChart', currentMonth());
  if (activeView === 'reports') drawReportChart();
  if (activeView === 'transactions') syncTransactionFilters();
}

function renderDashboard() {
  const monthItems = transactionsForMonth();
  const month = summarize(monthItems);
  const netWorth = state.wallets.reduce((sum, wallet) => sum + walletBalance(wallet), 0) +
    totalOf(state.assets, 'value') - totalOf(state.debts, 'balance');
  const savingsTone = month.savingsRate < 0 ? 'tone-red' : 'tone-green';
  const txAction = '<button class="text-link" data-view="transactions">View all →</button>';
  const recent = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const recentMarkup = recent.length ? recent.map(transactionRow).join('') : showEmpty('Your money story starts here', 'Add a transaction to see your spending and income here.', '<button class="button button-primary button-small" data-action="add-transaction">＋ Add transaction</button>');
  const budgets = state.budgets.slice(0, 4);
  const budgetsMarkup = budgets.length ? budgets.map(budgetProgress).join('') : showEmpty('No budgets yet', 'Set a monthly budget or let Moneta suggest one.', '<button class="text-link" data-view="budgets">Set up a budget →</button>');
  const goal = state.goals.filter(item => Number(item.target) > 0).sort((a, b) => (b.saved / b.target) - (a.saved / a.target))[0];
  const goalMarkup = goal
    ? `<div class="goal-mini"><div class="goal-mini-top"><strong>${escapeHtml(goal.name)}</strong><span>${Math.round(goal.saved / goal.target * 100)}%</span></div>${progressMarkup(goal.saved, goal.target, goal.name)}<div class="budget-foot"><span>${formatMoney(goal.saved)} ${t('saved')}</span><span>${formatMoney(goal.target)} ${t('goal')}</span></div></div><button class="text-link" data-view="goals">Manage goals →</button>`
    : showEmpty('Make room for a goal', 'Turn a future plan into a savings target.', '<button class="text-link" data-view="goals">Create a goal →</button>');
  return `${viewHeader('A clearer view of your money.', `Here’s your financial snapshot for ${escapeHtml(monthLabel(currentMonth()))}.`, '<button class="button button-primary" data-action="add-transaction">＋ Add transaction</button>')}
    <div class="stats-grid">
      ${statCard('Estimated net worth', formatMoney(netWorth, true), '◈', `${state.wallets.length} ${t(state.wallets.length === 1 ? 'wallet' : 'wallets')} · ${t('assets less debt')}`)}
      ${statCard('Income this month', formatMoney(month.income, true), '↗', `${monthItems.filter(item => item.type === 'income').length} income entries`, 'tone-green')}
      ${statCard('Spending this month', formatMoney(month.expense, true), '↘', `${monthItems.filter(item => item.type === 'expense').length} expense entries`, 'tone-red')}
      ${statCard('Monthly savings rate', `${month.savingsRate}%`, '◎', month.income ? 'Income minus spending' : 'Add income to calculate', savingsTone)}
    </div>
    <div class="dashboard-grid">
      <section class="card">${cardHeading('Spending breakdown', 'A look at where your money went this month.')}<div class="chart-wrap" id="overviewChartWrap"><canvas id="overviewChart" aria-label="Monthly spending by category" role="img"></canvas></div><div class="chart-legend" id="overviewLegend"></div></section>
      <section class="card">${cardHeading('Monthly budgets', 'Keep spending on the path you set.', '<button class="text-link" data-view="budgets">Manage →</button>')}${budgetsMarkup}</section>
    </div>
    <div class="lower-grid">
      <section class="card">${cardHeading('Recent activity', 'Your latest income and expenses.', txAction)}<div class="transaction-list">${recentMarkup}</div></section>
      <section class="card">${cardHeading('A goal in focus', 'Small steps add up.')}${goalMarkup}</section>
    </div>`;
}

function transactionRow(item, controls = false) {
  const positive = item.type === 'income';
  const wallet = state.wallets.find(entry => entry.id === item.walletId);
  return `<div class="transaction-row"><div class="transaction-main"><span class="category-icon">${categoryIcon(item.category)}</span><div style="min-width:0"><div class="row-title">${escapeHtml(item.name)}</div><div class="row-meta">${escapeHtml(displayCategory(item.category))} · ${formatDate(item.date)}${wallet ? ` · ${escapeHtml(wallet.name)}` : ''}</div></div></div><div class="row-amount ${positive ? 'tone-green' : 'tone-red'}">${positive ? '+' : '−'}${formatMoney(item.amount)}</div>${controls ? `<div class="row-actions"><button title="Edit transaction" aria-label="Edit ${escapeHtml(item.name)}" data-action="edit" data-kind="transactions" data-id="${escapeHtml(item.id)}">✎</button><button title="Delete transaction" aria-label="Delete ${escapeHtml(item.name)}" data-action="delete" data-kind="transactions" data-id="${escapeHtml(item.id)}">×</button></div>` : ''}</div>`;
}

function budgetProgress(item) {
  const spent = totalOf(transactionsForMonth().filter(tx => tx.type === 'expense' && tx.category === item.category), 'amount');
  const amount = Number(item.amount) || 0;
  const pct = amount ? Math.round(spent / amount * 100) : 0;
  return `<div class="budget-item"><div class="budget-label"><strong>${categoryIcon(item.category)} ${escapeHtml(displayCategory(item.category))}</strong><span>${pct}%</span></div>${progressMarkup(spent, amount, `${displayCategory(item.category)} ${t('Monthly limit').toLowerCase()}`)}<div class="budget-foot"><span>${formatMoney(spent)} ${t('spent')}</span><span>${formatMoney(Math.max(0, amount - spent))} ${t('left')}</span></div></div>`;
}

function renderTransactionsView() {
  const rows = filteredTransactions();
  const sums = summarize(transactionsForMonth());
  return `${viewHeader('Transactions', 'A searchable history of every inflow and outflow.', '<button class="button button-primary" data-action="add-transaction">＋ Add transaction</button>')}
    <div class="split-cards">${miniCard('Income this month', formatMoney(sums.income), 'tone-green')}${miniCard('Spent this month', formatMoney(sums.expense), 'tone-red')}${miniCard('Net cash flow', formatMoney(sums.net), sums.net < 0 ? 'tone-red' : 'tone-green')}</div>
    <section class="card">
      <div class="toolbar"><input class="field" id="transactionSearch" type="search" placeholder="Search transactions…" value="${escapeHtml(transactionQuery)}" aria-label="Search transactions"><select class="select" id="transactionType" aria-label="Filter transaction type"><option value="all">All activity</option><option value="income">Income only</option><option value="expense">Expenses only</option></select><button class="button button-quiet" data-action="export-csv">↓ Export CSV</button></div>
      <div class="transaction-list" id="transactionRows">${rows.length ? rows.map(item => transactionRow(item, true)).join('') : showEmpty(state.transactions.length ? 'No matching transactions' : 'Nothing recorded yet', state.transactions.length ? 'Try another search or filter.' : 'Add your first transaction to start building a clear picture.')}</div>
    </section>`;
}

function filteredTransactions() {
  const query = transactionQuery.toLowerCase().trim();
  return [...state.transactions].filter(item => {
    const matchesText = !query || [item.name, item.category, displayCategory(item.category), item.note].some(value => String(value || '').toLowerCase().includes(query));
    return matchesText && (transactionTypeFilter === 'all' || item.type === transactionTypeFilter);
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function syncTransactionFilters() {
  $('#transactionType').value = transactionTypeFilter;
}

function miniCard(label, value, tone = '') {
  return `<div class="mini-card"><span>${label}</span><strong class="${tone}">${value}</strong></div>`;
}

function renderWallets() {
  const total = state.wallets.reduce((sum, wallet) => sum + walletBalance(wallet), 0);
  const items = state.wallets.length ? `<div class="wallet-grid">${state.wallets.map(wallet => `<article class="wallet-card"><div class="wallet-top"><span>${escapeHtml(t(wallet.type || 'Account'))}</span><div class="table-actions">${editDeleteButtons('wallets', wallet.id)}</div></div><strong>${formatMoney(walletBalance(wallet))}</strong><small>${escapeHtml(wallet.name)}${wallet.institution ? ` · ${escapeHtml(wallet.institution)}` : ''}</small></article>`).join('')}</div>` : showEmpty('No wallets yet', 'Add your bank account, cash wallet or digital wallet to keep balances together.', '<button class="button button-primary button-small" data-action="add-wallet">＋ Add a wallet</button>');
  return `${viewHeader('Your wallets', 'Bring your everyday accounts together in one private view.', '<button class="button button-primary" data-action="add-wallet">＋ Add wallet</button>')}
    <div class="balance-banner"><span>Total tracked wallet balances</span><strong>${formatMoney(total)}</strong></div>${items}
    <div class="card section-spacer">${cardHeading('How wallet balances work')}<p class="page-description">Each wallet starts with its opening balance. New transactions linked to a wallet update its displayed balance automatically. Transactions without a wallet remain in your overall cash-flow history.</p></div>`;
}

function renderAssets() {
  const total = totalOf(state.assets, 'value');
  const rows = state.assets.length ? state.assets.map(item => `<article class="entity-card"><div class="entity-top"><span class="entity-icon">◈</span><div class="table-actions">${editDeleteButtons('assets', item.id)}</div></div><h3>${escapeHtml(item.name)}</h3><div class="entity-value">${formatMoney(item.value)}</div><div class="entity-meta">${escapeHtml(t(item.type || 'Other asset'))}${item.note ? ` · ${escapeHtml(item.note)}` : ''}</div></article>`).join('') : showEmpty('No assets added', 'Track investments, property, vehicles or valuables at their estimated current value.', '<button class="button button-primary button-small" data-action="add-asset">＋ Add an asset</button>');
  return `${viewHeader('Assets', 'Keep an eye on what you own, alongside what you spend.', '<button class="button button-primary" data-action="add-asset">＋ Add asset</button>')}
    <div class="balance-banner"><span>Total estimated asset value</span><strong>${formatMoney(total)}</strong></div><div class="entity-grid">${rows}</div>
    <p class="page-description section-spacer">Asset estimates are entered by you and are not live market valuations.</p>`;
}

function renderGoals() {
  const totalSaved = totalOf(state.goals, 'saved');
  const totalTarget = totalOf(state.goals, 'target');
  const rows = state.goals.length ? state.goals.map(goal => {
    const progress = goal.target ? Math.min(100, Math.round(goal.saved / goal.target * 100)) : 0;
    return `<article class="entity-card"><div class="entity-top"><span class="entity-icon">${escapeHtml(goal.icon || '✦')}</span><div class="table-actions">${editDeleteButtons('goals', goal.id)}</div></div><h3>${escapeHtml(goal.name)}</h3><div class="entity-value">${formatMoney(goal.saved)}</div><div class="entity-meta">${t('of')} ${formatMoney(goal.target)}${goal.deadline ? ` · ${t('by')} ${formatDate(goal.deadline, { month: 'short', year: 'numeric' })}` : ''}</div><div class="entity-progress">${progressMarkup(goal.saved, goal.target, `${goal.name} ${t('savings goal')}`)}</div><div class="budget-foot"><span>${progress}% ${t('complete')}</span><span>${formatMoney(Math.max(0, goal.target - goal.saved))} ${t('to go')}</span></div><div class="entity-actions"><button class="button button-small" data-action="contribute" data-id="${escapeHtml(goal.id)}">＋ ${t('Add savings')}</button></div></article>`;
  }).join('') : showEmpty('Start with something you’re looking forward to', 'Add a target, a timeline and your current savings. You can update it as you go.', '<button class="button button-primary button-small" data-action="add-goal">＋ Create a goal</button>');
  return `${viewHeader('Goals worth saving for', 'Give the things that matter a place in your financial plan.', '<button class="button button-primary" data-action="add-goal">＋ Create goal</button>')}
    <div class="split-cards">${miniCard('Saved across goals', formatMoney(totalSaved), 'tone-green')}${miniCard('Combined targets', formatMoney(totalTarget))}${miniCard('Goals in progress', state.goals.length)}</div><div class="entity-grid">${rows}</div>`;
}

function renderDebts() {
  const totalOwed = totalOf(state.debts.filter(item => item.direction === 'owe'), 'balance');
  const totalReceivable = totalOf(state.debts.filter(item => item.direction === 'owed'), 'balance');
  const rows = state.debts.length ? state.debts.map(debt => `<article class="entity-card"><div class="entity-top"><span class="entity-icon">${debt.direction === 'owed' ? '↗' : '↙'}</span><div class="table-actions">${editDeleteButtons('debts', debt.id)}</div></div><h3>${escapeHtml(debt.name)}</h3><div class="entity-value ${debt.direction === 'owed' ? 'tone-green' : ''}">${formatMoney(debt.balance)}</div><div class="entity-meta">${t(debt.direction === 'owed' ? 'Owed to you' : 'You owe')}${debt.dueDate ? ` · ${t('Due')} ${formatDate(debt.dueDate, { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}</div>${debt.note ? `<div class="entity-meta">${escapeHtml(debt.note)}</div>` : ''}<div class="entity-actions"><button class="button button-small" data-action="edit" data-kind="debts" data-id="${escapeHtml(debt.id)}">${t('Update balance')}</button></div></article>`).join('') : showEmpty('A simple view of what’s owed', 'Track money you owe or money owed to you, including due dates.', '<button class="button button-primary button-small" data-action="add-debt">＋ Add a debt</button>');
  return `${viewHeader('Debt tracking', 'See outstanding balances clearly and keep repayment on your radar.', '<button class="button button-primary" data-action="add-debt">＋ Add debt</button>')}
    <div class="split-cards">${miniCard('You owe', formatMoney(totalOwed), 'tone-red')}${miniCard('Owed to you', formatMoney(totalReceivable), 'tone-green')}${miniCard('Net debt', formatMoney(totalOwed - totalReceivable))}</div><div class="entity-grid">${rows}</div>`;
}

function renderBudgets() {
  const plan = getBudgetPlan();
  const categories = [...new Set([...CATEGORIES, ...(state.customCategories || []), ...state.transactions.filter(item => item.type === 'expense').map(item => item.category)])]
    .filter(category => typeof category === 'string' && category.trim())
    .sort((a, b) => displayCategory(a).localeCompare(displayCategory(b), language === 'id' ? 'id-ID' : 'en-ID'));
  const categoryGroups = categories.map(category => `<tr><td><span class="table-primary">${categoryIcon(category)} ${escapeHtml(displayCategory(category))}</span></td><td><select class="select budget-group-select" data-budget-category="${escapeHtml(category)}" aria-label="${escapeHtml(`${t('Budget category')}: ${displayCategory(category)}`)}"><option value="needs" ${getBudgetGroup(category) === 'needs' ? 'selected' : ''}>${t('Needs · 50%')}</option><option value="wants" ${getBudgetGroup(category) === 'wants' ? 'selected' : ''}>${t('Wants · 30%')}</option><option value="savings" ${getBudgetGroup(category) === 'savings' ? 'selected' : ''}>${t('Savings · 20%')}</option></select></td></tr>`).join('');
  const items = state.budgets.length ? `<div class="data-table-wrap"><table class="data-table"><thead><tr><th>Category</th><th>Monthly limit</th><th>Spent this month</th><th>Remaining</th><th></th></tr></thead><tbody>${state.budgets.map(budget => {
    const spent = totalOf(transactionsForMonth().filter(tx => tx.category === budget.category && tx.type === 'expense'), 'amount');
    const left = Number(budget.amount) - spent;
    return `<tr><td><span class="table-primary">${categoryIcon(budget.category)} ${escapeHtml(displayCategory(budget.category))}</span></td><td>${formatMoney(budget.amount)}</td><td>${formatMoney(spent)}<div style="margin-top:6px">${progressMarkup(spent, budget.amount, `${displayCategory(budget.category)} ${t('Monthly limit').toLowerCase()}`)}</div></td><td class="${left < 0 ? 'tone-red' : ''}">${formatMoney(left)}</td><td><span class="table-actions">${editDeleteButtons('budgets', budget.id)}</span></td></tr>`;
  }).join('')}</tbody></table></div>` : showEmpty('No category budgets yet', 'Add a category budget to get started.', `<button class="button button-primary button-small" data-action="add-budget">＋ ${t('Add budget')}</button>`);
  const groupManagement = `<div class="data-table-wrap"><table class="data-table category-group-table"><thead><tr><th>${t('Category')}</th><th>${t('Category group')}</th></tr></thead><tbody>${categoryGroups}</tbody></table></div>`;
  const plannerButtonLabel = budgetPlannerExpanded ? 'Close 50/30/20 planner' : 'Open 50/30/20 planner';
  return `${viewHeader('Budget planner', 'Set monthly spending limits and see how your actuals compare.', `<button class="button button-primary" data-action="add-budget">＋ ${t('Add budget')}</button>`)}
    <section class="card">${cardHeading('Your category limits', 'Manage monthly limits by category.', '<button class="button button-quiet button-small" data-action="add-budget">＋ Add category</button>')}${items}</section>
    <section class="card section-spacer budget-option"><div class="budget-option-header"><div><p class="eyebrow">${t('Optional tool')}</p><h2>${t('Optional 50/30/20 planner')}</h2><p class="card-subtitle">${t('Set income-based targets when you want a 50/30/20 guideline.')}</p></div><button class="button button-quiet button-small" data-action="toggle-budget-planner" aria-expanded="${budgetPlannerExpanded}" aria-controls="budgetPlanner">${t(plannerButtonLabel)}</button></div>
      <div class="budget-planner-panel" id="budgetPlanner" ${budgetPlannerExpanded ? '' : 'hidden'}><section class="rule-card">${cardHeading('50/30/20 budget rule', `${escapeHtml(t('Monthly plan'))} · ${escapeHtml(monthLabel(currentMonth()))}`)}<p class="card-subtitle rule-description">Give every part of your income a clear purpose. Set category groups below so your real spending follows your plan.</p>${plan.income ? `<div class="envelope-grid">${plan.envelopes.map(envelope => budgetEnvelopeCard(envelope, plan.income)).join('')}</div>` : `<div class="income-prompt"><span class="income-prompt-icon">↗</span><div><strong>${t('Add income first')}</strong><p>${t('Record income this month to calculate your 50/30/20 targets.')}</p></div><button class="button button-primary button-small" data-action="add-income">${t('Add income')}</button></div>`}<p class="page-description rule-footnote">${t('Needs includes essential expenses. Wants covers discretionary spending. Savings is income left after needs and wants, including savings transactions in their assigned category.')}</p></section>
      <section class="section-spacer">${cardHeading('Set category groups', 'Choose whether each expense category is a need, want, or savings contribution.')}<div class="category-group-list">${groupManagement}</div></section>
      <p class="page-description section-spacer">${t('Build category limits from this month’s income, split across the 50/30/20 envelopes.')}</p></div>
    </section>`;
}

function buildBudgetAllocations(income, month, categories) {
  const monthTransactions = transactionsForMonth(month);
  const spending = new Map();
  for (const transaction of monthTransactions.filter(item => item.type === 'expense')) {
    spending.set(transaction.category, (spending.get(transaction.category) || 0) + Number(transaction.amount));
  }
  const updates = [];
  for (const envelope of BUDGET_ENVELOPES) {
    const groupCategories = categories.filter(category => getBudgetGroup(category) === envelope.id);
    if (!groupCategories.length) continue;
    const weights = groupCategories.map(category => spending.get(category) || 0);
    const weightTotal = weights.reduce((sum, amount) => sum + amount, 0);
    const useActualSpending = weightTotal > 0 && weights.every(amount => amount > 0);
    const target = Math.round(income * envelope.percent / 100);
    let remaining = target;
    groupCategories.forEach((category, index) => {
      const amount = index === groupCategories.length - 1
        ? remaining
        : Math.floor(target * (useActualSpending ? weights[index] / weightTotal : 1 / groupCategories.length));
      remaining -= amount;
      updates.push({ category, amount, generatedBy: '50/30/20' });
    });
  }
  return updates;
}

function rebalanceAutomaticBudgets(month = currentMonth()) {
  const automated = state.budgets.filter(budget => budget.generatedBy === '50/30/20');
  if (!automated.length) return;
  const income = totalOf(transactionsForMonth(month).filter(item => item.type === 'income'), 'amount');
  if (!income) return;
  const allocations = buildBudgetAllocations(income, month, automated.map(budget => budget.category));
  const amounts = new Map(allocations.map(allocation => [allocation.category, allocation.amount]));
  for (const budget of automated) {
    if (amounts.has(budget.category)) budget.amount = amounts.get(budget.category);
  }
}

function renderReports() {
  const data = summarize(transactionsForMonth(reportMonth));
  return `${viewHeader('Reports & insights', 'Understand your cash flow over time and take a copy with you.', `<div class="report-controls"><input class="field" type="month" id="reportMonth" value="${escapeHtml(reportMonth)}" aria-label="Report month"><button class="button button-quiet" data-action="export-csv">↓ CSV</button><button class="button button-quiet" data-action="print-report">▤ Save as PDF</button></div>`)}
    <div class="split-cards">${miniCard('Income', formatMoney(data.income), 'tone-green')}${miniCard('Expenses', formatMoney(data.expense), 'tone-red')}${miniCard('Net cash flow', formatMoney(data.net), data.net < 0 ? 'tone-red' : 'tone-green')}</div>
    <section class="card">${cardHeading('Six-month cash flow', 'Monthly income and expenses from your recorded transactions.')}<div class="chart-wrap report-chart"><canvas id="reportChart" aria-label="Six-month cash flow chart" role="img"></canvas></div></section>
    <section class="card section-spacer">${cardHeading(`Activity in ${escapeHtml(monthLabel(reportMonth))}`, 'Transaction totals for the selected month.')}<div class="report-summary"><div><span>INCOME</span><strong class="tone-green">${formatMoney(data.income)}</strong></div><div><span>EXPENSES</span><strong class="tone-red">${formatMoney(data.expense)}</strong></div><div><span>SAVINGS RATE</span><strong>${data.savingsRate}%</strong></div></div></section>`;
}

function renderSettings() {
  return `${viewHeader('Your data. Your call.', 'Your finance data stays in this browser. Export a backup any time.', '')}
    <div class="settings-grid">
      <section class="settings-card"><h2>Language</h2><p>Choose the language used throughout Moneta.</p><div class="settings-actions"><label class="sr-only" for="settingsLanguage">Language</label><select class="language-select" id="settingsLanguage" aria-label="Language"><option value="en">English</option><option value="id">Bahasa Indonesia</option></select></div></section>
      <section class="settings-card"><h2>Backup your data</h2><p>Download a JSON copy of your transactions, wallets, goals and settings.</p><div class="settings-actions"><button class="button button-primary" data-action="backup">↓ Download backup</button><button class="button" data-action="export-csv">↓ Export transactions CSV</button></div></section>
      <section class="settings-card"><h2>Restore a backup</h2><p>Import a Moneta JSON backup from this device. Restoring replaces the current data.</p><div class="settings-actions"><button class="button" data-action="restore">↑ Choose backup file</button><input class="hidden-input" id="restoreFile" type="file" accept=".json,application/json"></div></section>
      <section class="settings-card"><h2>Appearance</h2><p>Choose the display that feels comfortable. Your preference is saved on this device.</p><div class="settings-actions"><button class="button" data-action="toggle-theme">☼ Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode</button></div></section>
      <section class="settings-card"><h2>About local storage</h2><p>Moneta runs entirely in your browser—there is no account or cloud sync. Clearing browser data will remove saved information, so keep a backup.</p><div class="settings-actions"><span class="pill green">Private by design</span><span class="pill">No account required</span></div></section>
    </div>`;
}

function drawExpenseChart(canvasId, month) {
  const canvas = $(`#${canvasId}`);
  const wrap = canvas?.parentElement;
  if (!canvas || !wrap) return;
  if (typeof Chart === 'undefined') {
    wrap.innerHTML = `<div class="chart-empty">${escapeHtml(t('Chart library unavailable. Connect to the internet to view charts.'))}</div>`;
    return;
  }
  const totals = new Map();
  for (const item of transactionsForMonth(month).filter(transaction => transaction.type === 'expense')) {
    totals.set(item.category, (totals.get(item.category) || 0) + Number(item.amount));
  }
  const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  if (!entries.length) {
    wrap.innerHTML = `<div class="chart-empty">${escapeHtml(t(month === currentMonth() ? 'No expenses recorded this month yet.' : `No expenses recorded in ${monthLabel(month)}.`))}</div>`;
    return;
  }
  const isDark = state.theme === 'dark';
  charts.push(new Chart(canvas, {
    type: 'doughnut',
    data: { labels: entries.map(entry => entry[0]), datasets: [{ data: entries.map(entry => entry[1]), backgroundColor: entries.map((_, index) => COLORS[index % COLORS.length]), borderColor: isDark ? '#1b202b' : '#fff', borderWidth: 3, hoverOffset: 5 }] },
    options: { maintainAspectRatio: false, cutout: '69%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => ` ${formatMoney(context.parsed)} · ${Math.round(context.parsed / entries.reduce((sum, entry) => sum + entry[1], 0) * 100)}%` } } } }
  }));
  const legend = $('#overviewLegend');
  if (legend) legend.innerHTML = entries.slice(0, 5).map(([label, amount], index) => `<div class="legend-row"><span class="legend-dot" style="background:${COLORS[index % COLORS.length]}"></span>${escapeHtml(displayCategory(label))}<strong>${formatMoney(amount)}</strong></div>`).join('');
}

function drawReportChart() {
  const canvas = $('#reportChart');
  if (!canvas) return;
  if (typeof Chart === 'undefined') {
    canvas.parentElement.innerHTML = `<div class="chart-empty">${escapeHtml(t('Chart library unavailable. Connect to the internet to view charts.'))}</div>`;
    return;
  }
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
  const summaries = months.map(month => summarize(transactionsForMonth(month)));
  charts.push(new Chart(canvas, {
    type: 'bar',
    data: { labels: months.map(month => monthLabel(month).split(' ')[0]), datasets: [
      { label: t('Income'), data: summaries.map(item => item.income), backgroundColor: '#43af8a', borderRadius: 5 },
      { label: t('Expenses'), data: summaries.map(item => item.expense), backgroundColor: '#e87979', borderRadius: 5 }
    ] },
    options: { responsive: true, maintainAspectRatio: false, scales: { x: { grid: { display: false }, ticks: { color: state.theme === 'dark' ? '#98a2b3' : '#8a94a5' } }, y: { beginAtZero: true, grid: { color: state.theme === 'dark' ? '#2b3240' : '#edf0f5' }, ticks: { color: state.theme === 'dark' ? '#98a2b3' : '#8a94a5', callback: value => new Intl.NumberFormat(language === 'id' ? 'id-ID' : 'en-ID', { notation: 'compact' }).format(value) } } }, plugins: { legend: { labels: { color: state.theme === 'dark' ? '#98a2b3' : '#8a94a5', usePointStyle: true, boxWidth: 7 } }, tooltip: { callbacks: { label: context => ` ${context.dataset.label}: ${formatMoney(context.parsed.y)}` } } } }
  }));
}

function editDeleteButtons(kind, id) {
  return `<button class="button button-icon button-small" aria-label="Edit" title="Edit" data-action="edit" data-kind="${kind}" data-id="${escapeHtml(id)}">✎</button><button class="button button-icon button-small button-danger" aria-label="Delete" title="Delete" data-action="delete" data-kind="${kind}" data-id="${escapeHtml(id)}">×</button>`;
}

const ENTITY_CONFIG = {
  transactions: {
    title: 'transaction', collection: 'transactions', fields: [
      ['name', 'Description', 'text', true, 'e.g. Monthly salary or coffee'],
      ['amount', 'Amount (IDR)', 'number', true, '', 'min="1" step="1"'],
      ['type', 'Type', 'select', true, [['expense', 'Expense'], ['income', 'Income']]],
      ['category', 'Category', 'category', true],
      ['date', 'Date', 'date', true],
      ['walletId', 'Wallet (optional)', 'wallet'],
      ['note', 'Note (optional)', 'textarea']
    ]
  },
  wallets: { title: 'wallet', collection: 'wallets', fields: [
    ['name', 'Wallet name', 'text', true, 'e.g. Everyday account'], ['type', 'Account type', 'select', true, [['Bank account', 'Bank account'], ['Cash', 'Cash'], ['E-wallet', 'E-wallet'], ['Savings', 'Savings'], ['Investment', 'Investment'], ['Other', 'Other']]],
    ['openingBalance', 'Opening balance (IDR)', 'number', true, '', 'min="0" step="1"'], ['institution', 'Bank or provider (optional)', 'text']
  ] },
  assets: { title: 'asset', collection: 'assets', fields: [
    ['name', 'Asset name', 'text', true, 'e.g. Index fund'], ['type', 'Asset type', 'select', true, [['Investment', 'Investment'], ['Property', 'Property'], ['Vehicle', 'Vehicle'], ['Valuables', 'Valuables'], ['Other', 'Other']]],
    ['value', 'Estimated value (IDR)', 'number', true, '', 'min="0" step="1"'], ['note', 'Note (optional)', 'text']
  ] },
  goals: { title: 'financial goal', collection: 'goals', fields: [
    ['name', 'Goal name', 'text', true, 'e.g. Emergency fund'], ['target', 'Target amount (IDR)', 'number', true, '', 'min="1" step="1'],
    ['saved', 'Already saved (IDR)', 'number', true, '', 'min="0" step="1'], ['deadline', 'Target date (optional)', 'date'], ['icon', 'Icon (optional)', 'text', false, '✦']
  ] },
  debts: { title: 'debt', collection: 'debts', fields: [
    ['name', 'Person or account', 'text', true, 'e.g. Student loan'], ['direction', 'This balance is…', 'select', true, [['owe', 'Money I owe'], ['owed', 'Money owed to me']]],
    ['balance', 'Outstanding balance (IDR)', 'number', true, '', 'min="0" step="1'], ['dueDate', 'Due date (optional)', 'date'], ['note', 'Note (optional)', 'text']
  ] },
  budgets: { title: 'budget', collection: 'budgets', fields: [
    ['category', 'Expense category', 'category', true], ['amount', 'Monthly limit (IDR)', 'number', true, '', 'min="1" step="1']
  ] }
};

function openForm(kind, id = '') {
  const config = ENTITY_CONFIG[kind];
  if (!config) return;
  const existing = id ? state[config.collection].find(item => item.id === id) : null;
  const title = `${t(existing ? 'Edit' : 'Add')} ${t(config.title)}`;
  const fields = config.fields.map(field => renderField(field, existing?.[field[0]])).join('');
  const container = $('#dialogContent');
  container.innerHTML = `<form id="entityForm" data-kind="${kind}" data-id="${escapeHtml(id)}" novalidate><div class="modal-inner"><div class="modal-heading"><div><h2 id="dialogTitle">${title}</h2><p>Saved privately on this device.</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="Close dialog">×</button></div><div class="form-grid">${fields}</div><div class="modal-actions"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">${t(existing ? 'Save changes' : 'Save')} ${t(config.title)}</button></div></div></form>`;
  translateTree(container);
  $('#formDialog').showModal();
  $('input:not([type="hidden"]), select, textarea', container)?.focus();
}

function renderField(field, value) {
  const [name, label, type, required = false, extra = '', attrs = ''] = field;
  const requiredMark = required ? ' <span aria-hidden="true">*</span>' : '';
  let control;
  if (type === 'select') {
      const choices = extra.map(([key, text]) => `<option value="${escapeHtml(key)}" ${String(value ?? '') === key ? 'selected' : ''}>${escapeHtml(t(text))}</option>`).join('');
    control = `<select id="field-${name}" name="${name}" ${required ? 'required' : ''}>${choices}</select>`;
  } else if (type === 'category') {
    const selected = value || '';
    const choices = availableCategories().map(category => `<option value="${escapeHtml(category)}" ${!CATEGORIES.includes(category) ? 'data-user-value' : ''} ${selected === category ? 'selected' : ''}>${escapeHtml(displayCategory(category))}</option>`).join('');
    control = `<select id="field-${name}" name="${name}" required><option value="">${t('Choose a category')}</option>${choices}<option value="__custom__">${t('＋ Add new category…')}</option></select><input id="field-customCategory" name="customCategory" class="custom-category-field" type="text" placeholder="${t('New category name')}" hidden>`;
  } else if (type === 'wallet') {
    const choices = state.wallets.map(wallet => `<option value="${escapeHtml(wallet.id)}" ${value === wallet.id ? 'selected' : ''}>${escapeHtml(wallet.name)}</option>`).join('');
    control = `<select id="field-${name}" name="${name}"><option value="">No wallet</option>${choices}</select>`;
  } else if (type === 'textarea') {
    control = `<textarea id="field-${name}" name="${name}" placeholder="Add a little context…">${escapeHtml(value || '')}</textarea>`;
  } else {
    let fieldValue = value ?? '';
    if (name === 'date' && !value) fieldValue = new Date().toISOString().slice(0, 10);
    if (type === 'number' && value !== undefined) fieldValue = Number(value);
    control = `<input id="field-${name}" name="${name}" type="${type}" value="${escapeHtml(fieldValue)}" ${required ? 'required' : ''} ${attrs}>`;
  }
  const full = type === 'textarea' || (type === 'category' && name === 'category');
  return `<div class="form-field ${full ? 'full' : ''}"><label for="field-${name}">${label}${requiredMark}</label>${control}</div>`;
}

function submitForm(form) {
  const kind = form.dataset.kind;
  const config = ENTITY_CONFIG[kind];
  if (!config) return;
  const formData = new FormData(form);
  const value = {};
  for (const field of config.fields) {
    const [name, label, type, required] = field;
    let raw = formData.get(name);
    if (name === 'category' && raw === '__custom__') {
      raw = String(formData.get('customCategory') || '').trim();
      if (raw && !state.customCategories.includes(raw)) state.customCategories.push(raw);
    }
    if (type === 'number') raw = raw === '' ? NaN : Number(raw);
    if (required && (raw === null || raw === undefined || String(raw).trim() === '' || (type === 'number' && (!Number.isFinite(raw) || raw < 0)))) {
      const localizedLabel = t(label).toLocaleLowerCase(language === 'id' ? 'id-ID' : 'en-ID');
      toast(language === 'id' ? `Masukkan ${localizedLabel} yang valid.` : `Please enter a valid ${localizedLabel}.`);
      $(`[name="${name === 'category' && formData.get('category') === '__custom__' ? 'customCategory' : name}"]`, form)?.focus();
      return;
    }
    if (name === 'amount' && raw <= 0) { toast('Amount must be greater than zero.'); return; }
    if (name === 'target' && raw <= 0) { toast('A goal target must be greater than zero.'); return; }
    if (name === 'category' && !raw) { toast('Choose or enter a category.'); return; }
    value[name] = raw ?? '';
  }
  const id = form.dataset.id;
  const existingIndex = id ? state[config.collection].findIndex(item => item.id === id) : -1;
  if (kind === 'transactions') {
    value.amount = Number(value.amount);
    value.date = value.date ? new Date(`${value.date}T12:00:00`).toISOString() : new Date().toISOString();
    value.walletId = value.walletId || '';
  }
  if (kind === 'wallets') value.openingBalance = Number(value.openingBalance);
  if (kind === 'assets') value.value = Number(value.value);
  if (kind === 'goals') { value.target = Number(value.target); value.saved = Number(value.saved); }
  if (kind === 'debts') value.balance = Number(value.balance);
  if (kind === 'budgets') value.amount = Number(value.amount);
  if (kind === 'budgets' && state.budgets.some(item => item.category.toLowerCase() === String(value.category).toLowerCase() && item.id !== id)) {
    toast('A budget for this category already exists. Edit the existing one instead.');
    return;
  }
  if (existingIndex >= 0) {
    const updated = { ...state[config.collection][existingIndex], ...value };
    if (kind === 'budgets') delete updated.generatedBy;
    state[config.collection][existingIndex] = updated;
  } else {
    state[config.collection].unshift({ id: makeId(), ...value, createdAt: new Date().toISOString() });
  }
  persist();
  $('#formDialog').close();
  toast(`${t(config.title)} ${t(existingIndex >= 0 ? 'updated' : 'added')}.`);
  render();
}

function handleDelete(kind, id) {
  const config = ENTITY_CONFIG[kind];
  if (!config || !state[config.collection].some(item => item.id === id)) return;
  const item = state[config.collection].find(entry => entry.id === id);
  if (!confirm(`${t('Delete')} “${item.name || item.category}”? ${t('This cannot be undone.')}`)) return;
  state[config.collection] = state[config.collection].filter(entry => entry.id !== id);
  persist();
  toast(`${t(config.title)} ${t('deleted')}.`);
  render();
}

function openContribution(id) {
  const goal = state.goals.find(item => item.id === id);
  if (!goal) return;
  const container = $('#dialogContent');
  container.innerHTML = `<form id="contributionForm" data-id="${escapeHtml(id)}"><div class="modal-inner"><div class="modal-heading"><div><h2 id="dialogTitle">Add savings</h2><p>${escapeHtml(goal.name)} · ${formatMoney(goal.saved)} of ${formatMoney(goal.target)} saved</p></div><button class="modal-close" type="button" data-action="close-modal" aria-label="Close dialog">×</button></div><div class="form-grid"><div class="form-field full"><label for="contributionAmount">Contribution amount (IDR) *</label><input id="contributionAmount" name="amount" type="number" min="1" step="1" required></div></div><div class="modal-actions"><button class="button" type="button" data-action="close-modal">Cancel</button><button class="button button-primary" type="submit">Add savings</button></div></div></form>`;
  translateTree(container);
  $('#formDialog').showModal();
  $('#contributionAmount').focus();
}

function applyContribution(form) {
  const goal = state.goals.find(item => item.id === form.dataset.id);
  const amount = Number(new FormData(form).get('amount'));
  if (!goal || !Number.isFinite(amount) || amount <= 0) { toast('Enter a contribution greater than zero.'); return; }
  goal.saved = Number(goal.saved) + amount;
  persist();
  $('#formDialog').close();
  toast('Savings goal updated.');
  render();
}

function autoBudget() {
  const referenceMonth = currentMonth();
  const monthTransactions = transactionsForMonth(referenceMonth);
  const income = summarize(monthTransactions).income;
  if (!income) {
    toast(t('Add income first. Moneta uses your latest month with income to suggest category limits.'));
    return;
  }
  const expenseCategories = [...new Set([
    ...CATEGORIES,
    ...(state.customCategories || []),
    ...monthTransactions.filter(item => item.type === 'expense').map(item => item.category)
  ])];
  const updates = buildBudgetAllocations(income, referenceMonth, expenseCategories);
  const existing = new Map(state.budgets.map(item => [item.category.toLowerCase(), item]));
  for (const suggestion of updates) {
    const found = existing.get(suggestion.category.toLowerCase());
    if (found) Object.assign(found, suggestion);
    else state.budgets.push({ id: makeId(), ...suggestion, createdAt: new Date().toISOString() });
  }
  persist();
  toast(`${t('Suggested budgets based on')} ${formatMoney(income)} ${t('income')} 50/30/20 · ${monthLabel(referenceMonth)}.`);
  render();
}

function exportCsv() {
  const header = ['Date', 'Description', 'Type', 'Category', 'Amount (IDR)', 'Wallet', 'Note'].map(t);
  const rows = [...state.transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => [
    item.date ? String(item.date).slice(0, 10) : '', item.name, item.type, item.category, item.amount,
    state.wallets.find(wallet => wallet.id === item.walletId)?.name || '', item.note || ''
  ]);
  const csv = [[t('Date'), t('Description'), t('Type'), t('Category'), t('Amount (IDR)'), t('Wallet'), t('Note')], ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
  downloadFile(`moneta-transactions-${currentMonth()}.csv`, `\uFEFF${csv}`, 'text/csv;charset=utf-8');
}

function csvCell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function backupData() {
  downloadFile(`moneta-backup-${currentMonth()}.json`, JSON.stringify({ app: 'Moneta', version: 1, exportedAt: new Date().toISOString(), data: state }, null, 2), 'application/json');
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  toast(`${filename} downloaded.`);
}

function restoreBackup(file) {
  const reader = new FileReader();
  reader.addEventListener('error', () => toast('Could not read that file. Please choose a valid Moneta backup.'));
  reader.addEventListener('load', () => {
    try {
      const backup = JSON.parse(String(reader.result));
      const data = backup?.data || backup;
      const arrays = ['transactions', 'wallets', 'assets', 'goals', 'debts', 'budgets'];
      if (!data || arrays.some(key => !Array.isArray(data[key]))) throw new Error('The backup is missing required data.');
      if (data.transactions.some(item => !isTransaction(item))) throw new Error('The backup contains an invalid transaction.');
      if (data.wallets.some(item => typeof item.name !== 'string' || !Number.isFinite(Number(item.openingBalance)))) throw new Error('The backup contains an invalid wallet.');
      if (data.assets.some(item => typeof item.name !== 'string' || !Number.isFinite(Number(item.value)))) throw new Error('The backup contains an invalid asset.');
      if (data.goals.some(item => typeof item.name !== 'string' || !Number.isFinite(Number(item.target)) || !Number.isFinite(Number(item.saved)))) throw new Error('The backup contains an invalid goal.');
      if (data.debts.some(item => typeof item.name !== 'string' || !Number.isFinite(Number(item.balance)))) throw new Error('The backup contains an invalid debt.');
      if (data.budgets.some(item => typeof item.category !== 'string' || !Number.isFinite(Number(item.amount)))) throw new Error('The backup contains an invalid budget.');
      if (!confirm('Restore this backup? Your current Moneta data will be replaced.')) return;
      state = normalizeState(data);
      if (persist()) {
        applyTheme();
        toast('Backup restored successfully.');
        render();
      }
    } catch (error) {
      console.error('Backup restore failed.', error);
      toast(`Backup could not be restored: ${error.message || 'invalid file'}`);
    }
  });
  reader.readAsText(file);
}

function printReport() {
  activeView = 'reports';
  reportMonth = $('#reportMonth')?.value || reportMonth;
  render();
  window.setTimeout(() => window.print(), 80);
}

function setTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  persist();
  applyTheme();
  render();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $('#themeToggle').textContent = state.theme === 'light' ? '☾' : '☼';
  const themeLabel = `Switch to ${state.theme === 'light' ? 'dark' : 'light'} theme`;
  $('#themeToggle').setAttribute('aria-label', t(themeLabel));
  $('#themeToggle').title = t(themeLabel);
  document.querySelector('meta[name="theme-color"]').content = state.theme === 'light' ? '#f6f7fb' : '#13171f';
}

function toast(message) {
  const region = $('#toastRegion');
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = translateValue(message);
  region.appendChild(item);
  window.setTimeout(() => item.remove(), 3400);
}

function setView(view) {
  if (!VIEW_TITLES[view]) return;
  activeView = view;
  $('#sidebar').classList.remove('open');
  render();
  $('#appContent').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleAction(button) {
  const { action, kind, id } = button.dataset;
  const addKinds = {
    'add-transaction': 'transactions', 'add-wallet': 'wallets', 'add-asset': 'assets',
    'add-goal': 'goals', 'add-debt': 'debts', 'add-budget': 'budgets'
  };
  if (action === 'add-income') {
    openForm('transactions');
    $('#entityForm [name="type"]').value = 'income';
  } else if (addKinds[action]) openForm(addKinds[action]);
  else if (action === 'edit') openForm(kind, id);
  else if (action === 'delete') handleDelete(kind, id);
  else if (action === 'contribute') openContribution(id);
  else if (action === 'toggle-budget-planner') {
    budgetPlannerExpanded = !budgetPlannerExpanded;
    render();
    $('[data-action="toggle-budget-planner"]')?.focus();
  }
  else if (action === 'auto-budget') autoBudget();
  else if (action === 'close-modal') $('#formDialog').close();
  else if (action === 'export-csv') exportCsv();
  else if (action === 'backup') backupData();
  else if (action === 'restore') $('#restoreFile').click();
  else if (action === 'toggle-theme') setTheme();
  else if (action === 'print-report') printReport();
}

function init() {
  applyTheme();
  render();
  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) { setView(viewButton.dataset.view); return; }
    const link = event.target.closest('[data-view-link]');
    if (link) { event.preventDefault(); setView(link.dataset.viewLink); return; }
    const action = event.target.closest('[data-action]');
    if (action) handleAction(action);
  });
  $('#appContent').addEventListener('input', event => {
    if (event.target.id === 'transactionSearch') {
      transactionQuery = event.target.value;
      const rows = $('#transactionRows');
      const matches = filteredTransactions();
      rows.innerHTML = matches.length ? matches.map(item => transactionRow(item, true)).join('') : showEmpty(state.transactions.length ? 'No matching transactions' : 'Nothing recorded yet', 'Try another search or add your first transaction.');
      translateTree(rows);
    }
  });
  $('#appContent').addEventListener('change', event => {
    if (event.target.matches('[data-budget-category]')) {
      state.budgetGroups[event.target.dataset.budgetCategory] = event.target.value;
      rebalanceAutomaticBudgets();
      persist();
      toast(t('Category group updated.'));
      render();
      return;
    }
    if (event.target.id === 'transactionType') {
      transactionTypeFilter = event.target.value;
      const rows = $('#transactionRows');
      const matches = filteredTransactions();
      rows.innerHTML = matches.length ? matches.map(item => transactionRow(item, true)).join('') : showEmpty('No matching transactions', 'Try another search or filter.');
      translateTree(rows);
    }
    if (event.target.id === 'reportMonth') {
      reportMonth = event.target.value || currentMonth();
      render();
    }
  });
  $('#dialogContent').addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.id === 'entityForm') submitForm(event.target);
    if (event.target.id === 'contributionForm') applyContribution(event.target);
  });
  $('#dialogContent').addEventListener('change', event => {
    if (event.target.name !== 'category' || event.target.value !== '__custom__') return;
    const custom = $('[name="customCategory"]', event.target.parentElement);
    custom.hidden = false;
    custom.required = true;
    custom.focus();
  });
  $('#restoreFile').addEventListener('change', event => {
    const [file] = event.target.files;
    if (file) restoreBackup(file);
    event.target.value = '';
  });
  const updateLanguage = event => setLanguage(event.target.value);
  $('#languageSelect').addEventListener('change', updateLanguage);
  $('#appContent').addEventListener('change', event => {
    if (event.target.id === 'settingsLanguage') updateLanguage(event);
  });
  $('#themeToggle').addEventListener('click', setTheme);
  $('#menuToggle').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  $('#formDialog').addEventListener('click', event => {
    if (event.target === $('#formDialog')) $('#formDialog').close();
  });
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try { state = normalizeState(JSON.parse(event.newValue)); applyTheme(); render(); toast('Finance data updated in another tab.'); }
      catch (error) { console.error('Could not sync finance data from another tab.', error); }
    }
  });
}

init();
