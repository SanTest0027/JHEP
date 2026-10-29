// TanyaJHEP — Clean Conversational LLM Interface (Claude / Gemini / ChatGPT style)
// Powered 100% locally by the Updated UNIT PEMBIAYAAN.md Dataset (Zero API Credits)

let currentLang = "ms";
let lastQuestion = "";
let hasStartedChat = false;

const COPY = {
    ms: {
        newChat: "+ Perbualan Baharu",
        topicsHeader: "Soalan Lazim (FAQ)",
        waSidebar: "Hubungi Pegawai JHEP",
        modelSubtag: "Unit Pembiayaan UniMAP",
        placeholder: "Tanya tentang PTPTN, WPP RM1,500, Tandatangan Digital RM25, Kelas Pertama 2026, Penangguhan...",
        caption: "Pembantu AI Rasmi Unit Pembiayaan, Jabatan Hal Ehwal Pelajar (JHEP) UniMAP.",
        heroTitle: "Apa yang boleh saya bantu hari ini?",
        heroSub: "Pembantu AI Unit Pembiayaan JHEP UniMAP. Tanya dalam Bahasa Melayu atau Bahasa Inggeris.",
        starters: [
            { title: "Permohonan PTPTN, SSPN & Bank RHB", sub: "Jadual mohon, akaun SSPN Prime (RM20) & RHB Islamic", q: "Bagaimanakah cara memohon pinjaman PTPTN?" },
            { title: "Tandatangan Digital (RM25) & Tarikh Duit Masuk", sub: "Proses 24 jam bekerja & pengkreditan 21 hari bekerja", q: "Apakah itu tandatangan digital PTPTN dan berapakah bayarannya?" },
            { title: "WPP (RM1,500) & Biasiswa Anak eKasih (BAeK)", sub: "Tebus WPP di Bank Islam & syarat pertukaran biasiswa BAeK", q: "Apakah itu Wang Pendahuluan Pinjaman (WPP) dan syarat kelayakannya?" },
            { title: "Pengecualian Kelas Pertama (Syarat 2026) & Penangguhan", sub: "Syarat B40/M40 mulai 2026, dokumen skrol & tangguh bayaran", q: "Apakah syarat pengecualian bayaran balik pinjaman PTPTN bagi graduan Kelas Pertama (termasuk syarat baharu mulai 2026)?" }
        ],
        greetingReply: `Waalaikumussalam dan salam sejahtera! 👋\n\nSaya ialah pembantu pintar **Unit Pembiayaan JHEP UniMAP** yang telah dikemas kini dengan pangkalan data rasmi baharu. Anda boleh tanya saya mengenai:\n- **Permohonan PTPTN**: Tarikh buka/tutup, kod kursus UniMAP, akaun bank panel **RHB Islamic**, dan akaun **SSPN Prime (RM20)**.\n- **Tawaran & Pengkreditan**: Semakan kelulusan (5 hari bekerja), **Tandatangan Digital (RM25 / 24 jam bekerja)**, dan tempoh duit masuk (**21 hari bekerja**).\n- **WPP (RM1,500) & Biasiswa Anak eKasih (BAeK)**: Cara tebus di Bank Islam, potongan RM500/semester, dan penukaran pinjaman ke biasiswa BAeK.\n- **Penangguhan & Pengecualian Kelas Pertama (Syarat Baharu 2026)**: Syarat B40/M40, pengesahan skrol/transkrip, dan penangguhan kerana sambung belajar atau belum bekerja.`,
        fallbackReply: (q) => `Maaf, saya tidak menemui jawapan khusus bagi **"${q}"** buat masa ini.\n\nAnda boleh:\n1. Cuba tanya menggunakan kata kunci seperti *tarikh PTPTN*, *bank panel RHB*, *tandatangan digital RM25*, *WPP RM1500*, *BAeK eKasih*, *tangguh bayaran balik*, atau *pengecualian Kelas Pertama 2026*.\n2. Atau terus hubungi Unit Pembiayaan JHEP (**04-941 4431**) / hantar soalan ke WhatsApp di bawah:`
    },
    en: {
        newChat: "+ New Chat",
        topicsHeader: "Frequently Asked Questions",
        waSidebar: "Contact JHEP Officer",
        modelSubtag: "UniMAP Financial Aid Unit",
        placeholder: "Ask about PTPTN, WPP RM1,500, Digital Signature RM25, First Class Exemption 2026, Deferment...",
        caption: "Official AI Assistant for Unit Pembiayaan, Student Affairs Department (JHEP) UniMAP.",
        heroTitle: "How can I help you today?",
        heroSub: "UniMAP JHEP Financial Aid AI Assistant. Ask in English or Bahasa Melayu.",
        starters: [
            { title: "PTPTN Application, SSPN & RHB Bank", sub: "Application schedule, SSPN Prime (RM20) & RHB Islamic panel bank", q: "How do I apply for a PTPTN education loan online?" },
            { title: "Digital Signature (RM25) & Payout Timeline", sub: "24-working-hour signing & 21-working-day disbursement", q: "What is the PTPTN Digital Signature, how much does it cost (RM25), and how long does it take?" },
            { title: "WPP Advance (RM1,500) & BAeK eKasih Scholarship", sub: "Cashing WPP at Bank Islam & converting PTPTN to BAeK scholarship", q: "What is Wang Pendahuluan Pinjaman (WPP RM1,500) and who is eligible?" },
            { title: "First Class Exemption (2026 Rules) & Deferment", sub: "2026 B40/M40 criteria, scroll certification & repayment deferment", q: "What are the eligibility requirements for PTPTN First Class Honours loan exemption starting 1 January 2026?" }
        ],
        greetingReply: `Hello and Salam Sejahtera! 👋\n\nI am the updated **UniMAP JHEP Financial Aid Assistant**. Feel free to ask me about:\n- **PTPTN Applications**: Opening/closing schedules, UniMAP course codes, **RHB Islamic** panel bank account, and **SSPN Prime (RM20)**.\n- **Agreement & Disbursement**: Approval check (5 working days), **Digital Signature (RM25 / 24 working hours)**, and loan payout (**21 working days**).\n- **WPP Advance (RM1,500) & BAeK eKasih Scholarship**: Cashing WPP at Bank Islam, RM500/semester deduction, and BAeK scholarship conversion.\n- **Repayment Deferment & First Class Exemption (New 2026 Rules)**: B40/M40 household criteria, scroll certification, and deferment for further studies or unemployment.`,
        fallbackReply: (q) => `I couldn't find a specific answer for **"${q}"** at the moment.\n\nYou can:\n1. Try asking with keywords like *PTPTN deadline*, *RHB panel bank*, *digital signature RM25*, *WPP RM1500*, *BAeK eKasih*, *repayment deferment*, or *First Class exemption 2026*.\n2. Or contact Unit Pembiayaan JHEP (**04-941 4431**) / send a WhatsApp message below:`
    }
};

function renderMarkdownClean(md) {
    if (!md) return "";
    let html = md
        .replace(/^###\s?(.*$)/gim, '<h3>$1</h3>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

    const lines = html.split('\n');
    let out = '';
    let inUl = false;
    let inOl = false;

    lines.forEach(line => {
        const t = line.trim();
        if (/^\d+[\.\)]\s+/.test(t)) {
            if (inUl) { out += '</ul>'; inUl = false; }
            if (!inOl) { out += '<ol>'; inOl = true; }
            out += `<li>${t.replace(/^\d+[\.\)]\s+/, '')}</li>`;
        } else if (/^[-•]\s+/.test(t)) {
            if (inOl) { out += '</ol>'; inOl = false; }
            if (!inUl) { out += '<ul>'; inUl = true; }
            out += `<li>${t.replace(/^[-•]\s+/, '')}</li>`;
        } else {
            if (inUl) { out += '</ul>'; inUl = false; }
            if (inOl) { out += '</ol>'; inOl = false; }
            if (t.startsWith('<h3>')) {
                out += t;
            } else if (t.length > 0) {
                out += `<p>${t}</p>`;
            }
        }
    });
    if (inUl) out += '</ul>';
    if (inOl) out += '</ol>';
    return out;
}

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById("btnMs").classList.toggle("active", lang === "ms");
    document.getElementById("btnEn").classList.toggle("active", lang === "en");

    const c = COPY[lang];
    document.getElementById("newChatLabel").textContent = c.newChat;
    document.getElementById("topicsHeader").textContent = c.topicsHeader;
    document.getElementById("waSidebarLabel").textContent = c.waSidebar;
    document.getElementById("modelSubtag").textContent = c.modelSubtag;
    document.getElementById("userInput").placeholder = c.placeholder;
    document.getElementById("composerCaption").textContent = c.caption;

    renderSidebarFAQs();
    if (!hasStartedChat) {
        renderHeroEmptyState();
    }
}

function renderSidebarFAQs() {
    const container = document.getElementById("sidebarTopics");
    const featured = UNIT_PEMBIAYAAN_DATA.filter(item => item.featuredFaq);
    container.innerHTML = featured.map(item => {
        const title = item.faqLabel[currentLang] || item.faqLabel.ms;
        const q = currentLang === "en" ? item.soalan_en : item.soalan_utama;
        return `
            <button class="faq-card-btn" onclick="askQuestion('${q.replace(/'/g, "\\'")}')">
                <span class="faq-q-icon">Q.</span>
                <span>${title}</span>
            </button>
        `;
    }).join("");
}

function renderHeroEmptyState() {
    const col = document.getElementById("chatColumn");
    const c = COPY[currentLang];
    col.innerHTML = `
        <div class="hero-greeting" id="heroGreeting">
            <div class="hero-badge">JHEP</div>
            <h1>${c.heroTitle}</h1>
            <p>${c.heroSub}</p>
            <div class="starter-grid">
                ${c.starters.map(s => `
                    <div class="starter-card" onclick="askQuestion('${s.q.replace(/'/g, "\\'")}')">
                        <div class="starter-card-title">${s.title}</div>
                        <div class="starter-card-sub">${s.sub}</div>
                    </div>
                `).join("")}
            </div>
        </div>
    `;
}

function startNewChat() {
    hasStartedChat = false;
    lastMatchedItem = null;
    renderHeroEmptyState();
}

function askQuestion(text) {
    const query = text.trim();
    if (!query) return;

    lastQuestion = query;
    const col = document.getElementById("chatColumn");
    const scroll = document.getElementById("chatScroll");

    if (!hasStartedChat) {
        col.innerHTML = "";
        hasStartedChat = true;
    }

    // 1. Append User Bubble
    const userBubble = document.createElement("div");
    userBubble.className = "turn-user";
    userBubble.textContent = query;
    col.appendChild(userBubble);

    // 2. Append Assistant Turn with Brief Typing Animation
    const assistantTurn = document.createElement("div");
    assistantTurn.className = "turn-assistant";
    assistantTurn.innerHTML = `
        <div class="assistant-avatar">AI</div>
        <div class="assistant-body">
            <div class="typing-dots"><span></span><span></span><span></span></div>
        </div>
    `;
    col.appendChild(assistantTurn);
    scroll.scrollTop = scroll.scrollHeight;

    // 3. Query our local Knowledge Base
    const result = searchKnowledgeBase(query, currentLang);

    setTimeout(() => {
        const bodyEl = assistantTurn.querySelector(".assistant-body");
        let answerMd = "";
        let sourceRef = "";
        let links = [];
        let relatedItems = [];
        let showWaButton = false;

        if (result.type === "greeting") {
            answerMd = COPY[result.lang].greetingReply;
        } else if (result.type === "match") {
            const heading = result.lang === "en" ? result.item.soalan_en : result.item.soalan_utama;
            const bodyText = result.lang === "en" ? result.item.jawapan_en : result.item.jawapan_rasmi;
            answerMd = `### ${heading}\n${bodyText}`;
            sourceRef = `Unit Pembiayaan JHEP • ${result.item.section}`;
            links = result.item.pautan || [];
            relatedItems = result.related || [];
        } else {
            answerMd = COPY[result.lang].fallbackReply(query);
            showWaButton = true;
        }

        let html = renderMarkdownClean(answerMd);

        // Render Official Links (PAUTAN) as clickable pills
        if (links.length > 0) {
            html += `<div class="official-links-box">` +
                links.map(l => `<a href="${l.url}" target="_blank" rel="noopener" class="official-link-btn">🔗 ${l.label} ↗</a>`).join("") +
                `</div>`;
        }

        if (sourceRef) {
            html += `<div class="source-footnote">✓ ${sourceRef}</div>`;
        }

        bodyEl.innerHTML = html;

        // Add related follow-up pills from the dataset so students can explore further
        if (relatedItems.length > 0) {
            const fRow = document.createElement("div");
            fRow.className = "followup-row";
            relatedItems.slice(0, 2).forEach(rel => {
                const btn = document.createElement("button");
                btn.className = "followup-pill";
                const qText = result.lang === "en" ? rel.soalan_en : rel.soalan_utama;
                btn.textContent = "↪ " + qText;
                btn.onclick = () => askQuestion(qText);
                fRow.appendChild(btn);
            });
            bodyEl.appendChild(fRow);
        }

        if (showWaButton) {
            const fRow = document.createElement("div");
            fRow.className = "followup-row";
            const waBtn = document.createElement("button");
            waBtn.className = "followup-pill";
            waBtn.style.borderColor = "#16A34A";
            waBtn.style.color = "#166534";
            waBtn.textContent = result.lang === "en" ? "💬 Ask JHEP Officer on WhatsApp" : "💬 Tanya Pegawai JHEP di WhatsApp";
            waBtn.onclick = () => openWhatsappModal(query);
            fRow.appendChild(waBtn);
            bodyEl.appendChild(fRow);
        }

        scroll.scrollTop = scroll.scrollHeight;
    }, 280);
}

// WhatsApp Officer Escalation Modal
function openWhatsappModal(prefill = "") {
    document.getElementById("waQuestion").value = prefill || lastQuestion || "";
    document.getElementById("whatsappModal").classList.add("open");
}

function closeWhatsappModal() {
    document.getElementById("whatsappModal").classList.remove("open");
}

function sendToWhatsapp(e) {
    e.preventDefault();
    const name = document.getElementById("waName").value.trim();
    const matric = document.getElementById("waMatric").value.trim();
    const q = document.getElementById("waQuestion").value.trim();

    const text = `Assalamualaikum Unit Pembiayaan JHEP UniMAP,\n\n*Nama*: ${name}\n*No. Matrik*: ${matric}\n*Pertanyaan*: ${q}`;
    window.open(`https://wa.me/6049414431?text=${encodeURIComponent(text)}`, "_blank");
    closeWhatsappModal();
}

document.addEventListener("DOMContentLoaded", () => {
    setLanguage("ms");

    document.getElementById("composerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("userInput");
        askQuestion(input.value);
        input.value = "";
    });
});
