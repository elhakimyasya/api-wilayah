import Image from "next/image";

const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-2xl">
        <Image src="/logo.png" alt="EL Creative" width={100} height={100} priority />

        <h2 className="font-bold text-2xl sm:text-4xl">🇮🇩 API Wilayah Indonesia</h2>
        <ol className="list-outside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="tracking-[-.01em] mb-2 last:mb-0">Pencarian Wilayah - Cari Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa berdasarkan ID.</li>
          <li className="tracking-[-.01em] mb-2 last:mb-0">Hierarki Wilayah yang Terstruktur - Data wilayah disusun berdasarkan Provinsi → Kabupaten/Kota → Kecamatan → Kelurahan/Desa.</li>
          <li className="tracking-[-.01em] mb-2 last:mb-0">Endpoint Sederhana & Mudah Digunakan - Hanya perlu ID wilayah untuk mendapatkan data.</li>
          <li className="tracking-[-.01em] mb-2 last:mb-0">Akses Publik & Gratis - Tidak perlu autentikasi atau API key, bisa digunakan secara bebas.</li>
          <li className="tracking-[-.01em] mb-2 last:mb-0">Dukungan Query Pencarian - Bisa mencari wilayah berdasarkan kata kunci dalam query string.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto" href={`${baseUrl}/api`} target="_blank" rel="noopener noreferrer">
            Buka API
          </a>

          <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto" href="https://github.com/elhakimyasya/api-wilayah" target="_blank" >
            Lihat di GitHub →
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://elcreative.org/" target="_blank" rel="noopener noreferrer">
          EL Creative
        </a>
      </footer>
    </div >
  );
}
