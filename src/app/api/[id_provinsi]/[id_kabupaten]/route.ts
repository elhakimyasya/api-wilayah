import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: number, id_kabupaten: number } }) {
    const { id_provinsi, id_kabupaten } = params;
    const search = req.nextUrl.searchParams.get('search');

    if (!id_provinsi) {
        return NextResponse.json({
            message: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    if (!id_kabupaten) {
        return NextResponse.json({
            message: 'ID Kabupaten Tidak Valid!'
        }, {
            status: 400
        });
    }

    const fullMapping = mappingWilayah();
    const kecamatanMapping = fullMapping.kecamatan[id_provinsi]?.[id_kabupaten];

    if (!kecamatanMapping || Object.keys(kecamatanMapping).length === 0) {
        return NextResponse.json({
            message: 'Kecamatan tidak ditemukan'
        }, {
            status: 404
        });
    }

    let result = Object.entries(kecamatanMapping).map(([idKecamatan, namaKecamatan]) => {
        const idProvinsi = String(id_provinsi).padStart(2, '0');
        const idKabupaten = String(id_kabupaten).padStart(2, '0');
        const id = String(idKecamatan).padStart(3, '0');

        return {
            id_provinsi: String(id_provinsi),
            id_kabupaten: String(id_kabupaten),
            id_kecamatan: String(idKecamatan),
            kode: String(`${idProvinsi}${idKabupaten}${id}`),
            nama: namaKecamatan,
            kabupaten: fullMapping.kabupaten[id_provinsi]?.[id_kabupaten] || 'Tidak Diketahui',
            provinsi: fullMapping.provinsi[id_provinsi] || 'Tidak Diketahui',
        };
    });

    if (search) {
        result = result.filter(kecamatan =>
            kecamatan.nama.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (result.length === 0) {
        return NextResponse.json({
            message: 'Hasil Tidak Ditemukan.'
        }, {
            status: 200
        });
    }

    return NextResponse.json(result, {
        status: 200
    });
}