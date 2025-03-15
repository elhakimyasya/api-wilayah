import { NextRequest, NextResponse } from 'next/server';
import { createFullMapping } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: number, id_kabupaten: number } }) {
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

    const fullMapping = createFullMapping();
    const kecamatanMapping = fullMapping.kecamatan[id_provinsi]?.[id_kabupaten];

    if (!kecamatanMapping || Object.keys(kecamatanMapping).length === 0) {
        return NextResponse.json({
            error: 'Kecamatan tidak ditemukan'
        }, {
            status: 404
        });
    }

    const result = Object.entries(kecamatanMapping).map(([idKecamatan, namaKecamatan]) => {
        const idProvinsi = String(id_provinsi).padStart(2, '0');
        const idKabupaten = String(id_kabupaten).padStart(2, '0');
        const id = String(idKecamatan).padStart(3, '0');

        return {
            id_provinsi: Number(id_provinsi),
            id_kabupaten: Number(id_kabupaten),
            id_kecamatan: Number(idKecamatan),
            kode: Number(`${idProvinsi}${idKabupaten}${id}`),
            nama: namaKecamatan,
            kabupaten: fullMapping.kabupaten[id_provinsi]?.[id_kabupaten] || 'Tidak Diketahui',
            provinsi: fullMapping.provinsi[id_provinsi] || 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}