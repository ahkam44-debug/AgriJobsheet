import { CommodityId } from '../types';

export type PlanningBlock =
  | { type: 'paragraph'; text: string; italic?: boolean }
  | { type: 'subheading'; text: string }
  | { type: 'callout'; label?: string; text: string; bullets?: string[] }
  | {
      type: 'bullets';
      items: Array<{ lead?: string; text: string }>;
    }
  | {
      type: 'table';
      headers?: string[];
      colAlign?: Array<'left' | 'center' | 'right'>;
      rows: Array<
        | { kind: 'group'; title: string }
        | { kind: 'row'; cells: string[]; bold?: boolean; highlight?: 'subtle' | 'total' }
        | { kind: 'summary'; label: string; value: string; labelSpan: number; highlight?: 'subtle' | 'total' }
      >;
    };

export interface PlanningSection {
  id: string;
  heading: string;
  blocks: PlanningBlock[];
}

export interface CommodityPlanningDocument {
  commodityId: CommodityId;
  shortLabel: string;
  pdfUrl: string;
  pdfFilename: string;
  pageCount: number;
  title: string;
  scientificOrSubtitle?: string;
  meta?: string;
  sections: PlanningSection[];
}

export const PLANNING_DOCUMENTS: Record<CommodityId, CommodityPlanningDocument> = {
  semangka: {
    commodityId: 'semangka',
    shortLabel: 'Semangka',
    pdfUrl: '/assets/aistudio/ORIENTASI_PERENCANAAN_SEMANGKA_1_5b95c685.pdf',
    pdfFilename: 'ORIENTASI_PERENCANAAN_SEMANGKA.pdf',
    pageCount: 2,
    title: 'ORIENTASI PERENCANAAN BUDIDAYA SEMANGKA',
    scientificOrSubtitle: 'Pola Tanam Tunggal · Lahan 18 m × 21 m · Anggaran Sederhana',
    sections: [
      {
        id: 'gambaran-umum',
        heading: '1. Gambaran Umum',
        blocks: [
          {
            type: 'table',
            headers: ['Uraian', 'Keterangan'],
            rows: [
              { kind: 'row', cells: ['Komoditas', 'Semangka'] },
              { kind: 'row', cells: ['Pola tanam', 'Tunggal (monokultur)'] },
              { kind: 'row', cells: ['Ukuran lahan', '18 m × 21 m = 378 m²'] },
              { kind: 'row', cells: ['Hamparan / baris', '4 hamparan, 8 baris tanam (2 baris per hamparan)'] },
              { kind: 'row', cells: ['Jarak tanam dalam baris', '50 cm'] },
              { kind: 'row', cells: ['Kebutuhan benih', '361 benih (disiapkan ±400 biji termasuk cadangan sulam)'] },
              { kind: 'row', cells: ['Umur panen', '±60–75 hari setelah tanam (HST), tergantung varietas'] }
            ]
          },
          {
            type: 'paragraph',
            text: 'Catatan: jumlah 361 benih mengikuti perhitungan yang diberikan. Jumlah tanaman riil bergantung pada panjang baris di lapangan, sehingga sebaiknya dicek ulang saat pemasangan mulsa.'
          }
        ]
      },
      {
        id: 'tujuan-sasaran',
        heading: '2. Tujuan dan Sasaran',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'Memanfaatkan lahan 378 m² untuk produksi semangka secara efisien dengan mulsa plastik.' },
              { text: 'Menjaga populasi tanaman sesuai jarak tanam 50 cm agar pertumbuhan seragam.' },
              { text: 'Mengendalikan hama dan penyakit tepat waktu dengan biaya terkendali.' },
              { text: 'Menyusun anggaran awal yang sederhana sebagai dasar pengambilan keputusan.' }
            ]
          }
        ]
      },
      {
        id: 'rencana-kegiatan',
        heading: '3. Rencana Kegiatan Budidaya',
        blocks: [
          {
            type: 'table',
            headers: ['No', 'Waktu', 'Kegiatan', 'Alat & bahan'],
            colAlign: ['center', 'left', 'left', 'left'],
            rows: [
              { kind: 'row', cells: ['1', 'Minggu 1', 'Pembersihan lahan, pengolahan tanah (bajak/rotary), pemberian dolomit', 'Traktor tangan, cangkul, dolomit'] },
              { kind: 'row', cells: ['2', 'Minggu 1–2', 'Persemaian: rendam benih, semai di polybag ±7–10 hari', 'Benih, polybag, media semai'] },
              { kind: 'row', cells: ['3', 'Minggu 2', 'Pembuatan 4 hamparan/bedengan (2 baris tanam per hamparan) dan parit drainase', 'Cangkul, meteran, patok, tali'] },
              { kind: 'row', cells: ['4', 'Minggu 2', 'Pemberian pupuk kandang, pasang mulsa plastik hitam-perak, buat lubang tanam jarak 50 cm', 'Pupuk kandang, mulsa'] },
              { kind: 'row', cells: ['5', '0 HST', 'Tanam bibit sehat ke lubang mulsa (sore hari), siram', 'Gembor, bibit'] },
              { kind: 'row', cells: ['6', 'Minggu 1 HST', 'Penyulaman tanaman mati atau lemah (gunakan bibit cadangan)', 'Bibit cadangan'] },
              { kind: 'row', cells: ['7', 'Minggu 2 HST', 'Pemupukan susulan I (NPK) cara kocor/tugal', 'NPK, gembor'] },
              { kind: 'row', cells: ['8', 'Minggu 2–5 HST', 'Pengarahan sulur & pemangkasan; pilih 1–2 buah/tanaman pada ruas ke-8–12', 'Gunting pangkas'] },
              { kind: 'row', cells: ['9', 'Minggu 4–6 HST', 'Pemupukan susulan II (NPK + KCl) saat pembungaan–pembuahan', 'NPK, KCl'] },
              { kind: 'row', cells: ['10', 'Rutin (2x/minggu)', 'Pengamatan hama & penyakit; penyemprotan bila serangan ada atau 7–10 hari sekali', 'Sprayer, pembasmi OPT'] },
              { kind: 'row', cells: ['11', 'Rutin', 'Penyiraman pagi/sore, penyiangan gulma di parit, kurangi air 7–10 hari menjelang panen', 'Pompa air, BBM'] },
              { kind: 'row', cells: ['12', 'Minggu 9–11 HST', 'Panen bertahap (sesuai varietas): ketuk buah, tangkai mengering, warna dasar buah menguning', 'Gunting, karung/keranjang'] },
              { kind: 'row', cells: ['13', 'Setelah panen', 'Pembersihan lahan, evaluasi hasil dan biaya', '—'] }
            ]
          },
          {
            type: 'paragraph',
            text: 'Minggu 1–2 adalah minggu persiapan sebelum tanam. 0 HST = hari tanam; "Minggu … HST" dihitung sejak hari tanam (HST = hari setelah tanam).'
          }
        ]
      },
      {
        id: 'rencana-anggaran',
        heading: '4. Rencana Anggaran Sederhana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Harga satuan bersifat perkiraan dan perlu disesuaikan dengan harga di toko pertanian setempat. Alat budidaya diasumsikan sudah tersedia sendiri dan biaya tenaga kerja tidak dihitung.'
          },
          {
            type: 'table',
            headers: ['No', 'Uraian', 'Volume', 'Harga satuan', 'Jumlah'],
            colAlign: ['center', 'left', 'right', 'right', 'right'],
            rows: [
              { kind: 'group', title: 'A. BAHAN' },
              { kind: 'row', cells: ['1', 'Benih semangka (361 + ±10% cadangan sulam)', '400 biji', 'Rp 1.000', 'Rp 400.000'] },
              { kind: 'row', cells: ['2', 'Mulsa plastik hitam-perak (lebar 1 m)', '100 meter', 'Rp 3.500', 'Rp 350.000'] },
              { kind: 'row', cells: ['3', 'Media semai & polybag kecil', '1 paket', 'Rp 100.000', 'Rp 100.000'] },
              { kind: 'row', cells: ['4', 'Pupuk kandang matang (karung 25 kg)', '20 karung', 'Rp 15.000', 'Rp 300.000'] },
              { kind: 'row', cells: ['5', 'Dolomit / kapur pertanian', '20 kg', 'Rp 2.500', 'Rp 50.000'] },
              { kind: 'row', cells: ['6', 'Pupuk NPK 16-16-16', '20 kg', 'Rp 20.000', 'Rp 400.000'] },
              { kind: 'row', cells: ['7', 'Pupuk kalium (KCl)', '5 kg', 'Rp 25.000', 'Rp 125.000'] },
              { kind: 'row', cells: ['8', 'Pembasmi OPT: insektisida 2 botol, fungisida 2 botol, perekat 1 botol', '1 paket', 'Rp 330.000', 'Rp 330.000'] },
              { kind: 'row', cells: ['9', 'Tali rafia & patok', '1 paket', 'Rp 50.000', 'Rp 50.000'] },
              { kind: 'group', title: 'B. BAHAN BAKAR ALSINTAN' },
              { kind: 'row', cells: ['10', 'BBM traktor tangan, pompa air & sprayer mesin', '25 liter', 'Rp 10.000', 'Rp 250.000'] },
              { kind: 'summary', label: 'Subtotal A + B', value: 'Rp 2.355.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'summary', label: 'Cadangan biaya tak terduga (±10%)', value: 'Rp 240.000', labelSpan: 4 },
              { kind: 'summary', label: 'TOTAL ANGGARAN', value: 'Rp 2.595.000', labelSpan: 4, highlight: 'total' }
            ]
          },
          {
            type: 'paragraph',
            text: 'Rekap: Bahan Rp 2.105.000 · Bahan bakar Rp 250.000.'
          }
        ]
      },
      {
        id: 'catatan-pelaksanaan',
        heading: '5. Catatan Pelaksanaan',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'Rendam benih 4–6 jam sebelum semai untuk mempercepat perkecambahan.' },
              { text: 'Pastikan drainase baik; semangka tidak tahan genangan.' },
              { text: 'Rotasi dengan tanaman non-cucurbitaceae pada musim berikutnya untuk menekan penyakit tular tanah.' },
              { text: 'Baca label pestisida (dosis, interval, masa tunggu panen) dan gunakan alat pelindung diri saat menyemprot.' }
            ]
          }
        ]
      }
    ]
  },

  cabai: {
    commodityId: 'cabai',
    shortLabel: 'Cabai Rawit',
    pdfUrl: '/assets/aistudio/Orientasi_Perencanaan_Budidaya_Cabai_Rawit__1__b5c8b047.pdf',
    pdfFilename: 'Orientasi_Perencanaan_Budidaya_Cabai_Rawit.pdf',
    pageCount: 4,
    title: 'ORIENTASI DAN PERENCANAAN BUDIDAYA TANAMAN CABAI RAWIT',
    scientificOrSubtitle: 'Capsicum frutescens L.',
    meta: 'SMKN PP 5 Konawe · Program Keahlian ATPH · Kelas XI',
    sections: [
      {
        id: 'orientasi',
        heading: 'A. Orientasi',
        blocks: [
          {
            type: 'paragraph',
            text: 'Cabai rawit adalah sayuran buah dari keluarga terung-terungan (Solanaceae) yang berasa pedas dan bernilai ekonomi tinggi. Budidayanya dimulai dari persemaian ±4 minggu, lalu bibit dipindah ke bedengan bermulsa. Panen pertama dapat dilakukan pada umur ±80–90 hari setelah tanam (HST), dan panen berulang setiap 5–7 hari selama ±3–4 bulan. Mulsa dan ajir membantu menekan gulma, menjaga kelembapan, dan menjaga tanaman tetap tegak.'
          },
          { type: 'subheading', text: 'Tujuan kegiatan:' },
          {
            type: 'bullets',
            items: [
              { text: 'Peserta didik memahami alur budidaya cabai rawit dari persemaian sampai panen dan pascapanen.' },
              { text: 'Peserta didik mampu menghitung kebutuhan benih, bahan, dan biaya budidaya.' },
              { text: 'Peserta didik bekerja aman dan sesuai prosedur dengan APD lengkap, terutama saat memanen dan menyemprot.' }
            ]
          },
          { type: 'subheading', text: 'Syarat tumbuh singkat:' },
          {
            type: 'bullets',
            items: [
              { text: 'Ketinggian 0–1.000 m dpl, suhu udara ideal 24–28 °C, cahaya matahari penuh.' },
              { text: 'Tanah gembur, kaya bahan organik, drainase baik, pH 6,0–6,5.' },
              { text: 'Jangan menanam setelah tanaman sekeluarga (tomat, terong, kentang, cabai) agar penyakit tidak menumpuk.' }
            ]
          }
        ]
      },
      {
        id: 'data-lahan',
        heading: 'B. Data Lahan dan Tata Letak',
        blocks: [
          {
            type: 'table',
            headers: ['Keterangan', 'Data'],
            rows: [
              { kind: 'row', cells: ['Luas lahan', '20 m × 22 m = 440 m²'] },
              { kind: 'row', cells: ['Jumlah bedengan', '11 bedengan'] },
              { kind: 'row', cells: ['Ukuran bedengan', 'Panjang 19 m · lebar 100 cm · tinggi 30 cm · parit 50 cm'] },
              { kind: 'row', cells: ['Pola tanam', 'Double row (2 baris per bedengan, zig-zag)'] },
              { kind: 'row', cells: ['Jarak tanam', '50 cm dalam baris (ujung baris 25 cm dari tepi bedengan)'] },
              { kind: 'row', cells: ['Luas bedengan bersih', '11 × 19 m × 1 m = 209 m²'] },
              { kind: 'row', cells: ['Luas bedengan + parit', '11 × 19 m × 1,5 m = 313,5 m²'] },
              { kind: 'row', cells: ['Sisa lahan', '±126,5 m² untuk lorong, area kerja, kompos, dan persemaian'] }
            ]
          },
          {
            type: 'callout',
            label: 'Tata letak:',
            text: '11 bedengan disusun sejajar sepanjang sisi 22 m (11 × 1,5 m = 16,5 m), sedangkan panjang bedengan 19 m mengikuti sisi 20 m dengan tepi lahan 0,5 m di kiri dan kanan. Sisa sisi 22 m (5,5 m) digunakan sebagai lorong dan area kerja.'
          }
        ]
      },
      {
        id: 'kebutuhan-benih',
        heading: 'C. Perhitungan Kebutuhan Benih',
        blocks: [
          {
            type: 'table',
            headers: ['No', 'Langkah perhitungan', 'Hasil'],
            colAlign: ['center', 'left', 'right'],
            rows: [
              { kind: 'row', cells: ['1', 'Lubang tanam per baris: 19 m ÷ 0,5 m', '38 lubang'] },
              { kind: 'row', cells: ['2', 'Lubang tanam per bedengan: 38 × 2 baris', '76 lubang'] },
              { kind: 'row', cells: ['3', 'Bibit siap tanam (1 bibit per lubang): 76 × 11 bedengan', '836 bibit'] },
              { kind: 'row', cells: ['4', 'Cadangan penyulaman 10%', '84 bibit'] },
              { kind: 'row', cells: ['5', 'Bibit yang dibutuhkan: 836 + 84', '920 bibit'] },
              { kind: 'row', cells: ['6', 'Dengan daya tumbuh dan seleksi bibit 85%: 920 ÷ 0,85', '1.083 biji'] },
              { kind: 'row', cells: ['7', 'Benih untuk uji daya kecambah', '50 biji'] },
              { kind: 'row', cells: ['8', 'Jumlah kebutuhan: 1.083 + 50', '1.133 biji'] },
              { kind: 'row', cells: ['9', 'Dibulatkan menjadi kebutuhan benih', '1.200 biji'], bold: true, highlight: 'subtle' }
            ]
          },
          {
            type: 'paragraph',
            italic: true,
            text: 'Benih disemai 1 biji per lubang tray semai (22 tray) dan dipindah ke bedengan setelah berumur ±25–30 hari (4–5 daun). Setiap bedengan ditanami 76 tanaman, total 836 tanaman.'
          }
        ]
      },
      {
        id: 'pupuk-bahan',
        heading: 'D. Kebutuhan Pupuk dan Bahan Lain',
        blocks: [
          {
            type: 'table',
            headers: ['Bahan', 'Dosis per bedengan', '× 11 bedengan', 'Dibeli'],
            colAlign: ['left', 'center', 'center', 'center'],
            rows: [
              { kind: 'row', cells: ['Pupuk kandang / kompos', '38 kg (2 kg/m²)', '418 kg', '420 kg'] },
              { kind: 'row', cells: ['NPK dasar', '600 g', '6,6 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan I (±14 HST)', '200 g', '2,2 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan II (±28 HST)', '300 g', '3,3 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan III (±42 HST)', '300 g', '3,3 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan IV (±56 HST)', '300 g', '3,3 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan V (±70 HST)', '200 g', '2,2 kg', '—'] },
              { kind: 'row', cells: ['Total NPK 15-15-15', '1,9 kg', '20,9 kg', '21 kg'], bold: true, highlight: 'subtle' },
              { kind: 'row', cells: ['Dolomit (bila pH < 5,5)', '3 kg', '33 kg', '33 kg'] },
              { kind: 'row', cells: ['Mulsa hitam perak', '20 m (19 m + timbun ujung)', '220 m', '220 m'] },
              { kind: 'row', cells: ['Ajir bambu ±1,2 m', '76 batang (1 per tanaman)', '836 batang', '+5% = 880 batang'] }
            ]
          }
        ]
      },
      {
        id: 'jadwal-kegiatan',
        heading: 'E. Jadwal Kegiatan',
        blocks: [
          {
            type: 'table',
            headers: ['Waktu', 'Kegiatan', 'Tahapan'],
            rows: [
              { kind: 'row', cells: ['±4 minggu sebelum tanam', 'Seleksi benih, uji daya kecambah, penyemaian di tray', 'Persemaian'] },
              { kind: 'row', cells: ['±2 minggu sebelum tanam', 'Sanitasi lahan, pengolahan lahan (hand traktor), pembuatan bedengan, pupuk dasar, pasang mulsa', 'Persiapan lahan'] },
              { kind: 'row', cells: ['Sebelum 0 HST', 'Buat lubang tanam jarak 50 cm zig-zag pada mulsa', 'Persiapan lahan'] },
              { kind: 'row', cells: ['0 HST', 'Pindah tanam bibit umur ±25–30 hari pada sore hari, siram, pasang papan label', 'Penanaman'] },
              { kind: 'row', cells: ['3–7 HST', 'Penyulaman bibit yang mati', 'Pemeliharaan'] },
              { kind: 'row', cells: ['7–10 HST', 'Pasang ajir dan ikat batang; mulai pengamatan OPT', 'Pemeliharaan'] },
              { kind: 'row', cells: ['±14 HST', 'Pupuk susulan I; pewiwilan tunas di bawah percabangan pertama', 'Pemeliharaan'] },
              { kind: 'row', cells: ['±28, 42, 56, 70 HST', 'Pupuk susulan II, III, IV, dan V', 'Pemeliharaan'] },
              { kind: 'row', cells: ['±80–90 HST', 'Panen pertama (buah merah), lalu panen setiap 5–7 hari selama ±3–4 bulan', 'Panen dan pascapanen'] },
              { kind: 'row', cells: ['Sepanjang musim', 'Penyiraman, penyiangan, pengamatan OPT 2–3 kali per minggu, perangkap, sanitasi', 'Pemeliharaan dan PHT'] }
            ]
          }
        ]
      },
      {
        id: 'anggaran-sederhana',
        heading: 'F. Anggaran Sederhana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Anggaran berikut untuk alat dan bahan habis pakai. Harga satuan adalah perkiraan dan perlu disesuaikan dengan harga di toko pertanian setempat. Alat yang sudah dimiliki sekolah (cangkul, sekop, sprayer, pH meter, timbangan, hand traktor) tidak dianggarkan.'
          },
          {
            type: 'table',
            headers: ['No', 'Uraian', 'Volume', 'Harga satuan', 'Jumlah'],
            colAlign: ['center', 'left', 'right', 'right', 'right'],
            rows: [
              { kind: 'group', title: 'A. Benih dan penyemaian' },
              { kind: 'row', cells: ['1', 'Benih cabai rawit hibrida', '1.200 biji', 'Rp 500', 'Rp 600.000'] },
              { kind: 'row', cells: ['2', 'Tray semai 50 lubang', '22 buah', 'Rp 8.000', 'Rp 176.000'] },
              { kind: 'row', cells: ['3', 'Media semai (tanah + kompos + sekam)', '35 kg', 'Rp 3.000', 'Rp 105.000'] },
              { kind: 'group', title: 'B. Mulsa dan ajir' },
              { kind: 'row', cells: ['4', 'Mulsa plastik hitam perak (lebar 120 cm)', '220 meter', 'Rp 3.000', 'Rp 660.000'] },
              { kind: 'row', cells: ['5', 'Ajir bambu ±1,2 m', '880 batang', 'Rp 800', 'Rp 704.000'] },
              { kind: 'row', cells: ['6', 'Tali rafia', '6 rol', 'Rp 15.000', 'Rp 90.000'] },
              { kind: 'group', title: 'C. Pupuk' },
              { kind: 'row', cells: ['7', 'Pupuk kandang / kompos matang', '420 kg', 'Rp 1.000', 'Rp 420.000'] },
              { kind: 'row', cells: ['8', 'NPK 15-15-15 (dasar + susulan)', '21 kg', 'Rp 20.000', 'Rp 420.000'] },
              { kind: 'row', cells: ['9', 'Dolomit (bila pH < 5,5)', '33 kg', 'Rp 2.000', 'Rp 66.000'] },
              { kind: 'group', title: 'D. Pengendalian OPT' },
              { kind: 'row', cells: ['10', 'Insektisida terdaftar untuk cabai', '3 botol', 'Rp 50.000', 'Rp 150.000'] },
              { kind: 'row', cells: ['11', 'Fungisida terdaftar untuk cabai', '4 bungkus', 'Rp 45.000', 'Rp 180.000'] },
              { kind: 'row', cells: ['12', 'Perangkap kuning (perekat)', '12 lembar', 'Rp 5.000', 'Rp 60.000'] },
              { kind: 'row', cells: ['13', 'Atraktan lalat buah (metil eugenol)', '1 botol', 'Rp 25.000', 'Rp 25.000'] },
              { kind: 'group', title: 'E. Bahan bakar alsintan (hand traktor)' },
              { kind: 'row', cells: ['14', 'Bahan bakar', '10 liter', 'Rp 10.000', 'Rp 100.000'] },
              { kind: 'row', cells: ['15', 'Oli mesin', '1 liter', 'Rp 50.000', 'Rp 50.000'] }
            ]
          },
          {
            type: 'table',
            headers: ['Rekapitulasi', 'Jumlah'],
            colAlign: ['left', 'right'],
            rows: [
              { kind: 'row', cells: ['Subtotal (A–E)', 'Rp 3.806.000'] },
              { kind: 'row', cells: ['Cadangan biaya tak terduga 10%', 'Rp 380.600'] },
              { kind: 'row', cells: ['TOTAL ANGGARAN', 'Rp 4.186.600'], bold: true, highlight: 'total' }
            ]
          },
          { type: 'subheading', text: 'Catatan:' },
          {
            type: 'bullets',
            items: [
              { text: 'Pestisida hanya dipakai bila serangan tinggi dan atas arahan guru atau pendamping industri; dosis mengikuti label kemasan.' },
              { text: 'Dolomit hanya dibeli bila pH tanah di bawah 5,5 (hemat Rp 66.000). Bila hand traktor disewa, tambahkan biaya sewa.' }
            ]
          }
        ]
      }
    ]
  },

  tomat: {
    commodityId: 'tomat',
    shortLabel: 'Tomat',
    pdfUrl: '/assets/aistudio/Rencana_Budidaya_Tomat_aef7134b.pdf',
    pdfFilename: 'Rencana_Budidaya_Tomat.pdf',
    pageCount: 4,
    title: 'RENCANA BUDIDAYA TOMAT',
    scientificOrSubtitle: 'Orientasi, Perencanaan, dan Anggaran Sederhana',
    meta: 'Lahan 18 m × 18 m (324 m²) | Disusun 13 November 2026',
    sections: [
      {
        id: 'orientasi-umum',
        heading: '1. Orientasi Umum',
        blocks: [
          {
            type: 'paragraph',
            text: 'Dokumen ini memuat gambaran singkat budidaya tomat pada lahan 18 m × 18 m dengan pola tanam tunggal, disertai jadwal kegiatan dan anggaran sederhana untuk benih, mulsa, pupuk, pengendalian organisme pengganggu tanaman (OPT), serta bahan bakar alat dan mesin pertanian (alsintan).'
          },
          {
            type: 'table',
            rows: [
              { kind: 'row', cells: ['Luas lahan', '18 m × 18 m = 324 m²'] },
              { kind: 'row', cells: ['Pola tanam', 'Tunggal (monokultur tomat)'] },
              { kind: 'row', cells: ['Jarak tanam', '60 cm dalam baris'] },
              { kind: 'row', cells: ['Jumlah hamparan', '4 hamparan, memanjang 18 m'] },
              { kind: 'row', cells: ['Jumlah baris tanam', '8 baris (2 baris per hamparan)'] },
              { kind: 'row', cells: ['Populasi tanaman', '±240 tanaman (8 baris × 30 tanaman per baris)'] },
              { kind: 'row', cells: ['Kebutuhan benih', '324 butir (sudah termasuk cadangan sulam dan seleksi bibit, ±35%)'] },
              { kind: 'row', cells: ['Mulsa', 'Plastik hitam perak (PHP), lebar 100 cm'] },
              { kind: 'row', cells: ['Alsintan', 'Traktor tangan (olah tanah) dan pompa air (irigasi)'] },
              { kind: 'row', cells: ['Varietas', 'Tomat hibrida yang adaptif di dataran rendah; tipe determinate/semi-determinate lebih mudah dikelola'] }
            ]
          }
        ]
      },
      {
        id: 'tata-letak',
        heading: '2. Tata Letak dan Dasar Perencanaan',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'Setiap hamparan ditanami 2 baris sepanjang 18 m. Dengan jarak tanam 60 cm, satu baris memuat 30 tanaman, sehingga 8 baris menghasilkan ±240 tanaman.' },
              { text: 'Kebutuhan benih 324 butir mencakup cadangan sulam dan seleksi bibit yang kurang sehat (selisih 84 butir dari populasi tanam).' },
              { text: 'Bedengan dibuat searah utara–selatan agar cahaya matahari merata, lebar 100 cm (menyesuaikan lebar mulsa), tinggi ±30 cm.' },
              { text: 'Total panjang bedengan bermulsa 4 × 18 m = 72 m. Mulsa dibeli 1 rol berisi 100 m untuk cadangan potongan dan sambungan; sisanya dapat dipakai musim berikutnya.' },
              { text: 'Ruang antar hamparan dimanfaatkan sebagai jalur kerja traktor tangan, parit drainase, dan tempat pompa air.' },
              { text: 'Tomat lebih rentan penyakit saat curah hujan tinggi. Bila ditanam di musim hujan, perkuat drainase dan tingkatkan pemantauan penyakit.' }
            ]
          }
        ]
      },
      {
        id: 'jadwal-kegiatan',
        heading: '3. Jadwal Kegiatan Budidaya',
        blocks: [
          {
            type: 'paragraph',
            text: 'HST = hari setelah tanam pindah. Dosis pupuk adalah acuan umum dan dapat disesuaikan dengan anjuran penyuluh atau hasil uji tanah.'
          },
          {
            type: 'table',
            headers: ['Waktu', 'Kegiatan', 'Keterangan'],
            rows: [
              { kind: 'row', cells: ['Minggu 1', 'Semai benih; olah tanah pertama dan pengapuran', 'Benih 324 butir ke tray semai. Dolomit disebar merata, lalu dibajak dengan traktor tangan.'] },
              { kind: 'row', cells: ['Minggu 2', 'Olah tanah kedua, buat 4 bedengan, pupuk dasar', 'Pupuk kandang ±1 kg per tanaman (10 karung). Bedengan lebar 100 cm, tinggi ±30 cm, parit drainase di sisi bedengan.'] },
              { kind: 'row', cells: ['Minggu 3', 'Pasang mulsa, buat lubang tanam, pasang ajir', 'Lubang tanam jarak 60 cm. Siram bedengan sebelum dan sesudah mulsa dipasang.'] },
              { kind: 'row', cells: ['Minggu 4', 'Tanam pindah (bibit umur ±21–25 hari)', 'Tanam sore hari, 240 bibit terbaik; sisanya cadangan sulam. Siram setelah tanam.'] },
              { kind: 'row', cells: ['7 HST', 'Penyulaman; pasang perangkap kuning', 'Ganti tanaman mati dengan bibit cadangan.'] },
              { kind: 'row', cells: ['10 HST', 'Pemupukan susulan I; pengikatan ke ajir', 'NPK ±25 g/tanaman + urea ±20 g/tanaman. Mulai pewiwilan tunas air.'] },
              { kind: 'row', cells: ['24 HST', 'Pemupukan susulan II', 'NPK ±25 g/tanaman + urea ±20 g/tanaman.'] },
              { kind: 'row', cells: ['38 HST', 'Pemupukan susulan III (awal pembungaan)', 'NPK ±25 g/tanaman + KCl ±20 g/tanaman; semprot pupuk daun dan kalsium.'] },
              { kind: 'row', cells: ['52 HST', 'Pemupukan susulan IV (pembuahan)', 'NPK ±25 g/tanaman + KCl ±20 g/tanaman.'] },
              { kind: 'row', cells: ['Tiap 7–10 hari', 'Pemantauan dan penyemprotan pencegahan OPT', 'Fungisida dan insektisida digilir sesuai gejala dan label; gunakan APD.'] },
              { kind: 'row', cells: ['Harian/mingguan', 'Penyiraman, pewiwilan, pengikatan', 'Siram pagi atau sore, jaga kelembapan tanah stabil.'] },
              { kind: 'row', cells: ['65–80 HST', 'Panen', 'Petik buah masak 60–80% merah, ulangi tiap 2–3 hari selama ±4–6 minggu.'] }
            ]
          }
        ]
      },
      {
        id: 'anggaran-sederhana',
        heading: '4. Anggaran Sederhana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Anggaran dihitung untuk satu musim tanam. Tenaga kerja sendiri dan sewa/pemilikan traktor tangan serta pompa air tidak dihitung.'
          },
          {
            type: 'table',
            headers: ['No', 'Uraian', 'Volume', 'Harga Satuan', 'Jumlah'],
            colAlign: ['center', 'left', 'right', 'right', 'right'],
            rows: [
              { kind: 'group', title: 'A. Benih dan Persemaian' },
              { kind: 'row', cells: ['1', 'Benih tomat hibrida, 324 butir (±100 butir/kemasan)', '4 kemasan', 'Rp35.000', 'Rp140.000'] },
              { kind: 'row', cells: ['2', 'Tray semai 72 lubang', '5 buah', 'Rp10.000', 'Rp50.000'] },
              { kind: 'row', cells: ['3', 'Media semai (cocopeat + arang sekam)', '1 paket', 'Rp50.000', 'Rp50.000'] },
              { kind: 'summary', label: 'Subtotal A', value: 'Rp240.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'B. Mulsa dan Penunjang Tanam' },
              { kind: 'row', cells: ['4', 'Mulsa plastik hitam perak, lebar 100 cm × 100 m', '1 rol', 'Rp192.000', 'Rp192.000'] },
              { kind: 'row', cells: ['5', 'Ajir bambu 1,5–1,8 m', '260 batang', 'Rp1.000', 'Rp260.000'] },
              { kind: 'row', cells: ['6', 'Tali rafia', '2 gulung', 'Rp15.000', 'Rp30.000'] },
              { kind: 'row', cells: ['7', 'Kawat U / pasak penahan mulsa', '1 paket', 'Rp20.000', 'Rp20.000'] },
              { kind: 'summary', label: 'Subtotal B', value: 'Rp502.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'C. Pupuk' },
              { kind: 'row', cells: ['8', 'Pupuk kandang matang (ayam/sapi), @25 kg', '10 karung', 'Rp20.000', 'Rp200.000'] },
              { kind: 'row', cells: ['9', 'Kapur dolomit, @25 kg', '2 sak', 'Rp25.000', 'Rp50.000'] },
              { kind: 'row', cells: ['10', 'NPK Phonska 15-15-15 (subsidi, HET Rp1.840/kg)', '25 kg', 'Rp1.840', 'Rp46.000'] },
              { kind: 'row', cells: ['11', 'Urea (subsidi, HET Rp1.800/kg)', '10 kg', 'Rp1.800', 'Rp18.000'] },
              { kind: 'row', cells: ['12', 'KCl (pupuk kalium)', '10 kg', 'Rp14.000', 'Rp140.000'] },
              { kind: 'row', cells: ['13', 'Pupuk daun dan kalsium', '1 paket', 'Rp75.000', 'Rp75.000'] },
              { kind: 'summary', label: 'Subtotal C', value: 'Rp529.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'D. Pengendalian OPT' },
              { kind: 'row', cells: ['14', 'Fungisida kontak (mis. berbahan aktif mankozeb)', '2 kemasan', 'Rp50.000', 'Rp100.000'] },
              { kind: 'row', cells: ['15', 'Insektisida (mis. abamektin/emamektin)', '2 botol', 'Rp60.000', 'Rp120.000'] },
              { kind: 'row', cells: ['16', 'Agens hayati (Trichoderma)', '1 paket', 'Rp40.000', 'Rp40.000'] },
              { kind: 'row', cells: ['17', 'Perangkap kuning (yellow sticky trap)', '10 lembar', 'Rp5.000', 'Rp50.000'] },
              { kind: 'summary', label: 'Subtotal D', value: 'Rp310.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'E. Bahan Bakar dan Oli Alsintan' },
              { kind: 'row', cells: ['18', 'Biosolar untuk traktor tangan (olah tanah 2 kali)', '5 liter', 'Rp6.800', 'Rp34.000'] },
              { kind: 'row', cells: ['19', 'Pertalite untuk pompa air (irigasi ±3–4 bulan)', '20 liter', 'Rp10.000', 'Rp200.000'] },
              { kind: 'row', cells: ['20', 'Oli mesin', '1 liter', 'Rp60.000', 'Rp60.000'] },
              { kind: 'summary', label: 'Subtotal E', value: 'Rp294.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'F. Alat Sederhana (dapat dipakai ulang)' },
              { kind: 'row', cells: ['21', 'Cangkul', '2 buah', 'Rp85.000', 'Rp170.000'] },
              { kind: 'row', cells: ['22', 'Sprayer gendong 16 liter', '1 unit', 'Rp350.000', 'Rp350.000'] },
              { kind: 'row', cells: ['23', 'Gunting pangkas', '1 buah', 'Rp60.000', 'Rp60.000'] },
              { kind: 'row', cells: ['24', 'Selang air 1/2 inci', '30 meter', 'Rp4.000', 'Rp120.000'] },
              { kind: 'row', cells: ['25', 'Ember/gembor', '2 buah', 'Rp25.000', 'Rp50.000'] },
              { kind: 'summary', label: 'Subtotal F', value: 'Rp750.000', labelSpan: 4, highlight: 'subtle' }
            ]
          },
          { type: 'subheading', text: 'Rekapitulasi Anggaran' },
          {
            type: 'table',
            headers: ['Kode', 'Komponen', 'Jumlah'],
            colAlign: ['center', 'left', 'right'],
            rows: [
              { kind: 'row', cells: ['A', 'Benih dan Persemaian', 'Rp240.000'] },
              { kind: 'row', cells: ['B', 'Mulsa dan Penunjang Tanam', 'Rp502.000'] },
              { kind: 'row', cells: ['C', 'Pupuk', 'Rp529.000'] },
              { kind: 'row', cells: ['D', 'Pengendalian OPT', 'Rp310.000'] },
              { kind: 'row', cells: ['E', 'Bahan Bakar dan Oli Alsintan', 'Rp294.000'] },
              { kind: 'row', cells: ['', 'Subtotal sarana produksi (A–E)', 'Rp1.875.000'], bold: true, highlight: 'subtle' },
              { kind: 'row', cells: ['F', 'Alat Sederhana (dapat dipakai ulang)', 'Rp750.000'] },
              { kind: 'row', cells: ['', 'Jumlah (A–F)', 'Rp2.625.000'], bold: true, highlight: 'subtle' },
              { kind: 'row', cells: ['', 'Cadangan tak terduga 5%', 'Rp131.250'] },
              { kind: 'row', cells: ['', 'TOTAL ANGGARAN', 'Rp2.756.250'], bold: true, highlight: 'total' }
            ]
          }
        ]
      },
      {
        id: 'catatan-asumsi',
        heading: '5. Catatan Asumsi dan Sumber Harga',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'Harga Biosolar Rp6.800/liter dan Pertalite Rp10.000/liter mengacu pada harga Pertamina per November 2026 (harga subsidi dipertahankan hingga akhir Desember 2026). Bila membeli solar nonsubsidi, misalnya Dexlite Rp23.700/liter, biaya BBM naik.' },
              { text: 'Harga pupuk subsidi mengacu pada HET Urea Rp1.800/kg dan NPK Phonska Rp1.840/kg (Kepmentan No. 1117/2025). Pupuk dan solar subsidi umumnya mensyaratkan pembeli terdaftar atau memiliki rekomendasi. Jika tidak, gunakan harga pupuk nonsubsidi di kios setempat.' },
              { text: 'Harga mulsa (±Rp192.000 untuk rol 100 cm × 100 m) mengacu pada penawaran toko daring. Harga benih, KCl, pestisida, ajir, dan alat adalah perkiraan; sesuaikan dengan harga kios di daerah Anda.' },
              { text: 'Pestisida dipakai sesuai label dan gejala di lapangan, dengan alat pelindung diri. Pilih bahan aktif yang terdaftar untuk tomat.' },
              { text: 'Anggaran ini belum memasukkan perkiraan hasil panen dan pendapatan; dapat ditambahkan bila diperlukan.' }
            ]
          }
        ]
      }
    ]
  },

  timun: {
    commodityId: 'timun',
    shortLabel: 'Timun',
    pdfUrl: '/assets/aistudio/Rencana_Budidaya_Timun_7c1082fa.pdf',
    pdfFilename: 'Rencana_Budidaya_Timun.pdf',
    pageCount: 3,
    title: 'Rencana Budidaya Timun',
    scientificOrSubtitle: 'Orientasi, perencanaan, dan anggaran sederhana – lahan 19 m x 18 m (342 m²)',
    sections: [
      {
        id: 'orientasi-budidaya',
        heading: '1. Orientasi Budidaya',
        blocks: [
          {
            type: 'bullets',
            items: [
              { lead: 'Iklim dan lokasi.', text: 'Timun cocok di dataran rendah sampai menengah, suhu ± 24–30 °C, dan butuh sinar matahari penuh minimal 8 jam per hari.' },
              { lead: 'Tanah.', text: 'Tanah gembur, subur, drainase baik, pH 6,0–7,0. Bila tanah masam, beri dolomit saat olah tanah.' },
              { lead: 'Varietas.', text: 'Pilih varietas hibrida yang tahan penyakit dan sesuai selera pasar setempat. Umur panen ± 35–40 hari setelah tanam.' },
              { lead: 'Air.', text: 'Timun butuh air teratur tapi tidak tergenang. Pada musim kemarau siram pagi atau sore; pada musim hujan perdalam parit agar air cepat keluar.' },
              { lead: 'OPT utama.', text: 'Hama: kutu daun, thrips, lalat buah, kumbang daun. Penyakit: embun tepung, embun bulu, antraknosa, layu bakteri.' }
            ]
          }
        ]
      },
      {
        id: 'data-tata-letak',
        heading: '2. Data dan Tata Letak Tanam',
        blocks: [
          {
            type: 'paragraph',
            text: 'Rancangan berikut disusun dari data yang diberikan. Satu bedengan ditanami dua baris sehingga 12 bedengan menghasilkan 24 baris.'
          },
          {
            type: 'table',
            rows: [
              { kind: 'row', cells: ['Luas lahan', '19 m x 18 m = 342 m²'] },
              { kind: 'row', cells: ['Tata letak', '12 bedengan memanjang 19 m; tiap bedengan + parit ± 1,5 m (12 x 1,5 m = 18 m)'] },
              { kind: 'row', cells: ['Pola tanam', 'Ganda: 2 baris per bedengan, total 24 baris'] },
              { kind: 'row', cells: ['Jarak tanam', '60 cm dalam baris; ± 50 cm antar baris dalam bedengan'] },
              { kind: 'row', cells: ['Populasi tanaman', '24 baris x 31 tanaman = 744 tanaman'] },
              { kind: 'row', cells: ['Kebutuhan benih', '893 butir (populasi 744 + cadangan semai/sulam ± 20%)'] },
              { kind: 'row', cells: ['Mulsa', 'Plastik hitam perak lebar 120 cm: 12 x 19 m = 228 m, ditambah sisa 10% = ± 250 m'] }
            ]
          }
        ]
      },
      {
        id: 'jadwal-kegiatan',
        heading: '3. Jadwal Kegiatan',
        blocks: [
          {
            type: 'table',
            headers: ['Waktu', 'Kegiatan'],
            rows: [
              { kind: 'row', cells: ['H-14 s.d. H-7', 'Bersihkan lahan, olah tanah (bajak/rotari), tebar dolomit, buat 12 bedengan (tinggi ± 30 cm).'] },
              { kind: 'row', cells: ['H-7', 'Beri pupuk kandang dan NPK dasar, pasang mulsa, lubangi mulsa tiap 60 cm. Semai benih (polibag/tray).'] },
              { kind: 'row', cells: ['0 HST', 'Pindah tanam bibit umur 7–10 hari (daun 2–3 helai), sore hari, lalu siram.'] },
              { kind: 'row', cells: ['7 HST', 'Sulam tanaman mati, pasang ajir bambu dan ikat tanaman dengan tali rafia.'] },
              { kind: 'row', cells: ['10 dan 25 HST', 'Pupuk susulan NPK (kocor/tugal); pada 25 HST tambahkan KCl untuk pembuahan.'] },
              { kind: 'row', cells: ['Mingguan', 'Semprot pupuk daun, pangkas tunas air dan daun tua, pantau hama dan penyakit, semprot bila perlu.'] },
              { kind: 'row', cells: ['35–40 HST', 'Panen perdana, lalu panen tiap 2–3 hari sampai ± 55–60 HST.'] }
            ]
          }
        ]
      },
      {
        id: 'anggaran-biaya',
        heading: '4. Anggaran Biaya Sederhana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Harga satuan adalah asumsi umum dan perlu disesuaikan dengan harga di toko pertanian setempat. Tenaga kerja tidak dihitung (dianggap dikerjakan sendiri/keluarga).'
          },
          {
            type: 'table',
            headers: ['No', 'Uraian', 'Volume', 'Harga satuan', 'Jumlah'],
            colAlign: ['center', 'left', 'right', 'right', 'right'],
            rows: [
              { kind: 'group', title: 'A. Benih dan Semai' },
              { kind: 'row', cells: ['1', 'Benih timun hibrida', '893 butir', 'Rp 150', 'Rp 133.950'] },
              { kind: 'row', cells: ['2', 'Polibag/tray dan media semai', '1 paket', 'Rp 100.000', 'Rp 100.000'] },
              { kind: 'summary', label: 'Subtotal Benih dan Semai', value: 'Rp 233.950', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'B. Mulsa' },
              { kind: 'row', cells: ['3', 'Mulsa plastik hitam perak 120 cm', '250 m', 'Rp 1.800', 'Rp 450.000'] },
              { kind: 'row', cells: ['4', 'Pasak/penjepit mulsa', '1 paket', 'Rp 50.000', 'Rp 50.000'] },
              { kind: 'summary', label: 'Subtotal Mulsa', value: 'Rp 500.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'C. Pupuk' },
              { kind: 'row', cells: ['5', 'Pupuk kandang matang (±1 kg/tanaman)', '10 sak 50 kg', 'Rp 25.000', 'Rp 250.000'] },
              { kind: 'row', cells: ['6', 'Dolomit/kapur pertanian', '50 kg', 'Rp 2.000', 'Rp 100.000'] },
              { kind: 'row', cells: ['7', 'NPK 16-16-16 (dasar 5 kg + susulan 10 kg)', '15 kg', 'Rp 18.000', 'Rp 270.000'] },
              { kind: 'row', cells: ['8', 'KCl/MOP (susulan)', '5 kg', 'Rp 15.000', 'Rp 75.000'] },
              { kind: 'row', cells: ['9', 'Pupuk daun/cair', '2 botol', 'Rp 40.000', 'Rp 80.000'] },
              { kind: 'summary', label: 'Subtotal Pupuk', value: 'Rp 775.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'D. Pengendalian OPT' },
              { kind: 'row', cells: ['10', 'Fungisida (mankozeb/propineb)', '2 kemasan', 'Rp 55.000', 'Rp 110.000'] },
              { kind: 'row', cells: ['11', 'Insektisida (abamektin/imidakloprid)', '2 botol', 'Rp 60.000', 'Rp 120.000'] },
              { kind: 'row', cells: ['12', 'Perangkap kuning (yellow trap)', '20 lembar', 'Rp 5.000', 'Rp 100.000'] },
              { kind: 'row', cells: ['13', 'Perekat/perata pestisida', '1 botol', 'Rp 30.000', 'Rp 30.000'] },
              { kind: 'summary', label: 'Subtotal Pengendalian OPT', value: 'Rp 360.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'E. Bahan Bakar Alsintan' },
              { kind: 'row', cells: ['14', 'BBM traktor tangan (olah tanah, bedengan)', '5 liter', 'Rp 12.000', 'Rp 60.000'] },
              { kind: 'row', cells: ['15', 'BBM pompa air (penyiraman)', '15 liter', 'Rp 12.000', 'Rp 180.000'] },
              { kind: 'summary', label: 'Subtotal Bahan Bakar Alsintan', value: 'Rp 240.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'F. Penunjang Budidaya' },
              { kind: 'row', cells: ['16', 'Ajir bambu ± 2 m (1 ajir per 2 tanaman)', '400 batang', 'Rp 1.500', 'Rp 600.000'] },
              { kind: 'row', cells: ['17', 'Tali rafia', '3 gulung', 'Rp 15.000', 'Rp 45.000'] },
              { kind: 'summary', label: 'Subtotal Penunjang Budidaya', value: 'Rp 645.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'group', title: 'G. Peralatan (jika belum punya)' },
              { kind: 'row', cells: ['18', 'Sprayer punggung 16 liter', '1 unit', 'Rp 350.000', 'Rp 350.000'] },
              { kind: 'row', cells: ['19', 'Selang air', '25 m', 'Rp 6.000', 'Rp 150.000'] },
              { kind: 'row', cells: ['20', 'Perkakas (cangkul, sabit, gunting, pelubang mulsa)', '1 paket', 'Rp 150.000', 'Rp 150.000'] },
              { kind: 'summary', label: 'Subtotal Peralatan (jika belum punya)', value: 'Rp 650.000', labelSpan: 4, highlight: 'subtle' }
            ]
          },
          {
            type: 'table',
            headers: ['Rekapitulasi', 'Jumlah'],
            colAlign: ['left', 'right'],
            rows: [
              { kind: 'row', cells: ['Bahan operasional (A–F)', 'Rp 2.753.950'] },
              { kind: 'row', cells: ['Peralatan (G), jika belum punya', 'Rp 650.000'] },
              { kind: 'row', cells: ['Cadangan tak terduga 10%', 'Rp 340.395'] },
              { kind: 'row', cells: ['TOTAL ANGGARAN (dengan peralatan)', 'Rp 3.744.345'], bold: true, highlight: 'total' },
              { kind: 'row', cells: ['Total bila peralatan sudah dimiliki (A–F + cadangan 10%)', 'Rp 3.029.345'], bold: true, highlight: 'subtle' }
            ]
          }
        ]
      },
      {
        id: 'biaya-per-kg',
        heading: '5. Gambaran Biaya per Kilogram',
        blocks: [
          {
            type: 'paragraph',
            text: 'Perkiraan sederhana untuk melihat harga jual minimal agar biaya tertutup.'
          },
          {
            type: 'table',
            headers: ['Hasil per tanaman', '1,5 kg (rendah)', '2,5 kg (baik)'],
            colAlign: ['left', 'right', 'right'],
            rows: [
              { kind: 'row', cells: ['Perkiraan panen (744 tanaman)', '1.116 kg', '1.860 kg'] },
              { kind: 'row', cells: ['Biaya per kg (total dengan peralatan)', 'Rp 3.355', 'Rp 2.013'] }
            ]
          },
          {
            type: 'paragraph',
            italic: true,
            text: 'Hasil nyata bergantung varietas, cuaca, perawatan, dan serangan OPT.'
          }
        ]
      },
      {
        id: 'catatan-penting',
        heading: '6. Catatan Penting',
        blocks: [
          {
            type: 'bullets',
            items: [
              { text: 'Takaran pupuk dan dosis pestisida mengikuti label kemasan dan anjuran penyuluh pertanian setempat.' },
              { text: 'Rotasi pestisida dan patuhi masa tunggu panen sebelum timun dipetik.' },
              { text: 'Gunakan mulsa dan ajir agar buah bersih, tanaman sehat, dan panen lebih mudah.' },
              { text: 'Setelah panen, jangan menanam timun atau labu-labuan di lahan yang sama pada musim berikutnya.' }
            ]
          }
        ]
      }
    ]
  },

  melon: {
    commodityId: 'melon',
    shortLabel: 'Melon',
    pdfUrl: '/assets/aistudio/Orientasi_dan_Perencanaan_Budidaya_Tanaman_Melon__2__a5de1f7a.pdf',
    pdfFilename: 'Orientasi_dan_Perencanaan_Budidaya_Tanaman_Melon.pdf',
    pageCount: 5,
    title: 'ORIENTASI DAN PERENCANAAN BUDIDAYA TANAMAN MELON',
    scientificOrSubtitle: 'Cucumis melo L.',
    meta: 'SMKN PP 5 Konawe • Program Keahlian ATPH Kelas XII',
    sections: [
      {
        id: 'orientasi',
        heading: 'A. Orientasi',
        blocks: [
          {
            type: 'paragraph',
            text: 'Melon adalah tanaman buah semusim dari keluarga labu-labuan (Cucurbitaceae) yang memiliki rasa manis, aroma harum, dan nilai ekonomi tinggi. Budidayanya dimulai dari penyemaian benih selama ±10–14 hari, kemudian bibit dipindah tanam ke bedengan bermulsa plastik hitam perak. Tanaman melon memerlukan lanjaran atau ajir karena tumbuh merambat, serta pemangkasan tunas air dan seleksi buah (1–2 buah per tanaman) agar ukuran dan tingkat kemanisan (brix) buah optimal. Panen dilakukan satu kali (panen serentak/bertahap singkat) pada umur ±60–70 hari setelah tanam (HST).'
          },
          { type: 'subheading', text: 'Tujuan kegiatan:' },
          {
            type: 'bullets',
            items: [
              { text: 'Peserta didik memahami alur budidaya tanaman melon mulai dari penyemaian, pemangkasan, polinasi/seleksi buah, hingga panen dan pascapanen.' },
              { text: 'Peserta didik mampu menghitung kebutuhan benih, pupuk, ajir, dan analisis anggaran biaya budidaya secara tepat.' },
              { text: 'Peserta didik menerapkan keselamatan dan kesehatan kerja (K3) menggunakan APD lengkap, terutama saat aplikasi pemupukan dan pengendalian OPT.' }
            ]
          },
          { type: 'subheading', text: 'Syarat tumbuh singkat:' },
          {
            type: 'bullets',
            items: [
              { text: 'Ketinggian tempat ideal 250–700 m dpl (dapat beradaptasi di dataran rendah 0–250 m dpl dengan pengairan cukup), suhu udara optimal 25–30 °C, kelembapan udara 50–70%, dan penyinaran matahari penuh.' },
              { text: 'Tanah gembur (lempung berpasir), kaya bahan organik, tidak tergenang (drainase sangat baik), dan pH tanah ideal 6,0–6,8.' },
              { text: 'Lakukan rotasi tanaman; hindari menanam pada lahan bekas tanaman sekeluarga (semangka, mentimun, labu, paria) untuk memutus siklus layu Fusarium dan virus gemini.' }
            ]
          }
        ]
      },
      {
        id: 'data-lahan',
        heading: 'B. Data Lahan dan Tata Letak',
        blocks: [
          {
            type: 'table',
            headers: ['Keterangan', 'Data'],
            rows: [
              { kind: 'row', cells: ['Luas lahan', '20 m × 22 m = 440 m²'] },
              { kind: 'row', cells: ['Jumlah bedengan', '11 bedengan'] },
              { kind: 'row', cells: ['Ukuran bedengan', 'Panjang 19 m, lebar 100 cm, tinggi 35–40 cm, lebar parit 50 cm'] },
              { kind: 'row', cells: ['Pola tanam', 'Double row (2 baris per bedengan, sistem sejajar)'] },
              { kind: 'row', cells: ['Jarak tanam', '50 cm dalam baris × 60 cm antarbaris (ujung baris 25 cm dari tepi bedengan)'] },
              { kind: 'row', cells: ['Luas bedengan bersih', '11 × 19 m × 1,0 m = 209 m²'] },
              { kind: 'row', cells: ['Luas bedengan + parit', '11 × 19 m × 1,5 m = 313,5 m²'] },
              { kind: 'row', cells: ['Populasi tanaman', '76 lubang/bedengan × 11 bedengan = 836 tanaman'] },
              { kind: 'row', cells: ['Sisa lahan', '±126,5 m² untuk lorong utama, area kerja, rumah semai, dan gudang alat'] }
            ]
          },
          {
            type: 'callout',
            label: 'Tata letak:',
            text: 'Sebanyak 11 bedengan disusun sejajar sepanjang sisi 22 m (11 × 1,5 m = 16,5 m), sedangkan panjang bedengan 19 m mengikuti sisi 20 m dengan jarak tepi lahan 0,5 m di ujung kiri dan kanan. Sisa lebar sisi 22 m (5,5 m) dimanfaatkan sebagai lorong kerja utama dan area persiapan.'
          }
        ]
      },
      {
        id: 'kebutuhan-benih',
        heading: 'C. Perhitungan Kebutuhan Benih',
        blocks: [
          {
            type: 'table',
            headers: ['No', 'Langkah perhitungan', 'Hasil'],
            colAlign: ['center', 'left', 'left'],
            rows: [
              { kind: 'row', cells: ['1', 'Lubang tanam per baris: 19 m ÷ 0,5 m (ujung 25 cm dari tepi)', '38 lubang'] },
              { kind: 'row', cells: ['2', 'Lubang tanam per bedengan: 38 lubang × 2 baris (sejajar)', '76 lubang'] },
              { kind: 'row', cells: ['3', 'Total populasi tanaman (1 bibit/lubang): 76 × 11 bedengan', '836 tanaman'], bold: true },
              { kind: 'row', cells: ['4', 'Cadangan penyulaman 10% (10% × 836)', '84 bibit'] },
              { kind: 'row', cells: ['5', 'Total bibit siap tanam yang dibutuhkan: 836 + 84', '920 bibit'] },
              { kind: 'row', cells: ['6', 'Dengan daya tumbuh & seleksi bibit 85%: 920 ÷ 0,85', '1.083 biji'] },
              { kind: 'row', cells: ['7', 'Benih untuk uji daya kecambah', '50 biji'] },
              { kind: 'row', cells: ['8', 'Jumlah kebutuhan benih: 1.083 + 50', '1.133 biji'] },
              { kind: 'row', cells: ['9', 'Dibulatkan menjadi kebutuhan benih siap beli', '1.200 biji (3 kemasan @400 biji)'], bold: true, highlight: 'subtle' }
            ]
          },
          {
            type: 'paragraph',
            text: 'Benih disemai 1 biji per polibag semai kecil (ukuran 8 × 10 cm) atau tray semai 50 lubang (22 tray) setelah pemeraman 24–36 jam hingga muncul radikula. Bibit dipindah tanam ke bedengan setelah berumur 10–14 hari setelah semai (memiliki 2–3 daun sejati). Setiap bedengan ditanami 76 tanaman sehingga populasi total mencapai 836 tanaman.'
          }
        ]
      },
      {
        id: 'pupuk-bahan',
        heading: 'D. Kebutuhan Pupuk dan Bahan Lain',
        blocks: [
          {
            type: 'table',
            headers: ['Bahan', 'Dosis per bedengan', '11 bedengan', 'Dibeli'],
            rows: [
              { kind: 'row', cells: ['Pupuk kandang / kompos matang', '40 kg (±2 kg/m²)', '440 kg', '450 kg'] },
              { kind: 'row', cells: ['Pupuk dasar (NPK 16-16-16)', '1,0 kg', '11,0 kg', '—'] },
              { kind: 'row', cells: ['Pupuk dasar (SP-36 / Fosfat)', '0,8 kg', '8,8 kg', '9 kg'] },
              { kind: 'row', cells: ['NPK susulan I (±10 HST – vegetatif)', '0,5 kg (kocor)', '5,5 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan II (±20 HST – vegetatif)', '0,6 kg (kocor)', '6,6 kg', '—'] },
              { kind: 'row', cells: ['NPK susulan III (±30 HST – pembungaan)', '0,6 kg (kocor)', '6,6 kg', '—'] },
              { kind: 'row', cells: ['Total NPK 16-16-16', '2,7 kg', '29,7 kg', '30 kg'], bold: true, highlight: 'subtle' },
              { kind: 'row', cells: ['KNO₃ Putih / MKP (±40 & 50 HST – pembesaran & pemanis buah)', '0,8 kg (2 × 0,4 kg)', '8,8 kg', '9 kg'] },
              { kind: 'row', cells: ['Dolomit (bila pH < 6,0)', '3,5 kg', '38,5 kg', '40 kg'] },
              { kind: 'row', cells: ['Mulsa plastik hitam perak (lebar 120 cm)', '20 m (19 m + timbun ujung)', '220 m', '220 m (1 rol)'] },
              { kind: 'row', cells: ['Ajir bambu ±2,0 m (rambatan tegak)', '76 batang (1 per tanaman)', '836 batang', '+5% = 880 batang'] },
              { kind: 'row', cells: ['Bambu palang horizontal ±4 m', '10 batang (atas & tengah)', '110 batang', '110 batang'] }
            ]
          }
        ]
      },
      {
        id: 'jadwal-kegiatan',
        heading: 'E. Jadwal Kegiatan',
        blocks: [
          {
            type: 'table',
            headers: ['Waktu', 'Kegiatan', 'Tahapan'],
            rows: [
              { kind: 'row', cells: ['±2 minggu sebelum tanam', 'Sanitasi lahan, pengolahan tanah (hand traktor), pengapuran dolomit, pembuatan bedengan tinggi 35–40 cm, pemberian pupuk dasar, dan pemasangan mulsa hitam perak', 'Persiapan lahan'] },
              { kind: 'row', cells: ['10–14 hari sebelum tanam', 'Seleksi benih, pemeraman 24–36 jam, penyemaian di polibag/tray semai pada rumah semai ternaungi', 'Persemaian'] },
              { kind: 'row', cells: ['3 hari sebelum 0 HST', 'Pelubangan mulsa jarak 50 × 60 cm sejajar dan pemasangan ajir bambu ±2 m serta palang horizontal', 'Persiapan tanam'] },
              { kind: 'row', cells: ['0 HST', 'Pindah tanam bibit umur 10–14 hari (2–3 daun sejati) pada sore hari, penyiraman awal, pasang papan label', 'Penanaman'] },
              { kind: 'row', cells: ['3–5 HST', 'Penyulaman bibit yang mati atau tumbuh abnormal', 'Pemeliharaan'] },
              { kind: 'row', cells: ['7–25 HST', 'Pengikatan batang utama ke ajir (pola huruf S/angka 8) setiap 3–4 hari dan pewiwilan tunas air ruas ke-1 sampai ke-8', 'Pemeliharaan'] },
              { kind: 'row', cells: ['10, 20, dan 30 HST', 'Pemupukan susulan I, II, dan III (kocor NPK 16-16-16)', 'Pemeliharaan'] },
              { kind: 'row', cells: ['25–35 HST', 'Pemeliharaan tunas cabang produktif pada ruas ke-9 sampai ke-13, polinasi bunga betina pagi hari (pukul 07.00–09.30), dan pemangkasan pucuk (topping) pada ruas ke-25–28', 'Pemeliharaan generatif'] },
              { kind: 'row', cells: ['35–40 HST', 'Seleksi buah (menyisakan 1–2 buah terbaik berbentuk lonjong sempurna) dan penggantungan buah pada palang bambu', 'Pemeliharaan buah'] },
              { kind: 'row', cells: ['40 dan 50 HST', 'Pemupukan susulan IV dan V (KNO₃ Putih / MKP) untuk pembesaran buah, pembentukan jaring (net), dan peningkatan kadar gula', 'Pemeliharaan buah'] },
              { kind: 'row', cells: ['60–70 HST', 'Pengurangan penyiraman 5 hari menjelang panen, pemanenan buah matang (tangkai retak/aroma harum), sortasi, dan grading', 'Panen dan pascapanen'] },
              { kind: 'row', cells: ['Sepanjang musim', 'Penyiraman rutin (pagi/sore), penyiangan gulma di parit, pengamatan OPT 2–3 kali per minggu, pemasangan perangkap likat kuning, dan sanitasi daun tua', 'Pemeliharaan dan PHT'] }
            ]
          }
        ]
      },
      {
        id: 'anggaran-sederhana',
        heading: 'F. Anggaran Sederhana',
        blocks: [
          {
            type: 'paragraph',
            text: 'Anggaran berikut mencakup bahan habis pakai untuk satu siklus budidaya. Harga satuan merupakan estimasi dan perlu disesuaikan dengan harga pasar setempat. Peralatan milik sekolah (cangkul, sekop, gembor, handsprayer, pH meter, refraktometer, timbangan, hand traktor) tidak dianggarkan.'
          },
          {
            type: 'table',
            headers: ['No', 'Uraian', 'Volume', 'Harga satuan', 'Jumlah'],
            colAlign: ['center', 'left', 'right', 'right', 'right'],
            rows: [
              { kind: 'group', title: 'A. Benih dan penyemaian' },
              { kind: 'row', cells: ['1', 'Benih melon hibrida F1 (kemasan @400 biji)', '3 bungkus', 'Rp 220.000', 'Rp 660.000'] },
              { kind: 'row', cells: ['2', 'Tray semai 50 lubang', '22 buah', 'Rp 8.000', 'Rp 176.000'] },
              { kind: 'row', cells: ['3', 'Media semai (tanah halus + kompos + arang sekam)', '45 kg', 'Rp 3.000', 'Rp 135.000'] },
              { kind: 'group', title: 'B. Mulsa, ajir, dan tali rambat' },
              { kind: 'row', cells: ['4', 'Mulsa plastik hitam perak (lebar 120 cm)', '220 meter', 'Rp 3.000', 'Rp 660.000'] },
              { kind: 'row', cells: ['5', 'Ajir bambu ±2,0 m', '880 batang', 'Rp 1.000', 'Rp 880.000'] },
              { kind: 'row', cells: ['6', 'Bambu palang horizontal ±4 m', '110 batang', 'Rp 2.500', 'Rp 275.000'] },
              { kind: 'row', cells: ['7', 'Tali rafia / tali gawar (ikat batang & gantung buah)', '8 rol', 'Rp 15.000', 'Rp 120.000'] },
              { kind: 'group', title: 'C. Pupuk dan pembenah tanah' },
              { kind: 'row', cells: ['8', 'Pupuk kandang / kompos matang', '450 kg', 'Rp 1.000', 'Rp 450.000'] },
              { kind: 'row', cells: ['9', 'NPK 16-16-16 (dasar + susulan I–III)', '30 kg', 'Rp 20.000', 'Rp 600.000'] },
              { kind: 'row', cells: ['10', 'Pupuk SP-36 (pupuk dasar fosfat)', '9 kg', 'Rp 15.000', 'Rp 135.000'] },
              { kind: 'row', cells: ['11', 'Pupuk KNO₃ Putih / MKP (susulan IV–V)', '9 kg', 'Rp 35.000', 'Rp 315.000'] },
              { kind: 'row', cells: ['12', 'Dolomit (bila pH < 6,0)', '40 kg', 'Rp 2.000', 'Rp 80.000'] },
              { kind: 'group', title: 'D. Pengendalian OPT' },
              { kind: 'row', cells: ['13', 'Insektisida terdaftar untuk melon (kutu kebul & thrips)', '2 botol', 'Rp 65.000', 'Rp 130.000'] },
              { kind: 'row', cells: ['14', 'Fungisida terdaftar untuk melon (embun bulu & embun tepung)', '3 bungkus', 'Rp 55.000', 'Rp 165.000'] },
              { kind: 'row', cells: ['15', 'Perangkap kuning berperekat (yellow sticky trap)', '12 lembar', 'Rp 5.000', 'Rp 60.000'] },
              { kind: 'row', cells: ['16', 'Atraktan lalat buah (metil eugenol) + botol perangkap', '1 paket', 'Rp 30.000', 'Rp 30.000'] },
              { kind: 'group', title: 'E. Bahan bakar alsintan (hand traktor)' },
              { kind: 'row', cells: ['17', 'Bahan bakar (pertalite/solar)', '10 liter', 'Rp 10.000', 'Rp 100.000'] },
              { kind: 'row', cells: ['18', 'Oli mesin', '1 liter', 'Rp 50.000', 'Rp 50.000'] },
              { kind: 'summary', label: 'Subtotal (A–E)', value: 'Rp 5.021.000', labelSpan: 4, highlight: 'subtle' },
              { kind: 'summary', label: 'Cadangan biaya tak terduga 10%', value: 'Rp 502.100', labelSpan: 4 },
              { kind: 'summary', label: 'TOTAL ANGGARAN', value: 'Rp 5.523.100', labelSpan: 4, highlight: 'total' }
            ]
          },
          {
            type: 'callout',
            label: 'Catatan:',
            text: '',
            bullets: [
              'Pengendalian OPT kimiawi hanya dilakukan apabila populasi hama/penyakit melampaui ambang kendali dan atas bimbingan guru atau pendamping industri sesuai dosis label.',
              'Dolomit hanya dibeli apabila hasil pengukuran pH tanah berada di bawah 6,0 (menghemat Rp 80.000). Jika hand traktor menyewa dari luar sekolah, tambahkan biaya sewa operasional.'
            ]
          }
        ]
      }
    ]
  }
};
