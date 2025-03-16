# 🇮🇩 API Wilayah

Proyek **API Wilayah** menyediakan API statis untuk mengambil data wilayah di Indonesia, termasuk **Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa**.

---

## 🚀 Akses API

Berikut adalah endpoint API yang tersedia dan cara penggunaannya:

### 1️⃣ Pencarian & Akses Data Provinsi

- **Tingkat**: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31`](https://elc-api-wilayah.vercel.app/api/31)
- **Pencarian**: `https://elc-api-wilayah.vercel.app/api/31?q=<NAMA_KABUPATEN_KOTA>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31?q=Jakarta%20Selatan`](https://elc-api-wilayah.vercel.app/api/31?q=Jakarta%20Selatan)

### 2️⃣ Pencarian & Akses Data Kabupaten/Kota

- **Tingkat**: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74`](https://elc-api-wilayah.vercel.app/api/31/74)
- **Pencarian**: `https://elc-api-wilayah.vercel.app/api/31/74?q=<NAMA_KECAMATAN>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74?q=Tebet`](https://elc-api-wilayah.vercel.app/api/31/74?q=Tebet)

### 3️⃣ Pencarian & Akses Data Kecamatan

- **Tingkat**: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>/<ID_KECAMATAN>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74/01`](https://elc-api-wilayah.vercel.app/api/31/74/01)
- **Pencarian**: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=<NAMA_KELURAHAN>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan`](https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan)

### 4️⃣ Pencarian & Akses Data Kelurahan

- **Tingkat**: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>/<ID_KECAMATAN>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74/01`](https://elc-api-wilayah.vercel.app/api/31/74/01)
- **Pencarian**: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=<NAMA_KELURAHAN>`  
  **Contoh**: [`https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan`](https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan)

---

## 📖 Cara Penggunaan

Gunakan permintaan HTTP **GET** untuk mengambil data wilayah berdasarkan **nama atau ID**.

**Contoh: Mencari Provinsi "Jawa Barat"**
```sh
curl -X GET "https://elc-api-wilayah.vercel.app/api?q=Jawa%20Barat"
```

**Contoh Respon:**
```json
[
    {
        "id": "1",
        "nama": "Jawa Barat"
    },
    {
        "id": "2",
        "nama": "Jawa Tengah"
    }
]
```

---

## 🛠️ Instalasi Lokal

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repository:
    ```sh
    git clone https://github.com/elhakimyasya/api-wilayah.git
    ```
2. Masuk ke direktori proyek:
    ```sh
    cd api-wilayah
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Jalankan server:
    ```sh
    npm start
    ```

---

## 📂 Akses Data Wilayah (CSV)

Dataset wilayah tersedia dalam format **CSV**, yang dapat diakses di folder `/data`:

- **Provinsi**: [`provinsi.csv`](data/provinsi.csv)
- **Kabupaten/Kota**: [`kabupaten.csv`](data/kabupaten.csv)
- **Kecamatan**: [`kecamatan.csv`](data/kecamatan.csv)
- **Kelurahan**: [`kelurahan.csv`](data/kelurahan.csv)

Silakan edit atau gunakan dataset ini sesuai kebutuhan.

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Jika ingin berkontribusi, ikuti langkah-langkah berikut:

1. **Fork repo ini** ke akun GitHub kalian.
2. **Buat branch baru** untuk perubahan:
   ```sh
   git checkout -b fitur-baru
   ```
3. **Lakukan perubahan dan commit**:
   ```sh
   git commit -m "Menambahkan fitur baru"
   ```
4. **Push ke repository kalian**:
   ```sh
   git push origin fitur-baru
   ```
5. **Buat Pull Request (PR)** ke repository utama.

Harap pastikan perubahan yang diajukan sudah diuji dengan baik sebelum membuat PR. ✨

---

## 💖 Donasi

Jika proyek ini bermanfaat, dukung dengan berdonasi:

[Donasi via Saweria](https://saweria.co/yasyaelhakim)

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk informasi lebih lanjut.

