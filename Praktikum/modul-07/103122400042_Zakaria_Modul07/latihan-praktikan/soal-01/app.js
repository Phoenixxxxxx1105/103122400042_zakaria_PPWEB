document.addEventListener("DOMContentLoaded", () => {
    const loadTimeEl = document.getElementById("loadTime");
    loadTimeEl.textContent = new Date().toLocaleTimeString('id-ID');

    let count = 0;
    const counterBtn = document.getElementById("counterBtn");
    const counterVal = document.getElementById("counterVal");
    counterBtn.addEventListener("click", () => {
        count++;
        counterVal.textContent = count;
    });

    const btnAnnounce = document.getElementById("loadAnnouncementBtn");
    const outAnnounce = document.getElementById("announcementOutput");
    const loaderAnnounce = document.getElementById("announcementLoader");

    btnAnnounce.addEventListener("click", () => {
        btnAnnounce.disabled = true;
        loaderAnnounce.style.display = "block";
        outAnnounce.innerHTML = "";
        outAnnounce.classList.remove("error");

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "pengumuman.txt", true);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                btnAnnounce.disabled = false;
                loaderAnnounce.style.display = "none";
                
                if (xhr.status === 200) {
                    outAnnounce.textContent = xhr.responseText;
                } else if (xhr.status === 404) {
                    outAnnounce.textContent = "Gagal memuat: File pengumuman tidak ditemukan (HTTP 404).";
                    outAnnounce.classList.add("error");
                } else {
                    outAnnounce.textContent = `Terjadi kesalahan. HTTP Status: ${xhr.status}`;
                    outAnnounce.classList.add("error");
                }
            }
        };

        xhr.onerror = function () {
            btnAnnounce.disabled = false;
            loaderAnnounce.style.display = "none";
            outAnnounce.textContent = "Gagal memuat: Gangguan jaringan atau server tidak merespons.";
            outAnnounce.classList.add("error");
        };

        xhr.send();
    });

    const btnUsers = document.getElementById("loadUsersBtn");
    const selectSource = document.getElementById("apiSource");
    const loaderUsers = document.getElementById("usersLoader");
    const resultUsers = document.getElementById("usersResult");
    const listUsers = document.getElementById("usersList");
    const metaUsers = document.getElementById("usersMeta");
    const errorUsers = document.getElementById("usersError");

    btnUsers.addEventListener("click", async () => {
        const sourceUrl = selectSource.value;
        const sourceName = selectSource.options[selectSource.selectedIndex].text;

        btnUsers.disabled = true;
        selectSource.disabled = true;
        loaderUsers.style.display = "block";
        resultUsers.style.display = "none";
        errorUsers.style.display = "none";
        listUsers.innerHTML = "";

        try {
            const response = await fetch(sourceUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            const maxData = data.slice(0, 3); // Maksimal 3 peserta

            metaUsers.textContent = `Sumber: ${sourceName} | Menampilkan: ${maxData.length} data`;
            
            maxData.forEach(user => {
                const li = document.createElement("li");
                li.className = "user-item";
                li.innerHTML = `<strong>${user.name}</strong><br><small>${user.email}</small>`;
                listUsers.appendChild(li);
            });

            resultUsers.style.display = "block";
        } catch (error) {
            errorUsers.textContent = `Gagal mengambil data peserta. Mohon periksa koneksi internet Anda atau gunakan Mock Lokal. Detail: ${error.message}`;
            errorUsers.style.display = "block";
        } finally {
            btnUsers.disabled = false;
            selectSource.disabled = false;
            loaderUsers.style.display = "none";
        }
    });
});