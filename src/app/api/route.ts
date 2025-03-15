import { mappingWilayah } from '@/utils/reader';
import { NextRequest, NextResponse } from 'next/server';

// Define the types for the mapping
interface FullMapping {
    provinsi: Record<number, string>;
    kabupaten: Record<number, Record<number, string>>;
    kecamatan: Record<number, Record<number, Record<number, string>>>;
    kelurahan: Record<number, Record<number, Record<number, Record<number, string>>>>;
}

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search');

    const fullMapping: FullMapping = mappingWilayah();

    let formattedProvinsi = Object.entries(fullMapping.provinsi).map(([id, nama]) => ({
        id_provinsi: Number(id),
        nama,
        jumlah_kabupaten: Object.keys(fullMapping.kabupaten[Number(id)] || {}).length
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