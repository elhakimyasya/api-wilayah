# 🇮🇩 API Wilayah

Proyek API Wilayah menyediakan API Statis buat ngambil data wilayah di Indonesia, termasuk Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa.

## 🚀 Akses API

Berikut ini adalah endpoint API yang tersedia dan cara ngaksesnya:

### 1. Tingkat & Pencarian Provinsi

#### Tingkat

Endpoint: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31`

#### Pencarian

Endpoint: `https://elc-api-wilayah.vercel.app/api/31?q=<NAMA_KABUPATEN_KOTA>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31?q=Jakarta%20Selatan`

### 2. Tingkat & Pencarian Kabupaten/Kota

#### Tingkat

Endpoint: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74`

#### Pencarian

Endpoint: `https://elc-api-wilayah.vercel.app/api/31/74?q=<NAMA_KECAMATAN>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74?q=Tebet`

### 3. Tingkat & Pencarian Kecamatan

#### Tingkat

Endpoint: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>/<ID_KECAMATAN>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74/01`

#### Pencarian

Endpoint: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=<NAMA_KELURAHAN>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan`

### 4. Tingkat & Pencarian Kelurahan

#### Tingkat

Endpoint: `https://elc-api-wilayah.vercel.app/api/<ID_PROVINSI>/<ID_KABUPATEN_KOTA>/<ID_KECAMATAN>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74/01`

#### Pencarian

Endpoint: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=<NAMA_KELURAHAN>`
Contoh: `https://elc-api-wilayah.vercel.app/api/31/74/01?q=Manggarai%20Selatan`

## 📖 Cara Penggunaan

Buat pake API ini, kalian bisa kirim permintaan HTTP GET ke endpoint yang tersedia dengan parameter pencarian yang sesuai. Contohnya, buat nyari provinsi dengan nama "Jawa Barat":

```sh
curl -X GET "https://elc-api-wilayah.vercel.app/api?q=Jawa%20Barat"
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
