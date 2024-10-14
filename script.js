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
        alert('Pastikan semua data sudah diisi dengan benar!');
    }
});
