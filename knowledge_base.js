// UniMAP JHEP — Unit Pembiayaan & Bantuan Kewangan
// Official Structured Dataset from UNIT PEMBIAYAAN.md (78 Structured Q&As + Bilingual Support + Conversational Memory)

const STOPWORDS = new Set([
    "i", "me", "my", "we", "our", "you", "your", "is", "are", "was", "were", "be", "been",
    "have", "has", "had", "do", "does", "did", "can", "could", "will", "would", "should",
    "the", "a", "an", "in", "on", "at", "to", "for", "of", "with", "by", "from", "about",
    "how", "what", "where", "when", "who", "why", "which", "want", "ask", "know", "need", "help", "please",
    "saya", "aku", "kami", "kita", "awak", "anda", "dia", "mereka", "ini", "itu", "yang",
    "di", "ke", "dari", "pada", "untuk", "dengan", "oleh", "tentang", "adalah", "ialah",
    "macam", "mana", "apa", "bila", "siapa", "kenapa", "mengapa", "nak", "tahu", "tanya",
    "boleh", "tak", "tidak", "ada", "dekat", "kat", "tolong", "minta", "berapa", "kalau", "jika",
    "assalamualaikum", "salam", "sejahtera", "tuan", "puan", "encik", "cik", "dr", "terima", "kasih", "maaf", "ganggu",
    "bagaimanakah", "apakah", "bilakah", "berapakah", "siapakah", "adakah", "bolehkah", "dimanakah"
]);

// Bilingual Synonym Map so English & casual Malay queries match the exact row in UNIT PEMBIAYAAN.md
const SYNONYM_EXPANSIONS = {
    "deadline": ["tarikh buka", "tarikh tutup", "jadual permohonan", "bila buka"],
    "course": ["kod program", "kursus layak", "program berdaftar"],
    "bank": ["bank panel", "rhb islamic", "akaun bank"],
    "amount": ["jumlah pinjaman", "100%", "75%", "50%", "kadar pinjaman"],
    "apply": ["cara mohon", "permohonan online", "memohon"],
    "register": ["daftar myptptn", "log masuk"],
    "pin": ["pin bsn", "nombor pin", "rm5"],
    "sspn": ["sspn prime", "simpanan minimum", "rm20"],
    "age": ["umur maksimum", "had umur", "45 tahun"],
    "result": ["keputusan ptptn", "semakan kelulusan", "5 hari bekerja"],
    "agreement": ["terima tawaran", "dokumen perjanjian", "hantar perjanjian", "serahan online"],
    "digital": ["tandatangan digital", "mydigital id", "rm25", "24 jam bekerja"],
    "disbursement": ["duit ptptn", "dikreditkan", "21 hari bekerja", "bila masuk"],
    "wpp": ["wang pendahuluan pinjaman", "rm1500", "bank islam", "tebus wpp", "potongan rm500"],
    "baek": ["biasiswa anak ekasih", "ekasih", "baek ptptn"],
    "gpa": ["pengeluaran semester", "png", "pngk", "2.0", "semester seterusnya"],
    "tuition": ["potongan yuran", "bendahari", "yuran pengajian"],
    "terminated": ["diberhentikan", "dihentikan", "muflis"],
    "change": ["tukar program", "tukar kursus", "pertukaran program", "rayuan pertukaran"],
    "repayment": ["bayaran balik", "12 bulan", "ujrah"],
    "deferment": ["penangguhan bayaran balik", "tangguh bayaran", "tidak bekerja", "menganggur", "sambung belajar", "24 bulan", "ccris"],
    "firstclass": ["kelas pertama", "pengecualian bayaran balik", "b40", "m40", "belanjawan 2026", "skrol", "transkrip", "refund", "lebihan bayaran"],
    "contact": ["nombor telefon", "04-941 4431", "04-970 8181", "hubungi"]
};

// Complete 78-Item Dataset from UNIT PEMBIAYAAN.md + Key UniMAP Dermasiswa & OSI FAQs
const UNIT_PEMBIAYAAN_DATA = [
    // --- BAHAGIAN 1: PERMOHONAN & PENGURUSAN PINJAMAN PTPTN ---
    {
        id: "ptptn_01",
        section: "Permohonan & Pinjaman PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Tarikh Buka & Tutup Permohonan PTPTN", en: "PTPTN Application Opening & Closing Dates" },
        soalan_utama: "Bilakah tarikh buka dan tutup permohonan PTPTN?",
        soalan_en: "When are the opening and closing dates for PTPTN loan applications?",
        soalan_alternatif: "Bila permohonan PTPTN dibuka? Bila tarikh akhir mohon PTPTN? When is PTPTN deadline?",
        kata_kunci: ["tarikh buka", "tarikh tutup", "jadual permohonan", "deadline ptptn", "kelompok", "bila buka"],
        jawapan_rasmi: "Tarikh permohonan PTPTN adalah mengikut jadual yang ditetapkan bagi IPT dan kelompok pengajian masing-masing. Pelajar perlu menyemak jadual permohonan dalam myPTPTN dan saluran hebahan rasmi universiti.",
        jawapan_en: "PTPTN application dates follow the schedule set for each institution (IPT) and intake batch. Students should check the application schedule in myPTPTN and the university's official announcement channels.",
        pautan: [
            { label: "Semakan myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/semakan" },
            { label: "Portal Unit Pembiayaan JHEP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/" },
            { label: "Saluran WhatsApp Rasmi Unit Pembiayaan", url: "https://whatsapp.com/channel/0029Vb0f9j6ElagrCFT2731y" }
        ]
    },
    {
        id: "ptptn_02",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah cara menyemak program pengajian yang layak menerima pinjaman PTPTN?",
        soalan_en: "How do I check if my study programme is eligible for a PTPTN loan?",
        soalan_alternatif: "Adakah kursus saya layak PTPTN? Bagaimana nak semak kod program? Check eligible course code",
        kata_kunci: ["kod program", "kursus layak", "program berdaftar", "kelayakan kursus", "surat tawaran"],
        jawapan_rasmi: "Pelajar perlu menyemak sama ada program pengajian berdaftar dan diluluskan oleh PTPTN. Pastikan nama program yang dipilih sama dengan nama dalam surat tawaran pengajian.",
        jawapan_en: "Students must verify that their study programme is registered and approved by PTPTN. Ensure the selected programme name matches the exact name stated in your university offer letter.",
        pautan: [
            { label: "Semakan Kelayakan Program myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/semakan" },
            { label: "Senarai Kod Program UniMAP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/kod-program-ptptn" }
        ]
    },
    {
        id: "ptptn_03",
        section: "Permohonan & Pinjaman PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Bank Panel PTPTN UniMAP (RHB Islamic)", en: "UniMAP PTPTN Panel Bank (RHB Islamic)" },
        soalan_utama: "Apakah bank panel bagi pelajar UniMAP?",
        soalan_en: "Which panel bank is required for UniMAP students applying for PTPTN?",
        soalan_alternatif: "Bank mana perlu dibuka untuk PTPTN? Akaun bank apa digunakan? What bank account for UniMAP PTPTN?",
        kata_kunci: ["bank panel", "akaun bank", "rhb islamic", "rhb", "pengkreditan pinjaman"],
        jawapan_rasmi: "Pelajar UniMAP perlu mempunyai akaun bank panel yang ditetapkan, iaitu **RHB Islamic Bank**, bagi urusan pengkreditan wang pinjaman.",
        jawapan_en: "UniMAP students are required to hold an account with the designated panel bank, which is **RHB Islamic Bank**, for PTPTN loan disbursement.",
        pautan: [
            { label: "Panduan Permohonan PTPTN UniMAP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/permohonan" },
            { label: "Portal myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/semakan" }
        ]
    },
    {
        id: "ptptn_04",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah kelayakan jumlah pinjaman PTPTN ditentukan?",
        soalan_en: "How is the PTPTN loan amount eligibility (100%, 75%, or 50%) determined?",
        soalan_alternatif: "Saya dapat pinjaman 100%, 75% atau 50%? Berapa jumlah pinjaman saya? How much loan will I get?",
        kata_kunci: ["jumlah pinjaman", "kelayakan pinjaman", "100%", "75%", "50%", "pendapatan keluarga", "str", "kadar pinjaman"],
        jawapan_rasmi: "Kadar pinjaman bergantung pada kategori kelayakan yang ditetapkan PTPTN. Berdasarkan panduan yang diberikan, kadar maksimum (100%), 75% atau 50% ditentukan mengikut status penerima STR dan pendapatan keluarga. Semak kelayakan sebenar melalui myPTPTN.",
        jawapan_en: "The loan tier depends on PTPTN's eligibility categories. Maximum (100%), 75%, or 50% financing rates are determined by Sumbangan Tunai Rahmah (STR) recipient status and household income. Check your exact rate via myPTPTN.",
        pautan: [
            { label: "Semakan myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/semakan" },
            { label: "Maklumat Pinjaman Pendidikan PTPTN", url: "https://www.ptptn.gov.my/pinjaman-pendidikan/" }
        ]
    },
    {
        id: "ptptn_05",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Apakah syarat permohonan pinjaman PTPTN?",
        soalan_en: "What are the eligibility requirements to apply for a PTPTN loan?",
        soalan_alternatif: "Siapa yang layak memohon PTPTN? Apakah kelayakan pinjaman? Who is eligible for PTPTN?",
        kata_kunci: ["syarat ptptn", "syarat permohonan", "warganegara", "umur", "tawaran ipt", "sspn", "baki pengajian"],
        jawapan_rasmi: "Antara syarat yang dinyatakan dalam panduan ialah warganegara Malaysia, berumur tidak melebihi 45 tahun ketika memohon, mendapat tawaran pengajian, mengikuti kursus yang diluluskan PTPTN, mempunyai akaun Simpan SSPN yang memenuhi syarat dan baki pengajian sekurang-kurangnya satu semester. Syarat semasa tertakluk kepada ketetapan PTPTN.",
        jawapan_en: "Requirements include: Malaysian citizen, aged not more than 45 at the time of application, holding a valid admission offer, pursuing a PTPTN-approved course, having an active Simpan SSPN account, and having at least 1 semester of study remaining.",
        pautan: [
            { label: "Syarat Pinjaman Pendidikan PTPTN", url: "https://www.ptptn.gov.my/pinjaman-pendidikan/" }
        ]
    },
    {
        id: "ptptn_06",
        section: "Permohonan & Pinjaman PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Cara Memohon Pinjaman PTPTN & SSPN Prime", en: "How to Apply for PTPTN & Open SSPN Prime" },
        soalan_utama: "Bagaimanakah cara memohon pinjaman PTPTN?",
        soalan_en: "How do I apply for a PTPTN education loan online?",
        soalan_alternatif: "Di mana nak mohon PTPTN? Bagaimana proses permohonan? How to apply PTPTN online?",
        kata_kunci: ["cara mohon", "permohonan online", "pinjaman pendidikan", "myptptn", "proses permohonan"],
        jawapan_rasmi: "Permohonan pinjaman pendidikan dibuat secara dalam talian melalui **myPTPTN**. Pelajar perlu melengkapkan maklumat permohonan, membuka akaun **SSPN Prime** (minimum RM20) dan akaun bank panel **RHB Islamic**, mengemukakan dokumen yang diperlukan dan menghantar permohonan mengikut jadual yang ditetapkan.",
        jawapan_en: "PTPTN loan applications are submitted online via **myPTPTN**. Students must complete their profile, have an **SSPN Prime** account (minimum RM20) and **RHB Islamic** panel bank account, and submit the application within the scheduled window.",
        pautan: [
            { label: "Panduan Permohonan PTPTN JHEP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/permohonan" },
            { label: "Log Masuk Web myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_07",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah cara mendaftar akaun myPTPTN?",
        soalan_en: "How do I register and log in to a myPTPTN account?",
        soalan_alternatif: "Bagaimana nak daftar myPTPTN? Di mana nak log masuk? How to register myPTPTN?",
        kata_kunci: ["daftar myptptn", "akaun myptptn", "log masuk", "portal ptptn"],
        jawapan_rasmi: "Layari portal myPTPTN dan ikuti arahan pendaftaran pengguna baharu atau log masuk untuk memulakan urusan permohonan pinjaman.",
        jawapan_en: "Visit the official myPTPTN portal and follow the new user registration steps (including eKYC identity verification) or log in to start your loan application.",
        pautan: [
            { label: "Portal Rasmi myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_08",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Adakah pelajar perlu membeli nombor PIN PTPTN?",
        soalan_en: "Do students need to buy a PTPTN BSN PIN number?",
        soalan_alternatif: "Perlu beli PIN BSN ke? Berapa harga PIN? Do I need BSN PIN RM5?",
        kata_kunci: ["pin bsn", "nombor pin", "rm5", "pembelian pin", "beli pin"],
        jawapan_rasmi: "Rujuk arahan semasa dalam myPTPTN. Panduan terdahulu menyatakan pembelian PIN BSN berharga RM5, tetapi kaedah dan keperluan PIN hendaklah disahkan berdasarkan proses permohonan semasa di dalam portal myPTPTN.",
        jawapan_en: "Refer to the current instructions inside myPTPTN. Previous guidelines stated a RM5 BSN PIN purchase, so verify the current registration requirement directly inside the myPTPTN portal.",
        pautan: [
            { label: "Panduan Permohonan PTPTN UniMAP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/permohonan" }
        ]
    },
    {
        id: "ptptn_09",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah cara membuka akaun SSPN Prime?",
        soalan_en: "How do I open a Simpan SSPN Prime account and what is the minimum deposit?",
        soalan_alternatif: "Bagaimana nak buka SSPN? Berapa simpanan minimum SSPN Prime? How to open SSPN account?",
        kata_kunci: ["sspn prime", "buka akaun", "simpanan minimum", "rm20", "akaun sspn"],
        jawapan_rasmi: "Akaun SSPN Prime boleh dibuka melalui aplikasi atau Web myPTPTN mengikut panduan yang diberikan. Amaun simpanan minimum yang dinyatakan ialah **RM20**. Selesaikan pembayaran dan semak nombor akaun selepas proses pembukaan.",
        jawapan_en: "An SSPN Prime account can be opened directly via the myPTPTN mobile app or web portal. The minimum deposit required is **RM20**. Complete the payment and check your SSPN account number after activation.",
        pautan: [
            { label: "Panduan Buka Akaun SSPN (JHEP)", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/akaun-sspn" }
        ]
    },
    {
        id: "ptptn_10",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Berapakah umur maksimum untuk memohon PTPTN?",
        soalan_en: "What is the maximum age limit to apply for a PTPTN loan?",
        soalan_alternatif: "Umur 30 atau 40 tahun boleh mohon PTPTN? Maximum age limit PTPTN?",
        kata_kunci: ["umur maksimum", "had umur", "syarat umur", "45 tahun"],
        jawapan_rasmi: "Berdasarkan panduan yang diberikan, pemohon mestilah berumur **tidak melebihi 45 tahun** pada tarikh permohonan. Sila semak syarat terkini PTPTN sebelum memohon.",
        jawapan_en: "Applicants must be **not older than 45 years of age** on the date of application.",
        pautan: [
            { label: "Syarat Pinjaman Pendidikan PTPTN", url: "https://www.ptptn.gov.my/pinjaman-pendidikan/" }
        ]
    },
    {
        id: "ptptn_11",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bilakah keputusan permohonan PTPTN boleh disemak?",
        soalan_en: "When can I check my PTPTN loan application result?",
        soalan_alternatif: "Berapa lama keputusan PTPTN keluar? Bila boleh semak kelulusan? How many days for PTPTN approval?",
        kata_kunci: ["keputusan ptptn", "semakan kelulusan", "5 hari bekerja", "lima hari bekerja", "status permohonan", "bila lulus"],
        jawapan_rasmi: "Berdasarkan panduan Unit Pembiayaan, semakan boleh dibuat selepas tempoh pemprosesan yang dinyatakan, iaitu **sekitar lima (5) hari bekerja selepas tarikh tutup permohonan**. Tarikh paparan sebenar tertakluk kepada jadual dan makluman PTPTN dalam myPTPTN.",
        jawapan_en: "According to Unit Pembiayaan guidelines, results can be checked approximately **five (5) working days after the application closing date** via the myPTPTN portal.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN (JHEP)", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" },
            { label: "Portal myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_12",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah cara menerima tawaran pinjaman PTPTN?",
        soalan_en: "What should I do after my PTPTN loan is approved to accept the offer?",
        soalan_alternatif: "Saya lulus PTPTN, apa perlu dibuat? Bagaimana nak terima tawaran? How to accept PTPTN offer?",
        kata_kunci: ["tawaran pinjaman", "lulus ptptn", "surat tawaran", "dokumen perjanjian", "terima tawaran"],
        jawapan_rasmi: "Setelah permohonan diluluskan, pelajar perlu menyemak surat tawaran dan melengkapkan dokumen perjanjian mengikut arahan PTPTN. Dokumen boleh dihantar secara dalam talian melalui Web myPTPTN atau melalui kaedah lain yang dibenarkan.",
        jawapan_en: "Once your application is approved, review your offer letter and complete the loan agreement documents as instructed by PTPTN via the myPTPTN web portal.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" },
            { label: "Portal myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_13",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Bagaimanakah cara menghantar dokumen tawaran PTPTN secara dalam talian?",
        soalan_en: "How do I submit my PTPTN loan agreement documents online?",
        soalan_alternatif: "Bagaimana nak hantar perjanjian PTPTN online? Submit PTPTN agreement online",
        kata_kunci: ["hantar perjanjian", "dokumen tawaran", "serahan online", "web myptptn", "perjanjian online"],
        jawapan_rasmi: "Log masuk ke **Web myPTPTN**, pilih permohonan pinjaman dan ikut arahan penghantaran dokumen perjanjian secara dalam talian. Pastikan semua maklumat dan dokumen lengkap sebelum penghantaran.",
        jawapan_en: "Log in to **myPTPTN Web**, select your loan application, and follow the online agreement submission instructions.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" },
            { label: "Log Masuk myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_14",
        section: "Permohonan & Pinjaman PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Tandatangan Digital PTPTN (RM25 & Tempoh 24 Jam)", en: "PTPTN Digital Signature (RM25 & 24-Hr Processing)" },
        soalan_utama: "Apakah itu tandatangan digital PTPTN dan berapakah bayarannya?",
        soalan_en: "What is the PTPTN Digital Signature, how much does it cost (RM25), and how long does it take?",
        soalan_alternatif: "Bagaimana nak tandatangan perjanjian PTPTN? Perlu bayar berapa untuk perjanjian PTPTN online? Selepas bayar RM25, bila perjanjian siap?",
        kata_kunci: ["tandatangan digital", "perjanjian online", "mydigital id", "bayaran perjanjian", "rm25", "setem lhdn", "24 jam bekerja", "tempoh tandatangan"],
        jawapan_rasmi: "- **Maksud Tandatangan Digital**: Proses pengesahan dokumen perjanjian PTPTN secara elektronik di dalam Web myPTPTN.\n- **Bayaran (RM25)**: Bayaran serahan perjanjian dalam talian ialah **RM25** bagi urusan berkaitan penyeteman (setem hasil LHDN) dan tandatangan digital. Sahkan amaun semasa yang dipaparkan dalam myPTPTN sebelum membuat pembayaran.\n- **Tempoh Siap (24 Jam Bekerja)**: Proses tandatangan digital mengambil masa sekitar **24 jam waktu bekerja** (tidak termasuk Sabtu, Ahad dan cuti umum).",
        jawapan_en: "- **What It Is**: Electronic execution of your PTPTN loan agreement via myPTPTN Web.\n- **Fee (RM25)**: Online agreement submission costs **RM25**, covering LHDN stamp duty and digital signing.\n- **Processing Time (24 Working Hours)**: Takes approximately **24 working hours** (excluding Saturdays, Sundays, and public holidays). Check status in myPTPTN.",
        pautan: [
            { label: "Panduan Terima Tawaran & Tandatangan Digital", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" },
            { label: "Web myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },
    {
        id: "ptptn_15",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Berapakah bayaran bagi tandatangan digital PTPTN?",
        soalan_en: "How much is the fee for PTPTN online digital signature and stamping?",
        soalan_alternatif: "Perlu bayar berapa untuk perjanjian PTPTN online? How much to pay for PTPTN digital signature?",
        kata_kunci: ["bayaran perjanjian", "rm25", "setem lhdn", "bayaran tandatangan digital"],
        jawapan_rasmi: "Berdasarkan panduan yang diberikan, bayaran serahan perjanjian dalam talian ialah **RM25** bagi urusan berkaitan penyeteman dan tandatangan digital. Sahkan amaun semasa yang dipaparkan dalam myPTPTN sebelum membuat pembayaran.",
        jawapan_en: "The online agreement submission fee is **RM25** for stamp duty and digital signature processing. Confirm the exact amount shown in myPTPTN prior to payment.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" }
        ]
    },
    {
        id: "ptptn_16",
        section: "Permohonan & Pinjaman PTPTN",
        soalan_utama: "Berapa lama proses tandatangan digital mengambil masa?",
        soalan_en: "How long does the PTPTN digital signature process take after paying RM25?",
        soalan_alternatif: "Selepas bayar RM25, bila perjanjian siap? How long after paying RM25?",
        kata_kunci: ["tempoh tandatangan", "24 jam bekerja", "status perjanjian", "selepas bayar rm25"],
        jawapan_rasmi: "Panduan yang diberikan menyatakan proses tandatangan digital mengambil masa **sekitar 24 jam waktu bekerja**, tidak termasuk Sabtu, Ahad dan cuti umum. Semak status terkini dalam myPTPTN.",
        jawapan_en: "The digital signature process takes approximately **24 working hours** (excluding weekends and public holidays). Check your updated agreement status in myPTPTN.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" }
        ]
    },
    {
        id: "ptptn_17",
        section: "Permohonan & Pinjaman PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Tempoh Duit PTPTN Masuk Akaun (21 Hari Bekerja)", en: "PTPTN Loan Disbursement Timeline (21 Working Days)" },
        soalan_utama: "Berapa lama wang pinjaman PTPTN dikreditkan?",
        soalan_en: "How long does it take for PTPTN loan money to be credited into my bank account?",
        soalan_alternatif: "Bila duit PTPTN masuk akaun? Berapa hari selepas perjanjian siap? When will PTPTN money be credited?",
        kata_kunci: ["duit ptptn", "tarikh kredit", "wang pinjaman", "21 hari bekerja", "bila duit masuk", "dikreditkan"],
        jawapan_rasmi: "Berdasarkan panduan yang diberikan, pengkreditan pinjaman dijangka mengambil masa **sehingga 21 hari bekerja selepas proses perjanjian lengkap**, tertakluk kepada pengesahan IPT dan pemprosesan PTPTN.",
        jawapan_en: "Loan disbursement is expected within **21 working days after the agreement process is completed**, subject to university (IPT) confirmation and PTPTN processing.",
        pautan: [
            { label: "Panduan Terima Tawaran PTPTN", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/terima-tawaran" },
            { label: "Web myPTPTN", url: "https://myptptn.ptptn.gov.my/ptptn/app/landing" }
        ]
    },

    // --- BAHAGIAN 2: WANG PENDAHULUAN PINJAMAN (WPP RM1,500) ---
    {
        id: "wpp_01",
        section: "Wang Pendahuluan Pinjaman (WPP)",
        featuredFaq: true,
        faqLabel: { ms: "Wang Pendahuluan Pinjaman (WPP RM1,500)", en: "PTPTN Advance Loan (WPP RM1,500)" },
        soalan_utama: "Apakah itu Wang Pendahuluan Pinjaman (WPP) dan syarat kelayakannya?",
        soalan_en: "What is Wang Pendahuluan Pinjaman (WPP RM1,500) and who is eligible?",
        soalan_alternatif: "Apa maksud WPP PTPTN? Berapa jumlah WPP? Siapa layak dapat WPP? Adakah penerima STR layak?",
        kata_kunci: ["wpp", "wang pendahuluan", "rm1500", "rm1,500", "bantuan sebelum daftar", "syarat wpp", "str", "hutang wpp"],
        jawapan_rasmi: "- **Apakah WPP**: Wang pendahuluan sebanyak **RM1,500** yang diberikan kepada pelajar yang layak sebelum mendaftar di IPT. WPP merupakan sebahagian daripada pinjaman PTPTN dan **bukan bantuan percuma**.\n- **Syarat Kelayakan WPP**: Warganegara Malaysia, memberikan persetujuan menerima WPP semasa memohon UPU/IPT, pelajar atau ibu bapa/penjaga merupakan **penerima STR**, mendapat tawaran Diploma atau Ijazah Sarjana Muda sepenuh masa di IPTA/politeknik, serta tidak mempunyai hutang WPP terdahulu.",
        jawapan_en: "- **What is WPP**: An advance loan of **RM1,500** provided to eligible students prior to university registration. WPP is part of the PTPTN loan and **not a free grant**.\n- **Eligibility**: Malaysian citizen, consented to receive WPP during UPU/IPT admission application, student or parent/guardian is an **STR recipient**, offered full-time Diploma or Bachelor's Degree at an IPTA/Polytechnic, and has no prior WPP debt.",
        pautan: [
            { label: "Maklumat Rasmi WPP PTPTN", url: "https://www.ptptn.gov.my/wang-pendahuluan-pinjaman-wpp/" }
        ]
    },
    {
        id: "wpp_02",
        section: "Wang Pendahuluan Pinjaman (WPP)",
        soalan_utama: "Bagaimanakah cara memohon dan menyemak status WPP?",
        soalan_en: "How do I apply for WPP and check my WPP approval status?",
        soalan_alternatif: "Perlu isi borang WPP? Bagaimana nak dapat WPP? Bagaimana nak semak WPP? Duit WPP lulus atau tidak?",
        kata_kunci: ["permohonan wpp", "setuju terima", "upu", "semakan wpp", "status wpp", "sms"],
        jawapan_rasmi: "- **Cara Memohon WPP**: Berdasarkan pengesahan persetujuan menerima WPP semasa permohonan kemasukan ke IPT melalui Portal UPU atau saluran kemasukan IPT berkaitan.\n- **Semakan Status WPP**: Boleh dibuat melalui portal rasmi PTPTN. Makluman juga dihantar melalui SMS atau e-mel berdasarkan maklumat hubungan yang didaftarkan.",
        jawapan_en: "- **How to Apply**: Automatically processed when you tick 'Agree to accept WPP' during your UPU or IPT admission application.\n- **Status Check**: Check via the official PTPTN portal, or via SMS/email notifications sent to your registered contact.",
        pautan: [
            { label: "Semakan & Maklumat WPP PTPTN", url: "https://www.ptptn.gov.my/wang-pendahuluan-pinjaman-wpp/" }
        ]
    },
    {
        id: "wpp_03",
        section: "Wang Pendahuluan Pinjaman (WPP)",
        soalan_utama: "Di manakah WPP boleh ditunaikan dan berapa lama tempoh sah laku?",
        soalan_en: "Where can I cash out my WPP warrant and when does it expire?",
        soalan_alternatif: "Bank mana boleh tebus WPP? Apa dokumen perlu dibawa? WPP boleh ditebus sampai bila? Adakah WPP ada tarikh luput?",
        kata_kunci: ["tebus wpp", "ditunaikan", "bank islam", "surat tawaran wpp", "tempoh wpp", "tarikh luput", "dua bulan"],
        jawapan_rasmi: "- **Tempat Menunaikan WPP**: Di mana-mana kaunter **Bank Islam** dengan membawa **Surat Tawaran WPP** yang dicetak daripada portal rasmi PTPTN beserta **MyKad pelajar**. (*Wakil tidak dibenarkan menunaikan WPP bagi pihak pelajar*).\n- **Tempoh Sah Laku**: Penunaian perlu dibuat dalam tempoh **dua (2) bulan** daripada tarikh surat tawaran WPP.",
        jawapan_en: "- **Where to Cash Out**: At any **Bank Islam** counter by bringing your printed **WPP Offer Letter** and **student MyKad** (*representatives are not allowed*).\n- **Validity Period**: Must be cashed within **two (2) months** from the date of the WPP offer letter.",
        pautan: [
            { label: "Panduan Penunaian WPP PTPTN", url: "https://www.ptptn.gov.my/wang-pendahuluan-pinjaman-wpp/" }
        ]
    },
    {
        id: "wpp_04",
        section: "Wang Pendahuluan Pinjaman (WPP)",
        soalan_utama: "Adakah WPP perlu dibayar balik dan bagaimana jika pelajar tidak meneruskan pengajian?",
        soalan_en: "Does WPP have to be repaid, and what happens if I do not register at the university?",
        soalan_alternatif: "WPP percuma atau pinjaman? Bagaimana potongan WPP dibuat? Kalau tak jadi daftar universiti, perlu bayar WPP?",
        kata_kunci: ["bayaran balik wpp", "potongan rm500", "wpp tidak daftar", "batal pengajian", "wpp percuma"],
        jawapan_rasmi: "- **Potongan Bayaran Balik WPP**: WPP bukan bantuan percuma. Potongan sebanyak **RM500 setiap semester** (selama 3 semester) akan dibuat secara automatik daripada jumlah pinjaman PTPTN apabila pinjaman diluluskan.\n- **Jika Tidak Meneruskan Pengajian**: Jika pelajar tidak mendaftar atau berhenti daripada IPT selepas menunaikan WPP, pelajar dikehendaki membayar balik jumlah WPP tersebut mengikut tempoh dan syarat yang ditetapkan PTPTN.",
        jawapan_en: "- **WPP Repayment Deduction**: WPP is not free aid. **RM500 per semester** is deducted automatically from your subsequent PTPTN loan disbursements.\n- **If You Do Not Enroll**: If you do not proceed with your studies after cashing WPP, you are required to repay the WPP amount according to PTPTN's terms.",
        pautan: [
            { label: "Maklumat WPP PTPTN", url: "https://www.ptptn.gov.my/wang-pendahuluan-pinjaman-wpp/" }
        ]
    },

    // --- BAHAGIAN 3: BIASISWA ANAK eKASIH PTPTN (BAeK) ---
    {
        id: "baek_01",
        section: "Biasiswa Anak eKasih (BAeK)",
        featuredFaq: true,
        faqLabel: { ms: "Biasiswa Anak eKasih PTPTN (BAeK)", en: "PTPTN eKasih Scholarship (BAeK)" },
        soalan_utama: "Apakah itu Biasiswa Anak eKasih PTPTN (BAeK), syarat kelayakan dan cara memohonnya?",
        soalan_en: "What is Biasiswa Anak eKasih PTPTN (BAeK), who is eligible, and how do I apply?",
        soalan_alternatif: "Apa itu BAeK? Adakah pinjaman PTPTN ditukar kepada biasiswa? Siapa boleh dapat BAeK? Perlu mohon BAeK secara berasingan?",
        kata_kunci: ["baek", "baek ptptn", "biasiswa anak ekasih", "ekasih", "syarat baek", "proses baek", "umur 25"],
        jawapan_rasmi: "- **Apakah BAeK PTPTN**: Inisiatif yang menukarkan pembiayaan pinjaman PTPTN kepada bentuk **biasiswa** bagi pelajar yang memenuhi syarat kelayakan termasuk berdaftar dalam pangkalan data **eKasih**.\n- **Syarat Kelayakan**: Warganegara Malaysia, berumur tidak melebihi 25 tahun pada tarikh permohonan, mengikuti Diploma atau Ijazah Sarjana Muda sepenuh masa di IPTA yang diluluskan PTPTN, tersenarai dalam **eKasih**, telah diluluskan pinjaman PTPTN, dan mempunyai akaun Simpan SSPN aktif.\n- **Proses Permohonan**: Pelajar perlu memohon pinjaman PTPTN melalui myPTPTN terlebih dahulu. Jika memenuhi syarat, pelajar akan menerima tawaran BAeK melalui e-mel dan notifikasi myPTPTN untuk melengkapkan dokumen tawaran.",
        jawapan_en: "- **What is BAeK PTPTN**: An initiative that converts a PTPTN loan into a **scholarship** for eligible students registered in the **eKasih** database.\n- **Eligibility**: Malaysian citizen, aged 25 or below, pursuing a full-time Diploma or Bachelor's Degree at an IPTA, listed in **eKasih**, approved for a PTPTN loan, and holding an active Simpan SSPN account.\n- **Application Process**: Apply for a normal PTPTN loan on myPTPTN first. Eligible students will receive a BAeK offer notification via email and myPTPTN.",
        pautan: [
            { label: "Portal Rasmi Biasiswa Anak eKasih (BAeK)", url: "https://www.ptptn.gov.my/biasiswa-anak-ekasih-ptptn/" }
        ]
    },

    // --- BAHAGIAN 4: KOD PROGRAM, PENGELUARAN SEMESTER, POTONGAN YURAN & PERTUKARAN PROGRAM ---
    {
        id: "ptptn_18",
        section: "Pengeluaran, Yuran & Pertukaran Program",
        soalan_utama: "Bagaimanakah cara menyemak kod program UniMAP yang ditawarkan pinjaman PTPTN?",
        soalan_en: "Where can I check the official list of PTPTN course codes for UniMAP programmes?",
        soalan_alternatif: "Di mana nak tengok senarai kod kursus UniMAP? PTPTN ditolak sebab kursus tidak berdaftar",
        kata_kunci: ["senarai kod program", "kod kursus unimap", "program ptptn", "kod program"],
        jawapan_rasmi: "Rujuk senarai kod program UniMAP yang disediakan oleh Unit Pembiayaan JHEP. Pastikan nama program dan maklumat pengajian dipilih dengan tepat berdasarkan surat tawaran IPT.",
        jawapan_en: "Refer to the official UniMAP PTPTN programme code list provided by Unit Pembiayaan JHEP. Ensure you select the exact programme name matching your admission offer letter.",
        pautan: [
            { label: "Senarai Kod Program PTPTN UniMAP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/kod-program-ptptn" }
        ]
    },
    {
        id: "ptptn_19",
        section: "Pengeluaran, Yuran & Pertukaran Program",
        featuredFaq: true,
        faqLabel: { ms: "Syarat Sambungan PTPTN (PNG >= 2.0) & Potongan Yuran", en: "PTPTN Semester Renewal (GPA >= 2.0) & Fee Deduction" },
        soalan_utama: "Apakah syarat pengeluaran pinjaman PTPTN untuk semester seterusnya?",
        soalan_en: "Why hasn't my PTPTN loan been disbursed this semester, and what is the minimum GPA requirement?",
        soalan_alternatif: "Kenapa duit PTPTN semester ini tak masuk? Apakah syarat sambungan pinjaman? Berapa pointer PNG minimum PTPTN?",
        kata_kunci: ["pengeluaran semester", "png", "pngk", "gpa", "2.0", "keputusan peperiksaan", "status pengajian", "semester ini tak masuk", "sambungan pinjaman"],
        jawapan_rasmi: "Pengeluaran pinjaman bagi semester berikutnya tertakluk kepada pengesahan IPT (status aktif belajar) dan syarat akademik PTPTN, di mana pelajar perlu memperolehi keputusan peperiksaan **PNG / GPA tidak kurang daripada 2.00 bagi setiap semester**.",
        jawapan_en: "Subsequent semester disbursements require university confirmation of active study status and meeting PTPTN's academic requirement of achieving a semester **GPA (PNG) of at least 2.00 every semester**.",
        pautan: [
            { label: "Syarat Pinjaman Pendidikan PTPTN", url: "https://www.ptptn.gov.my/pinjaman-pendidikan/" }
        ]
    },
    {
        id: "ptptn_20",
        section: "Pengeluaran, Yuran & Pertukaran Program",
        soalan_utama: "Adakah PTPTN membayar yuran pengajian terus kepada universiti?",
        soalan_en: "Does PTPTN pay tuition fees directly to UniMAP or credit my RHB account?",
        soalan_alternatif: "Kenapa duit PTPTN masuk akaun saya? Siapa urus potongan yuran? Duit PTPTN dah masuk tapi yuran OSI belum tolak?",
        kata_kunci: ["yuran pengajian", "duit masuk akaun", "bendahari", "potongan yuran", "akaun rhb", "tunggakan yuran"],
        jawapan_rasmi: "Wang pinjaman dikreditkan mengikut semester tertakluk kepada pengesahan IPT (Unit Pembiayaan, JHEP). Pihak PTPTN akan memberi arahan pembayaran kepada bank panel iaitu **RHB**. Pihak bank akan merujuk jumlah pembayaran yuran pengajian (termasuk tunggakan yuran atau tuntutan berkaitan) melalui **Jabatan Bendahari UniMAP**. Pihak Bendahari akan mengemaskini jumlah yang perlu dibayar ke akaun universiti dan **baki pinjaman tersebut akan dikreditkan ke akaun RHB pelajar** bagi setiap semester.",
        jawapan_en: "PTPTN issues payment instructions to **RHB Bank** after JHEP confirms your status. RHB coordinates with **Jabatan Bendahari UniMAP** to deduct your semester tuition fees (and any arrears) to the university account, and the **remaining balance is credited into your RHB student account**.",
        pautan: [
            { label: "Pertanyaan Unit Pembiayaan UniMAP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan" }
        ]
    },
    {
        id: "ptptn_21",
        section: "Pengeluaran, Yuran & Pertukaran Program",
        soalan_utama: "Apakah sebab pinjaman PTPTN boleh diberhentikan?",
        soalan_en: "Why would a PTPTN loan be terminated or cancelled?",
        soalan_alternatif: "Kenapa PTPTN saya dihentikan? Apakah punca pinjaman dibatalkan?",
        kata_kunci: ["pemberhentian pinjaman", "dihentikan", "gagal pengajian", "maklumat palsu", "muflis", "berhenti pengajian"],
        jawapan_rasmi: "Antara sebab pinjaman PTPTN diberhentikan ialah gagal atau berhenti pengajian pada peringkat, jurusan atau IPT yang diluluskan, pembatalan pinjaman oleh pelajar (kerana menerima tajaan lain), pemalsuan maklumat permohonan atau peminjam diisytiharkan muflis.",
        jawapan_en: "Reasons for termination include failing or withdrawing from the approved programme/university, voluntary cancellation by the student (e.g., upon receiving another scholarship), falsifying application details, or bankruptcy.",
        pautan: [
            { label: "Maklumat Pinjaman Pendidikan PTPTN", url: "https://www.ptptn.gov.my/pinjaman-pendidikan/" }
        ]
    },
    {
        id: "ptptn_22",
        section: "Pengeluaran, Yuran & Pertukaran Program",
        soalan_utama: "Apakah yang perlu dilakukan jika ingin menukar program pengajian selepas menerima PTPTN dan apakah dokumen rayuannya?",
        soalan_en: "What should I do if I change my study programme after receiving PTPTN, and what documents are needed?",
        soalan_alternatif: "Boleh tukar kursus selepas dapat PTPTN? Bagaimana nak mohon pertukaran program? Dokumen apa perlu untuk rayuan tukar kursus?",
        kata_kunci: ["tukar kursus", "pertukaran program", "tukar program", "rayuan ptptn", "dokumen rayuan", "pengesahan fakulti"],
        jawapan_rasmi: "- **Syarat Pertukaran Program**: Pelajar perlu mendapatkan persetujuan bertulis PTPTN sebelum menukar program atau kursus. Pertukaran yang menyebabkan pelajar kembali ke Semester 1 atau menambah tempoh pinjaman mungkin tidak dibenarkan.\n- **Dokumen Rayuan Pertukaran Program**:\n  1. Surat rasmi permohonan kepada PTPTN\n  2. Salinan surat tawaran program lama yang disahkan\n  3. Surat kelulusan pertukaran program baharu yang disahkan\n  4. Surat pengesahan fakulti tentang status pengulangan semester.",
        jawapan_en: "- **Programme Change Rules**: Obtain written approval from PTPTN. Changes that reset you to Semester 1 or extend the loan duration may not be covered under the old loan.\n- **Required Appeal Documents**:\n  1. Official cover letter to PTPTN\n  2. Certified copy of old programme offer letter\n  3. Certified copy of new programme transfer approval letter\n  4. Faculty confirmation letter regarding semester repetition status.",
        pautan: [
            { label: "Panduan Tukar Program PTPTN (JHEP)", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/ptptn/tukar-program" }
        ]
    },

    // --- BAHAGIAN 5: BAYARAN BALIK & PENANGGUHAN BAYARAN BALIK PTPTN ---
    {
        id: "repay_01",
        section: "Bayaran Balik & Penangguhan PTPTN",
        soalan_utama: "Bilakah bayaran balik pinjaman PTPTN bermula?",
        soalan_en: "When does PTPTN loan repayment start after graduation?",
        soalan_alternatif: "Bila perlu mula bayar PTPTN? Perlu tunggu notis bayaran balik?",
        kata_kunci: ["bayaran balik bermula", "12 bulan", "tamat pengajian", "notis bayaran balik", "mula bayar"],
        jawapan_rasmi: "Berdasarkan panduan yang diberikan, bayaran balik bermula **selepas 12 bulan tamat tempoh pengeluaran pinjaman**. Peminjam tidak perlu menunggu notis bayaran balik untuk mula membuat persediaan pembayaran.",
        jawapan_en: "Loan repayment begins **12 months after the completion of your loan disbursement period**. Borrowers do not need to wait for a notice to start preparing for repayment.",
        pautan: [
            { label: "Portal Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },
    {
        id: "defer_01",
        section: "Bayaran Balik & Penangguhan PTPTN",
        featuredFaq: true,
        faqLabel: { ms: "Penangguhan Bayaran Balik PTPTN (Sambung Belajar / Belum Bekerja)", en: "PTPTN Repayment Deferment (Further Study / Unemployed)" },
        soalan_utama: "Siapakah yang layak memohon penangguhan bayaran balik pinjaman PTPTN dan apakah syarat umumnya?",
        soalan_en: "Who is eligible to apply for PTPTN loan repayment deferment and what are the requirements?",
        soalan_alternatif: "Siapa boleh mohon tangguh bayaran PTPTN? Saya sambung belajar atau belum dapat kerja, boleh tangguh PTPTN? Adakah kos upah dikenakan semasa tangguh?",
        kata_kunci: ["penangguhan bayaran balik", "tangguh bayaran", "sambung belajar", "tidak bekerja", "menganggur", "pinjaman ujrah", "kos upah", "24 bulan"],
        jawapan_rasmi: "- **Kategori Layak Memohon Penangguhan**:\n  1. Peminjam yang **melanjutkan pengajian sepenuh masa** (pada peringkat lebih tinggi, termasuk di luar negara atau kursus berkembar 2+1/2+2) tanpa mengambil pinjaman PTPTN baharu.\n  2. Peminjam yang **masih belum bekerja / menganggur** (maksimum penangguhan **24 bulan** sepanjang tempoh kelayakan; 6 bulan bagi setiap permohonan).\n- **Syarat Umum & Kos Upah**:\n  - Pinjaman mestilah telah ditukar kepada kaedah **Ujrah**.\n  - **Tiada kos upah** dikenakan sepanjang tempoh penangguhan yang diluluskan.\n  - Jika pernah dikenakan tindakan penguatkuasaan, kos guaman perlu dijelaskan terlebih dahulu.\n- **Cara Memohon**: Secara dalam talian melalui **myPTPTN** beserta dokumen sokongan lengkap. Keputusan dimaklumkan melalui e-mel.",
        jawapan_en: "- **Who Can Defer Repayment**:\n  1. Borrowers **pursuing full-time further studies** (at a higher level, locally or overseas) without taking a new PTPTN loan.\n  2. Borrowers who are **unemployed** (up to a maximum of **24 months** total; granted in 6-month intervals per application).\n- **General Conditions & Ujrah**:\n  - Loan must be under the **Ujrah** scheme (**no Ujrah wage charges** are incurred during an approved deferment period).\n  - Apply online via **myPTPTN** with complete supporting documents.",
        pautan: [
            { label: "Panduan Penangguhan Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },
    {
        id: "defer_02",
        section: "Bayaran Balik & Penangguhan PTPTN",
        soalan_utama: "Berapakah tempoh penangguhan bayaran balik mengikut peringkat pengajian dan apakah dokumen yang diperlukan?",
        soalan_en: "What is the maximum PTPTN deferment duration by study level and what documents are required?",
        soalan_alternatif: "Berapa tahun boleh tangguh PTPTN untuk diploma, ijazah, sarjana atau PhD? Dokumen apa perlu kalau tak bekerja atau sambung belajar?",
        kata_kunci: ["tempoh maksimum penangguhan", "dokumen tidak bekerja", "penyata kwsp", "akuan sumpah", "pesuruhjaya sumpah", "dokumen sambung belajar", "enam bulan"],
        jawapan_rasmi: "- **Tempoh Penangguhan Mengikut Peringkat Pengajian** (minimum baki pengajian 6 bulan):\n  - Foundation / Profesional / Sijil / Diploma Lanjutan: **2 tahun**\n  - Diploma: **3 tahun**\n  - Ijazah Sarjana Muda: **4 tahun**\n  - Master: **2 tahun**\n  - PhD: **2 tahun**\n- **Dokumen Jika Menyambung Pengajian**: Salinan surat tawaran pengajian terkini DAN surat pengesahan IPT mengenai jangkaan tarikh tamat pengajian (jika tiada dalam surat tawaran).\n- **Dokumen Jika Tidak Bekerja**: Penyata KWSP terperinci terkini DAN Surat Akuan Sumpah terkini yang dibuat di hadapan Pesuruhjaya Sumpah.",
        jawapan_en: "- **Maximum Deferment by Study Level**:\n  - Foundation / Professional / Certificate / Advanced Diploma: **2 years**\n  - Diploma: **3 years** | Bachelor's Degree: **4 years** | Master's: **2 years** | PhD: **2 years**\n- **Documents for Further Studies**: Latest admission offer letter AND university confirmation letter stating expected graduation date.\n- **Documents for Unemployment**: Detailed EPF (KWSP) statement AND a statutory declaration (Akuan Sumpah) signed before a Commissioner for Oaths.",
        pautan: [
            { label: "Portal Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },
    {
        id: "defer_03",
        section: "Bayaran Balik & Penangguhan PTPTN",
        soalan_utama: "Adakah penangguhan bayaran balik menghalang nama daripada CCRIS, dan bilakah penangguhan boleh terbatal?",
        soalan_en: "Does deferment remove my name from CCRIS, and under what circumstances can deferment be cancelled?",
        soalan_alternatif: "Kalau dapat penangguhan, nama masih masuk CCRIS? Kenapa penangguhan PTPTN boleh dibatalkan? Saya gagal semester atau sambung peringkat sama boleh tangguh?",
        kata_kunci: ["ccris", "rekod kredit", "pembatalan penangguhan", "menerima gaji", "elaun", "penstrukturan semula", "peringkat pengajian sama", "gagal pengajian"],
        jawapan_rasmi: "- **Rekod CCRIS**: Penangguhan hanya mengecualikan peminjam daripada tindakan penguatkuasaan sepanjang tempoh kelulusan, tetapi **tidak menghalang** PTPTN daripada menyenaraikan nama peminjam dalam rekod CCRIS bagi tujuan pemantauan.\n- **Sebab Penangguhan Dibatalkan**: Jika peminjam didapati menerima gaji/elaun sepanjang tempoh penangguhan, memberi maklumat palsu, atau membuat rundingan penstrukturan semula bayaran balik.\n- **Kes Tidak Layak Tangguh**: Pengajian yang dilanjutkan akibat gagal/tangguh semester secara sengaja, atau menyambung pengajian pada **peringkat yang sama atau lebih rendah** daripada pinjaman terdahulu.",
        jawapan_en: "- **CCRIS Record**: Deferment exempts you from enforcement actions during the approved period, but **does not prevent** CCRIS listing for credit monitoring.\n- **When Deferment is Cancelled**: If the borrower receives a salary/allowance during the deferment period, submits false info, or initiates loan restructuring.\n- **Ineligible Cases**: Repeating due to failed/deferred semesters, or pursuing a second qualification at the **same or lower academic level**.",
        pautan: [
            { label: "Portal Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },

    // --- BAHAGIAN 6: PENGECUALIAN BAYARAN BALIK IJAZAH KELAS PERTAMA (SYARAT BAHARU 2026) ---
    {
        id: "fc_01",
        section: "Pengecualian Ijazah Kelas Pertama (2026)",
        featuredFaq: true,
        faqLabel: { ms: "Pengecualian Bayaran Balik Kelas Pertama (Syarat 2026 B40/M40)", en: "First Class Honours Loan Exemption (2026 B40/M40 Rules)" },
        soalan_utama: "Apakah syarat pengecualian bayaran balik pinjaman PTPTN bagi graduan Kelas Pertama (termasuk syarat baharu mulai 2026)?",
        soalan_en: "What are the eligibility requirements for PTPTN First Class Honours loan exemption starting 1 January 2026?",
        soalan_alternatif: "Siapa yang layak mendapat pengecualian PTPTN? Adakah semua graduan Kelas Pertama layak? Syarat baharu Belanjawan 2026 B40 M40",
        kata_kunci: ["pengecualian ptptn", "kelas pertama", "first class", "syarat baharu", "belanjawan 2026", "b40", "m40", "12 bulan", "konvokesyen", "hies", "dosm", "senat ipta"],
        jawapan_rasmi: "- **Syarat Kelayakan Pengecualian Kelas Pertama (Mulai 1 Januari 2026)**:\n  1. Mengikuti pengajian **Ijazah Sarjana Muda secara sepenuh masa di IPTA** dan memperoleh **Kepujian Kelas Pertama** (disahkan oleh Senat IPTA).\n  2. Menamatkan pengajian dalam tempoh yang ditetapkan dalam dokumen tawaran pinjaman.\n  3. Tidak mempunyai pertindihan penajaan.\n  4. **Syarat Baharu 2026**: Dihadkan kepada graduan daripada keluarga berpendapatan rendah dan menengah (**B40 dan M40**) berdasarkan julat *Household Expenditure Survey (HIES)* DOSM (bagi bujang: pendapatan isi rumah ibu bapa/penjaga; bagi berkahwin: pendapatan peminjam & pasangan).\n  5. Memohon secara dalam talian melalui **Web myPTPTN dalam tempoh 12 bulan dari tarikh konvokesyen**.\n- *Nota*: Kelulusan tertakluk kepada kedudukan semasa kewangan Kerajaan.",
        jawapan_en: "- **First Class Honours Exemption Criteria (Effective 1 January 2026)**:\n  1. Completed a **full-time Bachelor's Degree at an IPTA** with **First Class Honours** (conferred by the IPTA Senate).\n  2. Graduated within the timeframe stipulated in the loan offer document.\n  3. No overlapping sponsorship.\n  4. **New 2026 Rule**: Restricted to graduates from **B40 and M40** households based on DOSM HIES income thresholds (single: parents/guardian household income; married: borrower + spouse income).\n  5. Apply online via **myPTPTN Web within 12 months from your convocation date**.",
        pautan: [
            { label: "Portal Pengecualian Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },
    {
        id: "fc_02",
        section: "Pengecualian Ijazah Kelas Pertama (2026)",
        soalan_utama: "Apakah dokumen yang diperlukan untuk memohon pengecualian bayaran balik Kelas Pertama dan siapakah yang boleh mengesahkannya?",
        soalan_en: "What documents are needed for First Class PTPTN exemption and who can certify my scroll and transcript?",
        soalan_alternatif: "Dokumen apa perlu disediakan? Perlu muat naik skrol dan transkrip? Dokumen pendapatan apa diterima? Siapakah yang boleh mengesahkan salinan ijazah dan transkrip?",
        kata_kunci: ["dokumen pengecualian", "skrol", "transkrip", "surat kelas pertama", "dokumen pendapatan", "slip gaji", "pengesahan dokumen", "bahagian akademik", "cop pengesahan"],
        jawapan_rasmi: "- **Dokumen Akademik Wajib**:\n  1. Salinan Skrol Ijazah Sarjana Muda Kepujian Kelas Pertama yang disahkan.\n  2. Salinan Transkrip Peperiksaan yang disahkan.\n  3. Surat Pengesahan Kelas Pertama (jika tidak dinyatakan pada skrol) & Surat Pengesahan Tamat Pengajian (jika tarikh tamat tiada pada skrol/transkrip).\n- **Siapa Boleh Sahkan Skrol & Transkrip?**:\n  - Mesti disahkan oleh **Pegawai Kumpulan Pengurusan & Profesional di Bahagian Akademik** di **IPTA asal tempat peminjam menamatkan pengajian ijazah tersebut** (tidak boleh disahkan oleh IPTA lain). Cop mesti mengandungi nama pegawai, jawatan dan jabatan.\n- **Dokumen Pendapatan (B40/M40)**:\n  - Slip gaji terkini / Penyata Cukai Taksiran / Penyata KWSP terkini / Penyata Pencen, atau Surat Akuan Sumpah Pengesahan Pendapatan / Surat Pengesahan Tidak Bekerja.",
        jawapan_en: "- **Academic Documents**:\n  1. Certified copy of First Class Bachelor's Degree Scroll & Official Exam Transcript.\n  2. First Class confirmation letter & completion date letter (if not explicitly stated on the scroll/transcript).\n- **Who Can Certify?**:\n  - Must be certified by a **Management & Professional Officer at the Academic Division (Bahagian Akademik)** of the **exact IPTA that awarded the degree** (cannot be certified by another university).\n- **Income Documents (B40/M40)**:\n  - Latest payslips, EPF (KWSP) statement, tax statement, pension statement, or sworn income declaration (Akuan Sumpah).",
        pautan: [
            { label: "Panduan Dokumen Pengecualian PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },
    {
        id: "fc_03",
        section: "Pengecualian Ijazah Kelas Pertama (2026)",
        soalan_utama: "Bagaimana jika masih ada baki pinjaman (Diploma / WPP / Lebih Bayar) selepas pengecualian Kelas Pertama?",
        soalan_en: "Does First Class exemption cover Diploma loans or WPP, and can I get a refund if I already paid?",
        soalan_alternatif: "Jika pinjaman Diploma dan Ijazah digabungkan, adakah kedua-duanya dikecualikan? Bolehkah saya dapat refund PTPTN? Mengapa masih ada baki pinjaman?",
        kata_kunci: ["refund", "lebihan bayaran", "pinjaman diploma", "pinjaman gabungan", "baki pinjaman", "penjadualan semula", "careline", "03-2193 3000"],
        jawapan_rasmi: "- **Pinjaman Gabungan Diploma & Ijazah**: **Tidak.** Hanya pinjaman peringkat **Ijazah Sarjana Muda** sahaja yang dikecualikan. Pinjaman peringkat Diploma masih perlu dibayar balik.\n- **Mengapa Masih Ada Baki Selepas Pengecualian?**: Jika terdapat hutang **WPP (RM1,500)** yang belum selesai, pinjaman diterima selepas tamat pengajian, atau pertindihan tajaan. Baki ini boleh dibayar secara penjadualan semula ansuran bulanan (JBB) atau penyelesaian penuh.\n- **Tuntutan Lebihan Bayaran (Refund)**: Jika anda telah membuat bayaran balik sebelum pengecualian diluluskan, lebihan bayaran boleh dituntut semula melalui aplikasi **myPTPTN**.\n- **Semakan Status Pengecualian**: Semak di Web myPTPTN atau hubungi **Careline PTPTN di 03-2193 3000**.",
        jawapan_en: "- **Combined Diploma & Degree Loans**: **No.** Only the **Bachelor's Degree** portion is exempted; the Diploma loan must still be repaid.\n- **Why a Balance Might Remain**: Unpaid **WPP (RM1,500)** advance, disbursements received after graduation, or overlapping sponsorship. You can reschedule the remaining balance into monthly installments.\n- **Refund for Overpayment**: Any excess repayments made prior to exemption approval can be refunded via **myPTPTN**.\n- **Check Exemption Status**: Via myPTPTN Web or PTPTN Careline at **03-2193 3000**.",
        pautan: [
            { label: "Portal Bayaran Balik PTPTN", url: "https://www.ptptn.gov.my/bayaran-balik/" }
        ]
    },

    // --- BAHAGIAN 7: DERMASISWA UNIMAP (SULUNG 4.0, B40 JPA, B40 TVET), OSI e-FUNDING & TALIAN RASMI ---
    {
        id: "unimap_sulung",
        section: "Dermasiswa & Bantuan UniMAP",
        featuredFaq: true,
        faqLabel: { ms: "Dermasiswa Siswa SULUNG 4.0 & B40 TVET / JPA", en: "Dermasiswa Siswa SULUNG 4.0 & B40 TVET / JPA" },
        soalan_utama: "Bagaimana cara memohon Dermasiswa Siswa SULUNG 4.0, Dermasiswa B40 TVET dan B40 JPA di UniMAP?",
        soalan_en: "How do I apply for Dermasiswa Siswa SULUNG 4.0, Dermasiswa B40 TVET, and B40 JPA at UniMAP?",
        soalan_alternatif: "Adakah permohonan Siswa SULUNG dibuka? Kakak belajar IPTS layak ke? Penerima B40 TVET kena bayar yuran dulu ke?",
        kata_kunci: ["sulung", "sulong", "siswa sulung", "anak pertama", "b40 tvet", "b40tvet", "db40", "b40 jpa", "penajaan jpa", "saringan universiti"],
        jawapan_rasmi: "- **Dermasiswa Siswa SULUNG 4.0 & Dermasiswa B40 TVET**:\n  - Pemilihan adalah berdasarkan **saringan di peringkat universiti**. Pihak JHEP tidak membuka permohonan manual—**sekiranya layak, pelajar akan dihubungi terus** oleh pihak universiti.\n  - Pelajar yang menerima pinjaman **PTPTN masih boleh mendapat manfaat SULUNG** sekiranya memenuhi syarat kelayakan.\n  - Bagi penerima **Dermasiswa B40 TVET** yang menunggu penyaluran dana KPT, sila isi **Borang Penangguhan Bayaran Yuran** di **Pejabat Fakulti masing-masing** beserta lampiran Surat Tawaran B40 TVET.\n- **Dermasiswa B40 JPA (DB40)**:\n  - Semakan hebahan dan keputusan dibuat terus melalui portal rasmi Penajaan JPA di `https://penajaan.jpa.gov.my/`.",
        jawapan_en: "- **Dermasiswa Siswa SULUNG 4.0 & Dermasiswa B40 TVET**:\n  - Selection is conducted via **university-level screening**. Manual walk-in applications are not opened; **eligible students will be contacted directly** by UniMAP.\n  - PTPTN recipients remain eligible for SULUNG benefits if they meet the criteria.\n  - **B40 TVET** recipients awaiting KPT fund disbursement should submit the **Tuition Fee Deferment Form** at their respective **Faculty Office** with their offer letter attached.\n- **Dermasiswa B40 JPA (DB40)**:\n  - Check announcements and results at the official JPA portal: `https://penajaan.jpa.gov.my/`.",
        pautan: [
            { label: "Laman Rasmi JHEP UniMAP", url: "https://jhep.unimap.edu.my/index.php/en/" },
            { label: "Portal Penajaan JPA", url: "https://penajaan.jpa.gov.my/" }
        ]
    },
    {
        id: "unimap_osi_surat",
        section: "Dermasiswa & Bantuan UniMAP",
        featuredFaq: true,
        faqLabel: { ms: "Surat Pengesahan Pelajar (ETS/KTMB) & OSI e-Funding", en: "Student Confirmation Letters (ETS) & OSI e-Funding" },
        soalan_utama: "Bagaimana cara mendapatkan Surat Pengesahan Pelajar (ETS/KTMB) atau pengesahan dokumen melalui OSI e-Funding?",
        soalan_en: "How do I get a Student Confirmation Letter (ETS/KTMB) or verify documents via OSI e-Funding?",
        soalan_alternatif: "Cara mohon surat pengesahan pelajar ETS? Pengesahan pendapatan ibu bapa di mana? Bila boleh ambil dokumen di kaunter?",
        kata_kunci: ["surat pengesahan", "ets", "ktmb", "diskaun", "osi", "e-funding", "efunding", "collect document", "pengesahan pendapatan"],
        jawapan_rasmi: "- **Surat Pengesahan Belajar Standard (Diskaun ETS / KTMB)**:\n  - Muat turun terus melalui sistem OSI: `OSI > Admission > Confirmation Studies Letter > English / Malay`.\n- **Pengesahan Dokumen Rasmi (Lampiran 3 KTMB, Pengesahan Pendapatan, Pinjaman Negeri, JoC)**:\n  - Mohon secara dalam talian melalui **OSI e-Funding**.\n  - Pihak Unit Pembiayaan akan menyemak dan mengemas kini status permohonan.\n  - **Hadir ke kaunter hanya apabila dokumen telah siap** (rujuk tarikh *Collect Document* dalam sistem): `MOHON ONLINE → SEMAK STATUS → HADIR APABILA DOKUMEN SIAP`.",
        jawapan_en: "- **Standard Study Confirmation Letter (ETS / KTMB Discount)**:\n  - Download directly via OSI: `OSI > Admission > Confirmation Studies Letter > English / Malay`.\n- **Custom Document Endorsement (OSI e-Funding)**:\n  - Apply online via **OSI e-Funding**.\n  - Only come to the Unit Pembiayaan counter when your status shows ready (check the *Collect Document* date): `APPLY ONLINE → CHECK STATUS → COLLECT WHEN READY`.",
        pautan: [
            { label: "Portal Unit Pembiayaan JHEP", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/" }
        ]
    },
    {
        id: "unimap_contact",
        section: "Dermasiswa & Bantuan UniMAP",
        featuredFaq: true,
        faqLabel: { ms: "Talian Rasmi Unit Pembiayaan JHEP & PTPTN Perlis", en: "Official Unit Pembiayaan JHEP & PTPTN Perlis Contacts" },
        soalan_utama: "Di manakah pelajar UniMAP boleh mendapatkan bantuan berkaitan PTPTN dan apakah nombor telefon Unit Pembiayaan?",
        soalan_en: "Who should UniMAP students contact for PTPTN or financial aid issues?",
        soalan_alternatif: "Siapa perlu dihubungi jika ada masalah PTPTN? Apakah nombor telefon Unit Pembiayaan, Bendahari dan Kebajikan?",
        kata_kunci: ["pertanyaan ptptn", "bantuan unimap", "nombor telefon", "talian ptptn", "04-941 4431", "04-970 8181", "hubungi", "saluran whatsapp"],
        jawapan_rasmi: "Pelajar boleh menghubungi talian rasmi berikut mengikut urusan:\n- **Unit Pembiayaan, JHEP UniMAP**: **04-941 4431**\n- **PTPTN Cawangan Perlis**: **04-970 8181**\n- **Unit Kebajikan, JHEP UniMAP** (Khairat Kematian / Pinjaman Laptop / e-Tabung): **04-941 4430** (`kebajikan@unimap.edu.my`)\n- **Unit Kewangan Pelajar, Jabatan Bendahari** (Pengesahan KWSP / Lejar Yuran OSI / Akaun RHB): **04-941 4033 / 04-941 4021**",
        jawapan_en: "Students can reach out to the following official numbers:\n- **Unit Pembiayaan, JHEP UniMAP**: **04-941 4431**\n- **PTPTN Perlis Branch**: **04-970 8181**\n- **Student Welfare Unit (Unit Kebajikan JHEP)**: **04-941 4430** (`kebajikan@unimap.edu.my`)\n- **Student Finance Unit (Jabatan Bendahari)**: **04-941 4033 / 04-941 4021**",
        pautan: [
            { label: "Saluran WhatsApp & Pertanyaan Unit Pembiayaan", url: "https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan/saluran-whatapps" },
            { label: "Direktori Cawangan PTPTN", url: "https://www.ptptn.gov.my/pejabat-cawangan-ptptn/" },
            { label: "Channel WhatsApp Rasmi Unit Pembiayaan", url: "https://whatsapp.com/channel/0029Vb0f9j6ElagrCFT2731y" }
        ]
    }
];

// Conversational memory for short follow-up questions
let lastMatchedItem = null;

function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[b.length][a.length];
}

function detectQueryLanguage(text, currentUiLang) {
    const malayWords = [
        "macam", "mana", "nak", "boleh", "tak", "saya", "bila", "siapa", "dekat",
        "tolong", "cara", "mohon", "rayuan", "permohonan", "kelayakan", "adakah",
        "layak", "sudah", "belum", "duit", "yuran", "tangguh", "borang", "surat",
        "pengesahan", "anak", "sulung", "bapa", "ayah", "ibu", "bayaran", "balik", "pengecualian"
    ];
    const englishWords = [
        "how", "what", "where", "when", "can", "apply", "eligible", "eligibility",
        "check", "status", "cancel", "loan", "defer", "tuition", "letter", "confirmation",
        "first", "class", "exemption", "repayment", "bank", "account", "age", "limit", "refund"
    ];

    const tokens = text.toLowerCase().replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
    let ms = 0, en = 0;
    tokens.forEach(t => {
        if (malayWords.includes(t)) ms++;
        if (englishWords.includes(t)) en++;
    });

    if (ms > en) return "ms";
    if (en > ms) return "en";
    return currentUiLang;
}

function searchKnowledgeBase(query, currentUiLang = "ms") {
    const cleanQuery = query.toLowerCase().replace(/[^\w\s%]/g, " ").trim();
    const allWords = cleanQuery.split(/\s+/).filter(Boolean);
    const rawTokens = allWords.filter(t => t.length > 1 && !STOPWORDS.has(t));
    const detectedLang = detectQueryLanguage(query, currentUiLang);

    // 1. Greeting check
    const greetings = ["hi", "hello", "hey", "salam", "assalamualaikum", "selamat", "morning", "pagi", "petang"];
    if (allWords.length <= 2 && allWords.some(w => greetings.includes(w)) && rawTokens.length === 0) {
        return { type: "greeting", lang: detectedLang, confidence: 1.0 };
    }

    // 2. Conversational Follow-up Check (e.g., "cara?", "how?", "link?", "pautan?", "syarat?", "dokumen?")
    const followUpTriggers = ["cara", "macam", "mana", "bagaimana", "how", "where", "when", "bila", "lokasi", "nombor", "telefon", "link", "pautan", "syarat", "dokumen", "borang", "steps", "terangkan", "lanjut"];
    if (lastMatchedItem && allWords.length <= 3 && rawTokens.length <= 1 && allWords.some(w => followUpTriggers.includes(w))) {
        return {
            type: "match",
            lang: detectedLang,
            item: lastMatchedItem,
            confidence: 0.96,
            isFollowUp: true
        };
    }

    // 3. Expand English / Slang Synonyms into Bahasa Melayu keywords
    let expandedPhrases = [];
    rawTokens.forEach(token => {
        if (SYNONYM_EXPANSIONS[token]) {
            expandedPhrases.push(...SYNONYM_EXPANSIONS[token]);
        }
    });

    // 4. Score all items in UNIT_PEMBIAYAAN_DATA
    const scored = UNIT_PEMBIAYAAN_DATA.map(item => {
        let score = 0;
        const fullQuestionPool = `${item.soalan_utama} ${item.soalan_en} ${item.soalan_alternatif}`.toLowerCase();
        const fullAnswerPool = `${item.jawapan_rasmi} ${item.jawapan_en}`.toLowerCase();

        // Exact keyword phrase match
        item.kata_kunci.forEach(kw => {
            const kwLower = kw.toLowerCase();
            if (cleanQuery.includes(kwLower)) {
                score += kwLower.includes(" ") ? 34 : 20;
            }
            expandedPhrases.forEach(ep => {
                if (kwLower.includes(ep) || ep.includes(kwLower)) {
                    score += 14;
                }
            });
        });

        // Token-level & fuzzy matching
        rawTokens.forEach(token => {
            item.kata_kunci.forEach(kw => {
                kw.toLowerCase().split(/\s+/).forEach(kp => {
                    if (token === kp) score += 15;
                    else if (token.length >= 4 && kp.length >= 4 && levenshtein(token, kp) <= 1) score += 10;
                });
            });

            if (fullQuestionPool.includes(token)) score += 9;
            if (fullAnswerPool.includes(token)) score += 4;
        });

        return { item, score, confidence: Math.min(0.99, score / 40) };
    }).sort((a, b) => b.score - a.score);

    const best = scored[0];
    const related = scored.slice(1, 4).filter(r => r.score >= 12).map(r => r.item);

    if (!best || best.score < 9) {
        return {
            type: "fallback",
            lang: detectedLang,
            confidence: 0.15
        };
    }

    lastMatchedItem = best.item;
    return {
        type: "match",
        lang: detectedLang,
        item: best.item,
        related: related,
        confidence: best.confidence
    };
}
