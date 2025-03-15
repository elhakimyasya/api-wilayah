import { NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET() {
    const fullMapping = mappingWilayah();

    const formattedProvinsi = Object.entries(fullMapping.provinsi).map(([id, nama]) => ({
        id_provinsi: Number(id), nama
    }));

    return NextResponse.json(formattedProvinsi, {
        status: 200
    });
}