document.getElementById('generate-btn').addEventListener('click', function() {
    var userName = document.getElementById('name-input').value;

    // Cek apakah field nama diisi
    if (userName) {
        // Generate nomor transaksi acak
        var transactionNumber = 'TRX' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

        // Generate tanggal otomatis (hari ini)
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
        var year = today.getFullYear();
        var currentDate = `${day}-${month}-${year}`;

        // Generate biaya acak minimal Rp 1.000,-
        var minCost = 1000;
        var randomCost = Math.floor(Math.random() * 10000) + minCost;

        // Tampilkan informasi tiket
        document.getElementById('name').innerText = userName; // Nama diambil dari input pengguna
        document.getElementById('transaksi').innerText = transactionNumber;
        document.getElementById('tanggal').innerText = currentDate;
        document.getElementById('biaya').innerText = randomCost.toLocaleString('id-ID');

        // Buat barcode menggunakan JsBarcode
        JsBarcode("#barcode", transactionNumber, {
            format: "CODE128", // format barcode yang digunakan
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: true
        });

        // Tampilkan tiket yang dihasilkan
        document.getElementById('ticket').style.display = "block";
    } else {
        alert('Masukkan nama Anda!');
    }
});
