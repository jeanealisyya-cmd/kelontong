let keranjang = [];

// Format harga ke Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(angka);
}

// Tambah produk ke keranjang
function tambahKeKeranjang(nama, harga) {
    const produk = keranjang.find(item => item.nama === nama);

    if (produk) {
        produk.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
}

// Kurangi jumlah produk
function kurangiProduk(index) {
    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

// Tambah jumlah produk
function tambahProduk(index) {
    keranjang[index].jumlah++;
    tampilkanKeranjang();
}

// Hapus produk
function hapusProduk(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

// Tampilkan isi keranjang
function tampilkanKeranjang() {
    const daftarKeranjang = document.getElementById("daftarKeranjang");
    const totalHarga = document.getElementById("totalHarga");
    const jumlahKeranjang = document.getElementById("jumlahKeranjang");

    daftarKeranjang.innerHTML = "";

    let total = 0;
    let jumlah = 0;

    keranjang.forEach((item, index) => {
        const subtotal = item.harga * item.jumlah;

        total += subtotal;
        jumlah += item.jumlah;

        daftarKeranjang.innerHTML += `
            <div class="item-keranjang">
                <div>
                    <strong>${item.nama}</strong>
                    <p>${formatRupiah(item.harga)}</p>
                </div>

                <div class="kontrol-jumlah">
                    <button onclick="kurangiProduk(${index})">−</button>
                    <span>${item.jumlah}</span>
                    <button onclick="tambahProduk(${index})">+</button>
                </div>

                <strong>${formatRupiah(subtotal)}</strong>

                <button onclick="hapusProduk(${index})">
                    🗑️
                </button>
            </div>
        `;
    });

    totalHarga.innerText = formatRupiah(total);
    jumlahKeranjang.innerText = jumlah;
}

// Buka keranjang
function bukaKeranjang() {
    document.getElementById("modalKeranjang").style.display = "flex";
    tampilkanKeranjang();
}

// Tutup keranjang
function tutupKeranjang() {
    document.getElementById("modalKeranjang").style.display = "none";
}

// Checkout WhatsApp
function checkoutWhatsApp() {

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let pesan = "Halo, saya ingin membeli:%0A%0A";
    let total = 0;

    keranjang.forEach(item => {

        const subtotal = item.harga * item.jumlah;

        pesan += `- ${item.nama} x${item.jumlah} = ${formatRupiah(subtotal)}%0A`;

        total += subtotal;
    });

    pesan += `%0ATotal: ${formatRupiah(total)}`;
    pesan += `%0A%0ATerima kasih.`;

    const nomorWhatsApp = "6281234567890";

    window.open(
        `https://wa.me/${nomorWhatsApp}?text=${pesan}`,
        "_blank"
    );
}

function pilihKategori(kategori) {
    const semuaProduk = document.querySelectorAll(".produk-item");
    let jumlahTampil = 0;

    semuaProduk.forEach(produk => {
        const kategoriProduk = produk.getAttribute("data-kategori");

        if (kategoriProduk === kategori) {
            produk.style.display = "";
            jumlahTampil++;
        } else {
            produk.style.display = "none";
        }
    });

    console.log("Kategori:", kategori);
    console.log("Jumlah produk ditemukan:", jumlahTampil);

    if (jumlahTampil === 0) {
        alert("Produk tidak ditemukan di kategori ini. Periksa data-kategori pada HTML.");
    }

    const bagianProduk = document.getElementById("produk");
    if (bagianProduk) {
        bagianProduk.scrollIntoView({ behavior: "smooth" });
    }
}

