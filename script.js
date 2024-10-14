document.getElementById('generate-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (name.trim() === "") {
        alert("Masukkan nama!");
        return;
    }
    generateTicket(name);
});

// Tombol untuk Generate Tiket Otomatis
document.getElementById('auto-generate-btn').addEventListener('click', function() {
    const numTickets = parseInt(document.getElementById('num-tickets').value);
    const timer = parseInt(document.getElementById('timer').value) * 1000; // Convert to milliseconds

    if (numTickets > 0 && timer > 0) {
        let ticketCount = 0;

        // Fungsi untuk generate tiket secara otomatis
        const interval = setInterval(function() {
            if (ticketCount < numTickets) {
                const randomName = getRandomName(); // Ambil nama acak
                generateTicket(randomName);
                ticketCount++;
            } else {
                clearInterval(interval); // Stop setelah jumlah tiket tercapai
            }
        }, timer);
    } else {
        alert('Masukkan jumlah tiket dan timer yang valid!');
    }
});

// Fungsi untuk generate tiket
function generateTicket(userName) {
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

    // Buat elemen tiket baru
    var ticketDiv = document.createElement('div');
    ticketDiv.classList.add('ticket');
    ticketDiv.innerHTML = `
        <h2>Trans Jateng</h2>
        <p>Simpan Tiket Selama Perjalanan</p>
        <p>Titik Kumpul: <span>SKR</span></p>
        <p>Nama: <span>${userName}</span></p>
        <p>Tujuan: <span>LABUAN BAJO</span></p>
        <p>Transaksi: <span>${transactionNumber}</span></p>
        <p>Biaya: Rp <span>${randomCost.toLocaleString('id-ID')}</span>,-</p>
        <p>Tanggal: <span>${currentDate}</span></p>
        <svg id="barcode-${transactionNumber}"></svg> <!-- Tempat menampilkan barcode -->
    `;
    
    // Tampilkan tiket yang dihasilkan
    const ticketDisplay = document.getElementById('ticket-display');
    ticketDisplay.innerHTML = ""; // Kosongkan tiket sebelumnya
    ticketDisplay.appendChild(ticketDiv); // Menambahkan tiket ke dalam div tiket
    ticketDisplay.style.display = "block";

    // Buat barcode menggunakan JsBarcode
    JsBarcode(`#barcode-${transactionNumber}`, transactionNumber, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: true
    });
}

// Fungsi untuk mendapatkan nama acak
function getRandomName() {
    const names = ["Dwi", "Andi", "Siti", "Budi", "Rina", "Eko", "Fitri", "Nina", "Agus", "Wati"];
    return names[Math.floor(Math.random() * names.length)];
}
