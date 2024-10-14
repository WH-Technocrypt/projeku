document.getElementById('generate-btn').addEventListener('click', function() {
    var transactionNumber = document.getElementById('transaction-number').value;

    // Dapatkan tanggal hari ini
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    var year = today.getFullYear();
    var currentDate = `${day}-${month}-${year}`;

    // Generate biaya secara otomatis, minimal Rp 1.000
    var minCost = 1000;
    var randomCost = Math.floor(Math.random() * 10000) + minCost; // Biaya antara 1.000 hingga 10.000

    // Jika nomor transaksi diisi
    if (transactionNumber) {
        // Menampilkan informasi tiket
        document.getElementById('transaksi').innerText = transactionNumber;
        document.getElementById('tanggal').innerText = currentDate;
        document.getElementById('biaya').innerText = randomCost.toLocaleString(); // Memformat biaya dengan titik

        // Membuat barcode menggunakan JsBarcode
        JsBarcode("#barcode", transactionNumber, {
            format: "CODE128", // format barcode yang digunakan
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: true
        });

        // Tampilkan tiket
        document.getElementById('ticket').style.display = "block";
    } else {
        alert('Masukkan nomor transaksi!');
    }
});
