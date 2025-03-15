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
    const provinsiData = readCSV<{ id: number; nama: string }>('provinsi.csv');
    const provinsiMapping: Record<number, string> = {};

    provinsiData.forEach((provinsi) => {
        provinsiMapping[provinsi.id] = provinsi.nama;
    });

    return provinsiMapping;
}