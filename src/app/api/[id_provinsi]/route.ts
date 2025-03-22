/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest, context: { params: any }) {
    try {
        const { id_provinsi, tipe } = await context.params as { id_provinsi: string, tipe: string };

        if (!id_provinsi) {
            return NextResponse.json({ message: 'ID Tidak Valid!' }, { status: 400 });
        }

        const fullMapping = mappingWilayah();
        const filter = fullMapping.kabupaten?.[Number(id_provinsi)];

        if (!filter || Object.keys(filter).length === 0) {
            return NextResponse.json({ message: 'Kabupaten/Kota tidak ditemukan!' }, { status: 404 });
        }

        let result = Object.entries(filter).map(([idKabupaten, namaKabupaten]) => {
            const idProvinsi = String(id_provinsi).padStart(2, '0');
            const id = String(idKabupaten).padStart(2, '0');

            return {
                id_provinsi: idProvinsi,
                id_kabupaten: id,
                kode: `${idProvinsi}${id}`,
                nama: namaKabupaten,
                tipe: tipe || 'Kabupaten',
                wilayah: {
                    provinsi: fullMapping.provinsi?.[Number(id_provinsi)] || 'Tidak Diketahui',
                },
                jumlah: {
                    wilayah: {
                        kecamatan: fullMapping.kecamatan?.[Number(id_provinsi)]?.[Number(idKabupaten)] ? Object.keys(fullMapping.kecamatan[Number(id_provinsi)][Number(idKabupaten)]).length : 0,
                        kelurahan: fullMapping.kelurahan?.[Number(id_provinsi)]?.[Number(idKabupaten)] ? Object.values(fullMapping.kelurahan[Number(id_provinsi)][Number(idKabupaten)]).reduce((total, kecamatan) => total + Object.keys(kecamatan).length, 0) : 0
                    }
                }
            };
        });

        const search = req.nextUrl.searchParams.get('q');
        if (search) {
            result = result.filter(kabupaten => kabupaten.nama.toLowerCase().includes(search.toLowerCase()));
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