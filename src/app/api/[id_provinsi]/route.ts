import { NextRequest, NextResponse } from 'next/server';
import { Kabupaten } from '@/tipe/Wilayah';
import { mappingProvinsi, readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string } }) {
    const { id_provinsi } = params;

    if (!id_provinsi) {
        return NextResponse.json({
            error: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    const kabupaten = readCSV<Kabupaten>('kabupaten.csv');
    const provinsiFilter = kabupaten.filter((kabupaten) => Number(kabupaten.id_provinsi) === Number(id_provinsi));

    if (provinsiFilter.length === 0) {
        return NextResponse.json({
            error: 'Kabupaten/Kota tidak ditemukan'
        }, {
            status: 404
        });
    }

    const provinsiMapping = mappingProvinsi();

    const result = provinsiFilter.map((kabupaten) => {
        const idProvinsi = String(kabupaten.id_provinsi).padStart(2, '0');
        const idKabupaten = String(kabupaten.id).padStart(2, '0');

        return {
            id: kabupaten.id,
            id_provinsi: kabupaten.id_provinsi,
            kode: Number(`${idProvinsi}${idKabupaten}`),
            tipe: kabupaten.tipe,
            nama: kabupaten.nama,
            nama_lengkap: `${kabupaten.tipe} ${kabupaten.nama}`,
            provinsi: kabupaten.id_provinsi !== null ? provinsiMapping[kabupaten.id_provinsi] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}