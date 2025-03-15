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
        mapping[region.id] = region.nama;
    });

    return mapping;
}

export function mappingKabupaten(): Record<number, Record<number, string>> {
    const data = readCSV<{ id: number; id_provinsi: number; nama: string }>('kabupaten.csv');
    const mapping: Record<number, Record<number, string>> = {};

    data.forEach((region) => {
        if (!mapping[region.id_provinsi]) {
            mapping[region.id_provinsi] = {};
        }
        mapping[region.id_provinsi][region.id] = region.nama;
    });

    console.log(mapping)
    return mapping;
}