import { mappingWilayah } from '@/utils/reader';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search');

    const fullMapping = mappingWilayah();

    let formattedProvinsi = Object.entries(fullMapping.provinsi).map(([id, nama]) => ({
        id_provinsi: id, // Ensure id is a string
        nama
    }));

    if (search) {
        formattedProvinsi = formattedProvinsi.filter(provinsi =>
            provinsi.nama.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (formattedProvinsi.length === 0) {
        return NextResponse.json({
            message: 'Hasil Tidak Ditemukan.'
        }, {
            status: 200
        });
    }

    return NextResponse.json(formattedProvinsi, {
        status: 200
    });
}