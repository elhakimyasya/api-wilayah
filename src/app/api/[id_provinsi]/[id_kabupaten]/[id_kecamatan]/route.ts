/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah, readCSV } from '@/utils/reader';
import { Kelurahan } from '@/tipe/Wilayah';

export async function GET(req: NextRequest, context: { params: any }) {
    try {
        const { id_provinsi, id_kabupaten, id_kecamatan } = await context.params as { id_provinsi: string; id_kabupaten: string; id_kecamatan: string };

        if (!id_provinsi || !id_kabupaten || !id_kecamatan) {
            return NextResponse.json({ message: 'ID Tidak Valid!' }, { status: 400 });
        }

        const datas = readCSV<Kelurahan>('kelurahan.csv');
        const filter = datas.filter((data) =>
            Number(data.id_provinsi) === Number(id_provinsi) &&
            Number(data.id_kabupaten) === Number(id_kabupaten) &&
            Number(data.id_kecamatan) === Number(id_kecamatan)
        );

        if (filter.length === 0) {
            return NextResponse.json({ message: 'Kelurahan tidak ditemukan' }, { status: 404 });
        }

        const fullMapping = mappingWilayah();
        let result = filter.map((data) => {
            const idProvinsi = String(data.id_provinsi).padStart(2, '0');
            const idKabupaten = String(data.id_kabupaten).padStart(2, '0');
            const idKecamatan = String(data.id_kecamatan).padStart(2, '0');
            const idKelurahan = String(data.id).padStart(3, '0');

            return {
                id_provinsi: idProvinsi,
                id_kabupaten: idKabupaten,
                id_kecamatan: idKecamatan,
                id_kelurahan: idKelurahan,
                kode: `${idProvinsi}${idKabupaten}${idKecamatan}${idKelurahan}`,
                nama: data.nama,
                kecamatan: fullMapping.kecamatan?.[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)]?.[Number(data.id_kecamatan)] || 'Tidak Diketahui',
                kabupaten: fullMapping.kabupaten?.[Number(data.id_provinsi)]?.[Number(data.id_kabupaten)] || 'Tidak Diketahui',
                provinsi: fullMapping.provinsi?.[Number(data.id_provinsi)] || 'Tidak Diketahui',
            };
        });

        const search = req.nextUrl.searchParams.get('search');
        if (search) {
            result = result.filter(kelurahan => kelurahan.nama.toLowerCase().includes(search.toLowerCase()));
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
