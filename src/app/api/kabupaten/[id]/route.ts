import { NextRequest, NextResponse } from 'next/server';
import { Kabupaten } from '@/tipe/Wilayah';
import { readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json({
            error: 'ID Kabupaten Tidak Valid!'
        }, {
            status: 400
        });
    }

    const kabupaten = readCSV<Kabupaten>('kabupaten.csv');
    const kabupatenFilter = kabupaten.filter(
        (kabupaten) => Number(kabupaten.id_provinsi) === Number(id)
    );

    if (kabupatenFilter.length === 0) {
        return NextResponse.json({
            error: 'Kabupaten Tidak Ditemukan!'
        }, {
            status: 404
        });
    }

    return NextResponse.json(kabupatenFilter, {
        status: 200
    });
}