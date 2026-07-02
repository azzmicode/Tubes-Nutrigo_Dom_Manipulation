const menuData = [
    { id: 1, nama: "Nasi Putih", kategori: "Makanan Pokok", kalori: 180, harga: 5000, img: "foods/Nasi Putih.png" },
    { id: 2, nama: "Nasi Goreng Spesial", kategori: "Makanan Pokok", kalori: 450, harga: 18000, img: "foods/Nasi Goreng Spesial.png" },
    { id: 3, nama: "Mie Goreng Jawa", kategori: "Makanan Pokok", kalori: 380, harga: 16000, img: "foods/Mie Goreng Jawa.png" },
    { id: 4, nama: "Spaghetti Aglio Olio", kategori: "Makanan Pokok", kalori: 420, harga: 28000, img: "foods/Spaghetti Aglio Olio.png" },
    { id: 5, nama: "Kentang Panggang", kategori: "Makanan Pokok", kalori: 220, harga: 15000, img: "foods/Kentang Panggang.png" },
    { id: 6, nama: "Roti Gandum (2 lembar)", kategori: "Makanan Pokok", kalori: 160, harga: 8000, img: "foods/Roti Gandum.png" },
    { id: 7, nama: "Ayam Goreng Tepung", kategori: "Lauk-Pauk", kalori: 300, harga: 17000, img: "foods/Ayam Goreng Tepung.png" },
    { id: 8, nama: "Ayam Bakar Madu", kategori: "Lauk-Pauk", kalori: 280, harga: 20000, img: "foods/Ayam Bakar Madu.png" },
    { id: 9, nama: "Rendang Daging Sapi", kategori: "Lauk-Pauk", kalori: 380, harga: 32000, img: "foods/Rendang Daging Sapi.png" },
    { id: 10, nama: "Tempe Orek", kategori: "Lauk-Pauk", kalori: 150, harga: 8000, img: "foods/Tempe Orek.png" },
    { id: 11, nama: "Tahu Goreng", kategori: "Lauk-Pauk", kalori: 120, harga: 6000, img: "foods/Tahu Goreng.png" },
    { id: 12, nama: "Ikan Nila Bakar", kategori: "Lauk-Pauk", kalori: 250, harga: 22000, img: "foods/Ikan Nila Bakar.png" },
    { id: 13, nama: "Telur Dadar", kategori: "Lauk-Pauk", kalori: 190, harga: 7000, img: "foods/Telur Dadar.png" },
    { id: 14, nama: "Beef Steak Sirloin", kategori: "Lauk-Pauk", kalori: 420, harga: 45000, img: "foods/Beef Steak Sirloin.png" },
    { id: 15, nama: "Tumis Kangkung", kategori: "Sayur", kalori: 90, harga: 9000, img: "foods/Tumis Kangkung.png" },
    { id: 16, nama: "Sayur Asem", kategori: "Sayur", kalori: 70, harga: 8000, img: "foods/Sayur Asem.png" },
    { id: 17, nama: "Capcay Kuah", kategori: "Sayur", kalori: 110, harga: 13000, img: "foods/Capcay Kuah.png" },
    { id: 18, nama: "Salad Sayur Segar", kategori: "Sayur", kalori: 80, harga: 14000, img: "foods/Salad Sayur Segar.png" },
    { id: 19, nama: "Gado-Gado", kategori: "Sayur", kalori: 280, harga: 16000, img: "foods/Gado-Gado.png" },
    { id: 20, nama: "Pisang (1 buah)", kategori: "Buah", kalori: 105, harga: 5000, img: "foods/Pisang.png" },
    { id: 21, nama: "Apel Fuji (1 buah)", kategori: "Buah", kalori: 95, harga: 7000, img: "foods/Apel Fuji.png" },
    { id: 22, nama: "Semangka (1 potong)", kategori: "Buah", kalori: 60, harga: 6000, img: "foods/Semangka.png" },
    { id: 23, nama: "Fruit Salad Cup", kategori: "Buah", kalori: 140, harga: 17000, img: "foods/Fruit Salad Cup.png" },
    { id: 24, nama: "Es Teh Manis", kategori: "Minuman", kalori: 90, harga: 5000, img: "foods/Es Teh Manis.png" },
    { id: 25, nama: "Air Mineral 600ml", kategori: "Minuman", kalori: 0, harga: 4000, img: "foods/Air Mineral 600ml.png" },
    { id: 26, nama: "Jus Alpukat", kategori: "Minuman", kalori: 230, harga: 18000, img: "foods/Jus Alpukat.png" }
];

let selectedMenu = [];

const tableBody = document.getElementById("menuTableBody");
const emptyState = document.getElementById("emptyState");
const resultContent = document.getElementById("resultContent");
const imageStack = document.getElementById("imageStack");

const totalKaloriEl = document.getElementById("totalKalori");
const totalHargaEl = document.getElementById("totalHarga");

const cekPokok = document.getElementById("cekPokok");
const cekLauk = document.getElementById("cekLauk");
const cekSayur = document.getElementById("cekSayur");
const cekBuah = document.getElementById("cekBuah");
const cekMinuman = document.getElementById("cekMinuman");
const badge = document.getElementById("badge");

function renderTable() {
    menuData.forEach((menu) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${menu.img}" class="food-img" alt="${menu.nama}" onerror="this.src='https://via.placeholder.com/70x70?text=No+Image'"></td>
            <td>${menu.nama}</td>
            <td>${menu.kategori}</td>
            <td>${menu.kalori} kkal</td>
            <td>Rp ${menu.harga.toLocaleString('id-ID')}</td>
            <td>
                <input type="checkbox" value="${menu.id}" onchange="handleSelection(this)">
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function handleSelection(checkbox) {
    const menuId = parseInt(checkbox.value);
    const menuObj = menuData.find(item => item.id === menuId);

    if (checkbox.checked) {
        selectedMenu.push(menuObj);
    } else {
        selectedMenu = selectedMenu.filter(item => item.id !== menuId);
    }
    
    updatePlanner();
}

function updatePlanner() {
    if (selectedMenu.length === 0) {
        emptyState.style.display = "block";
        resultContent.style.display = "none";
        return;
    } else {
        emptyState.style.display = "none";
        resultContent.style.display = "block";
    }

    const totalKalori = selectedMenu.reduce((sum, item) => sum + item.kalori, 0);
    const totalHarga = selectedMenu.reduce((sum, item) => sum + item.harga, 0);

    totalKaloriEl.textContent = totalKalori + " kkal";
    totalHargaEl.textContent = "Rp " + totalHarga.toLocaleString("id-ID");

    imageStack.innerHTML = "";
    selectedMenu.forEach(item => {
        const img = document.createElement("img");
        img.src = item.img;
        img.classList.add("stack-img");
        // Fallback jika gambar lokal belum ada
        img.onerror = () => { img.src = "https://via.placeholder.com/50x50?text=Img"; };
        imageStack.appendChild(img);
    });

    const categories = selectedMenu.map(item => item.kategori);
    const hasPokok = categories.includes("Makanan Pokok");
    const hasLauk = categories.includes("Lauk-Pauk");
    const hasSayur = categories.includes("Sayur");
    const hasBuah = categories.includes("Buah");
    const hasMinuman = categories.includes("Minuman");

    cekPokok.textContent = (hasPokok ? "✅ " : "❌ ") + "Makanan Pokok";
    cekLauk.textContent = (hasLauk ? "✅ " : "❌ ") + "Lauk-Pauk";
    cekSayur.textContent = (hasSayur ? "✅ " : "❌ ") + "Sayur";
    cekBuah.textContent = (hasBuah ? "✅ " : "❌ ") + "Buah";
    cekMinuman.textContent = (hasMinuman ? "✅ " : "❌ ") + "Minuman";

    if (hasPokok && hasLauk && hasSayur && hasBuah && hasMinuman) {
        badge.textContent = "🎉 Menu Seimbang!";
        badge.classList.remove("warning");
    } else {
        badge.textContent = "⚠️ Belum Lengkap";
        badge.classList.add("warning");
    }
}

renderTable();