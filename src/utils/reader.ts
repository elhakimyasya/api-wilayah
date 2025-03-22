import fs from 'fs';
import path from 'path';
import papaparse from 'papaparse';

type CSVRow = Record<string, string | number | null>;

export function readCSV(fileName: string): CSVRow[] {
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
            const trimmedValue = value.trim();

            // Jika nilai berupa angka, konversi ke number
            if (!isNaN(Number(trimmedValue))) {
                objects[formattedKey] = Number(trimmedValue);
            } else {
                objects[formattedKey] = trimmedValue || null;
            }
        });

        return objects;
    });
}

interface NestedMapping {
    [key: number]: string | NestedMapping;
}

export function mappingWilayah(): Record<string, NestedMapping> {
    const csvFiles = [
        'provinsi.csv',
        'kabupaten.csv',
        'kecamatan.csv',
        'kelurahan.csv'
    ];
    const mappings: Record<string, NestedMapping> = {};

    csvFiles.forEach((file) => {
        const data = readCSV(file);
        const keyName = path.basename(file, '.csv');

        mappings[keyName] = {};

        data.forEach((row) => {
            const id = row['id'] as number;
            const name = row['nama'] as string;
            const parentKeys = Object.keys(row).filter((k) => k.startsWith('id_') && k !== 'id');

            if (parentKeys.length === 0) {
                mappings[keyName][id] = name;
            } else {
                let currentLevel: NestedMapping = mappings[keyName];

                parentKeys.forEach((parentKey, index) => {
                    const parentId = row[parentKey] as number;
                    if (!currentLevel[parentId]) {
                        currentLevel[parentId] = {};
                    }
                    if (index === parentKeys.length - 1) {
                        (currentLevel[parentId] as NestedMapping)[id] = name;
                    } else {
                        currentLevel = currentLevel[parentId] as NestedMapping;
                    }
                });
            }
        });
    });

    return mappings;
}