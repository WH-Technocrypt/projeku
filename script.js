document.getElementById('generate-btn').addEventListener('click', function() {
    var transactionNumber = document.getElementById('transaction-number').value;
    
    if (transactionNumber) {
        // Menampilkan gambar tiket yang disesuaikan
        var ticketImage = document.getElementById('ticket-image');
        
        // Ganti path di sini dengan path gambar tiket yang benar
        ticketImage.src = "path_ke_gambar_tiket.png"; // Ganti dengan path yang sesuai
        
        ticketImage.style.display = "block";
    } else {
        alert('Masukkan nomor transaksi terlebih dahulu!');
    }
});
