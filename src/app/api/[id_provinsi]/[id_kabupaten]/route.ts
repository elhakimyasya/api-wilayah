import { NextRequest, NextResponse } from 'next/server';
import { Kabupaten } from '@/tipe/Wilayah';
import { mappingProvinsi, readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string, id_kabupaten: string } }) {
    const { id_provinsi, id_kabupaten } = params;

    if (!id_provinsi) {
        return NextResponse.json({
            error: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    if (!id_kabupaten) {
        return NextResponse.json({
            error: 'ID Kabupaten Tidak Valid!'
        }, {
            status: 400
        });
    }

    const kabupaten = readCSV<Kabupaten>('kabupaten.csv');
    const kabupatenFilter = kabupaten.filter((kabupaten) =>
        Number(kabupaten.id_provinsi) === Number(id_provinsi) &&
        Number(kabupaten.id) === Number(id_kabupaten)
    );

    if (kabupatenFilter.length === 0) {
        return NextResponse.json({
            error: 'Kabupaten tidak ditemukan'
        }, { status: 404 });
    }

    const provinsiMapping = mappingProvinsi();

    const result = kabupatenFilter.map((kabupaten) => {
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