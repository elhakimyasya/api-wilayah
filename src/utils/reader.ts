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
        const obj: CSVRow = {};

        Object.entries(row).forEach(([key, value]) => {
            const formattedKey = key.trim().toLowerCase();

            if (formattedKey.includes('id')) {
                obj[formattedKey] = Number(value.trim()) || null;
            } else {
                obj[formattedKey] = value.trim();
            }
        });

        return obj as T;
    });
}

export function mappingProvinsi(): Record<number, string> {
    const data = readCSV<{ id: number; nama: string }>('provinsi.csv');
    const mapping: Record<number, string> = {};

    data.forEach((region) => {
        mapping[region.id] = 'Provinsi ' + region.nama;
    });

    return mapping;
}

export function mappingKabupaten(): Record<number, Record<number, string>> {
    const data = readCSV<{ id: number; id_provinsi: number; nama: string; tipe: string }>('kabupaten.csv');
    const mapping: Record<number, Record<number, string>> = {};

    data.forEach((region) => {
        if (!mapping[region.id_provinsi]) {
            mapping[region.id_provinsi] = {};
        }

        mapping[region.id_provinsi][region.id] = region.tipe + ' ' + region.nama;
    });

    return mapping;
}

export function mappingKecamatan(): Record<number, Record<number, Record<number, string>>> {
    const data = readCSV<{ id: number; id_provinsi: number; id_kabupaten: number; nama: string }>('kecamatan.csv');
    const mapping: Record<number, Record<number, Record<number, string>>> = {};

    data.forEach((region) => {
        if (!mapping[region.id_provinsi]) {
            mapping[region.id_provinsi] = {};
        }

        if (!mapping[region.id_provinsi][region.id_kabupaten]) {
            mapping[region.id_provinsi][region.id_kabupaten] = {};
        }

        mapping[region.id_provinsi][region.id_kabupaten][region.id] = 'Kecamatan ' + region.nama;
    });

    return mapping;
}