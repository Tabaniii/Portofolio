/**
 * Data alur kerja pembuatan website (6 Tahapan).
 * Edit data di bawah ini untuk mengubah judul, deskripsi, estimasi waktu,
 * deliverable, atau rincian kegiatan setiap tahapan.
 */
export const WORKFLOW_STAGES = [
  {
    // Tahap 1: Perencanaan & pemahaman tujuan bisnis
    step: "01",
    phase: "Planning",
    title: "Planning (Perencanaan)",
    tagline: "Diskusi santai untuk memahami tujuan bisnis, target pasar, dan fitur utama yang dibutuhkan klien.",
    shortDesc: "Pondasi awal untuk memetakan arah proyek secara jelas dan transparan.",
    estimatedDuration: "1 - 2 Hari",
    iconName: "Compass",
    deliverables: "Project Brief & Rencana Fitur Utama",
    clientInput: "Ceritakan ide, profil bisnis, target pelanggan, dan referensi website yang disukai.",
    details: [
      "Diskusi santai (via WhatsApp, Google Meet, atau chat) seputar model bisnis Anda.",
      "Identifikasi fitur utama yang esensial (misal: katalog produk, landing page, atau integrasi WhatsApp).",
      "Penyelarasan target audiens agar pesan promosi di website tepat sasaran.",
      "Penyusunan estimasi waktu pengerjaan dan transparansi biaya tanpa komitmen di awal.",
    ],
  },
  {
    // Tahap 2: Pemetaan struktur & kebutuhan konten
    step: "02",
    phase: "Analysis",
    title: "Analysis (Analisis Kebutuhan)",
    tagline: "Pemetaan struktur halaman, alur pengunjung (user flow), dan kebutuhan konten agar website efektif.",
    shortDesc: "Menyusun peta jalan agar pengunjung website nyaman dan mudah diarahkan menjadi pembeli.",
    estimatedDuration: "2 - 3 Hari",
    iconName: "Search",
    deliverables: "Sitemap & Blueprint Alur Pengunjung",
    clientInput: "Kirimkan materi teks promosi, logo, atau foto produk jika sudah tersedia.",
    details: [
      "Pemetaan struktur menu dan navigasi (sitemap) agar rapi dan tidak membingungkan pengunjung.",
      "Perancangan alur konversi (user journey) dari landing page sampai ke tombol kontak/order.",
      "Identifikasi kebutuhan konten: penempatan copywriting persuasif dan Call-to-Action (CTA).",
      "Riset singkat kompetitor agar website Anda memiliki keunikan dan nilai tambah lebih.",
    ],
  },
  {
    // Tahap 3: Perancangan visual modern responsif
    step: "03",
    phase: "Design",
    title: "Design (Desain UI/UX)",
    tagline: "Pembuatan rancangan tampilan visual yang modern, responsif di HP maupun desktop, serta sesuai karakter brand klien.",
    shortDesc: "Menerjemahkan ide ke bentuk visual yang elegan, profesional, dan nyaman dipandang.",
    estimatedDuration: "3 - 5 Hari",
    iconName: "Palette",
    deliverables: "Mockup UI/UX Interaktif & Panduan Visual",
    clientInput: "Review desain visual awal dan berikan feedback/revisi sesuai selera brand Anda.",
    details: [
      "Penyusunan wireframe layout untuk memastikan penataan elemen proporsional.",
      "Eksplorasi visual modern dengan pemilihan warna, jenis font, dan aksen visual senada brand.",
      "Desain adaptif (mobile-first) agar tampilan di layar HP senyaman tampilan di desktop.",
      "Sesi preview mockup dan kesempatan revisi bersama klien sebelum tahap penulisan kode dimulai.",
    ],
  },
  {
    // Tahap 4: Penulisan kode Front-End & Back-End
    step: "04",
    phase: "Implementation",
    title: "Implementation (Pengembangan)",
    tagline: "Eksekusi penulisan kode program (Front-End & Back-End) untuk mengubah desain menjadi website yang fungsional dan cepat.",
    shortDesc: "Membangun website hidup dengan teknologi modern yang ngebut, aman, dan tanpa celah.",
    estimatedDuration: "5 - 10 Hari",
    iconName: "Code2",
    deliverables: "Website Siap Pakai di Server Demo (Staging)",
    clientInput: "Duduk santai sementara tim mengonversi desain menjadi website fungsional seutuhnya.",
    details: [
      "Penulisan kode Front-End yang responsif dan interaktif dengan animasi halus.",
      "Pengembangan Back-End / sistem formulir, tombol chat WhatsApp langsung, atau CMS database.",
      "Optimasi loading speed (Core Web Vitals) agar website dibuka instan tanpa bikin pengunjung kabur.",
      "Penerapan standar keamanan modern untuk melindungi data dan performa website bisnis Anda.",
    ],
  },
  {
    // Tahap 5: Uji coba menyeluruh & peluncuran domain
    step: "05",
    phase: "Testing & Integration",
    title: "Testing & Integration (Uji Coba & Rilis)",
    tagline: "Pengecekan menyeluruh di berbagai perangkat agar bebas bug, integrasi domain, hingga website siap diakses publik.",
    shortDesc: "Pengecekan akhir bebas kesalahan dan peluncuran resmi ke publik dunia.",
    estimatedDuration: "1 - 2 Hari",
    iconName: "CheckCircle2",
    deliverables: "Website Resmi Live & Akses Domain Aktif",
    clientInput: "Uji coba website di HP atau laptop pribadi Anda dan konfirmasi persetujuan rilis.",
    details: [
      "Uji coba lintas browser (Chrome, Safari, Firefox, Edge) dan berbagai ukuran layar gawai.",
      "Pengecekan seluruh fungsionalitas: link tombol, formulir kontak, kecepatan halaman, dan bebas error.",
      "Pemasangan sertifikat keamanan SSL (HTTPS) dan menghubungkan nama domain bisnis Anda (.com, .id, dll).",
      "Pendaftaran dasar ke Google Search Console agar website mulai diindeks mesin pencari.",
    ],
  },
  {
    // Tahap 6: Pendampingan & pemeliharaan berkala
    step: "06",
    phase: "Maintenance",
    title: "Maintenance (Pemeliharaan)",
    tagline: "Dukungan teknis berkelanjutan, pemantauan performa, dan update berkala setelah website resmi beroperasi.",
    shortDesc: "Pendampingan setelah rilis agar website Anda terus bekerja maksimal mendukung bisnis.",
    estimatedDuration: "Berkelanjutan",
    iconName: "LifeBuoy",
    deliverables: "Garansi Teknis & Panduan Pengelolaan Website",
    clientInput: "Gunakan website untuk bisnis Anda; hubungi kami kapan pun butuh bantuan teknis.",
    details: [
      "Pemantauan performa dan uptime server agar website selalu dapat diakses 24/7.",
      "Backup berkala data website untuk pencegahan dan keamanan data bisnis Anda.",
      "Bantuan penanganan kendala teknis cepat jika ditemukan bug pasca peluncuran.",
      "Pemberian panduan praktis jika Anda ingin mengelola konten website secara mandiri.",
    ],
  },
];
