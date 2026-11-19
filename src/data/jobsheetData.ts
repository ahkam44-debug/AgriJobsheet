export interface JobStep {
  id: number;
  title: string;
  detail: string;
  standard: string;
}

export interface NumeracyChallenge {
  question: string;
  subQuestions: string[];
  unit: string;
  defaultInputs?: Record<string, number | string>;
  solutionExplanation: string[];
}

export interface JobModule {
  id: number;
  title: string;
  subtitle: string;
  allocation: string;
  location: string;
  learningObjectives: string[];
  toolsAndMaterials: { name: string; spec: string; qty: string }[];
  k3Guidelines: string[];
  steps: JobStep[];
  fieldTips: string[];
  numeracyChallenge: NumeracyChallenge;
}

export const JOBSHEET_INFO = {
  title: "JOB SHEET BUDIDAYA SEMANGKA (Citrullus lanatus)",
  subtitle: "Dari Sanitasi Lahan hingga Pascapanen",
  subject: "Produksi Tanaman Hortikultura / Budidaya Tanaman Buah Semusim",
  competencyProgram: "Agribisnis Tanaman Pangan dan Hortikultura (ATPH)",
  classPhase: "XI dan XII (Fase F)",
  commodity: "Semangka hibrida (F1 Cap Panah Merah)",
  totalJobs: "7 Job (Total 35 JP) + Asesmen",
  publisher: "PT East West Seed Indonesia, Cap Panah Merah",
  growthRequirements: [
    { factor: "Suhu", value: "Sekitar 25 - 30 °C" },
    { factor: "Cahaya", value: "Penuh, minimal 8 jam per hari" },
    { factor: "Tanah", value: "Gembur, subur, drainase baik, pH 6,0 - 6,5" },
    { factor: "Ketinggian", value: "Dataran rendah sampai medium (0 - 600 mdpl)" },
    { factor: "Kebutuhan Air", value: "Cukup saat vegetatif; dikurangi 7-10 hari jelang panen" },
    { factor: "Umur Panen", value: "Sekitar 60 - 75 HST (tergantung varietas)" },
  ]
};

export const JOB_MODULES: JobModule[] = [
  {
    id: 1,
    title: "Sanitasi Lahan",
    subtitle: "Menyiapkan lahan yang bersih, sehat, dan bebas sumber penyakit",
    allocation: "4 JP (4 x 45 menit)",
    location: "Lahan praktik / screen house sekolah",
    learningObjectives: [
      "Mengidentifikasi kondisi lahan yang layak untuk budidaya semangka (cahaya, air, drainase, riwayat tanam).",
      "Melakukan sanitasi lahan dan alat sesuai prosedur kerja yang aman.",
      "Mengukur pH tanah dan mencatat hasilnya dengan benar."
    ],
    toolsAndMaterials: [
      { name: "Cangkul, sabit, dan garpu tanah", spec: "Kondisi tajam dan bersih", qty: "1 set" },
      { name: "Gerobak dorong / karung", spec: "Mengangkut sisa tanaman dan gulma", qty: "1 unit" },
      { name: "Meteran gulung 30 m dan tali rafia", spec: "Mengukur luas lahan", qty: "1 set" },
      { name: "Soil tester / pH meter / kertas lakmus", spec: "Mengukur pH tanah", qty: "1 unit" },
      { name: "Hand sprayer dan ember", spec: "Menyemprot desinfektan alat", qty: "1 unit" },
      { name: "Desinfektan (alkohol 70% / pemutih)", spec: "Disinfeksi alat potong dan cangkul", qty: "Secukupnya" },
      { name: "APD (sepatu boot, sarung tangan, topi, masker)", spec: "Sesuai ukuran siswa", qty: "Per siswa" }
    ],
    k3Guidelines: [
      "Gunakan APD lengkap sebelum bekerja; jangan bekerja tanpa alas kaki.",
      "Bawa dan simpan alat tajam dengan mata alat menghadap ke bawah; jaga jarak kerja minimal 2 m antar siswa.",
      "Jangan membakar sisa tanaman tanpa izin dan pengawasan guru; jauhkan dari bahan mudah terbakar.",
      "Cuci tangan dengan sabun setelah selesai bekerja."
    ],
    steps: [
      { id: 1, title: "Persiapan dan briefing K3", detail: "Kenakan APD, periksa kondisi alat, bagi tugas kelompok.", standard: "APD lengkap; alat siap pakai; pembagian tugas tertulis." },
      { id: 2, title: "Survei dan pengamatan lahan", detail: "Amati topografi, drainase, naungan, dan sumber air. Tanyakan riwayat tanaman sebelumnya (hindari bekas keluarga labu-labuan 1-2 musim). Ukur panjang dan lebar lahan, buat sketsa.", standard: "Lahan datar/landai, terkena cahaya penuh min 8 jam, air tersedia. Sketsa dan luas (m²) tercatat." },
      { id: 3, title: "Membersihkan gulma, batu, dan sampah", detail: "Babat dan cabut gulma beserta akarnya, kumpulkan batu dan sampah plastik.", standard: "Lahan bersih; tidak ada gulma berakar tersisa." },
      { id: 4, title: "Mengelola sisa tanaman", detail: "Sisa tanaman sehat: dikomposkan. Sisa tanaman bergejala penyakit: dikubur/dibakar jauh dari lahan (dengan izin guru).", standard: "Tidak ada sisa tanaman sakit di area lahan." },
      { id: 5, title: "Memperbaiki drainase", detail: "Buat/bersihkan parit keliling lahan agar air tidak menggenang.", standard: "Parit keliling berfungsi; air mengalir lancar." },
      { id: 6, title: "Mengukur pH tanah", detail: "Ambil sampel tanah di 5 titik (pola zig-zag/diagonal) pada kedalaman 15-20 cm. Campur, ukur dengan soil tester, catat.", standard: "Nilai pH tercatat. Target ideal 6,0 - 6,5." },
      { id: 7, title: "Sanitasi alat", detail: "Cuci cangkul, gunting, dan sprayer; semprot/lap dengan desinfektan; jemur.", standard: "Alat bersih dan kering sebelum disimpan." },
      { id: 8, title: "Dokumentasi dan kebersihan", detail: "Foto kondisi sebelum dan sesudah, bersihkan area kerja, isi logbook.", standard: "Foto, logbook, dan area kerja bersih." }
    ],
    fieldTips: [
      "Rotasi tanaman: jangan menanam semangka, melon, atau timun berturut-turut di lahan yang sama. Rotasi membantu menekan layu fusarium & nematoda.",
      "Lahan terbuka dengan gulma rapat adalah tempat persembunyian utama hama kutu kebul (vektor virus) dan thrips."
    ],
    numeracyChallenge: {
      question: "Lahan praktik berukuran 20 m x 25 m. Berapa luas lahan (m²)? Jika satu siswa dapat membersihkan 25 m² per jam dan kelompok terdiri dari 5 siswa, berapa jam waktu yang dibutuhkan untuk membersihkan seluruh lahan?",
      subQuestions: [
        "Luas lahan total: 20 m x 25 m = 500 m²",
        "Kapasitas kelompok per jam: 25 m²/siswa/jam x 5 siswa = 125 m²/jam",
        "Waktu yang dibutuhkan: 500 m² ÷ 125 m²/jam = 4 jam."
      ],
      unit: "jam",
      solutionExplanation: [
        "1. Luas lahan = 20 m × 25 m = 500 m²",
        "2. Kapasitas kerja kelompok = 5 siswa × 25 m²/jam = 125 m²/jam",
        "3. Waktu penyelesaian = 500 m² / 125 m²/jam = 4 jam kerja."
      ]
    }
  },
  {
    id: 2,
    title: "Pengolahan Lahan",
    subtitle: "Mengolah tanah, memberi pupuk dasar, membuat bedengan, dan memasang mulsa",
    allocation: "6 JP (6 x 45 menit)",
    location: "Lahan praktik / screen house sekolah",
    learningObjectives: [
      "Mengolah tanah hingga gembur dan memberikan kapur serta pupuk dasar sesuai takaran.",
      "Membuat bedengan dan memasang mulsa plastik hitam perak (PHP) sesuai ukuran.",
      "Menghitung kebutuhan bahan dan jumlah lubang tanam."
    ],
    toolsAndMaterials: [
      { name: "Cangkul, garu, sekop", spec: "Pengolahan dan perataan tanah", qty: "1 set" },
      { name: "Meteran, patok, tali rafia", spec: "Pengukuran bedengan", qty: "1 set" },
      { name: "Timbangan gantung / duduk", spec: "Menimbang pupuk dan kapur", qty: "1 unit" },
      { name: "Pupuk kandang matang / kompos", spec: "Pupuk dasar, tanpa bau menyengat", qty: "100-200 kg per 100 m²" },
      { name: "Dolomit / kapur pertanian", spec: "Jika pH tanah kurang dari 6,0", qty: "10-20 kg per 100 m²" },
      { name: "Pupuk NPK majemuk (15-15-15)", spec: "Pupuk dasar", qty: "3-4 kg per 100 m²" },
      { name: "Mulsa plastik hitam perak (PHP)", spec: "Sisi perak di atas, hitam di bawah", qty: "Sesuai panjang bedengan" },
      { name: "Pasak bambu bentuk U & pelubang", spec: "Kunci mulsa dan lubang tanam", qty: "1 set" }
    ],
    k3Guidelines: [
      "Gunakan sarung tangan dan masker saat menebar kapur dan pupuk agar debu tidak terhirup.",
      "Jangan mengangkat beban lebih dari kemampuan; angkat dengan menekuk lutut, bukan punggung.",
      "Simpan pupuk kimia jauh dari makanan dan minuman; cuci tangan setelah bekerja.",
      "Hati-hati saat melubangi mulsa dengan alat panas; gunakan sarung tangan tebal."
    ],
    steps: [
      { id: 1, title: "Pengolahan tanah pertama", detail: "Cangkul/bajak tanah sedalam sekitar 30 cm, balik tanah, hancurkan bongkahan besar.", standard: "Tanah terbalik rata, kedalaman olah sekitar 30 cm." },
      { id: 2, title: "Penjemuran tanah", detail: "Biarkan tanah terjemur 5-7 hari untuk membantu mengurangi hama dan patogen tanah.", standard: "Tanah tampak kering di permukaan." },
      { id: 3, title: "Pengapuran (bila pH kurang dari 6,0)", detail: "Tebar dolomit merata sesuai takaran dari hasil uji pH, aduk dengan tanah.", standard: "Takaran sesuai hitungan; tersebar merata." },
      { id: 4, title: "Pengolahan kedua dan pupuk dasar", detail: "Sebar pupuk kandang matang dan NPK, aduk dengan tanah hingga gembur dan remah.", standard: "Pupuk tercampur rata; tanah gembur dan remah." },
      { id: 5, title: "Membuat bedengan", detail: "Lebar 100-120 cm, tinggi sekitar 30 cm. Jarak antar bedengan (as ke as) 200-220 cm. Permukaan rata, tepi sedikit miring.", standard: "Bedengan lurus, ukuran seragam, permukaan rata." },
      { id: 6, title: "Memasang mulsa PHP", detail: "Basahi bedengan hingga lembap. Tarik mulsa kencang; sisi perak ke atas. Kunci tepi dengan pasak U atau timbunan tanah.", standard: "Mulsa rapat dan kencang, tidak robek." },
      { id: 7, title: "Membuat lubang tanam", detail: "Lubangi mulsa diameter 8-10 cm, satu baris sepanjang bedengan, jarak 60-70 cm.", standard: "Lubang sejajar dan berjarak seragam." },
      { id: 8, title: "Penyiraman dan pembiaran", detail: "Siram bedengan, biarkan 3-7 hari sebelum tanam agar suhu tanah stabil.", standard: "Tanah lembap, mulsa tidak menggembung." }
    ],
    fieldTips: [
      "Siram bedengan sebelum mulsa dipasang. Tanah kering di bawah mulsa menyulitkan akar muda menyerap air.",
      "Untuk takaran apa pun, selalu rujuk rekomendasi label kemasan dan instruktur industri sesuai karakteristik tanah."
    ],
    numeracyChallenge: {
      question: "Sebuah bedengan berukuran 1,2 m x 25 m. Jarak tanam dalam baris 70 cm. Berapa luas bedengan (m²)? Berapa jumlah lubang tanam per bedengan (bulatkan ke bawah)? Jika pupuk kandang diberikan 1,5 kg per m², berapa kg dibutuhkan untuk satu bedengan?",
      subQuestions: [
        "Luas bedengan = 1,2 m x 25 m = 30 m²",
        "Jumlah lubang = 25 m ÷ 0,7 m = 35,7 → dibulatkan ke bawah menjadi 35 lubang",
        "Kebutuhan pupuk kandang = 1,5 kg/m² x 30 m² = 45 kg."
      ],
      unit: "kg",
      solutionExplanation: [
        "1. Luas bedengan = 1,2 m × 25 m = 30 m²",
        "2. Jumlah lubang tanam = 25 / 0,7 = 35,71 → 35 lubang",
        "3. Pupuk kandang = 30 m² × 1,5 kg/m² = 45 kg."
      ]
    }
  },
  {
    id: 3,
    title: "Penyemaian Benih",
    subtitle: "Menyiapkan bibit semangka yang sehat dan seragam",
    allocation: "4 JP (4 x 45 menit), pengamatan 10-14 hari",
    location: "Rumah semai / screen house sekolah",
    learningObjectives: [
      "Membaca label benih dan menyiapkan media semai dengan campuran yang tepat.",
      "Melakukan perlakuan benih dan penyemaian dengan teknik yang benar.",
      "Memelihara dan menyeleksi bibit siap pindah tanam."
    ],
    toolsAndMaterials: [
      { name: "Tray semai (72 lubang)", spec: "Bersih, bebas sisa media lama", qty: "Sesuai kebutuhan" },
      { name: "Benih semangka hibrida (F1)", spec: "Cap Panah Merah, periksa daya tumbuh & kadaluwarsa", qty: "Sesuai kebutuhan" },
      { name: "Media semai: tanah halus, kompos, sekam", spec: "Perbandingan 1 : 1 : 1", qty: "Secukupnya" },
      { name: "Ayakan, ember, gelas ukur", spec: "Mencampur dan menyaring media", qty: "1 set" },
      { name: "Pinset/lidi kecil, label, spidol", spec: "Menanam dan memberi tanda", qty: "1 set" },
      { name: "Hand sprayer / gembor halus", spec: "Penyiraman lembut", qty: "1 unit" },
      { name: "Plastik gelap / sungkup", spec: "Menjaga kelembapan awal", qty: "1 lembar" }
    ],
    k3Guidelines: [
      "Benih bisa diberi perlakuan kimia dari pabrik; jangan dimasukkan ke mulut dan cuci tangan setelah menyentuh benih.",
      "Gunakan masker saat mengayak media kering.",
      "Jaga lantai rumah semai tetap kering untuk mencegah terpeleset."
    ],
    steps: [
      { id: 1, title: "Memeriksa benih", detail: "Baca label kemasan: varietas, nomor lot, daya tumbuh, tanggal kedaluwarsa.", standard: "Benih belum kedaluwarsa; informasi dicatat." },
      { id: 2, title: "Menyiapkan media semai", detail: "Ayak dan campur tanah, kompos, sekam 1 : 1 : 1, lembapkan.", standard: "Media remah, lembap tetapi tidak becek." },
      { id: 3, title: "Mengisi tray", detail: "Isi lubang tray penuh, ratakan, padatkan ringan.", standard: "Semua lubang terisi seragam." },
      { id: 4, title: "Perlakuan benih", detail: "Rendam dalam air bersih sesuai petunjuk label (umumnya 2-4 jam), tiriskan. Opsional: peram di kain lembap hingga muncul calon akar.", standard: "Benih tampak menyerap air; tidak berjamur." },
      { id: 5, title: "Menanam benih", detail: "Satu benih per lubang, kedalaman sekitar 1 cm, ujung calon akar ke bawah, tutup tipis, siram halus.", standard: "1 benih/lubang; kedalaman seragam." },
      { id: 6, title: "Penyungkupan dan peletakan", detail: "Tutup tray dengan plastik gelap 1-2 hari, buka saat kecambah muncul, pindahkan ke tempat terang tanpa terik.", standard: "Daya kecambah minimal 90% dalam 3-5 hari." },
      { id: 7, title: "Pemeliharaan semai", detail: "Siram pagi dan sore secukupnya, kontrol hama, beri larutan pupuk encer (NPK sekitar 1 g/L) setelah daun pertama terbuka.", standard: "Bibit hijau, tidak kurus dan memanjang (etiolasi)." },
      { id: 8, title: "Seleksi dan pengerasan bibit", detail: "3 hari sebelum tanam: kurangi air, tambah cahaya. Pilih bibit umur 10-14 hari, 2-3 daun sejati, batang kokoh.", standard: "Bibit sehat, seragam; disisihkan 10% cadangan." }
    ],
    fieldTips: [
      "Bibit yang memanjang dan lemah (etiolasi) biasanya karena tempat terlalu teduh atau terlalu rapat. Pindahkan ke tempat lebih terang.",
      "Selalu catat tanggal semai agar umur bibit (HSS = hari setelah semai) mudah dihitung."
    ],
    numeracyChallenge: {
      question: "Lahan seluas 500 m² dengan jarak tanam 70 cm x 200 cm. Satu tanaman membutuhkan 1,4 m². Berapa jumlah tanaman (populasi) di lahan tersebut? Jika bibit cadangan 10% ditambahkan, berapa total bibit yang disemai? Berapa tray (72 lubang) yang dibutuhkan?",
      subQuestions: [
        "Populasi tanaman = 500 m² ÷ 1,4 m² = 357 tanaman",
        "Total bibit dengan cadangan 10% = 357 x 1,1 = 392,7 → 393 bibit",
        "Kebutuhan tray = 393 ÷ 72 = 5,46 → dibulatkan ke atas menjadi 6 tray."
      ],
      unit: "tray",
      solutionExplanation: [
        "1. Populasi = 500 m² / 1,4 m² = 357 tanaman",
        "2. Cadangan 10% = 357 × 1,1 = 392,7 → 393 bibit",
        "3. Tray (72 lubang) = 393 / 72 = 5,46 → 6 tray."
      ]
    }
  },
  {
    id: 4,
    title: "Penanaman (Pindah Tanam)",
    subtitle: "Memindahkan bibit ke bedengan tanpa merusak akar",
    allocation: "3 JP (3 x 45 menit)",
    location: "Lahan praktik / screen house sekolah",
    learningObjectives: [
      "Memindahkan bibit dari tray ke lubang tanam dengan benar.",
      "Menentukan waktu tanam, kedalaman, dan perawatan awal setelah tanam.",
      "Mencatat tanggal tanam dan menghitung umur tanaman (HST)."
    ],
    toolsAndMaterials: [
      { name: "Bibit umur 10-14 HSS", spec: "Sehat dan sudah dikeraskan", qty: "10% lebih dari jumlah lubang" },
      { name: "Tugal kecil / sendok tanam", spec: "Membuat lubang pada mulsa jika perlu", qty: "1 buah" },
      { name: "Gembor / selang berhandsprayer", spec: "Penyiraman halus", qty: "1 unit" },
      { name: "Larutan starter (NPK 2 g/L) / air bersih", spec: "Disiramkan setelah tanam", qty: "100-200 ml per tanaman" },
      { name: "Label tanam, spidol", spec: "Tanggal tanam dan varietas", qty: "1 set" },
      { name: "Paranet / daun pisang", spec: "Naungan sementara saat terik", qty: "Secukupnya" }
    ],
    k3Guidelines: [
      "Gunakan topi dan pakaian lengan panjang untuk menghindari sengatan matahari.",
      "Bawa tray dengan dua tangan agar bibit tidak jatuh; jangan berlarian di bedengan.",
      "Minum air cukup dan istirahat bila terlalu panas."
    ],
    steps: [
      { id: 1, title: "Menyiapkan bibit dan lahan", detail: "Siram bibit sehari sebelum tanam dan siram bedengan sebelum tanam.", standard: "Media bibit lembap; bedengan lembap." },
      { id: 2, title: "Menentukan waktu tanam", detail: "Tanam sore hari (sekitar 15.00-17.00) atau pagi berawan.", standard: "Tidak ditanam saat terik." },
      { id: 3, title: "Melepas bibit dari tray", detail: "Tekan dasar lubang tray dari bawah, tahan batang dengan jari, jangan menarik batang.", standard: "Gumpalan media dan akar utuh." },
      { id: 4, title: "Menanam bibit", detail: "Masukkan bibit ke lubang tanam, permukaan media rata dengan tanah, padatkan sekeliling dengan lembut.", standard: "Bibit tegak; batang tidak terkubur." },
      { id: 5, title: "Menyiram setelah tanam", detail: "Beri larutan starter atau air sekitar 200 ml per tanaman.", standard: "Tanah di sekitar akar lembap, tidak becek." },
      { id: 6, title: "Pemberian naungan sementara", detail: "Bila terik, beri naungan 2-3 hari.", standard: "Daun tidak layu berat." },
      { id: 7, title: "Pemasangan label dan pencatatan", detail: "Pasang label tanggal tanam dan varietas; catat populasi.", standard: "Label terpasang; catatan di logbook." },
      { id: 8, title: "Menyiapkan penyulaman", detail: "Simpan bibit cadangan untuk menyulam tanaman mati pada 3-7 HST.", standard: "Bibit cadangan tersedia." }
    ],
    fieldTips: [
      "Jangan menanam bibit terlalu dalam: leher akar yang tertimbun mudah busuk.",
      "Tanam di hari berawan atau sore hari agar bibit tidak stres kehilangan air."
    ],
    numeracyChallenge: {
      question: "Bibit ditanam pada tanggal 1 Maret. Varietas yang digunakan memiliki umur panen 65 HST. Pada tanggal berapa tanaman diperkirakan siap panen? Jika tanaman diberi pupuk susulan pertama pada 10 HST, tanggal berapa itu?",
      subQuestions: [
        "Tanggal perkiraan panen = 1 Maret + 65 hari = 5 Mei",
        "Tanggal pupuk susulan pertama = 1 Maret + 10 hari = 11 Maret."
      ],
      unit: "tanggal",
      solutionExplanation: [
        "1. Maret memiliki 31 hari, April 30 hari.",
        "2. Dari 1 Maret + 65 hari: 30 hari di Maret tersisa + 30 hari April (total 60 hari) + 5 hari di Mei = 5 Mei.",
        "3. Pupuk susulan 1: 1 Maret + 10 hari = 11 Maret."
      ]
    }
  },
  {
    id: 5,
    title: "Pemeliharaan Tanaman",
    subtitle: "Penyiraman, pemupukan, pewiwilan, polinasi, seleksi buah, dan pengendalian OPT",
    allocation: "8 JP (dilaksanakan bertahap per fase)",
    location: "Lahan praktik / screen house sekolah",
    learningObjectives: [
      "Melakukan penyiraman dan pemupukan susulan sesuai fase pertumbuhan.",
      "Melakukan pewiwilan, polinasi manual, dan seleksi buah.",
      "Mengamati dan mengendalikan OPT dengan prinsip pengendalian hama terpadu (PHT)."
    ],
    toolsAndMaterials: [
      { name: "Gunting pangkas bersih", spec: "Disinfeksi sebelum dan sesudah dipakai", qty: "1 buah" },
      { name: "Gelas ukur, timbangan, ember", spec: "Meracik larutan pupuk", qty: "1 set" },
      { name: "Pupuk NPK 16-16-16 & KNO3", spec: "Pemupukan susulan sistem kocor", qty: "Sesuai jadwal" },
      { name: "Perangkap kuning (yellow sticky trap)", spec: "Kutu kebul, thrips, kutu daun", qty: "4-6 per 100 m²" },
      { name: "Perangkap lalat buah (metil eugenol)", spec: "Pemantauan lalat buah", qty: "Sesuai kebutuhan" },
      { name: "Label tanggal polinasi, benang kasur", spec: "Menandai bunga yang diserbuki", qty: "1 set" },
      { name: "Alas buah (styrofoam/jerami/plastik)", spec: "Menjaga buah dari tanah", qty: "1 per buah" },
      { name: "Lembar pengamatan OPT dan logbook", spec: "Pencatatan", qty: "1 set" }
    ],
    k3Guidelines: [
      "Jika menggunakan pestisida: ikuti label, gunakan APD lengkap (masker, sarung tangan, kacamata, baju lengan panjang), dan lakukan hanya dengan pengawasan guru.",
      "Jangan menyemprot melawan arah angin; jangan makan atau minum saat meracik.",
      "Cuci tangan dan mandi setelah bekerja; simpan sisa larutan dan kemasan sesuai prosedur."
    ],
    steps: [
      { id: 1, title: "Penyiraman", detail: "Siram pagi/sore menjaga tanah tetap lembap tetapi tidak tergenang. Kurangi penyiraman sekitar 7-10 hari sebelum panen.", standard: "Tanah lembap; tanaman tidak layu atau tergenang." },
      { id: 2, title: "Penyulaman (sampai 7 HST)", detail: "Ganti bibit mati dengan bibit cadangan.", standard: "Populasi 100% sesuai rencana." },
      { id: 3, title: "Pemupukan susulan", detail: "7-10 HST & 20 HST: NPK 16-16-16 3-5 g/L kocor 200-250 ml/tanaman. Awal bunga 30-35 HST: pupuk tinggi kalium. Pembesaran buah 45-50 HST: KNO3 sekitar 5 g/L.", standard: "Larutan dikocor di sekitar pangkal tanaman, tidak mengenai daun." },
      { id: 4, title: "Pewiwilan dan pengaturan sulur", detail: "Pertahankan 2-3 cabang utama. Buang tunas samping di bawah ruas ke-10. Arahkan sulur searah, jangan terinjak.", standard: "Tanaman tertata, sirkulasi udara baik." },
      { id: 5, title: "Identifikasi bunga dan polinasi", detail: "Bunga jantan: tangkai ramping. Bunga betina: ada calon buah bulat kecil di bawah bunga. Polinasi pukul 06.00-09.00: petik bunga jantan mekar, kupas kelopak, oles serbuk sari ke putik betina. Beri label tanggal.", standard: "Label tanggal terpasang pada tiap bunga yang diserbuki." },
      { id: 6, title: "Seleksi buah", detail: "Sekitar 5-7 hari setelah polinasi, pilih 1 buah per tanaman (bentuk bagus, ruas ke-12-18 cabang utama); buang buah lain.", standard: "Satu buah terbaik per tanaman." },
      { id: 7, title: "Alas dan pembalikan buah", detail: "Beri alas buah; balik buah perlahan 1-2 kali (selang 7-10 hari) agar warna merata; lindungi dari sengatan matahari.", standard: "Kulit buah merata, tanpa sengatan matahari." },
      { id: 8, title: "Pengamatan dan pengendalian OPT (PHT)", detail: "Amati 2 kali per minggu: kutu kebul, thrips, kutu daun, ulat, lalat buah; layu, embun tepung, antraknosa, virus. Utamakan sanitasi, perangkap kuning, metil eugenol. Pestisida adalah opsi terakhir.", standard: "Lembar pengamatan terisi; tindakan dicatat." },
      { id: 9, title: "Pencatatan", detail: "Catat tinggi tanaman, jumlah daun, kegiatan, dan OPT di logbook.", standard: "Logbook terisi lengkap." }
    ],
    fieldTips: [
      "Polinasi yang tepat waktu (06.00-09.00) sangat menentukan jadwal panen. Tanpa label tanggal, umur buah sulit dihitung.",
      "Serangan kutu kebul dapat membawa virus Gemini/Kuning. Tanaman yang sakit parah sebaiknya dicabut dan dikubur agar tidak menular.",
      "Pestisida bukan jawaban pertama; pengamatan rutin 2x seminggu adalah kuncinya."
    ],
    numeracyChallenge: {
      question: "Populasi 357 tanaman. Setiap tanaman dikocor 250 ml larutan NPK dengan konsentrasi 5 g/L. Berapa liter larutan yang dibutuhkan? Berapa gram NPK yang harus dilarutkan?",
      subQuestions: [
        "Volume larutan total = 357 tanaman x 250 ml = 89.250 ml = 89,25 liter",
        "Kebutuhan pupuk NPK = 89,25 liter x 5 g/L = 446,25 gram (sekitar 446 g)."
      ],
      unit: "gram",
      solutionExplanation: [
        "1. Total larutan = 357 × 250 ml = 89.250 ml = 89,25 liter",
        "2. Total NPK = 89,25 liter × 5 g/L = 446,25 gram."
      ]
    }
  },
  {
    id: 6,
    title: "Panen",
    subtitle: "Menentukan kemasakan dan memanen buah semangka dengan benar",
    allocation: "4 JP (4 x 45 menit)",
    location: "Lahan praktik / screen house sekolah",
    learningObjectives: [
      "Menentukan kemasakan buah berdasarkan ciri visual, umur buah, dan kadar gula.",
      "Memanen buah dengan teknik yang benar sehingga mutu terjaga.",
      "Mencatat data panen dan menghitung produktivitas."
    ],
    toolsAndMaterials: [
      { name: "Gunting pangkas / pisau tajam bersih", spec: "Disinfeksi", qty: "1 buah" },
      { name: "Refraktometer (skala Brix)", spec: "Mengukur kadar gula buah", qty: "1 unit" },
      { name: "Keranjang plastik / peti berlapis busa", spec: "Mencegah buah lecet", qty: "Secukupnya" },
      { name: "Terpal / alas teduh", spec: "Penampungan sementara", qty: "1 lembar" },
      { name: "Timbangan (kapasitas 20 kg)", spec: "Menimbang buah", qty: "1 unit" },
      { name: "Label dan logbook panen", spec: "Pencatatan", qty: "1 set" }
    ],
    k3Guidelines: [
      "Gunakan topi, sarung tangan, dan sepatu; hindari panen saat terik tengah hari.",
      "Gunakan alat potong dengan hati-hati, arah potong menjauhi tubuh.",
      "Angkat buah dengan dua tangan atau secara tim agar tidak cedera punggung."
    ],
    steps: [
      { id: 1, title: "Mengecek umur panen", detail: "Cocokkan catatan tanggal polinasi dengan label varietas (umumnya sekitar 30-40 hari setelah polinasi).", standard: "Umur buah sesuai petunjuk varietas." },
      { id: 2, title: "Mengamati ciri masak", detail: "Tangkai dan sulur terdekat mulai mengering; kulit mengkilap/berlilin; bagian bawah kuning krem; suara ketukan terdengar berat/dalam.", standard: "Minimal 3 ciri terpenuhi." },
      { id: 3, title: "Uji kadar gula (sampel)", detail: "Ambil 1 buah sampel acak, ukur dengan refraktometer dan catat.", standard: "Kadar gula sekitar 10 Brix atau lebih." },
      { id: 4, title: "Memanen", detail: "Panen pagi hari; potong tangkai dengan alat bersih, sisakan tangkai sekitar 3-5 cm.", standard: "Buah tidak terluka; tangkai tersisa 3-5 cm." },
      { id: 5, title: "Penanganan di lahan", detail: "Jangan dibanting dan jangan dijemur; letakkan di tempat teduh beralas jerami/busa.", standard: "Buah tidak lecet dan tidak terkena terik." },
      { id: 6, title: "Pengangkutan", detail: "Susun maksimal 2-3 lapis beralas busa, hindari guncangan keras.", standard: "Tidak ada buah retak selama pengangkutan." },
      { id: 7, title: "Pencatatan", detail: "Catat jumlah buah, total bobot, rata-rata bobot, Brix, dan kerusakan.", standard: "Data panen tercatat lengkap." }
    ],
    fieldTips: [
      "Jangan hanya mengandalkan satu ciri! Gabungkan ciri visual, catatan umur polinasi, dan uji Brix.",
      "Panen di pagi hari mengurangi panas lapang (field heat) sehingga daya simpan buah lebih tahan lama."
    ],
    numeracyChallenge: {
      question: "Dari 357 tanaman, 90% berhasil dipanen dengan bobot rata-rata 4 kg per buah. Berapa jumlah buah yang dipanen (bulatkan ke bawah)? Berapa total hasil panen (kg)? Berapa produktivitas per m² pada lahan 500 m² (kg/m²)?",
      subQuestions: [
        "Jumlah buah dipanen = 357 x 90% = 321,3 → 321 buah",
        "Total hasil panen = 321 buah x 4 kg = 1.284 kg",
        "Produktivitas lahan = 1.284 kg ÷ 500 m² = 2,57 kg/m² (setara 25,7 ton/ha)."
      ],
      unit: "kg/m²",
      solutionExplanation: [
        "1. Jumlah buah = 357 × 0,90 = 321,3 → 321 buah",
        "2. Total berat = 321 × 4 kg = 1.284 kg",
        "3. Produktivitas = 1.284 kg / 500 m² = 2,57 kg/m² (~25,7 ton/ha)."
      ]
    }
  },
  {
    id: 7,
    title: "Pascapanen",
    subtitle: "Sortasi, grading, pengemasan, penyimpanan, dan analisis usaha",
    allocation: "6 JP (6 x 45 menit)",
    location: "Ruang pascapanen / gudang sekolah",
    learningObjectives: [
      "Melakukan sortasi, grading, pengemasan, dan penyimpanan buah dengan benar.",
      "Memahami kondisi penyimpanan yang menjaga mutu semangka.",
      "Menyusun analisis usaha sederhana (biaya, pendapatan, R/C ratio)."
    ],
    toolsAndMaterials: [
      { name: "Meja sortasi, lap bersih", spec: "Pembersihan dan seleksi buah", qty: "1 set" },
      { name: "Timbangan", spec: "Untuk grading berdasarkan bobot", qty: "1 unit" },
      { name: "Peti/kardus berventilasi, busa/jerami", spec: "Pengemasan", qty: "Sesuai jumlah buah" },
      { name: "Label produk", spec: "Nama, varietas, tgl panen, asal kebun, bobot", qty: "Per kemasan" },
      { name: "Termometer dan higrometer ruangan", spec: "Memantau suhu dan RH", qty: "1 set" },
      { name: "Kalkulator dan lembar analisis usaha", spec: "Menghitung biaya dan pendapatan", qty: "1 set" }
    ],
    k3Guidelines: [
      "Gunakan sarung tangan dan sepatu tertutup; angkat beban dengan benar.",
      "Jaga lantai bersih dari air dan sisa buah agar tidak licin.",
      "Buang buah busuk di tempat sampah organik agar tidak menarik lalat."
    ],
    steps: [
      { id: 1, title: "Pembersihan dan pendinginan", detail: "Lap tanah/kotoran dengan kain lembap; letakkan di tempat teduh agar panas lapang turun.", standard: "Kulit bersih; buah tidak panas." },
      { id: 2, title: "Sortasi", detail: "Pisahkan buah cacat: busuk, retak, sengatan matahari, bentuk menyimpang.", standard: "Buah layak jual dipisahkan dari buah afkir." },
      { id: 3, title: "Grading (Pengkelasan Mutu)", detail: "Kelas A: lebih dari 4 kg. Kelas B: 3 sampai 4 kg. Kelas C: kurang dari 3 kg.", standard: "Setiap buah masuk kelas yang tepat; jumlah per kelas tercatat." },
      { id: 4, title: "Pelabelan", detail: "Tempel label produk pada setiap buah atau kemasan.", standard: "Label lengkap dan terbaca." },
      { id: 5, title: "Pengemasan", detail: "Susun buah dalam peti/kardus berventilasi, beri alas busa/jerami, jangan berdesakan.", standard: "Tidak ada buah bersentuhan keras; ventilasi baik." },
      { id: 6, title: "Penyimpanan", detail: "Simpan di tempat sejuk dan berventilasi; idealnya sekitar 10-15 °C dan RH 85-90%, jauhkan dari sinar matahari langsung.", standard: "Suhu dan RH tercatat; buah tidak lembek." },
      { id: 7, title: "Distribusi", detail: "Angkut pagi/malam dengan kendaraan beratap, jangan menumpuk terlalu tinggi.", standard: "Buah tiba tanpa kerusakan." },
      { id: 8, title: "Analisis usaha sederhana", detail: "Hitung total biaya, pendapatan, keuntungan, dan R/C ratio.", standard: "Perhitungan benar dan runtut." }
    ],
    fieldTips: [
      "Buah yang lecet atau retak cepat membusuk. Satu buah busuk bisa menular ke buah lain di dalam peti.",
      "Cantumkan tanggal panen pada label; pembeli modern menyukai produk yang transparan dan dapat dilacak asal-usulnya."
    ],
    numeracyChallenge: {
      question: "Hasil panen 1.284 kg dijual Rp 5.000 per kg. Total biaya produksi Rp 3.000.000. Berapa total pendapatan? Berapa keuntungan (pendapatan - biaya)? Berapa R/C ratio (pendapatan : biaya), dan apa artinya jika nilainya lebih dari 1?",
      subQuestions: [
        "Total pendapatan = 1.284 kg x Rp 5.000 = Rp 6.420.000",
        "Keuntungan = Rp 6.420.000 - Rp 3.000.000 = Rp 3.420.000",
        "R/C ratio = 6.420.000 ÷ 3.000.000 = 2,14 (Artinya usaha layak dan menguntungkan, setiap Rp 1 biaya menghasilkan Rp 2,14 pendapatan)."
      ],
      unit: "R/C",
      solutionExplanation: [
        "1. Pendapatan = 1.284 × 5.000 = Rp 6.420.000",
        "2. Keuntungan = Rp 6.420.000 - Rp 3.000.000 = Rp 3.420.000",
        "3. R/C ratio = 2,14. Karena > 1, budidaya dinilai sangat menguntungkan."
      ]
    }
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Tujuan utama sanitasi lahan sebelum menanam semangka adalah ...",
    options: [
      { key: "A", text: "Menambah jumlah air tanah" },
      { key: "B", text: "Mengurangi sumber hama, penyakit, dan gulma di lahan" },
      { key: "C", text: "Mempercepat pertumbuhan buah" },
      { key: "D", text: "Mengubah warna tanah" }
    ],
    correctAnswer: "B",
    explanation: "Sanitasi lahan bertujuan membersihkan sisa tanaman sakit, inang hama (seperti kutu kebul/thrips), serta gulma yang menjadi kompetitor.",
    points: 4
  },
  {
    id: 2,
    question: "Kisaran pH tanah yang ideal untuk tanaman semangka adalah ...",
    options: [
      { key: "A", text: "4,0 - 5,0" },
      { key: "B", text: "6,0 - 6,5" },
      { key: "C", text: "7,5 - 8,5" },
      { key: "D", text: "3,0 - 4,0" }
    ],
    correctAnswer: "B",
    explanation: "Semangka menyukai tanah gembur subur dengan pH netral mendekati agak masam yakni 6,0 - 6,5 untuk ketersediaan hara optimal.",
    points: 4
  },
  {
    id: 3,
    question: "Dolomit atau kapur pertanian diberikan pada lahan untuk ...",
    options: [
      { key: "A", text: "Menaikkan pH tanah yang masam" },
      { key: "B", text: "Menurunkan suhu tanah" },
      { key: "C", text: "Membunuh seluruh gulma" },
      { key: "D", text: "Memperpanjang sulur" }
    ],
    correctAnswer: "A",
    explanation: "Pemberian dolomit berfungsi menetralkan keasaman (menaikkan pH) serta menyediakan unsur hara Kalsium (Ca) dan Magnesium (Mg).",
    points: 4
  },
  {
    id: 4,
    question: "Pupuk kandang untuk pupuk dasar harus sudah matang karena pupuk yang belum matang ...",
    options: [
      { key: "A", text: "Membuat tanah menjadi padat" },
      { key: "B", text: "Menurunkan harga jual buah" },
      { key: "C", text: "Dapat menimbulkan panas yang membakar akar dan membawa penyakit" },
      { key: "D", text: "Tidak dapat dicampur dengan tanah" }
    ],
    correctAnswer: "C",
    explanation: "Proses fermentasi pada pupuk mentah menghasilkan gas dan suhu panas tinggi yang merusak akar muda semangka serta membawa bibit patogen.",
    points: 4
  },
  {
    id: 5,
    question: "Berikut yang BUKAN fungsi mulsa plastik hitam perak (PHP) adalah ...",
    options: [
      { key: "A", text: "Menekan pertumbuhan gulma" },
      { key: "B", text: "Menjaga kelembapan tanah" },
      { key: "C", text: "Mengurangi pencucian pupuk" },
      { key: "D", text: "Menyediakan unsur hara nitrogen bagi tanaman" }
    ],
    correctAnswer: "D",
    explanation: "Mulsa plastik tidak menyediakan nutrisi hara mineral seperti nitrogen, melainkan pelindung fisik tanah dari gulma, evaporasi, dan pencucian pupuk.",
    points: 4
  },
  {
    id: 6,
    question: "Bibit semangka siap dipindah ke lahan (pindah tanam) pada umur ...",
    options: [
      { key: "A", text: "3-5 hari setelah semai" },
      { key: "B", text: "10-14 hari setelah semai (2-3 daun sejati)" },
      { key: "C", text: "25-30 hari setelah semai" },
      { key: "D", text: "40-45 hari setelah semai" }
    ],
    correctAnswer: "B",
    explanation: "Bibit siap tanam saat berumur 10-14 HSS, memiliki 2-3 helai daun sejati, batang kokoh dan akar telah mengikat media tray dengan baik.",
    points: 4
  },
  {
    id: 7,
    question: "Waktu terbaik untuk melakukan polinasi manual (penyerbukan) semangka adalah ...",
    options: [
      { key: "A", text: "Pukul 06.00 - 09.00 pagi" },
      { key: "B", text: "Pukul 11.00 - 13.00 siang" },
      { key: "C", text: "Pukul 15.00 - 17.00 sore" },
      { key: "D", text: "Malam hari" }
    ],
    correctAnswer: "A",
    explanation: "Pada pagi hari pukul 06.00-09.00 bunga jantan dan betina mekar sempurna, serbuk sari aktif dan putik dalam kondisi reseptif basah sebelum mengering terkena terik matahari.",
    points: 4
  },
  {
    id: 8,
    question: "Tujuan utama pemangkasan tunas atau pewiwilan pada semangka adalah ...",
    options: [
      { key: "A", text: "Memperbanyak jumlah buah per tanaman" },
      { key: "B", text: "Mengurangi kebutuhan air" },
      { key: "C", text: "Mengarahkan nutrisi ke cabang dan buah yang dipelihara serta memperbaiki sirkulasi udara" },
      { key: "D", text: "Mempercepat perkecambahan" }
    ],
    correctAnswer: "C",
    explanation: "Pewiwilan membuang tunas samping yang tidak produktif sehingga fotosintat terkonsentrasi maksimal ke buah terpilih dan kebun tidak terlalu lembap.",
    points: 4
  },
  {
    id: 9,
    question: "Ciri buah semangka yang telah masak dan siap dipanen adalah ...",
    options: [
      { key: "A", text: "Kulit kusam dan lunak" },
      { key: "B", text: "Tangkai buah hijau segar" },
      { key: "C", text: "Bagian bawah buah putih kehijauan" },
      { key: "D", text: "Sulur dekat tangkai mengering dan bagian bawah buah kuning krem" }
    ],
    correctAnswer: "D",
    explanation: "Ciri masak: sulur terdekat mengering kecokelatan, warna bercak tanah (belly spot) berubah dari putih jadi kuning krem, dan suara ketukan bergaung berat.",
    points: 4
  },
  {
    id: 10,
    question: "Kondisi ruang penyimpanan semangka utuh yang dianjurkan untuk menjaga kesegaran adalah ...",
    options: [
      { key: "A", text: "0 - 2 °C, RH 50%" },
      { key: "B", text: "10 - 15 °C, RH 85 - 90%" },
      { key: "C", text: "30 - 35 °C, RH 50%" },
      { key: "D", text: "Suhu ruang terbuka terkena sinar matahari langsung" }
    ],
    correctAnswer: "B",
    explanation: "Suhu 10-15 °C dan kelembapan (RH) 85-90% mencegah chilling injury akibat terlalu dingin sekaligus mencegah penguapan kadar air daging buah.",
    points: 4
  }
];

export interface EssayQuestion {
  id: number;
  question: string;
  maxScore: number;
  sampleAnswer: string;
}

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 11,
    question: "Sebutkan langkah sanitasi lahan secara berurutan (minimal 5 langkah) dan jelaskan alasan masing-masing!",
    maxScore: 12,
    sampleAnswer: "1) Survei lahan: mengetahui kondisi naungan, drainase, dan riwayat tanaman. 2) Membersihkan gulma dan sampah: menghilangkan kompetitor hara dan inang hama. 3) Mengelola sisa tanaman (kompos atau bakar/kubur bila sakit): memutus rantai inokulum patogen. 4) Memperbaiki drainase: mencegah genangan air penyebab busuk akar. 5) Mengukur pH tanah: memastikan kecukupan kapur dolomit agar hara terserap. 6) Sanitasi alat: mencegah penularan penyakit antraknosa/layu antar lahan."
  },
  {
    id: 12,
    question: "Jelaskan cara polinasi manual pada semangka, mengapa perlu dilakukan, dan mengapa tanggal polinasi harus diberi label!",
    maxScore: 12,
    sampleAnswer: "Cara: Dilakukan pagi hari (06.00-09.00), petik bunga jantan yang mekar, kupas kelopak mahkotanya, lalu sentuhkan kepala sari ke kepala putik bunga betina secara merata. Alasan dilakukan: memastikan terjadi penyerbukan sempurna terutama pada semangka non-biji atau jika populasi serangga penyerbuk alami di lahan kurang. Label tanggal: sangat krusial untuk menghitung umur buah secara presisi sehingga waktu panen (30-40 hari setelah polinasi) dapat diprediksi secara tepat."
  },
  {
    id: 13,
    question: "Sebutkan 3 organisme pengganggu tanaman (OPT) utama pada semangka dan jelaskan pengendaliannya dengan prinsip PHT!",
    maxScore: 12,
    sampleAnswer: "OPT: 1) Kutu kebul (Bemisia tabaci) - vektor virus. 2) Thrips - perusak pucuk muda. 3) Lalat buah (Bactrocera sp.) - merusak daging buah. Pengendalian PHT: a) Pencegahan budaya/sanitasi lingkungan lahan dan rotasi non-cucurbit. b) Mekanis/fisik: pemasangan perangkap kuning berperekat (yellow sticky trap) 4-6 unit/100m² dan perangkap atraktan metil eugenol untuk lalat jantan. c) Biologis: perlindungan musuh alami. d) Kimiawi selektif: aplikasi insektisida hanya sebagai langkah terakhir bila populasi melampaui ambang ekonomi."
  },
  {
    id: 14,
    question: "Jelaskan ciri buah semangka siap panen dan cara panen yang benar!",
    maxScore: 12,
    sampleAnswer: "Ciri buah siap panen: Sulur dan daun pada ruas tangkai buah mulai mengering, kulit buah mengkilap berlilin, bercak tanah di bagian bawah berubah menjadi warna kuning krem, suara ketukan jari berdentum berat/dalam, dan kadar gula mencapai minimal 10 Brix. Cara panen benar: Panen pagi hari saat udara belum terik, potong tangkai dengan gunting pangkas bersih menyisakan 3-5 cm berbentuk huruf T, letakkan secara perlahan di tempat teduh beralas jerami tanpa dibanting."
  },
  {
    id: 15,
    question: "Lahan 500 m² ditanami semangka dengan jarak tanam 70 cm x 200 cm (kebutuhan 1,4 m²/tanaman). Berapa populasi tanaman? Jika 90% tanaman menghasilkan 1 buah berbobot rata-rata 4 kg dan harga jual Rp 5.000/kg, hitung total hasil panen dan pendapatan!",
    maxScore: 12,
    sampleAnswer: "1) Populasi = 500 m² ÷ 1,4 m² = 357 tanaman. 2) Buah berhasil = 90% × 357 = 321,3 → 321 buah. 3) Total hasil panen = 321 buah × 4 kg = 1.284 kg. 4) Total pendapatan = 1.284 kg × Rp 5.000 = Rp 6.420.000."
  }
];

export interface PracticalSkillItem {
  jobId: number;
  jobName: string;
  aspect: string;
}

export const PRACTICAL_SKILLS_RUBRIC: PracticalSkillItem[] = [
  { jobId: 1, jobName: "Job 1 Sanitasi", aspect: "Menggunakan APD dan alat dengan benar sesuai SOP K3" },
  { jobId: 1, jobName: "Job 1 Sanitasi", aspect: "Membersihkan lahan dan mengelola sisa tanaman sesuai prosedur" },
  { jobId: 1, jobName: "Job 1 Sanitasi", aspect: "Mengukur pH tanah dan mencatat hasil survei secara teliti" },
  { jobId: 2, jobName: "Job 2 Pengolahan", aspect: "Mengolah tanah, memberi kapur dan pupuk dasar sesuai takaran" },
  { jobId: 2, jobName: "Job 2 Pengolahan", aspect: "Membuat bedengan sesuai ukuran standar (L 100-120cm, T 30cm)" },
  { jobId: 2, jobName: "Job 2 Pengolahan", aspect: "Memasang mulsa PHP kencang dan membuat lubang tanam seragam" },
  { jobId: 3, jobName: "Job 3 Penyemaian", aspect: "Menyiapkan media semai 1:1:1 dan perlakuan benih" },
  { jobId: 3, jobName: "Job 3 Penyemaian", aspect: "Menyemai benih dengan posisi calon akar ke bawah secara seragam" },
  { jobId: 3, jobName: "Job 3 Penyemaian", aspect: "Merawat persemaian dan menyeleksi bibit siap pindah tanam" },
  { jobId: 4, jobName: "Job 4 Penanaman", aspect: "Memindahkan bibit dari tray tanpa merusak perakaran" },
  { jobId: 4, jobName: "Job 4 Penanaman", aspect: "Menanam pada kedalaman dan waktu yang tepat (sore/pagi berawan)" },
  { jobId: 4, jobName: "Job 4 Penanaman", aspect: "Menyiram larutan starter, memberi label, dan menyiapkan penyulaman" },
  { jobId: 5, jobName: "Job 5 Pemeliharaan", aspect: "Melakukan penyiraman teratur dan pemupukan susulan sistem kocor" },
  { jobId: 5, jobName: "Job 5 Pemeliharaan", aspect: "Melakukan pewiwilan cabang dan polinasi buatan pukul 06-09 pagi" },
  { jobId: 5, jobName: "Job 5 Pemeliharaan", aspect: "Memantau dan mengendalikan OPT dengan prinsip PHT (perangkap kuning)" },
  { jobId: 6, jobName: "Job 6 Panen", aspect: "Menilai kemasakan buah berdasarkan ciri visual, umur, dan brix" },
  { jobId: 6, jobName: "Job 6 Panen", aspect: "Memanen dengan gunting tajam menyisakan tangkai 3-5 cm tanpa cedera" },
  { jobId: 7, jobName: "Job 7 Pascapanen", aspect: "Melakukan sortasi, grading kelas A/B/C, dan analisis usaha R/C ratio" }
];

export const ATTITUDE_ASPECTS = [
  { id: 1, aspect: "Disiplin", indicator: "Hadir tepat waktu di lahan, mengikuti urutan kerja, dan mematuhi aturan SOP." },
  { id: 2, aspect: "Tanggung Jawab", indicator: "Menyelesaikan tugas praktik sampai tuntas, merawat alat, dan mengisi logbook secara jujur." },
  { id: 3, aspect: "Kerja Sama", indicator: "Aktif berbagi peran tugas kelompok dan menghargai pendapat rekan di lahan." },
  { id: 4, aspect: "K3 (Keselamatan Kerja)", indicator: "Memakai APD konsisten, menggunakan alat tajam secara aman, dan mengelola limbah/pestisida benar." },
  { id: 5, aspect: "Peduli Lingkungan", indicator: "Menjaga kebersihan bedengan dan tempat kerja, memilah sampah organik dan plastik mulsa." }
];

export const INITIAL_DAILY_SCHEDULES = [
  {
    id: "sch-1",
    time: "06:00 - 08:30 WIB",
    title: "Polinasi Buatan Bunga Semangka",
    desc: "Petik bunga jantan mekar, kupas kelopak, oles serbuk sari ke putik bunga betina di ruas 12-18. Beri label tanggal!",
    jobId: 5,
    tag: "Kritis Pagi",
    active: true
  },
  {
    id: "sch-2",
    time: "09:30 - 10:30 WIB",
    title: "Monitoring OPT & Perangkap Kuning",
    desc: "Periksa yellow sticky trap untuk populasi kutu kebul dan thrips. Bersihkan daun terinfeksi gejala virus.",
    jobId: 5,
    tag: "PHT Rutin",
    active: true
  },
  {
    id: "sch-3",
    time: "15:30 - 17:00 WIB",
    title: "Penyiraman Sore & Pengocoran Pupuk",
    desc: "Siram bedengan secukupnya di pangkal tanaman (hindari terik siang). Pengocoran NPK 16-16-16 dosis 250ml.",
    jobId: 5,
    tag: "Nutrisi & Air",
    active: true
  },
  {
    id: "sch-4",
    time: "16:00 - 17:30 WIB",
    title: "Pemberian Alas Buah & Pembalikan",
    desc: "Pasang alas jerami/styrofoam pada buah yang berdiameter > 10 cm agar tidak bersentuhan langsung dengan tanah becek.",
    jobId: 5,
    tag: "Kualitas Buah",
    active: true
  }
];
