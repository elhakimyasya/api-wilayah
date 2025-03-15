import { Provinsi } from "@/tipe/Wilayah";
import { readCSV } from "@/utils/reader";
import { NextResponse } from "next/server";

export async function GET() {
    const data = readCSV<Provinsi>('provinsi.csv');

    return NextResponse.json(data);
}