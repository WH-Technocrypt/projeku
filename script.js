document.getElementById('generate-btn').addEventListener('click', function() {
    var transactionNumber = document.getElementById('transaction-number').value;
    var transactionType = document.getElementById('transaction-type').value;
    var transactionDate = document.getElementById('transaction-date').value;

    // Jika semua field terisi
    if (transactionNumber && transactionType && transactionDate) {
        // Menampilkan informasi tiket
        document.getElementById('transaksi').innerText = transactionNumber;
        document.getElementById('jenis').innerText = transactionType;
        document.getElementById('tanggal').innerText = transactionDate;

        // Membuat barcode (sederhana) dari nomor transaksi
        var barcode = "TRX-" + transactionNumber.slice(-4) + Math.floor(Math.random() * 1000);
        document.getElementById('barcode').innerText = barcode;

        // Tampilkan tiket
        document.getElementById('ticket').style.display = "block";
    } else {
        alert('Pastikan semua data sudah diisi dengan benar!');
    }
});
