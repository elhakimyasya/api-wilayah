import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string } }) {
    const { id_provinsi } = params;
    const search = req.nextUrl.searchParams.get('search');

    if (!id_provinsi) {
        return NextResponse.json({
            message: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    const fullMapping = mappingWilayah();
    const filter = fullMapping.kabupaten[Number(id_provinsi)];

    if (!filter || Object.keys(filter).length === 0) {
        return NextResponse.json({
            message: 'Kabupaten/Kota tidak ditemukan!'
        }, {
            status: 404
        });
    }

    let result = Object.entries(filter).map(([idKabupaten, namaKabupaten]) => {
        const idProvinsi = String(id_provinsi).padStart(2, '0');
        const id = String(idKabupaten).padStart(2, '0');

        const jumlah_kecamatan = fullMapping.kecamatan[Number(id_provinsi)]?.[Number(idKabupaten)] ? Object.keys(fullMapping.kecamatan[Number(id_provinsi)][Number(idKabupaten)]).length : 0;

        return {
            id_provinsi: idProvinsi,
            id_kabupaten: id,
            kode: String(`${idProvinsi}${id}`),
            nama: namaKabupaten,
            provinsi: fullMapping.provinsi[Number(id_provinsi)] || 'Tidak Diketahui',
            jumlah_kecamatan,
        };
    });

    if (search) {
        result = result.filter(kabupaten =>
            kabupaten.nama.toLowerCase().includes(search.toLowerCase())
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