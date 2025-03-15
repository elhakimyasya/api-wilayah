import { NextRequest, NextResponse } from 'next/server';
import { Kabupaten } from '@/tipe/Wilayah';
import { mappingProvinsi, readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: string } }) {
    const { id_provinsi } = params;

    if (!id_provinsi) {
        return NextResponse.json({
            error: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    const datas = readCSV<Kabupaten>('kabupaten.csv');
    const filter = datas.filter((datas) => Number(datas.id_provinsi) === Number(id_provinsi));

    if (filter.length === 0) {
        return NextResponse.json({
            error: 'Kabupaten/Kota tidak ditemukan!'
        }, {
            status: 404
        });
    }

    const mapProvinsi = mappingProvinsi();

    const result = filter.map((datas) => {
        const idProvinsi = String(datas.id_provinsi).padStart(2, '0');
        const idKabupaten = String(datas.id).padStart(2, '0');

        return {
            id: datas.id,
            id_provinsi: datas.id_provinsi,
            kode: Number(`${idProvinsi}${idKabupaten}`),
            tipe: datas.tipe,
            nama: datas.nama,
            nama_lengkap: `${datas.tipe} ${datas.nama}`,
            provinsi: datas.id_provinsi !== null ? mapProvinsi[datas.id_provinsi] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}