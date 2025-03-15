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
}

export function createFullMapping(): FullMapping {
    const provinsiData = readCSV<{ id: number; nama: string }>('provinsi.csv');
    const kabupatenData = readCSV<{ id: number; id_provinsi: number; nama: string; tipe: string }>('kabupaten.csv');
    const kecamatanData = readCSV<{ id: number; id_provinsi: number; id_kabupaten: number; nama: string }>('kecamatan.csv');

    const provinsiMapping: Record<number, string> = {};
    const kabupatenMapping: Record<number, Record<number, string>> = {};
    const kecamatanMapping: Record<number, Record<number, Record<number, string>>> = {};

    provinsiData.forEach((region) => {
        provinsiMapping[region.id] = 'Provinsi ' + region.nama;
    });

    kabupatenData.forEach((region) => {
        if (!kabupatenMapping[region.id_provinsi]) {
            kabupatenMapping[region.id_provinsi] = {};
        }

        kabupatenMapping[region.id_provinsi][region.id] = region.tipe + ' ' + region.nama;
    });

    kecamatanData.forEach((region) => {
        if (!kecamatanMapping[region.id_provinsi]) {
            kecamatanMapping[region.id_provinsi] = {};
        }

        if (!kecamatanMapping[region.id_provinsi][region.id_kabupaten]) {
            kecamatanMapping[region.id_provinsi][region.id_kabupaten] = {};
        }

        kecamatanMapping[region.id_provinsi][region.id_kabupaten][region.id] = 'Kecamatan ' + region.nama;
    });

    return {
        provinsi: provinsiMapping,
        kabupaten: kabupatenMapping,
        kecamatan: kecamatanMapping
    };
}