import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah, readCSV } from '@/utils/reader';
import { Kelurahan } from '@/tipe/Wilayah';

export async function GET(req: NextRequest, { params }: { params: { id_provinsi: number, id_kabupaten: number, id_kecamatan: number } }) {
    const { id_provinsi, id_kabupaten, id_kecamatan } = params;
    const search = req.nextUrl.searchParams.get('search');

    if (!id_provinsi) {
        return NextResponse.json({
            message: 'ID Provinsi Tidak Valid!'
        }, {
            status: 400
        });
    }

    if (!id_kabupaten) {
        return NextResponse.json({
            message: 'ID Kabupaten Tidak Valid!'
        }, {
            status: 400
        });
    }

    if (!id_kecamatan) {
        return NextResponse.json({
            message: 'ID Kecamatan Tidak Valid!'
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
            message: 'Kelurahan tidak ditemukan'
        }, {
            status: 404
        });
    }

    const fullMapping = mappingWilayah();

    let result = filter.map((data) => {
        const idProvinsi = String(data.id_provinsi).padStart(2, '0');
        const idKabupaten = String(data.id_kabupaten).padStart(2, '0');
        const idKecamatan = String(data.id_kecamatan).padStart(3, '0');
        const idKelurahan = String(data.id).padStart(3, '0');

        return {
            id_provinsi: idProvinsi,
            id_kabupaten: idKabupaten,
            id_kecamatan: idKecamatan,
            id_kelurahan: idKelurahan,
            kode: `${idProvinsi}${idKabupaten}${idKecamatan}${idKelurahan}`,
            nama: 'Kelurahan ' + data.nama,
            kecamatan: data.id_provinsi !== null && data.id_kabupaten !== null && data.id_kecamatan !== null ? (fullMapping.kecamatan[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)]?.[Number(data.id_kecamatan)] || 'Tidak Diketahui') : 'Tidak Diketahui',
            kabupaten: data.id_provinsi !== null && data.id_kabupaten !== null ? (fullMapping.kabupaten[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)] || 'Tidak Diketahui') : 'Tidak Diketahui',
            provinsi: data.id_provinsi !== null ? fullMapping.provinsi[Number(data.id_provinsi)] || 'Tidak Diketahui' : 'Tidak Diketahui',
        };
    });

    if (search) {
        result = result.filter(kelurahan =>
            kelurahan.nama.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (result.length === 0) {
        return NextResponse.json({
            message: 'Hasil Tidak Ditemukan.'
        }, {
            status: 200
        });
    }

    return NextResponse.json(result, {
        status: 200
    });
}