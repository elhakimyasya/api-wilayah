import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest) {
    try {
        const fullMapping = mappingWilayah();
        const search = req.nextUrl.searchParams.get('search');

        if (!fullMapping.provinsi || Object.keys(fullMapping.provinsi).length === 0) {
            return NextResponse.json({ message: 'Data provinsi tidak ditemukan!' }, { status: 404 });
        }

        let result = Object.entries(fullMapping.provinsi).map(([id, nama]) => {
            const idProvinsi = String(id).padStart(2, '0');
            const jumlah_kabupaten = fullMapping.kabupaten?.[Number(id)] ? Object.keys(fullMapping.kabupaten[Number(id)]).length : 0;

            return {
                id_provinsi: idProvinsi, nama, jumlah_kabupaten,
            };
        });

        if (search) {
            result = result.filter(provinsi => provinsi.nama.toLowerCase().includes(search.toLowerCase()));
        }

        if (result.length === 0) {
            return NextResponse.json({ message: 'Hasil Tidak Ditemukan.' }, { status: 200 });
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error saat memproses permintaan:', error);
        return NextResponse.json({ message: 'Terjadi kesalahan pada server' }, { status: 500 });
    }
}
