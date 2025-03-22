import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { mappingWilayah } from '@/utils/reader';

export async function GET(req: NextRequest) {
    try {
        const fullMapping = mappingWilayah();
        const search = req.nextUrl.searchParams.get('q');

        if (!fullMapping.provinsi || Object.keys(fullMapping.provinsi).length === 0) {
            return NextResponse.json({ message: 'Data provinsi tidak ditemukan!' }, { status: 404 });
        }

        let result = Object.entries(fullMapping.provinsi).map(([id, nama]) => {
            const idProvinsi = String(id).padStart(2, '0');

            const logoPath = path.join(process.cwd(), 'public', 'images', 'provinsi', `${idProvinsi}.png`);
            const logoUrl = fs.existsSync(logoPath) ? `${req.nextUrl.protocol}//${req.nextUrl.host}/images/provinsi/${idProvinsi}.png` : null;

            return {
                id_provinsi: idProvinsi,
                nama,
                logo: logoUrl,
                jumlah: {
                    wilayah: {
                        kabupaten: fullMapping.kabupaten?.[Number(id)] ? Object.keys(fullMapping.kabupaten[Number(id)]).length : 0,
                        kecamatan: fullMapping.kecamatan?.[Number(id)] ? Object.values(fullMapping.kecamatan[Number(id)]).reduce((total, kab) => total + Object.keys(kab).length, 0) : 0,
                        kelurahan: fullMapping.kelurahan?.[Number(id)] ? Object.values(fullMapping.kelurahan[Number(id)]).reduce<number>((total, kab) => {
                            if (typeof kab !== 'object' || !kab) return total;
                            return total + Object.values(kab).reduce<number>((subTotal, kec) => {
                                if (typeof kec !== 'object' || !kec) return subTotal;

                                return subTotal + Object.keys(kec).length;
                            }, 0);
                        }, 0) : 0
                    }
                }
            };
        });

        if (search) {
            result = result.filter(provinsi => provinsi.nama.toLowerCase().includes(search.toLowerCase()));
        }

        if (result.length === 0) {
            return NextResponse.json({ message: 'Hasil Tidak Ditemukan.' }, { status: 200 });
        }

        return NextResponse.json(result, {
            status: 200
        });

    } catch (error) {
        console.error('Error saat memproses permintaan:', error);
        return NextResponse.json({
            message: 'Terjadi kesalahan pada server'
        }, {
            status: 500
        });
    }
}
