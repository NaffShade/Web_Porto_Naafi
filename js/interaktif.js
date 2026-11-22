/* =========================================================
   SCRIPT UTAMA WEB PORTOFOLIO NAAFI'
   Alur:
   1. Menandai ikon aktif di Floating Dock Navbar sesuai halaman
   2. Fitur salin email sekali klik (Clipboard API)
   3. Rotasi tumpukan foto Polaroid di halaman About Me
   4. Pembuat draft email otomatis (mailto:) di halaman Contact
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // 1. AUTO-ACTIVE FLOATING DOCK NAVBAR
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const dockLinks = document.querySelectorAll(".dock-link");

  dockLinks.forEach((link) => {
    const targetPage = link.getAttribute("href");
    if (targetPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 2. COPY EMAIL KE CLIPBOARD (DI DARK FOOTER & CONTACT)
  const copyButtons = document.querySelectorAll(".btn-copy-email");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || "nafi9760@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1800);
      });
    });
  });

  // 3. INTERAKSI TUMPUKAN FOTO POLAROID (HALAMAN ABOUT ME)
const polaroidStack = document.getElementById("polaroidStack");
if (polaroidStack) {
  const cards = Array.from(polaroidStack.querySelectorAll(".polaroid-item"));
  polaroidStack.addEventListener("click", () => {
    cards.forEach((card) => {
      const currentPos = Number(card.getAttribute("data-pos"));
      // Pakai - 1 supaya kartu terdepan (0) pindah ke paling belakang (2), dan kartu ke-2 (1) maju ke depan (0)
      const nextPos = (currentPos - 1 + cards.length) % cards.length;
      card.setAttribute("data-pos", nextPos);
    });
  });
}

  // 4. PILIHAN TOPIK & OPEN EMAIL DRAFT (HALAMAN CONTACT)
  const topicChips = document.querySelectorAll(".topic-chip");
  let selectedTopic = "Game Collaboration";

  topicChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      topicChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedTopic = chip.getAttribute("data-topic");
    });
  });

  const contactForm = document.getElementById("postcardForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const senderName = document.getElementById("senderName").value.trim();
      const senderEmail = document.getElementById("senderEmail").value.trim();
      const senderMessage = document.getElementById("senderMessage").value.trim();

      const subject = encodeURIComponent(`[${selectedTopic}] Halo Naafi' — dari ${senderName}`);
      const body = encodeURIComponent(
        `Halo Naafi',\n\nPerkenalkan aku ${senderName} (${senderEmail}).\nTopik: ${selectedTopic}\n\n${senderMessage}\n\nSalam hangat,\n${senderName}`
      );

      //buka compose Gmail di tab baru
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nafi9760@gmail.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
    });
  }
});

// 5. ANIMASI MUNCUL HALUS SAAT SCROLL (INTERSECTION OBSERVER)
  const revealTargets = document.querySelectorAll("section, .editorial-card, .folder-card, .postcard-box");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });