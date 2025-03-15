import { NextRequest, NextResponse } from 'next/server';
import { Kabupaten } from '@/tipe/Wilayah';
import { mappingProvinsi, readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string, id_kabupaten: string, id_kecamatan: string } }) {
    const { id_provinsi, id_kabupaten, id_kecamatan } = params;

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

    if (!id_kecamatan) {
        return NextResponse.json({
            error: 'ID Kabupaten Tidak Valid!'
        }, {
            status: 400
        });
    }

    const kecamatan = readCSV<Kabupaten>('kecamatan.csv');
    const kabupatenFilter = kecamatan.filter((kecamatan) =>
        Number(kecamatan.id_provinsi) === Number(id_provinsi) && Number(kecamatan.id_kabupaten) === Number(id_kabupaten) && Number(kecamatan.id) === Number(id_kecamatan)
    );

    if (kabupatenFilter.length === 0) {
        return NextResponse.json({
            error: 'Kabupaten tidak ditemukan'
        }, { status: 404 });
    }

    const provinsiMapping = mappingProvinsi();

    const result = kabupatenFilter.map((kecamatan) => {
        const idProvinsi = String(kecamatan.id_provinsi).padStart(2, '0');
        const idKabupaten = String(kecamatan.id).padStart(2, '0');

        return {
            id: kecamatan.id,
            id_provinsi: kecamatan.id_provinsi,
            kode: Number(`${idProvinsi}${idKabupaten}`),
            tipe: kecamatan.tipe,
            nama: kecamatan.nama,
            nama_lengkap: `${kecamatan.tipe} ${kecamatan.nama}`,
            provinsi: kecamatan.id_provinsi !== null ? provinsiMapping[kecamatan.id_provinsi] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}