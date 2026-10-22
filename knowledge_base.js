// UniMAP JHEP - Unit Pembiayaan & Bantuan Kewangan
// Real Dataset Engine + Conversational Follow-up Memory (Zero API Credits)

const SYNONYMS = {
    "sulung": ["sulung", "sulong", "anak pertama", "first child", "first generation", "sulung 4.0", "siswa sulung", "ihsan madani", "b40 sulung", "abang", "kakak", "ipts", "ipta", "pasport", "passport"],
    "db40jpa": ["jpa", "db40", "b40jpa", "dermasiswa b40 jpa", "jabatan perkhidmatan awam", "penajaan jpa", "keputusan jpa", "bantuan jpa"],
    "b40tvet": ["tvet", "b40tvet", "dermasiswa tvet", "batch kedua", "penangguhan yuran", "tangguh yuran", "defer fee", "deferment"],
    "ptptn": ["ptptn", "myptptn", "lulus", "kelulusan", "bila masuk", "21 hari", "batal", "cancel", "tolak", "ybr", "bank rakyat", "setem hasil", "lhdn", "saksi", "cop rasmi", "tandatangan", "kursus tidak berdaftar", "rhb", "akaun bank", "pengesahan institut"],
    "surat": ["surat", "pengesahan", "confirmation", "ktmb", "ets", "ktm", "diskaun", "pengangkutan", "osi", "e-funding", "efunding", "pendapatan", "income", "kwsp", "epf", "aktif belajar", "collect document", "termohon", "delete"],
    "kebajikan": ["khairat", "kematian", "meninggal", "laptop", "peranti", "komputer", "e-tabung", "etabung", "zakat", "amanah khas", "kebajikan", "welfare"],
    "joc": ["joc", "job on campus", "kerja", "part time", "sambilan", "mysiswa", "cgee"],
    "bicycle": ["basikal", "bicycle", "cycling", "kayuh", "riadah", "peraturan basikal"]
};

const STOPWORDS = new Set([
    "i", "me", "my", "we", "our", "you", "your", "is", "are", "was", "were", "be", "been",
    "have", "has", "had", "do", "does", "did", "can", "could", "will", "would", "should",
    "the", "a", "an", "in", "on", "at", "to", "for", "of", "with", "by", "from", "about",
    "how", "what", "where", "when", "who", "why", "which", "want", "ask", "know", "need", "help", "please",
    "saya", "aku", "kami", "kita", "awak", "anda", "dia", "mereka", "ini", "itu", "yang",
    "di", "ke", "dari", "pada", "untuk", "dengan", "oleh", "tentang", "adalah", "ialah",
    "macam", "mana", "apa", "bila", "siapa", "kenapa", "mengapa", "nak", "tahu", "tanya",
    "boleh", "tak", "tidak", "ada", "dekat", "kat", "tolong", "minta", "berapa", "kalau", "jika",
    "assalamualaikum", "salam", "sejahtera", "tuan", "puan", "encik", "cik", "dr", "terima", "kasih", "maaf", "ganggu"
]);

// Curated Official Knowledge Base with Distinct Sidebar FAQ Titles
const KNOWLEDGE_BASE = [
    {
        id: "sulung_selection",
        refCode: "PTN-SULUNG-01",
        category: "Dermasiswa Sulung",
        faqTitle: {
            ms: "Permohonan & Kelayakan Siswa SULUNG 4.0",
            en: "Siswa SULUNG 4.0 Eligibility & Screening"
        },
        keywords: ["sulung", "sulong", "mohon", "apply", "kelayakan", "anak pertama", "first child", "b40", "str", "lulus", "keputusan", "pngk", "stpm", "ipts", "kakak", "abang", "ibu tunggal", "anak yatim"],
        questions: {
            en: "How do I apply for Dermasiswa Siswa SULUNG 4.0 and check eligibility?",
            ms: "Bagaimana cara memohon Dermasiswa Siswa SULUNG 4.0 dan syarat kelayakannya?"
        },
        answer: {
            en: `###Program Pembangunan Siswa SULUNG 4.0
**Official Unit Pembiayaan JHEP Notice:**
- **Selection Process**: Selection for **Siswa SULUNG** is conducted via **university-level screening (saringan peringkat universiti)**. We do not open manual walk-in applications; **eligible students will be contacted directly** by JHEP.
- **Older Sibling at IPTS?**: Yes, if your older sibling studied at a private institution (IPTS) and you are the **first child in the family pursuing a Bachelor's Degree at a public university (IPTA)**, you are still eligible to be screened.
- **Already Applied/Approved for PTPTN?**: Students receiving a **PTPTN loan can still receive SULUNG benefits** if they fulfill the eligibility criteria.
- **BKOKU Overlap**: Currently under verification with the Ministry of Higher Education (KPT).
- **Other Financial Aid**: Check the official JHEP portal at [https://jhep.unimap.edu.my/index.php/en/](https://jhep.unimap.edu.my/index.php/en/)`,
            ms: `###Program Pembangunan Siswa SULUNG 4.0
**Makluman Rasmi Unit Pembiayaan JHEP:**
- **Kaedah Pemilihan**: Pemilihan bagi **Program Siswa SULUNG** adalah berdasarkan **saringan di peringkat universiti**. Pihak JHEP tidak membuka permohonan secara terbuka—**sekiranya layak, pelajar akan dihubungi terus** oleh pihak universiti.
- **Kakak/Abang Belajar di IPTS?**: **Layak disaring** sekiranya anda merupakan anak pertama dalam keluarga yang melanjutkan pengajian peringkat Ijazah Sarjana Muda di **IPTA (Universiti Awam)**.
- **Sudah Lulus / Terima PTPTN?**: Pelajar yang menerima pinjaman **PTPTN masih boleh mendapat manfaat SULUNG** sekiranya memenuhi syarat kelayakan.
- **Pertindihan SULUNG & BKOKU**: Pihak JHEP sedang membuat semakan semula bersama pihak Kementerian Pendidikan Tinggi (KPT).
- **Bantuan Lain**: Rujuk laman rasmi JHEP UniMAP di [https://jhep.unimap.edu.my/index.php/en/](https://jhep.unimap.edu.my/index.php/en/)`
        },
        quickActions: [
            { label: { en: "Parent Passport / Missing Town Issue", ms: "Isu Pasport Bapa / Tiada Nama Bandar" }, query: { en: "What if my parent uses a foreign Passport or my town is missing in the SULUNG form?", ms: "Bagaimana jika ibu/bapa guna Pasport (tiada No. IC) atau nama bandar tiada dalam sistem SULUNG?" } },
            { label: { en: "Dermasiswa B40 JPA Status", ms: "Status Dermasiswa B40 JPA" }, query: { en: "When can I apply or check results for Dermasiswa B40 JPA (DB40)?", ms: "Bilakah tarikh permohonan dan semakan keputusan Dermasiswa B40 JPA (DB40)?" } }
        ]
    },
    {
        id: "sulung_technical_form",
        refCode: "PTN-SULUNG-02",
        category: "Dermasiswa Sulung",
        faqTitle: {
            ms: "Isu Borang SULUNG (Pasport & Tiada Bandar)",
            en: "SULUNG Form Issues (Passport & Missing Town)"
        },
        keywords: ["pasport", "passport", "ic", "kad pengenalan", "bapa", "ibu", "warganegara", "bandar", "poskod", "changlun", "tasek gelugor", "kampung gajah", "batu gajah", "alamat"],
        questions: {
            en: "What if my parent uses a foreign Passport (no MyKad IC) or my town is missing in the SULUNG form?",
            ms: "Bagaimana jika ibu/bapa guna Pasport (tiada No. IC) atau nama bandar tiada dalam sistem SULUNG?"
        },
        answer: {
            en: `###Solving Form Issues (Passport & Address Drop-down)
1. **Parent Holds a Foreign Passport (No Malaysian IC Number)**:
   - If the Father/Mother IC field only accepts a Malaysian IC format, **leave the IC field blank (kosongkan)** and clearly state in the **"Tujuan Permohonan" (Application Purpose)** remarks box that your parent holds a passport and does not have a Malaysian IC.
2. **Town / Postcode Missing in Drop-down (e.g., Changlun, Tasek Gelugor, Kampung Gajah)**:
   - Select the **nearest listed district/town** in the drop-down so the form can proceed, and ensure your full exact address and postcode are written in the address line.`,
            ms: `###Penyelesaian Isu Borang (Pasport Ibu/Bapa & Pilihan Bandar)
1. **Ibu/Bapa Menggunakan Pasport (Tiada No. Kad Pengenalan Malaysia)**:
   - Jika ruangan maklumat bapa/ibu hanya membenarkan format No. KP Malaysia, **sila kosongkan ruangan tersebut** dan nyatakan di bahagian **"Tujuan Permohonan"** bahawa bapa/ibu menggunakan pasport serta tiada No. KP Malaysia.
2. **Tiada Pilihan Bandar Dalam Sistem (Contoh: Changlun, Tasek Gelugor, Kg. Gajah)**:
   - Pilih **bandar/daerah berdekatan** yang tersenarai dalam pilihan sistem supaya permohonan boleh dihantar, dan pastikan alamat penuh beserta poskod sebenar ditulis pada ruangan alamat.`
        },
        quickActions: [
            { label: { en: "SULUNG Eligibility & PTPTN", ms: "Kelayakan SULUNG & PTPTN" }, query: { en: "How do I apply for Dermasiswa Siswa SULUNG 4.0 and check eligibility?", ms: "Bagaimana cara memohon Dermasiswa Siswa SULUNG 4.0 dan syarat kelayakannya?" } }
        ]
    },
    {
        id: "db40_jpa",
        refCode: "PTN-DB40JPA-01",
        category: "Dermasiswa B40JPA",
        faqTitle: {
            ms: "Tarikh & Keputusan Dermasiswa B40 JPA",
            en: "Dermasiswa B40 JPA (DB40) Dates & Results"
        },
        keywords: ["jpa", "db40", "b40jpa", "dermasiswa b40 jpa", "bila boleh mohon", "keputusan jpa", "penajaan jpa", "tarikh buka jpa", "bantuan jpa"],
        questions: {
            en: "When can I apply or check results for Dermasiswa B40 JPA (DB40)?",
            ms: "Bilakah tarikh permohonan dan semakan keputusan Dermasiswa B40 JPA (DB40)?"
        },
        answer: {
            en: `###Dermasiswa B40 JPA (DB40) Application & Results
1. **2026 Application Status & Result Check**:
   - The 2026 DB40 JPA application window ran from **3 August 2026 to 16 August 2026** and is now closed.
   - **2026 Results Window**: Open for checking from **13 October 2026 (5:00 PM) until 22 October 2026 (5:00 PM)** via the JPA Sponsorship Portal.
2. **2027 Intake**:
   - Official opening dates for the 2027 cycle have not yet been announced. Please monitor the official JPA Sponsorship Portal periodically:
   - 🔗 [https://penajaan.jpa.gov.my/](https://penajaan.jpa.gov.my/)`,
            ms: `###Permohonan & Keputusan Dermasiswa B40 JPA (DB40)
1. **Status Permohonan & Semakan Keputusan Tahun 2026**:
   - Permohonan Program Dermasiswa B40 (DB40) JPA bagi tahun 2026 telah dibuka pada **3 Ogos 2026 hingga 16 Ogos 2026** dan kini telah ditutup.
   - **Semakan Keputusan DB40 2026**: Dibuka mulai **13 Oktober 2026 (5:00 petang) hingga 22 Oktober 2026 (5:00 petang)**.
   - **Cara Semak**: Layari Portal Penajaan JPA -> Log Masuk -> Semak status keputusan DB40.
2. **Permohonan Sesi 2027**:
   - Tarikh pembukaan rasmi masih belum diumumkan. Pelajar dimohon membuat semakan berkala melalui portal rasmi Penajaan JPA:
   - 🔗 [https://penajaan.jpa.gov.my/](https://penajaan.jpa.gov.my/)`
        },
        quickActions: [
            { label: { en: "Cancel PTPTN after getting JPA/YBR", ms: "Batal PTPTN Selepas Dapat JPA/YBR" }, query: { en: "Can I apply for PTPTN, Yayasan Bank Rakyat (YBR), and Zakat together? How do I cancel PTPTN if offered another scholarship?", ms: "Bolehkah mohon PTPTN, Yayasan Bank Rakyat (YBR) & Zakat serentak? Bagaimana cara batalkan PTPTN jika dapat tajaan lain?" } }
        ]
    },
    {
        id: "b40_tvet_deferment",
        refCode: "PTN-TVET-01",
        category: "Dermasiswa B40TVET",
        faqTitle: {
            ms: "Dermasiswa B40 TVET & Tangguh Yuran",
            en: "Dermasiswa B40 TVET & Fee Deferment"
        },
        keywords: ["tvet", "b40tvet", "dermasiswa b40 tvet", "batch kedua", "tangguh yuran", "penangguhan bayaran yuran", "borang penangguhan", "fakulti", "kpt", "final exam", "risau duit yuran"],
        questions: {
            en: "How does Dermasiswa B40 TVET selection work, and how do recipients defer tuition fees?",
            ms: "Bagaimana pemilihan Dermasiswa B40 TVET dan cara tangguh yuran bagi penerima?"
        },
        answer: {
            en: `###Dermasiswa B40 TVET & Tuition Fee Deferment
1. **Selection Method**:
   - Selection for **Dermasiswa B40 TVET** is based on **university-level screening**. Applications are not opened manually; eligible students will be contacted directly.
2. **Important Notice for B40 TVET Recipients (Batch 2 / Pending KPT Disbursement)**:
   - The Ministry of Higher Education (KPT) is currently processing the fund disbursement.
   - **Do You Need to Pay Fees Before Final Exams?**: Recipients are requested to fill out the **Tuition Fee Payment Deferment Form (Borang Penangguhan Bayaran Yuran)** at your **respective Faculty Office (Pejabat Fakulti masing-masing)**.
   - **Required Attachment**: Attach your **Dermasiswa B40 TVET Offer Letter (Surat Tawaran)** together with the deferment form.`,
            ms: `###Dermasiswa B40 TVET & Penangguhan Yuran Pengajian
1. **Kaedah Pemilihan**:
   - Pemilihan **Dermasiswa B40 TVET** adalah berdasarkan **saringan di peringkat universiti**. Permohonan tidak dibuka secara manual dan pelajar yang layak akan dihubungi.
2. **Pemakluman Khas Penerima Dermasiswa B40 TVET (Batch Kedua / Dana KPT Sedang Disalurkan)**:
   - Pihak Kementerian Pendidikan Tinggi (KPT) sedang dalam proses penyaluran dana kepada pelajar terlibat.
   - **Urusan Penangguhan Yuran**: Pelajar diminta mengisi **Borang Penangguhan Bayaran Yuran** di **Pejabat Fakulti masing-masing** (bukan di kaunter JHEP).
   - **Dokumen Lampiran**: Sila lampirkan **Surat Tawaran Dermasiswa B40 TVET** bersama-sama borang penangguhan tersebut.`
        },
        quickActions: [
            { label: { en: "Check Fee Status (Bendahari)", ms: "Semak Status Yuran (Bendahari)" }, query: { en: "Who do I contact for KWSP university verification, PTPTN institution verification, RHB bank account issues, or uncredited OSI fees?", ms: "Siapa perlu dihubungi bagi pengesahan universiti KWSP/PTPTN, masalah akaun bank RHB, atau yuran dalam OSI masih belum ditolak?" } }
        ]
    },
    {
        id: "ptptn_status_disbursement",
        refCode: "PTN-PTPTN-01",
        category: "PTPTN",
        faqTitle: {
            ms: "Kelulusan PTPTN, Cop Saksi & Setem Hasil",
            en: "PTPTN Approval, Witness Stamp & Setem Hasil"
        },
        keywords: ["ptptn", "lulus", "kelulusan", "bila dapat", "bila masuk", "21 hari", "myptptn", "kursus tidak berdaftar", "senarai program", "saksi", "cop rasmi", "tandatangan", "setem hasil", "lhdn", "bawah 18", "li", "latihan industri"],
        questions: {
            en: "How do I check PTPTN approval, payment timeline (21 working days), witness stamp, or registered courses?",
            ms: "Bagaimana cara semak kelulusan PTPTN, tarikh duit masuk (21 hari bekerja), cop saksi JHEP & senarai kursus?"
        },
        answer: {
            en: `###Complete PTPTN Guide (Approval, Disbursement, Witness Stamp & Courses)
1. **How to Check PTPTN Approval**:
   - Log in to **myPTPTN** -> *Pinjaman Pendidikan* -> *Semakan Status Permohonan*.
   - *Note*: Loan approval and money disbursement are two separate stages.
2. **When Will PTPTN Money Be Credited?**:
   - First payment is credited within **21 working days** after PTPTN receives your complete agreement documents.
3. **Official Witness Signature & Stamp (Tandatangan & Cop Saksi JHEP)**:
   - Bring your physical PTPTN agreement forms directly to the **JHEP Office Counter (Kampus Alam Pauh Putra)** during office hours (8:00 AM – 5:00 PM) to get the official witness signature and stamp.
4. **RM10 Revenue Stamp (Setem Hasil) / LHDN Enquiries (Under 18)**:
   - You may submit your Setem Hasil at the **Unit Pembiayaan Counter, JHEP**. For LHDN stamp duty issues (e.g., under 18 years old), contact LHDN Agent **Pn. Wani at 013-450 8066**.
5. **PTPTN Rejected Due to Unregistered Course Name?**:
   - Check the exact PTPTN-registered UniMAP programme list here:
   - 🔗 [https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/permohonan-ptptn/senarai-program](https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/permohonan-ptptn/senarai-program)
6. **PTPTN Inquiries During Industrial Training (LI) / Final Semester**:
   - Call Unit Pembiayaan JHEP at **04-941 4431** or contact PTPTN Perlis Branch.`,
            ms: `###Panduan Lengkap PTPTN (Kelulusan, Tarikh Bayaran, Cop Saksi & Kursus)
1. **Cara Semak Kelulusan PTPTN**:
   - Log masuk ke portal **myPTPTN** → *Pinjaman Pendidikan* → *Semakan Status Permohonan*.
   - *Nota*: Kelulusan pinjaman dan pengkreditan wang adalah dua proses berbeza.
2. **Bila Duit PTPTN Akan Masuk?**:
   - Bayaran pertama dikreditkan dalam tempoh **21 hari bekerja** daripada tarikh PTPTN menerima dokumen perjanjian lengkap.
3. **Prosedur Tandatangan & Cop Rasmi Saksi JHEP**:
   - Cetak dokumen perjanjian PTPTN anda dan bawa terus ke **Kaunter Unit Pembiayaan, Pejabat JHEP (Kampus Alam Pauh Putra)** pada waktu pejabat (8:00 pagi – 5:00 petang) untuk mendapatkan tandatangan dan cop rasmi saksi.
4. **Setem Hasil RM10 & Urusan LHDN (Pelajar Bawah 18 Tahun)**:
   - Setem hasil boleh dihantar di **Kaunter Unit Pembiayaan, JHEP**. Bagi pertanyaan berkaitan LHDN (termasuk isu umur bawah 18 tahun), hubungi Agen LHDN **Pn. Wani: 013-450 8066**.
5. **Permohonan Ditolak Kerana Nama Kursus Tidak Berdaftar?**:
   - Semak senarai rasmi program pengajian UniMAP yang berdaftar dengan PTPTN di pautan ini:
   - 🔗 [https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/permohonan-ptptn/senarai-program](https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/permohonan-ptptn/senarai-program)
6. **Pertanyaan Lanjut / Isu Bayaran Semasa Latihan Industri (LI)**:
   - Hubungi Unit Pembiayaan JHEP di talian **04-941 4431**.`
        },
        quickActions: [
            { label: { en: "Cancel PTPTN for YBR/JPA", ms: "Batal PTPTN Kerana Dapat YBR/JPA" }, query: { en: "Can I apply for PTPTN, Yayasan Bank Rakyat (YBR), and Zakat together? How do I cancel PTPTN if offered another scholarship?", ms: "Bolehkah mohon PTPTN, Yayasan Bank Rakyat (YBR) & Zakat serentak? Bagaimana cara batalkan PTPTN jika dapat tajaan lain?" } },
            { label: { en: "RHB Bank / OSI Fee Not Deducted", ms: "Isu Akaun RHB / Yuran OSI Belum Ditolak" }, query: { en: "Who do I contact for KWSP university verification, PTPTN institution verification, RHB bank account issues, or uncredited OSI fees?", ms: "Siapa perlu dihubungi bagi pengesahan universiti KWSP/PTPTN, masalah akaun bank RHB, atau yuran dalam OSI masih belum ditolak?" } }
        ]
    },
    {
        id: "ptptn_cancel_multiple_sponsors",
        refCode: "PTN-PTPTN-02",
        category: "PTPTN",
        faqTitle: {
            ms: "Cara Batal PTPTN (Jika Dapat YBR / JPA)",
            en: "Canceling PTPTN (When Offered YBR / JPA)"
        },
        keywords: ["batal", "cancel", "ybr", "yayasan bank rakyat", "zakat", "bertindih", "bayar balik", "borang penolakan", "borang pembatalan"],
        questions: {
            en: "Can I apply for PTPTN, Yayasan Bank Rakyat (YBR), and Zakat together? How do I cancel PTPTN if offered another scholarship?",
            ms: "Bolehkah mohon PTPTN, Yayasan Bank Rakyat (YBR) & Zakat serentak? Bagaimana cara batalkan PTPTN jika dapat tajaan lain?"
        },
        answer: {
            en: `###Managing Multiple Applications (PTPTN + YBR + Zakat) & Canceling PTPTN
1. **How to Cancel PTPTN After Getting YBR / JPA**:
   - **If you HAVE NOT submitted the PTPTN agreement**: Fill out the *PTPTN Loan Offer Rejection Form (Borang Penolakan Tawaran Pinjaman PTPTN)*.
   - **If you HAVE submitted the agreement / loan is active**: Fill out the *PTPTN Loan Cancellation Form (Borang Pembatalan Pinjaman Pendidikan PTPTN)* + official cover letter + copy of your **YBR / JPA Offer Letter**.
   - **If PTPTN money was already credited**: **Do not manually pay it back first.** Check with PTPTN for the exact settlement amount, then pay via myPTPTN, online banking, or counter.
2. **Applying for PTPTN, Yayasan Bank Rakyat (YBR) & Zakat**:
   - You may prepare documents and apply early via [ptptn.gov.my](https://www.ptptn.gov.my/) and [yayasanbankrakyat.com.my](https://www.yayasanbankrakyat.com.my/).
   - Declare honestly when applying for Zakat if you hold PTPTN. Never hold two overlapping sponsorships for the same tuition cost without sponsor approval.`,
            ms: `###Aliran Permohonan (PTPTN + YBR + Zakat) & Prosedur Batal PTPTN
1. **Cara Batalkan PTPTN Jika Berjaya Dapat YBR / JPA**:
   - **Belum pulangkan perjanjian PTPTN**: Isi *Borang Penolakan Tawaran Pinjaman PTPTN*.
   - **Sudah pulangkan perjanjian / pinjaman sedang berjalan**: Isi *Borang Pembatalan Pinjaman Pendidikan PTPTN* + surat permohonan rasmi + salinan *Surat Tawaran YBR/JPA*.
   - **Jika duit PTPTN sudah masuk akaun**: **Jangan terus bayar sendiri dahulu.** Semak dengan PTPTN jumlah sebenar yang perlu diselesaikan, kemudian buat bayaran melalui myPTPTN, perbankan internet, atau kaunter.
2. **Panduan Mohon PTPTN, Yayasan Bank Rakyat & Zakat**:
   - Pelajar boleh menyemak syarat dan memohon di [ptptn.gov.my](https://www.ptptn.gov.my/) serta memantau pembukaan portal [yayasanbankrakyat.com.my](https://www.yayasanbankrakyat.com.my/).
   - Bagi permohonan Zakat, maklumkan dengan jujur status pembiayaan sedia ada. Pastikan tiada pembiayaan berganda yang bercanggah dengan syarat penaja.`
        },
        quickActions: [
            { label: { en: "Update Sponsor Status in OSI", ms: "Kemaskini Status Penaja Dalam OSI" }, query: { en: "Who do I contact for KWSP university verification, PTPTN institution verification, RHB bank account issues, or uncredited OSI fees?", ms: "Siapa perlu dihubungi bagi pengesahan universiti KWSP/PTPTN, masalah akaun bank RHB, atau yuran dalam OSI masih belum ditolak?" } }
        ]
    },
    {
        id: "bendahari_kwsp_rhb_fees",
        refCode: "PTN-BENDAHARI-01",
        category: "PTPTN",
        faqTitle: {
            ms: "Urusan KWSP, Akaun RHB & Status Yuran OSI",
            en: "KWSP Verification, RHB Account & OSI Fees"
        },
        keywords: ["bendahari", "kewangan", "rhb", "akaun bank", "kwsp", "epf", "pengesahan universiti", "pengesahan institut", "yuran belum ditolak", "osi", "zakat selangor", "04-941 4033"],
        questions: {
            en: "Who do I contact for KWSP university verification, PTPTN institution verification, RHB bank account issues, or uncredited OSI fees?",
            ms: "Siapa perlu dihubungi bagi pengesahan universiti KWSP/PTPTN, masalah akaun bank RHB, atau yuran dalam OSI masih belum ditolak?"
        },
        answer: {
            en: `###Jabatan Bendahari (Student Finance Unit) Matters
For the following financial account and verification matters, they are handled directly by **Jabatan Bendahari UniMAP**:
1. **KWSP (EPF) "In Process for University Verification"**:
   - Means your application is currently being verified by the university. Monitor your KWSP portal; no new form is needed unless instructed.
2. **PTPTN Institution Verification / RHB Panel Bank Account Issues**:
   - If you cannot open an RHB panel account or need institution confirmation status.
3. **PTPTN / Allowance Credited, But OSI Fees Still Show Unpaid**:
   - Contact Jabatan Bendahari to check your student ledger reconciliation.
4. **Updating Sponsor Status in OSI (e.g., Ended KWSP -> Now Receiving Lembaga Zakat Selangor)**:
   - Submit a copy of your new sponsorship verification form (e.g., Zakat Selangor) to **Jabatan Bendahari** to update your OSI status.

📞 **Direct Contact (Jabatan Bendahari UniMAP)**:
- **Unit Kewangan Pelajar**: **04-941 4033**
- **Alternative Lines**: **04-941 4021 / 04-941 4121**`,
            ms: `###Urusan Kewangan Pelajar & Jabatan Bendahari UniMAP
Perkara berikut diuruskan secara terus oleh **Unit Kewangan Pelajar, Jabatan Bendahari UniMAP**:
1. **Status KWSP "Sedang Dalam Proses Untuk Pengesahan Universiti"**:
   - Bermaksud permohonan sedang disahkan oleh pihak universiti. Semak portal KWSP dari semasa ke semasa (tidak perlu isi borang tambahan melainkan diarahkan).
2. **Status Pengesahan Institut PTPTN & Masalah Pembukaan Akaun Bank RHB**:
   - Jika akaun bank panel RHB tidak dapat dibuka atau ingin menyemak tarikh pengesahan institut.
3. **Duit PTPTN / Elaun Sudah Masuk Tetapi Yuran Dalam OSI Masih Belum Ditolak**:
   - Hubungi Unit Kewangan Pelajar untuk semakan penyata lejar.
4. **Kemaskini Status Bantuan Dalam OSI (Contoh: Tamat KWSP -> Terima Zakat Selangor)**:
   - Kemukakan salinan borang pengesahan/dokumen bantuan baharu kepada **Jabatan Bendahari** untuk kemas kini rekod OSI.

📞 **Talian Terus Jabatan Bendahari UniMAP**:
- **Unit Kewangan Pelajar**: **04-941 4033**
- **Talian Alternatif**: **04-941 4021 / 04-941 4121**`
        },
        quickActions: [
            { label: { en: "Document Verification (OSI e-Funding)", ms: "Pengesahan Dokumen (OSI e-Funding)" }, query: { en: "How do I get a Student Confirmation Letter (ETS/KTMB/Scholarship) or verify parent income documents via OSI e-Funding?", ms: "Bagaimana cara mendapatkan Surat Pengesahan Pelajar (ETS/KTMB/Penajaan) atau pengesahan dokumen pendapatan melalui OSI e-Funding?" } }
        ]
    },
    {
        id: "surat_pengesahan_osi_efunding",
        refCode: "PTN-SURAT-01",
        category: "Surat Penajaan/Pengesahan Dokumen",
        faqTitle: {
            ms: "Surat Pengesahan Pelajar (ETS/KTMB) & OSI",
            en: "Student Confirmation Letters (ETS) & OSI"
        },
        keywords: ["surat", "pengesahan", "dokumen", "ets", "ktmb", "ktm", "diskaun", "pengangkutan", "pendapatan", "ibu bapa", "osi", "e-funding", "efunding", "aktif belajar", "sabah", "collect document", "delete", "termohon"],
        questions: {
            en: "How do I get a Student Confirmation Letter (ETS/KTMB/Scholarship) or verify parent income documents via OSI e-Funding?",
            ms: "Bagaimana cara mendapatkan Surat Pengesahan Pelajar (ETS/KTMB/Penajaan) atau pengesahan dokumen pendapatan melalui OSI e-Funding?"
        },
        answer: {
            en: `###Document Verification (OSI e-Funding) & Confirmation Letters
1. **Standard Study Confirmation Letter (e.g., for ETS / KTMB Student Discount)**:
   - You can generate the standard letter directly in OSI:
   - **Path**: \`OSI > Admission > Confirmation Studies Letter > English / Malay\`
2. **Custom Document Endorsement (Parent Income Verification, KTMB Lampiran 3 with Graduation Month/Year, State Loans, JoC)**:
   - ✅ Submit your verification request online via **OSI e-Funding**.
   - ✅ **Unit Pembiayaan** will review your uploaded documents and update the status in the system.
   - ✅ **Only come to the counter when the status shows ready** (*refer to the "Collect Document" date in OSI e-Funding*).
   - ⭐ **Workflow**: \`APPLY ONLINE → CHECK STATUS → COLLECT WHEN READY\` (No need to rush to the counter before it is ready!).
3. **Accidentally Submitted Wrong Application in OSI e-Funding?**:
   - Do not worry—**Unit Pembiayaan will cancel/delete** duplicate or accidental entries upon review.`,
            ms: `###Pengesahan Dokumen (OSI e-Funding) & Surat Pengesahan Pelajar
1. **Muat Turun Surat Pengesahan Belajar Standard (Contoh: Tambang Pelajar ETS / KTMB)**:
   - Boleh dijana terus melalui sistem OSI:
   - **Laluan**: \`OSI > Admission > Confirmation Studies Letter > English / Malay\`
2. **Pengesahan Dokumen Rasmi (Pengesahan Pendapatan Ibu Bapa, Borang Lampiran 3 KTMB, Tabung Pendidikan Negeri, JoC)**:
   - ✅ Permohonan pengesahan dokumen dibuat secara dalam talian melalui **OSI e-Funding**.
   - ✅ Pihak **Unit Pembiayaan** akan membuat semakan dan mengemas kini status permohonan.
   - ✅ Pelajar **hanya perlu hadir ke kaunter apabila dokumen telah siap** (*rujuk tarikh pengambilan "Collect Document" yang ditetapkan dalam sistem*).
   - ⭐ **Aliran Mudah**: \`MOHON SECARA ONLINE → SEMAK STATUS → HADIR APABILA DOKUMEN SIAP\` (Tidak perlu terburu-buru hadir ke kaunter!).
3. **Termohon / Silap Isi Dalam OSI e-Funding?**:
   - Pihak Unit Pembiayaan akan membatalkan permohonan tersebut dalam sistem.`
        },
        quickActions: [
            { label: { en: "MySISWA Job on Campus (JoC)", ms: "Kerja Sambilan Kampus (JoC)" }, query: { en: "How do I apply for MySISWA Job on Campus (JoC), or what are the campus bicycle rules & Unit Pembiayaan contacts?", ms: "Bagaimana cara memohon kerja sambilan MySISWA Job on Campus (JoC), peraturan basikal kampus & talian Unit Pembiayaan?" } }
        ]
    },
    {
        id: "kebajikan_khairat_laptop_etabung",
        refCode: "PTN-KEBAJIKAN-01",
        category: "Lain-lain",
        faqTitle: {
            ms: "Khairat Kematian, Pinjaman Laptop & e-Tabung",
            en: "Bereavement Aid, Laptop Loan & e-Tabung"
        },
        keywords: ["khairat", "kematian", "ayah", "ibu", "meninggal", "laptop", "komputer", "peranti", "pinjaman laptop", "e-tabung", "etabung", "tabung amanah khas", "kebajikan", "04-941 4430"],
        questions: {
            en: "How do I apply for Bereavement Aid (Khairat Kematian), Student Laptop Loan, or e-Tabung Zakat?",
            ms: "Bagaimana cara memohon Sumbangan Khairat Kematian, Pinjaman Laptop Pelajar, atau sistem e-Tabung Zakat?"
        },
        answer: {
            en: `###Student Welfare Aid (Khairat Kematian, Laptop Loan & e-Tabung)
1. **Bereavement Aid (Sumbangan Khairat Kematian Ibu/Bapa Kandung)**:
   - Complete the application inside the **OSI system** and submit/email the form & supporting documents to the Welfare Unit at **kebajikan@unimap.edu.my**.
2. **Student Laptop Loan / Welfare Assistance / e-Tabung (Tabung Sumbangan Zakat & Tabung Amanah Khas)**:
   - For opening dates, eligibility, and application procedures under the Student Welfare Unit, please contact **Unit Kebajikan, JHEP UniMAP** directly:
   - 📞 **Telephone**: **04-941 4430**
   - ✉️ **Email**: **kebajikan@unimap.edu.my**`,
            ms: `###Bantuan Kebajikan Pelajar (Khairat Kematian, Pinjaman Laptop & e-Tabung)
1. **Permohonan Sumbangan Khairat Kematian (Ayah/Ibu Kandung)**:
   - Sila isi permohonan di dalam sistem **OSI** dan hantar borang / e-melkan dokumen lengkap kepada Unit Kebajikan melalui **kebajikan@unimap.edu.my**.
2. **Permohonan Pinjaman Laptop / Bantuan Kebajikan / Sistem e-Tabung (Tabung Sumbangan Zakat & Tabung Amanah Khas)**:
   - Untuk pertanyaan lanjut mengenai tarikh pembukaan dan prosedur permohonan bantuan kebajikan pelajar, sila hubungi **Unit Kebajikan, JHEP UniMAP**:
   - 📞 **Telefon**: **04-941 4430**
   - ✉️ **E-mel**: **kebajikan@unimap.edu.my**`
        },
        quickActions: []
    },
    {
        id: "joc_campus_bicycle_general",
        refCode: "PTN-UMUM-01",
        category: "Lain-lain",
        faqTitle: {
            ms: "Kerja Sambilan (JoC) & Talian Unit Pembiayaan",
            en: "Job on Campus (JoC) & Unit Pembiayaan Contacts"
        },
        keywords: ["joc", "job on campus", "kerja", "bekerja di jabatan", "part time", "sambilan", "mysiswa", "cgee", "basikal", "bicycle", "riadah", "unit pembiayaan", "04-941 4431"],
        questions: {
            en: "How do I apply for MySISWA Job on Campus (JoC), or what are the campus bicycle rules & Unit Pembiayaan contacts?",
            ms: "Bagaimana cara memohon kerja sambilan MySISWA Job on Campus (JoC), peraturan basikal kampus & talian Unit Pembiayaan?"
        },
        answer: {
            en: `###MySISWA Job on Campus (JoC), Campus Rules & Unit Pembiayaan Contacts
1. **MySISWA Job on Campus (JoC) — Part-Time Campus Work**:
   - Managed by the **Centre for Graduate Employability & Entrepreneurship (CGEE), UniMAP**.
   - 📍 **Location**: Level 2, Pusat Pengajian Siswazah, Kampus Alam UniMAP, Pauh Putra, 02600 Arau, Perlis.
   - 📞 **Phone**: **04-941 4396**
2. **Riding Bicycles on Campus**:
   - Allowed for commuting to class and recreation, subject to campus traffic rules: ride carefully on designated paths, obey safety signs, yield to pedestrians, equip lights/reflectors at night, and park only at designated bicycle racks.
3. **Official Unit Pembiayaan JHEP Channels**:
   - 🔗 **Official Inquiry Portal**: [https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan](https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan)
   - 📞 **Unit Pembiayaan Hotline**: **04-941 4431**`,
            ms: `###MySISWA Job on Campus (JoC), Peraturan Basikal & Talian Unit Pembiayaan
1. **Program MySISWA Job on Campus (JoC) — Bekerja Sambilan di Jabatan**:
   - Diuruskan oleh **Pusat Kebolehpasaran Graduan & Keusahawanan (CGEE), UniMAP**.
   - 📍 **Lokasi**: Aras 2, Pusat Pengajian Siswazah, Kampus Alam UniMAP, Pauh Putra, 02600 Arau, Perlis.
   - 📞 **No. Telefon**: **04-941 4396**
2. **Peraturan Menunggang Basikal di Dalam Kampus**:
   - Pelajar dibenarkan menggunakan basikal untuk ke kelas dan beriadah dengan mematuhi peraturan: menunggang secara berhemah, patuhi papan tanda keselamatan, beri keutamaan kepada pejalan kaki, pasang lampu/pemantul cahaya pada waktu malam, dan letakkan di rak basikal yang disediakan.
3. **Saluran Rasmi Unit Pembiayaan JHEP**:
   - 🔗 **Portal Pertanyaan**: [https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan](https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/pertanyaan)
   - 📞 **Talian Unit Pembiayaan**: **04-941 4431**`
        },
        quickActions: []
    }
];

// Authentic Solved Case Log parsed directly from your attached CSV ( linked to parent KB ID for full follow-up support)
const CSV_SOLVED_RECORDS = [
    { ref: "PTN-20260930-0008", kbId: "sulung_selection", date: "30/09/2026", category: "Dermasiswa Sulung", q: "Adakah saya boleh mendapat dermasiswa sulung?", a: "Untuk pemilihan Siswa SULUNG adalah berdasarkan saringan di peringkat universiti. Pihak JHEP tidak membuka permohonan secara manual—jika layak, pelajar akan dihubungi terus." },
    { ref: "PTN-20260930-0009", kbId: "db40_jpa", date: "30/09/2026", category: "Dermasiswa B40JPA", q: "BILA BOLEH MOHON Dermasiswa B40 JPA?", a: "Permohonan DB40 JPA 2026 telah dibuka pada 3–16 Ogos 2026 dan ditutup. Keputusan 2026 boleh disemak mulai 13 Okt – 22 Okt 2026 di https://penajaan.jpa.gov.my/." },
    { ref: "PTN-20260930-0010", kbId: "ptptn_status_disbursement", date: "30/09/2026", category: "PTPTN", q: "Macam mana nak tahu bila PTPTN tu lulus ke tak?", a: "Semak melalui portal rasmi MyPTPTN → Pinjaman Pendidikan → Semakan Status Permohonan." },
    { ref: "PTN-20260930-0012", kbId: "ptptn_cancel_multiple_sponsors", date: "30/09/2026", category: "PTPTN", q: "Jikalau saya berjaya dapat pinjaman YBR macam mana nak cancel PTPTN ataupun bayar balik?", a: "Belum hantar perjanjian: Isi Borang Penolakan Tawaran. Sudah hantar: Isi Borang Pembatalan + surat rasmi + surat tawaran YBR. Jika duit dah masuk: Semak jumlah dengan PTPTN dahulu sebelum bayar." },
    { ref: "PTN-20260930-0014", kbId: "ptptn_status_disbursement", date: "30/09/2026", category: "PTPTN", q: "Bila dapat bayaran pertama PTPTN?", a: "Wang pinjaman dikreditkan dalam 21 hari bekerja daripada tarikh penerimaan dokumen perjanjian lengkap oleh PTPTN." },
    { ref: "PTN-20260930-0015", kbId: "b40_tvet_deferment", date: "30/09/2026", category: "Dermasiswa B40TVET", q: "Macam mana untuk buat permohonan Dermasiswa B40TVET?", a: "Pemilihan Dermasiswa B40TVET adalah berdasarkan saringan di peringkat universiti. Permohonan tidak dibuka secara manual—jika layak, pelajar akan dihubungi." },
    { ref: "PTN-20261001-0028", kbId: "bendahari_kwsp_rhb_fees", date: "01/10/2026", category: "Surat Penajaan/Pengesahan Dokumen", q: "Mengapa saya masih dikategorikan penerima KWSP sedangkan kini menerima Lembaga Zakat Selangor di OSI?", a: "Kemukakan salinan borang pengesahan atau dokumen bantuan Dermasiswa Lembaga Zakat Selangor kepada Jabatan Bendahari bagi tujuan kemas kini sistem OSI." },
    { ref: "PTN-20261002-0984", kbId: "surat_pengesahan_osi_efunding", date: "02/10/2026", category: "Surat Penajaan/Pengesahan Dokumen", q: "Permohonan surat pengesahan untuk Diskaun Pengangkutan Awam KTMB (Lampiran 3) & pengesahan pendapatan?", a: "Permohonan pengesahan dokumen dibuat secara online melalui OSI e-Funding. Hadir ke kaunter hanya apabila status dokumen telah siap (rujuk tarikh Collect Document)." },
    { ref: "PTN-20261004-0986", kbId: "surat_pengesahan_osi_efunding", date: "04/10/2026", category: "Surat Penajaan/Pengesahan Dokumen", q: "Bagaimana cara mendapatkan surat pengesahan pelajar untuk tambang pelajar ETS?", a: "Muat turun terus melalui sistem: OSI > Admission > Confirmation Studies Letter > English/Malay." },
    { ref: "PTN-20261006-0987", kbId: "bendahari_kwsp_rhb_fees", date: "06/10/2026", category: "Lain-lain", q: "Permohonan KWSP menyatakan 'Sedang dalam proses untuk Pengesahan Universiti', perlu isi borang apa?", a: "Masih dalam proses pengesahan universiti. Tidak perlu isi borang baharu. Untuk semakan lanjut hubungi Unit Kewangan Pelajar Jabatan Bendahari: 04-941 4033." },
    { ref: "PTN-20261008-0995", kbId: "joc_campus_bicycle_general", date: "08/10/2026", category: "Lain-lain", q: "Nak tanya ada kerja untuk bekerja di jabatan ke (Job on Campus)?", a: "Hubungi Pusat Kebolehpasaran Graduan & Keusahawanan (CGEE) UniMAP di Aras 2, Pusat Pengajian Siswazah, Pauh Putra (04-941 4396) untuk Program MySISWA Job on Campus (JoC)." },
    { ref: "PTN-20261009-0999", kbId: "b40_tvet_deferment", date: "09/10/2026", category: "Dermasiswa B40TVET", q: "Penerima Dermasiswa B40 TVET Batch Kedua, minggu depan final exam, risau duit yuran kena bayar dulu ke?", a: "KPT sedang menyalurkan dana. Sila isi borang penangguhan bayaran yuran di pejabat fakulti masing-masing beserta lampiran surat tawaran Dermasiswa B40 TVET." },
    { ref: "PTN-20261009-1001", kbId: "ptptn_status_disbursement", date: "09/10/2026", category: "PTPTN", q: "PTPTN ditolak sebab pemilihan kursus tidak berdaftar, macam mana nak semak senarai program?", a: "Semak senarai program berdaftar di: https://sites.google.com/unimap.edu.my/unitpembiayaanjhep/permohonan-ptptn/senarai-program" },
    { ref: "PTN-20261009-1003", kbId: "kebajikan_khairat_laptop_etabung", date: "09/10/2026", category: "Lain-lain", q: "Bagaimana untuk membuat permohonan sumbangan khairat kematian ayah kandung?", a: "Mohon isi dalam OSI dan hantar borang / emel borang kepada Unit Kebajikan: kebajikan@unimap.edu.my." },
    { ref: "PTN-20261010-1006", kbId: "ptptn_status_disbursement", date: "10/10/2026", category: "PTPTN", q: "Macam mana nak dapatkan Setem Hasil RM10 jika penerima bawah 18 tahun & bila boleh hantar?", a: "Setem hasil boleh dihantar di Kaunter Unit Pembiayaan JHEP waktu pejabat. Pertanyaan LHDN bawah 18 tahun hubungi Agen LHDN Pn. Wani: 013-450 8066." },
    { ref: "PTN-20261010-1007", kbId: "ptptn_status_disbursement", date: "10/10/2026", category: "PTPTN", q: "Sekiranya ingin mendapatkan tandatangan dan cop rasmi saksi JHEP, perlu bawa borang PTPTN ke pejabat JHEP ke?", a: "Ya, betul. Pelajar perlu membawa borang perjanjian PTPTN secara fizikal ke Kaunter Unit Pembiayaan, Pejabat JHEP (Kampus Alam Pauh Putra) pada waktu pejabat (8:00 pagi – 5:00 petang) untuk mendapatkan tandatangan dan cop rasmi saksi." },
    { ref: "PTN-20261012-1020", kbId: "kebajikan_khairat_laptop_etabung", date: "12/10/2026", category: "Lain-Lain Biasiswa/Dermasiswa/Pinjaman", q: "Bilakah permohonan pinjaman laptop untuk pelajar dibuka dan bagaimana cara memohonnya?", a: "Hubungi Unit Kebajikan, JHEP UniMAP melalui talian 04-941 4430 untuk bantuan kebajikan/pinjaman peranti pelajar." },
    { ref: "PTN-20261012-1021", kbId: "sulung_selection", date: "12/10/2026", category: "Dermasiswa Sulung", q: "Adakah permohonan Siswa SULUNG akan menjejaskan permohonan PTPTN saya? Boleh mohon dua-dua?", a: "Pelajar yang menerima pinjaman PTPTN masih boleh mendapat manfaat SULUNG sekiranya memenuhi syarat kelayakan." },
    { ref: "PTN-20261012-1023", kbId: "sulung_technical_form", date: "12/10/2026", category: "Dermasiswa Sulung", q: "Ibu/bapa bukan warganegara dan guna pasport, ruangan maklumat bapa hanya benarkan No. IC?", a: "Kosongkan ruangan No. KP tersebut dan nyatakan dalam bahagian Tujuan Permohonan bahawa bapa/ibu menggunakan pasport." }
];

// Track last matched KB item so short follow-ups like "cara?", "di mana?", "bila?", "how?" work naturally!
let lastMatchedKbItem = null;

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
        "pengesahan", "anak", "sulung", "kakak", "abang", "bapa", "ayah", "ibu", "kematian"
    ];
    const englishWords = [
        "how", "what", "where", "when", "can", "apply", "eligible", "eligibility",
        "check", "status", "cancel", "loan", "defer", "tuition", "letter", "confirmation",
        "passport", "town", "missing", "first", "child", "scholarship", "approval"
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
    const cleanQuery = query.toLowerCase().replace(/[^\w\s]/g, " ").trim();
    const allWords = cleanQuery.split(/\s+/).filter(Boolean);
    const rawTokens = allWords.filter(t => t.length > 1 && !STOPWORDS.has(t));
    const detectedLang = detectQueryLanguage(query, currentUiLang);

    // 1. Greeting check
    const greetings = ["hi", "hello", "hey", "salam", "assalamualaikum", "selamat", "morning", "pagi", "petang"];
    if (allWords.length <= 2 && allWords.some(w => greetings.includes(w)) && rawTokens.length === 0) {
        return { type: "greeting", lang: detectedLang, confidence: 1.0 };
    }

    // 2. Conversational Follow-up Memory Check (e.g., user asks "cara?", "macam mana?", "how?", "di mana?", "nombor telefon?")
    const followUpTriggers = ["cara", "macam", "mana", "bagaimana", "how", "where", "when", "bila", "lokasi", "nombor", "telefon", "link", "pautan", "syarat", "dokumen", "borang", "steps", "explain", "terangkan", "lanjut"];
    if (lastMatchedKbItem && allWords.length <= 3 && rawTokens.length <= 1 && allWords.some(w => followUpTriggers.includes(w))) {
        return {
            type: "match",
            lang: detectedLang,
            item: lastMatchedKbItem,
            confidence: 0.95,
            isFollowUp: true
        };
    }

    // 3. Score curated bilingual KB items
    const scoredKB = KNOWLEDGE_BASE.map(item => {
        let score = 0;
        item.keywords.forEach(kw => {
            if (cleanQuery.includes(kw)) {
                score += kw.includes(" ") ? 30 : 18;
            }
        });

        rawTokens.forEach(token => {
            item.keywords.forEach(kw => {
                kw.split(/\s+/).forEach(kp => {
                    if (token === kp) score += 14;
                    else if (token.length >= 4 && kp.length >= 4 && levenshtein(token, kp) <= 1) score += 9;
                });
            });
            const body = (item.questions.en + " " + item.questions.ms + " " + item.answer.ms).toLowerCase();
            if (body.includes(token)) score += 4;
        });

        return { item, score, confidence: Math.min(0.99, score / 36) };
    }).sort((a, b) => b.score - a.score);

    // 4. Score individual solved records from CSV
    const scoredCSV = CSV_SOLVED_RECORDS.map(rec => {
        let score = 0;
        const recText = (rec.category + " " + rec.q + " " + rec.a).toLowerCase();
        rawTokens.forEach(token => {
            if (rec.q.toLowerCase().includes(token)) score += 12;
            else if (recText.includes(token)) score += 5;
        });
        return { rec, score };
    }).sort((a, b) => b.score - a.score);

    const bestKB = scoredKB[0];
    const bestCSV = scoredCSV[0];

    if (bestCSV && bestCSV.score > (bestKB ? bestKB.score : 0) && bestCSV.score >= 16) {
        const parentKB = KNOWLEDGE_BASE.find(k => k.id === bestCSV.rec.kbId) || (bestKB ? bestKB.item : null);
        lastMatchedKbItem = parentKB;
        return {
            type: "csv_direct",
            lang: detectedLang,
            record: bestCSV.rec,
            parentKB: parentKB,
            confidence: Math.min(0.98, bestCSV.score / 30)
        };
    }

    if (!bestKB || bestKB.score < 8) {
        return {
            type: "fallback",
            lang: detectedLang,
            confidence: 0.15
        };
    }

    lastMatchedKbItem = bestKB.item;
    return {
        type: "match",
        lang: detectedLang,
        item: bestKB.item,
        matchedRecord: bestCSV && bestCSV.score >= 10 ? bestCSV.rec : null,
        confidence: bestKB.confidence
    };
}
