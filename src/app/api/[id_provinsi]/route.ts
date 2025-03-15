import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string } }) {
    const { id_provinsi } = params;

    if (!id_provinsi) {
        return NextResponse.json({
            error: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    const fullMapping = mappingWilayah();
    const filter = fullMapping.kabupaten[Number(id_provinsi)];

    if (!filter || Object.keys(filter).length === 0) {
        return NextResponse.json({
            error: 'Kabupaten/Kota tidak ditemukan!'
        }, {
            status: 404
        });
    }

    const result = Object.entries(filter).map(([idKabupaten, namaKabupaten]) => {
        const idProvinsi = String(id_provinsi).padStart(2, '0');
        const id = String(idKabupaten).padStart(2, '0');

        return {
            id_provinsi: Number(id_provinsi),
            id_kabupaten: Number(idKabupaten),
            kode: Number(`${idProvinsi}${id}`),
            nama: namaKabupaten,
            provinsi: fullMapping.provinsi[Number(id_provinsi)] || 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}