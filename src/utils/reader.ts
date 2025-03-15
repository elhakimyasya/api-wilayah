import fs from 'fs';
import path from 'path';
import papaparse from 'papaparse';

type CSVRow = Record<string, string | number | null>;

export function readCSV<T extends CSVRow>(fileName: string): T[] {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data } = papaparse.parse<Record<string, string>>(fileContent, {
        header: true,
        skipEmptyLines: true
    });

    return data.map((row) => {
        const objects: CSVRow = {};

        Object.entries(row).forEach(([key, value]) => {
            const formattedKey = key.trim().toLowerCase();

            if (formattedKey.includes('id')) {
                objects[formattedKey] = Number(value.trim()) || null;
            } else {
                objects[formattedKey] = value.trim();
            }
        });

        return objects as T;
    });
}

interface FullMapping {
    provinsi: Record<number, string>;
    kabupaten: Record<number, Record<number, string>>;
    kecamatan: Record<number, Record<number, Record<number, string>>>;
    kelurahan: Record<number, Record<number, Record<number, Record<number, string>>>>;
}

export function mappingWilayah(): FullMapping {
    const dataProvinsi = readCSV<{ id: number; nama: string }>('provinsi.csv');
    const dataKabupaten = readCSV<{ id: number; id_provinsi: number; nama: string; tipe: string }>('kabupaten.csv');
    const dataKecamatan = readCSV<{ id: number; id_provinsi: number; id_kabupaten: number; nama: string }>('kecamatan.csv');
    const dataKelurahan = readCSV<{ id: number; id_provinsi: number; id_kabupaten: number; id_kecamatan: number; nama: string }>('kelurahan.csv');

    const mappingProvinsi: Record<number, string> = {};
    const mappingKabupaten: Record<number, Record<number, string>> = {};
    const mappingKecamatan: Record<number, Record<number, Record<number, string>>> = {};
    const mappingKelurahan: Record<number, Record<number, Record<number, Record<number, string>>>> = {};

    dataProvinsi.forEach((region) => {
        mappingProvinsi[region.id] = 'Provinsi ' + region.nama;
    });

    dataKabupaten.forEach((region) => {
        if (!mappingKabupaten[region.id_provinsi]) {
            mappingKabupaten[region.id_provinsi] = {};
        }

        mappingKabupaten[region.id_provinsi][region.id] = region.tipe + ' ' + region.nama;
    });

    dataKecamatan.forEach((region) => {
        if (!mappingKecamatan[region.id_provinsi]) {
            mappingKecamatan[region.id_provinsi] = {};
        }

        if (!mappingKecamatan[region.id_provinsi][region.id_kabupaten]) {
            mappingKecamatan[region.id_provinsi][region.id_kabupaten] = {};
        }

        mappingKecamatan[region.id_provinsi][region.id_kabupaten][region.id] = 'Kecamatan ' + region.nama;
    });

    dataKelurahan.forEach((region) => {
        if (!mappingKelurahan[region.id_provinsi]) {
            mappingKelurahan[region.id_provinsi] = {};
        }

        if (!mappingKelurahan[region.id_provinsi][region.id_kabupaten]) {
            mappingKelurahan[region.id_provinsi][region.id_kabupaten] = {};
        }

        if (!mappingKelurahan[region.id_provinsi][region.id_kabupaten][region.id_kecamatan]) {
            mappingKelurahan[region.id_provinsi][region.id_kabupaten][region.id_kecamatan] = {};
        }

        mappingKelurahan[region.id_provinsi][region.id_kabupaten][region.id_kecamatan][region.id] = 'Kelurahan ' + region.nama;
    });

    return {
        provinsi: mappingProvinsi,
        kabupaten: mappingKabupaten,
        kecamatan: mappingKecamatan,
        kelurahan: mappingKelurahan,
    };
}