// TanyaJHEP — Clean Conversational LLM Interface (Claude / Gemini / ChatGPT style)
// Powered 100% locally by the Unit Pembiayaan JHEP Knowledge Base (Zero API Credits)

let currentLang = "ms";
let lastQuestion = "";
let hasStartedChat = false;

const COPY = {
    ms: {
        newChat: "+ Perbualan Baharu",
        topicsHeader: "Soalan Lazim (FAQ)",
        waSidebar: "Hubungi Pegawai JHEP",
        modelSubtag: "Unit Pembiayaan UniMAP",
        placeholder: "Tanya apa sahaja tentang Dermasiswa Sulung, PTPTN, JPA, Surat Pengesahan...",
        caption: "Pembantu AI Rasmi Unit Pembiayaan, Jabatan Hal Ehwal Pelajar (JHEP) UniMAP.",
        heroTitle: "Apa yang boleh saya bantu hari ini?",
        heroSub: "Pembantu AI Unit Pembiayaan JHEP UniMAP. Tanya dalam Bahasa Melayu atau Bahasa Inggeris.",
        starters: [
            { title: "Dermasiswa Siswa SULUNG 4.0", sub: "Kaedah saringan universiti & syarat kelayakan", q: "Bagaimana cara memohon Dermasiswa Siswa SULUNG 4.0 dan syarat kelayakannya?" },
            { title: "Semakan & Bayaran PTPTN", sub: "Status lulus, tempoh 21 hari bekerja & cop saksi", q: "Bagaimana cara semak kelulusan PTPTN, tarikh duit masuk (21 hari bekerja), cop saksi JHEP & senarai kursus?" },
            { title: "Batal PTPTN Dapat YBR / JPA", sub: "Langkah batal pinjaman & elak pertindihan tajaan", q: "Bolehkah mohon PTPTN, Yayasan Bank Rakyat (YBR) & Zakat serentak? Bagaimana cara batalkan PTPTN jika dapat tajaan lain?" },
            { title: "Surat Pengesahan Pelajar & OSI", sub: "Surat diskaun ETS/KTMB & pengesahan pendapatan", q: "Bagaimana cara mendapatkan Surat Pengesahan Pelajar (ETS/KTMB/Penajaan) atau pengesahan dokumen pendapatan melalui OSI e-Funding?" }
        ],
        greetingReply: `Waalaikumussalam dan salam sejahtera! 👋\n\nSaya ialah pembantu pintar **Unit Pembiayaan JHEP UniMAP**. Anda boleh tanya saya terus mengenai:\n- **Dermasiswa Siswa SULUNG 4.0** (kelayakan, kakak di IPTS, isu pasport/bandar)\n- **Dermasiswa B40 JPA & B40 TVET** (tarikh keputusan & borang tangguh yuran)\n- **Pinjaman PTPTN & YBR** (tarikh duit masuk, batal PTPTN, cop saksi, setem hasil)\n- **Surat Pengesahan Pelajar (ETS/KTMB)**, status **KWSP**, atau **Khairat Kematian**.`,
        fallbackReply: (q) => `Maaf, saya tidak menemui jawapan khusus bagi **"${q}"** buat masa ini.\n\nAnda boleh:\n1. Cuba tanya menggunakan kata kunci seperti *Dermasiswa Sulung*, *PTPTN*, *B40 TVET*, *JPA*, *Surat ETS*, atau *KWSP*.\n2. Atau terus hantar soalan ini kepada pegawai Unit Pembiayaan JHEP melalui butang di bawah:`
    },
    en: {
        newChat: "+ New Chat",
        topicsHeader: "Frequently Asked Questions",
        waSidebar: "Contact JHEP Officer",
        modelSubtag: "UniMAP Financial Aid Unit",
        placeholder: "Ask anything about Dermasiswa Sulung, PTPTN, JPA, Confirmation Letters...",
        caption: "Official AI Assistant for Unit Pembiayaan, Student Affairs Department (JHEP) UniMAP.",
        heroTitle: "How can I help you today?",
        heroSub: "UniMAP JHEP Financial Aid AI Assistant. Ask in English or Bahasa Melayu.",
        starters: [
            { title: "Dermasiswa Siswa SULUNG 4.0", sub: "University screening rules & eligibility criteria", q: "How do I apply for Dermasiswa Siswa SULUNG 4.0 and check eligibility?" },
            { title: "PTPTN Approval & Disbursement", sub: "21-working-day payment, witness stamp & courses", q: "How do I check PTPTN approval, payment timeline (21 working days), witness stamp, or registered courses?" },
            { title: "Cancel PTPTN for YBR / JPA", sub: "How to reject or cancel PTPTN when offered a scholarship", q: "Can I apply for PTPTN, Yayasan Bank Rakyat (YBR), and Zakat together? How do I cancel PTPTN if offered another scholarship?" },
            { title: "ETS / Study Confirmation Letter", sub: "Download from OSI or verify via OSI e-Funding", q: "How do I get a Student Confirmation Letter (ETS/KTMB/Scholarship) or verify parent income documents via OSI e-Funding?" }
        ],
        greetingReply: `Hello and Salam Sejahtera! 👋\n\nI am the **UniMAP JHEP Financial Aid Assistant**. Feel free to ask me about:\n- **Dermasiswa Siswa SULUNG 4.0** (screening, IPTS siblings, passport/town form issues)\n- **Dermasiswa B40 JPA & B40 TVET** (result dates & faculty fee deferment)\n- **PTPTN & YBR Loans** (approval status, 21-day payout, canceling PTPTN, witness stamp)\n- **ETS/KTMB Confirmation Letters**, **KWSP** university verification, or **Welfare Aid**.`,
        fallbackReply: (q) => `I couldn't find a specific answer for **"${q}"** at the moment.\n\nYou can:\n1. Try asking with keywords like *Dermasiswa Sulung*, *PTPTN*, *B40 TVET*, *JPA*, *ETS letter*, or *KWSP*.\n2. Or send this question directly to a JHEP officer on WhatsApp below:`
    }
};

function renderMarkdownClean(md) {
    if (!md) return "";
    let html = md
        .replace(/^###\s?(.*$)/gim, '<h3>$1</h3>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        .replace(/(^|[\s(])(https?:\/\/[^\s)<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>')
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
    container.innerHTML = KNOWLEDGE_BASE.map(item => {
        const title = item.faqTitle[currentLang] || item.faqTitle.ms;
        const q = item.questions[currentLang] || item.questions.ms;
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
    lastMatchedKbItem = null;
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

    // 3. Query our local Knowledge Base (with conversational follow-up memory)
    const result = searchKnowledgeBase(query, currentLang);

    setTimeout(() => {
        const bodyEl = assistantTurn.querySelector(".assistant-body");
        let answerMd = "";
        let sourceRef = "";
        let followups = [];
        let showWaButton = false;

        if (result.type === "greeting") {
            answerMd = COPY[result.lang].greetingReply;
        } else if (result.type === "csv_direct") {
            answerMd = result.record.a;
            sourceRef = `Unit Pembiayaan JHEP • Rujukan: ${result.record.ref}`;
            if (result.parentKB && result.parentKB.quickActions) {
                followups = result.parentKB.quickActions;
            }
        } else if (result.type === "match") {
            answerMd = result.item.answer[result.lang] || result.item.answer[currentLang];
            sourceRef = result.matchedRecord
                ? `Unit Pembiayaan JHEP • Rujukan: ${result.matchedRecord.ref}`
                : `Unit Pembiayaan JHEP (${result.item.category})`;
            followups = result.item.quickActions || [];
        } else {
            answerMd = COPY[result.lang].fallbackReply(query);
            showWaButton = true;
        }

        let html = renderMarkdownClean(answerMd);

        if (sourceRef) {
            html += `<div class="source-footnote">✓ ${sourceRef}</div>`;
        }

        bodyEl.innerHTML = html;

        // Add subtle follow-up pills if available
        if (followups.length > 0) {
            const fRow = document.createElement("div");
            fRow.className = "followup-row";
            followups.forEach(f => {
                const btn = document.createElement("button");
                btn.className = "followup-pill";
                btn.textContent = f.label[result.lang] || f.label[currentLang] || f.label.ms;
                btn.onclick = () => {
                    const nextQ = f.query[result.lang] || f.query[currentLang] || f.query.ms;
                    askQuestion(nextQ);
                };
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
    }, 300);
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
