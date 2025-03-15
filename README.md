# API Wilayah

Proyek API Wilayah menyediakan API untuk mendapatkan data wilayah di Indonesia, termasuk Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan. Anda dapat melakukan pencarian berdasarkan nama wilayah menggunakan parameter `search`.

## Akses API

Berikut adalah endpoint API yang tersedia beserta cara mengaksesnya:

### 1. Pencarian Provinsi

Endpoint: `GET /api?search=<NAMA_PROVINSI>`

### 2. Pencarian Kabupaten

Endpoint: `GET /api/<ID_PROVINSI>?search=<NAMA_KABUPATEN>`

### 3. Pencarian Kecamatan

Endpoint: `GET /api/<ID_PROVINSI>/<ID_KABUPATEN>?search=<NAMA_KECAMATAN>`

### 4. Pencarian Kelurahan

Endpoint: `GET /api/<ID_PROVINSI>/<ID_KABUPATEN>/<ID_KECAMATAN>?search=<NAMA_KELURAHAN>`

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repository ini dan buat pull request dengan perubahan yang Anda usulkan.
