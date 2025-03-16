# 🇮🇩 API Wilayah

Proyek API Wilayah menyediakan API buat ngambil data wilayah di Indonesia, termasuk Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan. Kalian bisa cari data wilayah berdasarkan nama.

## 🚀 Akses API

Berikut ini adalah endpoint API yang tersedia dan cara ngaksesnya:

### 🏞️ 1. Pencarian Provinsi

Endpoint: `GET https://api-wilayah-neon.vercel.app/api?q=<NAMA_PROVINSI>`

### 🏙️ 2. Pencarian Kabupaten

Endpoint: `GET https://api-wilayah-neon.vercel.app/api/<ID_PROVINSI>?q=<NAMA_KABUPATEN>`

### 🌆 3. Pencarian Kecamatan

Endpoint: `GET https://api-wilayah-neon.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN>?q=<NAMA_KECAMATAN>`

### 🏡 4. Pencarian Kelurahan

Endpoint: `GET https://api-wilayah-neon.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN>/<ID_KECAMATAN>?q=<NAMA_KELURAHAN>`

## 📖 Cara Penggunaan

Buat pake API ini, kalian bisa kirim permintaan HTTP GET ke endpoint yang tersedia dengan parameter pencarian yang sesuai. Contohnya, buat nyari provinsi dengan nama "Jawa Barat":

```sh
curl -X GET "https://api-wilayah-neon.vercel.app/api?q=Jawa%20Barat"
```

## 📨 Contoh Respon

Berikut ini contoh respon buat pencarian provinsi:

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

## 🛠️ Instalasi

Buat jalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repo ini:
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

## 🤝 Kontribusi

Kalau kalian mau kontribusi ke proyek ini, silakan fork repo ini dan buat pull request dengan perubahan yang kalian usulkan.

## 💖 Donasi

Kalau kalian mau dukung proyek ini, kalian bisa donasi lewat link berikut:

[Donasi di Saweria](https://saweria.co/yasyaelhakim)

## 📜 Lisensi

Proyek ini dilisensikan di bawah lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.
