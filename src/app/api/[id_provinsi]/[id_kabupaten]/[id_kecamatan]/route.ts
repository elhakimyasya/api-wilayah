/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, context: { params: any }) {
    try {
        const { id_provinsi, id_kabupaten, id_kecamatan } = await context.params as {
            id_provinsi: string;
            id_kabupaten: string;
            id_kecamatan: string;
        };

        if (!id_provinsi || !id_kabupaten || !id_kecamatan) {
            return NextResponse.json({ message: 'ID Tidak Valid!' }, { status: 400 });
        }

        const fullMapping = mappingWilayah();
        const kelurahanMapping = fullMapping.kelurahan?.[Number(id_provinsi)]?.[Number(id_kabupaten)]?.[Number(id_kecamatan)];

        if (!kelurahanMapping || Object.keys(kelurahanMapping).length === 0) {
            return NextResponse.json({ message: 'Kelurahan tidak ditemukan' }, { status: 404 });
        }

        let result = Object.entries(kelurahanMapping).map(([idKelurahan, namaKelurahan]) => {
            const idProvinsi = String(id_provinsi).padStart(2, '0');
            const idKabupaten = String(id_kabupaten).padStart(2, '0');
            const idKecamatan = String(id_kecamatan).padStart(2, '0');
            const idKel = String(idKelurahan).padStart(2, '0');

            return {
                id_provinsi: idProvinsi,
                id_kabupaten: idKabupaten,
                id_kecamatan: idKecamatan,
                id_kelurahan: idKel,
                kode: `${idProvinsi}${idKabupaten}${idKecamatan}${idKel}`,
                nama: namaKelurahan,
                wilayah: {
                    kecamatan: fullMapping.kecamatan?.[Number(id_provinsi)]?.[Number(id_kabupaten)]?.[Number(id_kecamatan)] || 'Tidak Diketahui',
                    kabupaten: fullMapping.kabupaten?.[Number(id_provinsi)]?.[Number(id_kabupaten)] || 'Tidak Diketahui',
                    provinsi: fullMapping.provinsi?.[Number(id_provinsi)] || 'Tidak Diketahui',
                }
            };
        });

        const search = req.nextUrl.searchParams.get('q');
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