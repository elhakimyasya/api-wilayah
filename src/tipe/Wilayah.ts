export interface Provinsi {
    id: number | null;
    name: string;

    [key: string]: string | number | null; // Index signature
}

export interface Kabupaten {
    id: number | null;
    id_provinsi: number | null;
    nama: string;

    [key: string]: string | number | null; // Index signature
}

export interface Kecamatan {
    id: number | null;
    id_provinsi: number | null;
    id_kabupaten: number | null;
    nama: string;

    [key: string]: string | number | null; // Index signature
}

export interface Kelurahan {
    id: number | null;
    id_provinsi: number | null;
    id_kabupaten: number | null;
    id_kecamatan: number | null;
    nama: string;

    [key: string]: string | number | null; // Index signature
}