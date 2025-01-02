// State management untuk simulasi database
const state = {
    rooms: [
        { id: "R001", type: "Standar", price: 300000, facilities: "Wi-Fi Gratis, AC", image: "./img/images2.jpg" },
        { id: "R002", type: "Deluxe", price: 500000, facilities: "Wi-Fi Gratis, AC, TV Kabel", image: "./img/images3.jpg" },
        { id: "R003", type: "Family", price: 800000, facilities: "Wi-Fi Gratis, AC, TV Kabel, Mini Bar", image: "./img/images4.jpg" },
        { id: "R004", type: "Deluxe", price: 500000, facilities: "Wi-Fi Gratis, AC, TV Kabel", image: "./img/images5.jpg" },
        { id: "R005", type: "Family", price: 800000, facilities: "Wi-Fi Gratis, AC, TV Kabel, Mini Bar", image: "./img/images6.jpg" },
        { id: "R006", type: "Standar", price: 300000, facilities: "Wi-Fi Gratis, AC", image: "./img/images7.jpg" },
        { id: "R007", type: "Deluxe", price: 500000, facilities: "Wi-Fi Gratis, AC, TV Kabel", image: "./img/images2.jpg" },
        { id: "R005", type: "Family", price: 800000, facilities: "Wi-Fi Gratis, AC, TV Kabel, Mini Bar", image: "./img/images6.jpg" },
        { id: "R006", type: "Standar", price: 300000, facilities: "Wi-Fi Gratis, AC", image: "./img/images3.jpg" },
    ],
    facilities: [
        { id: "F001", name: "Kolam Renang", price: 50000, quota: "50 orang", image: "./img/images4.jpg" },
        { id: "F002", name: "Gym", price: 70000, quota: "20 orang", image: "./img/images5.jpg" },
        { id: "F003", name: "Spa", price: 100000, quota: "15 orang", image: "./img/images2.jpg" },
    ],
    bookings: [
        {
            idPemesan: 1,
            namaPemesan: "Adhitya",
            nomorIdentitas: "1234567890123456",
            jenisKelamin: "L",
            tipeKamar: "Deluxe",
            durasiMenginap: 3,
            totalBayar: "Rp3,000,000"
        },
        {
            idPemesan: 2,
            namaPemesan: "Fahri Karlitos",
            nomorIdentitas: "6543210987654321",
            jenisKelamin: "P",
            tipeKamar: "Family",
            durasiMenginap: 2,
            totalBayar: "Rp4,000,000"
        }
    ]
};
// State management tambahan untuk status admin login
let isAdminLoggedIn = false;

// Content untuk setiap pages
const content = {
    booking: `
        <h2>Form Pemesanan</h2>
        <form id="pemesananForm">
            <table>
                <tr>
                    <th colspan="2">
                        <h1>Form Pemesanan</h1>
                    </th>
                </tr>
                <tr>
                    <td>Id Pemesan</td>
                    <td><input type="number" name="id_pemesan" required></td>
                </tr>
                <tr>
                    <td>Nama Pemesan</td>
                    <td><input type="text" name="nama_pemesan" required></td>
                </tr>
                <tr>
                    <td>Nomor Identitas</td>
                    <td><input type="text" name="nomor_identitas" required maxlength="16" pattern="\\d{16}" title="Isian salah, harus 16 digit"></td>
                </tr>
                <tr>
                    <td>Jenis Kelamin</td>
                    <td class="radio-group">
                        <label><input type="radio" name="jenis_kelamin" value="L" required> Laki-laki</label>
                        <label><input type="radio" name="jenis_kelamin" value="P" required> Perempuan</label>
                    </td>
                </tr>
                <tr>
                    <td>Tipe Kamar</td>
                    <td>
                        <select name="tipe_kamar" id="tipe_kamar" required>
                            <option value="-">--Pilih--</option>
                            <option value="standar">STANDAR</option>
                            <option value="deluxe">DELUXE</option>
                            <option value="family">FAMILY</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Harga</td>
                    <td><input type="text" name="harga_kamar" id="harga_kamar" readonly></td>
                </tr>
                <tr>
                    <td>Tanggal Pesan</td>
                    <td><input type="date" name="tanggal_pesan" required></td>
                </tr>
                <tr>
                    <td>Durasi Menginap</td>
                    <td><input type="number" name="durasi_menginap" id="durasi_menginap" required min="1"> Hari</td>
                </tr>
                <tr>
                    <td>Termasuk Breakfast</td>
                    <td class="checkbox-group">
                        <label><input type="checkbox" name="breakfast" value="Ya"> Ya</label>
                        <label><input type="checkbox" name="breakfast" value="Tidak"> Tidak</label>
                    </td>
                </tr>
                <tr>
                    <td>Total Bayar</td>
                    <td><input type="text" name="total_bayar" id="total_bayar" readonly></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <button type="submit" class="btn-simpan">SIMPAN</button>
                        <button type="reset" class="btn-batal">Batal</button>
                    </td>
                </tr>
            </table>
        </form>
        <div id="resume" class="resume">
            <h2>Resume Pemesanan</h2>
            <p id="resumeDetails"></p>
        </div>
    `,
    admin: `<div class="admin-panel">
        <h2 class="text-center mb-4">Admin Panel</h2>
        <div class="row text-center">
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Kelola Kamar</h5>
                        <p class="card-text">Tambah, edit, atau hapus data kamar.</p>
                        <button class="btn btn-primary" onclick="navigate('rooms')">Kelola</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Kelola Fasilitas</h5>
                        <p class="card-text">Tambah, edit, atau hapus data fasilitas.</p>
                        <button class="btn btn-primary" onclick="navigate('facilities')">Kelola</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Lihat Pemesanan</h5>
                        <p class="card-text">Cek daftar pemesanan terbaru.</p>
                        <button class="btn btn-primary" onclick="navigate('viewBookings')">Lihat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    adminLogin: `
            <h2>Login Admin</h2>
            <form onsubmit="adminLogin(event)">
                <div class="form-group mb-3">
                    <label for="username">Username:</label>
                    <input type="text" class="form-control" id="username" required>
                </div>
                <div class="form-group mb-3">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
    `,
    viewBookings: `
            <h2>Data Pemesanan</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID Pemesan</th>
                        <th>Nama</th>
                        <th>Nomor Identitas</th>
                        <th>Jenis Kelamin</th>
                        <th>Tipe Kamar</th>
                        <th>Durasi</th>
                        <th>Total Bayar</th>
                    </tr>
                </thead>
                <tbody id="booking-list"></tbody>
            </table>
    `,

    addRoom: `<h2>Tambah Kamar</h2>
              <form onsubmit="addRoom(event)">
                <div class="form-group mb-3">
                    <label for="roomId">ID Kamar:</label>
                    <input type="text" class="form-control" id="roomId" required>
                </div>
                <div class="form-group mb-3">
                    <label for="roomType">Jenis Kamar:</label>
                    <input type="text" class="form-control" id="roomTypeInput" required>
                </div>
                <div class="form-group mb-3">
                    <label for="price">Harga:</label>
                    <input type="number" class="form-control" id="price" required>
                </div>
                <button type="submit" class="btn btn-primary">Tambah</button>
              </form>`,

    addFacility: `<h2>Tambah Fasilitas</h2>
                  <form onsubmit="addFacility(event)">
                    <div class="form-group mb-3">
                        <label for="facilityId">ID Fasilitas:</label>
                        <input type="text" class="form-control" id="facilityId" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="facilityName">Nama:</label>
                        <input type="text" class="form-control" id="facilityName" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="quota">Kuota:</label>
                        <input type="number" class="form-control" id="quota" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Tambah</button>
                  </form>`
};
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
})
// function routes untuk navigasi
function navigate(page) {
    document.getElementById('main-content').innerHTML = content[page] || '<h2>Halaman tidak ditemukan</h2>';
    if (page === 'homepage') renderHomePage();
    if (page === 'rooms') renderRooms();
    if (page === 'facilities') renderFacilities();
    if (page === 'booking') setupBookingForm();
    if (page === 'admin' && !isAdminLoggedIn) {
        navigate('adminLogin');
        adminLogin();
    }
    if (page === 'viewBookings') populateBookingTable();

}

// Setup booking form
function setupBookingForm() {
    const form = document.getElementById('pemesananForm');
    const tipeKamar = document.getElementById('tipe_kamar');
    const hargaKamar = document.getElementById('harga_kamar');
    const durasiMenginap = document.getElementById('durasi_menginap');
    const totalBayar = document.getElementById('total_bayar');
    const resume = document.getElementById('resume');
    const resumeDetails = document.getElementById('resumeDetails');

    const hargaPerTipeKamar = {
        standar: 300000,
        deluxe: 500000,
        family: 800000,
    };

    tipeKamar.addEventListener('change', () => {
        const tipe = tipeKamar.value;
        hargaKamar.value = hargaPerTipeKamar[tipe] || '';
        calculateTotal();
    });

    durasiMenginap.addEventListener('input', calculateTotal);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const idPemesan = state.bookings.length + 1;

        const booking = {
            idPemesan,
            namaPemesan: data.nama_pemesan,
            nomorIdentitas: data.nomor_identitas,
            jenisKelamin: data.jenis_kelamin,
            tipeKamar: data.tipe_kamar,
            durasiMenginap: parseInt(data.durasi_menginap, 10),
            totalBayar: `Rp${(parseInt(data.durasi_menginap, 10) * parseInt(hargaKamar.value, 10)).toLocaleString()}`
        };

        // Tambahkan ke state.bookings
        state.bookings.push(booking);

        const summary = `
        <b>ID Pemesan:</b> ${idPemesan}<br>
        <b>Nama Pemesan:</b> ${data.nama_pemesan}<br>
        <b>Nomor Identitas:</b> ${data.nomor_identitas}<br>
        <b>Jenis Kelamin:</b> ${data.jenis_kelamin}<br>
        <b>Tipe Kamar:</b> ${data.tipe_kamar}<br>
        <b>Harga Kamar:</b> ${hargaKamar.value}<br>
        <b>Tanggal Pesan:</b> ${data.tanggal_pesan}<br>
        <b>Durasi Menginap:</b> ${data.durasi_menginap} Hari<br>
        <b>Termasuk Breakfast:</b> ${data.breakfast || 'Tidak'}<br>
        <b>Total Bayar:</b> ${totalBayar.value}<br>
    `;

        resumeDetails.innerHTML = summary;
        resume.style.display = 'block';

        // Navigasi ke viewBookings langusn untuk menampilkan data (jika telah login sebagai admin)
        if (isAdminLoggedIn) {
            navigate('viewBookings');
        }
    });

    function calculateTotal() {
        const durasi = parseInt(durasiMenginap.value, 10) || 0;
        const harga = parseInt(hargaKamar.value, 10) || 0;
        totalBayar.value = durasi * harga;
    }
}

document.getElementById('pemesananForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const booking = {
        idPemesan: formData.get('id_pemesan'),
        namaPemesan: formData.get('nama_pemesan'),
        nomorIdentitas: formData.get('nomor_identitas'),
        jenisKelamin: formData.get('jenis_kelamin'),
        tipeKamar: formData.get('tipe_kamar'),
        durasiMenginap: formData.get('durasi_menginap'),
        totalBayar: formData.get('total_bayar'),
    };

    state.bookings.push(booking);
    alert('Data pemesanan berhasil disimpan!');
    event.target.reset();
});


// Fungsi login admin
function adminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        isAdminLoggedIn = true;
        alert('Login berhasil!');
        renderAdminPanel();
    } else {
        alert('Username atau password salah!');
    }
}

// Populate tabel pemesanan
function populateBookingTable() {
    const bookingList = document.getElementById('booking-list');
    bookingList.innerHTML = state.bookings.map(booking => `
    <tr>
        <td>${booking.idPemesan}</td>
        <td>${booking.namaPemesan}</td>
        <td>${booking.nomorIdentitas}</td>
        <td>${booking.jenisKelamin}</td>
        <td>${booking.tipeKamar}</td>
        <td>${booking.durasiMenginap} hari</td>
        <td>${booking.totalBayar}</td>
    </tr>
    `).join('');
}

// function render konten
function renderHomePage() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="ratio ratio-16x9 mb-3">
                    <iframe src="https://www.youtube.com/embed/5jsAsamJeWE" title="YouTube video player" allowfullscreen></iframe>
                </div>
                <div class="ratio ratio-16x9 mb-3">
                    <iframe src="https://www.youtube.com/embed/VohAVMNkZdY" title="YouTube video player" allowfullscreen></iframe>
                </div>
                <div class="ratio ratio-16x9 mb-3">
                    <iframe src="https://www.youtube.com/embed/PYUcvsmKg2I" title="YouTube video player" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row g-3">
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images2.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images2.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images5.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images4.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images5.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images6.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images5.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images4.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images6.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images2.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images5.jpg">
                    </div>
                    <div class="col-md-4">
                        <img class="w-100 h-100" src="./img/images4.jpg">
                    </div>
                </div>
            </div>
        </div>`
}

function renderRooms() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<h2>Jenis Kamar</h2>
        ${isAdminLoggedIn ? '<button class="btn btn-primary my-3" onclick="addRoomForm()">Tambah Kamar</button>' : ''}
        <div class="row">${state.rooms.map(room => `
            <div class="col-md-4 mb-4">
                <div class="card room-card">
                    <img src="${room.image}" class="card-img-top card-img" alt="${room.type}">
                    <div class="card-body">
                        <h5 class="card-title">${room.type}</h5>
                        <p class="card-text">Harga: Rp${room.price.toLocaleString()}</p>
                        <p class="card-text">Fasilitas: ${room.facilities}</p>
                        ${isAdminLoggedIn ? `
                        <button class="btn btn-warning" onclick="editRoom('${room.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteRoom('${room.id}')">Hapus</button>` : ''}
                    </div>
                </div>
            </div>
        `).join('')}</div>`;
}

function renderFacilities() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<h2>Fasilitas</h2>
        ${isAdminLoggedIn ? '<button class="btn btn-primary my-3" onclick="addFacilityForm()">Tambah Fasilitas</button>' : ''}
        <div class="row">${state.facilities.map(facility => `
            <div class="col-md-4 mb-4">
                <div class="card facility-card">
                    <img src="${facility.image}" class="card-img-top card-img" alt="${facility.name}">
                    <div class="card-body">
                        <h5 class="card-title">${facility.name}</h5>
                        <p class="card-text">Harga: Rp${facility.price.toLocaleString()}</p>
                        <p class="card-text">Kuota: ${facility.quota}</p>
                        ${isAdminLoggedIn ? `
                        <button class="btn btn-warning" onclick="editFacility('${facility.id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteFacility('${facility.id}')">Hapus</button>` : ''}
                    </div>
                </div>
            </div>
        `).join('')}</div>`;
}

// validasi otoritas admin
function adminOnly(action) {
    if (!isAdminLoggedIn) {
        alert('Akses ditolak! Hanya admin yang dapat melakukan tindakan ini.');
        return false;
    }
    return true;
}
function renderAdminPanel() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<div class="admin-panel">
        <h2 class="text-center mb-4">Admin Panel</h2>
        <div class="row text-center">
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Kelola Kamar</h5>
                        <p class="card-text">Tambah, edit, atau hapus data kamar.</p>
                        <button class="btn btn-primary" onclick="navigate('rooms')">Kelola</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Kelola Fasilitas</h5>
                        <p class="card-text">Tambah, edit, atau hapus data fasilitas.</p>
                        <button class="btn btn-primary" onclick="navigate('facilities')">Kelola</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card admin-card">
                    <div class="card-body">
                        <h5 class="card-title">Lihat Pemesanan</h5>
                        <p class="card-text">Cek daftar pemesanan terbaru.</p>
                        <button class="btn btn-primary" onclick="navigate('viewBookings')">Lihat</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// Fungsionalits CRUD
// tambah data kamar
function addRoomForm() {
    document.getElementById('main-content').innerHTML = `
        <h2>Tambah Kamar</h2>
        <form id="addRoomForm">
            <div class="form-group mb-3">
                <label for="roomId">ID Kamar:</label>
                <input type="text" class="form-control" id="roomId" required>
            </div>
            <div class="form-group mb-3">
                <label for="roomType">Jenis Kamar:</label>
                <input type="text" class="form-control" id="roomType" required>
            </div>
            <div class="form-group mb-3">
                <label for="roomPrice">Harga:</label>
                <input type="number" class="form-control" id="roomPrice" required>
            </div>
            <div class="form-group mb-3">
                <label for="roomFacilities">Fasilitas:</label>
                <input type="text" class="form-control" id="roomFacilities" required placeholder="Contoh: Wi-Fi Gratis, AC">
            </div>
            <div class="form-group mb-3">
                <label for="roomImage">Gambar (URL):</label>
                <input type="text" class="form-control" id="roomImage" required>
            </div>
            <button type="submit" class="btn btn-primary">Tambah</button>
        </form>
    `;

    document.getElementById('addRoomForm').addEventListener('submit', (event) => {
        event.preventDefault();
        submitAddRoom();
    });
}

function submitAddRoom() {
    const id = document.getElementById('roomId').value.trim();
    const type = document.getElementById('roomType').value.trim();
    const price = parseInt(document.getElementById('roomPrice').value, 10);
    const facilities = document.getElementById('roomFacilities').value.trim();
    const image = document.getElementById('roomImage').value.trim();

    if (state.rooms.some(room => room.id === id)) {
        alert('ID Kamar sudah ada. Gunakan ID yang berbeda.');
        return;
    }

    state.rooms.push({ id, type, price, facilities, image });
    alert('Kamar berhasil ditambahkan!');
    renderRooms();
}

function deleteRoom(id) {
    state.rooms = state.rooms.filter(room => room.id !== id);
    renderRooms();
}

// tambah data fasilitas
function addFacilityForm() {
    document.getElementById('main-content').innerHTML = `
        <h2>Tambah Fasilitas</h2>
        <form id="addFacilityForm">
            <div class="form-group mb-3">
                <label for="facilityId">ID Fasilitas:</label>
                <input type="text" class="form-control" id="facilityId" required>
            </div>
            <div class="form-group mb-3">
                <label for="facilityName">Nama Fasilitas:</label>
                <input type="text" class="form-control" id="facilityName" required>
            </div>
            <div class="form-group mb-3">
                <label for="facilityPrice">Harga:</label>
                <input type="number" class="form-control" id="facilityPrice" required>
            </div>
            <div class="form-group mb-3">
                <label for="facilityQuota">Kuota:</label>
                <input type="text" class="form-control" id="facilityQuota" required placeholder="Contoh: 50 orang">
            </div>
            <div class="form-group mb-3">
                <label for="facilityImage">Gambar (URL):</label>
                <input type="text" class="form-control" id="facilityImage" required>
            </div>
            <button type="submit" class="btn btn-primary">Tambah</button>
        </form>
    `;

    document.getElementById('addFacilityForm').addEventListener('submit', (event) => {
        event.preventDefault();
        submitAddFacility();
    });
}

function submitAddFacility() {
    const id = document.getElementById('facilityId').value.trim();
    const name = document.getElementById('facilityName').value.trim();
    const price = parseInt(document.getElementById('facilityPrice').value, 10);
    const quota = document.getElementById('facilityQuota').value.trim();
    const image = document.getElementById('facilityImage').value.trim();

    if (state.facilities.some(facility => facility.id === id)) {
        alert('ID Fasilitas sudah ada. Gunakan ID yang berbeda.');
        return;
    }

    state.facilities.push({ id, name, price, quota, image });
    alert('Fasilitas berhasil ditambahkan!');
    renderFacilities();
}

function deleteFacility(id) {
    state.facilities = state.facilities.filter(facility => facility.id !== id);
    renderFacilities();
}

// edit data kamar
function editRoomForm(room) {
    return `
        <h2>Edit Kamar</h2>
        <form onsubmit="submitEditRoom(event, '${room.id}')">
            <div class="form-group mb-3">
                <label for="editRoomType">Jenis Kamar:</label>
                <input type="text" class="form-control" id="editRoomType" value="${room.type}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editRoomPrice">Harga:</label>
                <input type="number" class="form-control" id="editRoomPrice" value="${room.price}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editRoomFacilities">Fasilitas:</label>
                <input type="text" class="form-control" id="editRoomFacilities" value="${room.facilities}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editRoomImage">Gambar:</label>
                <input type="text" class="form-control" id="editRoomImage" value="${room.image}" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
    `;
}

function editRoom(id) {
    const room = state.rooms.find(r => r.id === id);
    if (room) {
        document.getElementById('main-content').innerHTML = editRoomForm(room);
    }
}

function submitEditRoom(event, id) {
    event.preventDefault();
    const room = state.rooms.find(r => r.id === id);
    if (room) {
        room.type = document.getElementById('editRoomType').value;
        room.price = parseInt(document.getElementById('editRoomPrice').value, 10);
        room.facilities = document.getElementById('editRoomFacilities').value;
        room.image = document.getElementById('editRoomImage').value;
        alert('Data kamar berhasil diperbarui!');
        navigate('rooms');
    }
}

// edit data fasilitas
function editFacilityForm(facility) {
    return `
        <h2>Edit Fasilitas</h2>
        <form onsubmit="submitEditFacility(event, '${facility.id}')">
            <div class="form-group mb-3">
                <label for="editFacilityName">Nama Fasilitas:</label>
                <input type="text" class="form-control" id="editFacilityName" value="${facility.name}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editFacilityPrice">Harga:</label>
                <input type="number" class="form-control" id="editFacilityPrice" value="${facility.price}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editFacilityQuota">Kuota:</label>
                <input type="text" class="form-control" id="editFacilityQuota" value="${facility.quota}" required>
            </div>
            <div class="form-group mb-3">
                <label for="editFacilityImage">Gambar:</label>
                <input type="text" class="form-control" id="editFacilityImage" value="${facility.image}" required>
            </div>
            <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
    `;
}

function editFacility(id) {
    const facility = state.facilities.find(f => f.id === id);
    if (facility) {
        document.getElementById('main-content').innerHTML = editFacilityForm(facility);
    }
}

function submitEditFacility(event, id) {
    event.preventDefault();
    const facility = state.facilities.find(f => f.id === id);
    if (facility) {
        facility.name = document.getElementById('editFacilityName').value;
        facility.price = parseInt(document.getElementById('editFacilityPrice').value, 10);
        facility.quota = document.getElementById('editFacilityQuota').value;
        facility.image = document.getElementById('editFacilityImage').value;
        alert('Data fasilitas berhasil diperbarui!');
        navigate('facilities');
    }
}