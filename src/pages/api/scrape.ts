import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';

const WIKIPEDIA_URL = 'https://id.wikipedia.org/wiki/Provinsi_di_Indonesia';

async function scrapeWikipedia() {
    try {
        const { data } = await axios.get(WIKIPEDIA_URL);
        const $ = cheerio.load(data);

        const provinces: Record<string, string>[] = [];
        const tableRows = $('table.wikitable tbody tr');

        tableRows.each((index, element) => {
            const cells = $(element).find('td');
            if (cells.length > 0) {
                const province = {
                    id: String(index),
                    name: $(cells[1]).text().trim(),
                    capital: $(cells[2]).text().trim(),
                    established: $(cells[3]).text().trim(),
                    population: $(cells[4]).text().trim(),
                    area: $(cells[5]).text().trim(),
                    density: $(cells[6]).text().trim(),
                };
                provinces.push(province);
            }
        });

        return provinces;
    } catch (error) {
        console.error('Error scraping Wikipedia:', error);
        return [];
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const provinces = await scrapeWikipedia();
    if (provinces.length === 0) {
        return res.status(500).json({ message: 'Failed to scrape data' });
    }

    const csvParser = new Parser();
    const csv = csvParser.parse(provinces);

    const filePath = path.join(process.cwd(), 'data', 'provinsi.csv');
    fs.writeFileSync(filePath, csv);

    return res.status(200).json({ message: 'Data scraped and saved to CSV' });
}