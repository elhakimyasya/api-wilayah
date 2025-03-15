import { NextRequest, NextResponse } from 'next/server';
import { mappingKabupaten, mappingProvinsi, mappingKecamatan, readCSV } from '@/utils/reader';
import { Kelurahan } from '@/tipe/Wilayah';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: number, id_kabupaten: number, id_kecamatan: number } }) {
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

    const datas = readCSV<Kelurahan>('kelurahan.csv');
    const filter = datas.filter((data) =>
        Number(data.id_provinsi) === Number(id_provinsi) && Number(data.id_kabupaten) === Number(id_kabupaten) && Number(data.id_kecamatan) === Number(id_kecamatan)
    );

    if (filter.length === 0) {
        return NextResponse.json({
            error: 'Kelurahan tidak ditemukan'
        }, {
            status: 404
        });
    }

    const mapProvinsi = mappingProvinsi();
    const mapKabupaten = mappingKabupaten();
    const mapKecamatan = mappingKecamatan();

    const result = filter.map((data) => {
        const idProvinsi = String(data.id_provinsi).padStart(2, '0');
        const idKabupaten = String(data.id_kabupaten).padStart(2, '0');
        const idKecamatan = String(data.id_kecamatan).padStart(3, '0');
        const idKelurahan = String(data.id).padStart(3, '0');

        return {
            id: data.id,
            id_provinsi: data.id_provinsi,
            id_kabupaten: data.id_kabupaten,
            id_kecamatan: data.id_kecamatan,
            kode: Number(`${idProvinsi}${idKabupaten}${idKecamatan}${idKelurahan}`),
            nama: data.nama,
            kecamatan: data.id_provinsi !== null && data.id_kabupaten !== null && data.id_kecamatan !== null ? (mapKecamatan[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)]?.[Number(data.id_kecamatan)] || 'Tidak Diketahui') : 'Tidak Diketahui',
            kabupaten: data.id_provinsi !== null && data.id_kabupaten !== null ? (mapKabupaten[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)] || 'Tidak Diketahui') : 'Tidak Diketahui',
            provinsi: data.id_provinsi !== null ? mapProvinsi[Number(data.id_provinsi)] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });

    return NextResponse.json(result, {
        status: 200
    });
}