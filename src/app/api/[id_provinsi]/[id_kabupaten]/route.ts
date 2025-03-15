import { NextRequest, NextResponse } from 'next/server';
import { Kecamatan } from '@/tipe/Wilayah';
import { mappingKabupaten, mappingProvinsi, readCSV } from '@/utils/reader';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: number, id_kabupaten: number } }) {
    const { id_provinsi, id_kabupaten } = params;

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

    const datas = readCSV<Kecamatan>('kecamatan.csv');
    const filter = datas.filter((data) =>
        Number(data.id_provinsi) === Number(id_provinsi) && Number(data.id_kabupaten) === Number(id_kabupaten)
    );

    if (filter.length === 0) {
        return NextResponse.json({
            error: 'Kecamatan tidak ditemukan'
        }, {
            status: 404
        });
    }

    const mapProvinsi = mappingProvinsi();
    const mapKabupaten = mappingKabupaten();

    const result = filter.map((data) => {
        const idProvinsi = String(data.id_provinsi).padStart(2, '0');
        const idKabupaten = String(data.id_kabupaten).padStart(2, '0');
        const idKecamatan = String(data.id).padStart(3, '0');

        return {
            id: data.id,
            id_provinsi: data.id_provinsi,
            id_kecamatan: data.id_kecamatan,
            kode: Number(`${idProvinsi}${idKabupaten}${idKecamatan}`),
            nama: data.nama,
            kabupaten: data.id_kabupaten !== null && data.id_provinsi !== null ? (mapKabupaten[Number(data.id_kabupaten)]?.[Number(data.id_provisni)] || 'Tidak Diketahui') : 'Tidak Diketahui',
            provinsi: data.id_provinsi !== null ? mapProvinsi[Number(data.id_provinsi)] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });


    return NextResponse.json(result, {
        status: 200
    });
}