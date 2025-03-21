/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, context: { params: any }) {
    try {
        const { id_provinsi, id_kabupaten } = await context.params as { id_provinsi: string; id_kabupaten: string };

        if (!id_provinsi || !id_kabupaten) {
            return NextResponse.json({ message: 'ID Tidak Valid!' }, { status: 400 });
        }

        const fullMapping = mappingWilayah();
        const kecamatanMapping = fullMapping.kecamatan?.[Number(id_provinsi)]?.[Number(id_kabupaten)];

        if (!kecamatanMapping || Object.keys(kecamatanMapping).length === 0) {
            return NextResponse.json({ message: 'Kecamatan tidak ditemukan' }, { status: 404 });
        }

        let result = Object.entries(kecamatanMapping).map(([idKecamatan, namaKecamatan]) => {
            const idProvinsi = String(id_provinsi).padStart(2, '0');
            const idKabupaten = String(id_kabupaten).padStart(2, '0');
            const idKec = String(idKecamatan).padStart(2, '0');

            return {
                id_provinsi: idProvinsi,
                id_kabupaten: idKabupaten,
                id_kecamatan: idKec,
                kode: `${idProvinsi}${idKabupaten}${idKec}`,
                nama: namaKecamatan,
                wilayah: {
                    kabupaten: fullMapping.kabupaten?.[Number(id_provinsi)]?.[Number(id_kabupaten)] || 'Tidak Diketahui',
                    provinsi: fullMapping.provinsi?.[Number(id_provinsi)] || 'Tidak Diketahui',
                },
                jumlah: {
                    wilayah: {
                        kelurahan: Object.keys(fullMapping.kelurahan?.[Number(id_provinsi)]?.[Number(id_kabupaten)]?.[Number(idKecamatan)] || {}).length,
                    }
                }
            };
        });

        const search = req.nextUrl.searchParams.get('q');
        if (search) {
            result = result.filter(kecamatan => kecamatan.nama.toLowerCase().includes(search.toLowerCase()));
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
