/* =========================================================
   ARTD Djibouti — Script principal
   Rendu dynamique des contenus (data.js + modifications admin),
   navigation sticky, filtres galerie, lightbox, formulaire.
   ========================================================= */

"use strict";

/* ---------- Données : défauts + modifications administrateur ---------- */
const RTD_STORE_KEY = "artd_site_data_v1";

/* Lecture/écriture sécurisées (fonctionne aussi en ouverture directe file://) */
function lsGet(key) { try { return window.localStorage.getItem(key); } catch (e) { return null; } }
function lsSet(key, val) { try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; } }

function getRTDData() {
  const base = (typeof RTD_DEFAULT_DATA !== "undefined") ? RTD_DEFAULT_DATA : {};
  let overrides = {};
  try { overrides = JSON.parse(lsGet(RTD_STORE_KEY) || "{}"); } catch (e) { overrides = {}; }
  const merged = {};
  Object.keys(base).forEach(k => {
    if (Array.isArray(base[k])) {
      merged[k] = Array.isArray(overrides[k]) && overrides[k].length ? overrides[k] : base[k];
    } else if (base[k] && typeof base[k] === "object") {
      merged[k] = Object.assign({}, base[k], overrides[k] || {});
    } else {
      merged[k] = (overrides[k] !== undefined && overrides[k] !== null) ? overrides[k] : base[k];
    }
  });
  return merged;
}

const DATA = getRTDData();
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Rendu des sections ---------- */
function renderPiliers() {
  $("#piliersGrid").innerHTML = DATA.piliers.map(p => `
    <article class="card pilier-card reveal">
      <div class="ic">${p.icone}</div>
      <h3>${esc(p.titre)}</h3>
      <p>${esc(p.texte)}</p>
    </article>`).join("");
}

function renderQui() {
  const q = DATA.quiSommesNous;
  $("#quiTitre").textContent = q.titre;
  $("#quiTexte1").textContent = q.texte1;
  $("#quiTexte2").textContent = q.texte2;
  $("#quiStats").innerHTML = [q.stat1, q.stat2, q.stat3]
    .filter(Boolean).map(s => `<div class="stat"><b>${esc(s.valeur)}</b><span>${esc(s.libelle)}</span></div>`).join("");
}

function renderMissions() {
  $("#missionsGrid").innerHTML = DATA.missions.map(m => `
    <article class="card mission-card reveal">
      <div class="ic">${m.icone}</div>
      <h3>${esc(m.titre)}</h3>
      <p>${esc(m.texte)}</p>
    </article>`).join("");
}

function renderDestinations() {
  $("#destinationsGrid").innerHTML = DATA.destinations.map(d => `
    <article class="card dest-card reveal">
      <img src="${esc(d.img)}" alt="${esc(d.alt || d.titre)}" loading="lazy">
      <div class="dest-body">
        <h3>${esc(d.titre)}</h3>
        <p>${esc(d.texte)}</p>
        <button class="btn btn-sm btn-blue dest-btn" data-titre="${esc(d.titre)}" data-texte="${esc(d.texte)}">Découvrir</button>
      </div>
    </article>`).join("");
}

function renderPatrimoine() {
  $("#patrimoineGrid").innerHTML = DATA.patrimoine.map(p => `
    <article class="patrimoine-card reveal">
      <div class="ic">${p.icone}</div>
      <h3>${esc(p.titre)}</h3>
      <p>${esc(p.texte)}</p>
    </article>`).join("");
}

const ETAT_CLASSES = { "En cours": "vert", "Planifié": "or", "Terminé": "", "Suspendu": "or" };

function renderProjets() {
  $("#projetsGrid").innerHTML = DATA.projets.map(p => `
    <article class="card projet-card reveal">
      <img src="${esc(p.img)}" alt="${esc(p.alt || p.titre)}" loading="lazy">
      <div class="projet-body">
        <div class="projet-meta">
          <span class="chip">${esc(p.date)}</span>
          <span class="chip ${ETAT_CLASSES[p.etat] || ""}">${esc(p.etat)}</span>
        </div>
        <h3>${esc(p.titre)}</h3>
        <p>${esc(p.description)}</p>
        <div class="projet-detail">
          <div><b>Lieu :</b> ${esc(p.lieu)}</div>
          ${p.partenaires ? `<div><b>Partenaires :</b> ${esc(p.partenaires)}</div>` : ""}
        </div>
      </div>
    </article>`).join("");
}

function renderActualites() {
  $("#actualitesGrid").innerHTML = DATA.actualites.map(a => `
    <article class="card actu-card reveal">
      <img src="${esc(a.img)}" alt="${esc(a.alt || a.titre)}" loading="lazy">
      <div class="actu-body">
        <div class="actu-date">${esc(a.date)}</div>
        <h3>${esc(a.titre)}</h3>
        <p>${esc(a.resume)}</p>
        <button class="btn btn-sm btn-outline-lire actu-btn" style="color:var(--blue);border:1.5px solid var(--line)"
          data-titre="${esc(a.titre)}" data-date="${esc(a.date)}" data-texte="${esc(a.resume)}">Lire la suite</button>
      </div>
    </article>`).join("");
}

function renderGalerie() {
  $("#galerieGrid").innerHTML = DATA.galerie.map(g => `
    <figure class="galerie-item reveal" data-cat="${esc(g.cat)}" tabindex="0" role="button"
      aria-label="Agrandir : ${esc(g.label || g.alt)}">
      <img src="${esc(g.img)}" alt="${esc(g.alt || g.label)}" loading="lazy">
      <figcaption>${esc(g.label || "")}</figcaption>
    </figure>`).join("");
}

function renderVideos() {
  $("#videosGrid").innerHTML = DATA.videos.map(v => `
    <article class="card video-card reveal">
      ${v.lien ? `<a href="${esc(v.lien)}" target="_blank" rel="noopener" class="play" aria-label="Regarder la vidéo ${esc(v.titre)}">▶</a>`
              : `<span class="play" title="Vidéo bientôt disponible">▶</span>`}
      <h3>${esc(v.titre)}</h3>
      <p>${esc(v.texte)}</p>
    </article>`).join("");
}

function renderPartenaires() {
  $("#partenairesGrid").innerHTML = DATA.partenaires.map(p => `
    <div class="partenaire reveal">
      ${p.logo ? `<img src="${esc(p.logo)}" alt="Logo ${esc(p.nom)}">`
               : `<span class="ph" aria-hidden="true">${esc((p.nom || "?").trim().charAt(0))}</span>`}
      <span>${esc(p.nom)}</span>
    </div>`).join("");
}

/* ---------- Contact / footer ---------- */
const SOCIALS = [
  { key: "facebook", name: "Facebook", svg: '<svg viewBox="0 0 24 24"><path d="M13.5 9H16l.5-3h-3V4.5c0-.9.3-1.5 1.7-1.5H17V.1C16.4 0 15.4 0 14.4 0 11.9 0 10.5 1.4 10.5 4v2H8v3h2.5v9h3V9z"/></svg>' },
  { key: "youtube", name: "YouTube", svg: '<svg viewBox="0 0 24 24"><path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.6 4 12 4 12 4s-4.6 0-7.7.2c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S.8 9.4.8 11.3v1.4c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.6 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.8-.2-3.8zM9.5 15V8.5l6.5 3.3L9.5 15z"/></svg>' },
  { key: "instagram", name: "Instagram", svg: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg>' },
  { key: "tiktok", name: "TikTok", svg: '<svg viewBox="0 0 24 24"><path d="M16.6 5.8a5.4 5.4 0 0 1-1.2-3.6h-3.5v13.4a2.6 2.6 0 1 1-1.9-2.5V9.5a6 6 0 0 0 1.9.3 6.1 6.1 0 0 0 6.1-6.2c0-.4 0-.8-.1-1.2a4.2 4.2 0 0 1-1.3 3.4zM19.9 1.6c.1.4.1.8.1 1.2 0 4.2-3.4 7.6-7.6 7.6-.6 0-1.3-.1-1.9-.2v4.5a2.6 2.6 0 1 1-1.9 2.5V2.2h3.5v.1c0 1.3.5 2.6 1.3 3.5a4.1 4.1 0 0 0 4.1 1.2c.9-.3 1.7-.9 2.4-1.6.5-.5.8-1.1 1-1.8z"/></svg>' },
  { key: "x", name: "X (Twitter)", svg: '<svg viewBox="0 0 24 24"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16h1.7L6.7 4.7H4.9l11.5 14.3z"/></svg>' }
];

function renderContact() {
  const c = DATA.contact;
  $("#contactInfo").innerHTML = `
    <h3>${esc(c.nom)}</h3>
    <div class="ci-item"><span class="ic">📧</span><div><strong>Email :</strong><br><a href="mailto:${esc(c.email)}" style="color:#fff">${esc(c.email)}</a></div></div>
    <div class="ci-item"><span class="ic">📞</span><div><strong>Téléphone :</strong><br><a href="tel:${esc((c.tel1 || "").replace(/\s/g, ""))}" style="color:#fff">${esc(c.tel1)}</a>${c.tel2 ? " / " + esc(c.tel2) : ""}</div></div>
    <div class="ci-item"><span class="ic">📍</span><div><strong>Adresse :</strong><br>${esc(c.adresse)}</div></div>
    <div class="ci-item"><span class="ic">🕘</span><div><strong>Horaires :</strong><br>${esc(c.horaires)}</div></div>`;
  $("#footerContact").innerHTML = `
    <h4>Coordonnées</h4>
    <div class="footer-contact-item"><span class="ic">📧</span><a href="mailto:${esc(c.email)}" style="color:#c9d9e6">${esc(c.email)}</a></div>
    <div class="footer-contact-item"><span class="ic">📞</span><span>${esc(c.tel1)}${c.tel2 ? " / " + esc(c.tel2) : ""}</span></div>
    <div class="footer-contact-item"><span class="ic">📍</span><span>${esc(c.adresse)}</span></div>`;
  $("#socialRow").innerHTML = SOCIALS.map(s => {
    const url = (c[s.key] || "").trim();
    return url
      ? `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}">${s.svg}</a>`
      : `<a href="#" aria-label="${s.name} (lien à venir)" title="${s.name} (lien à venir)" style="opacity:.45;cursor:default" onclick="return false">${s.svg}</a>`;
  }).join("");
}

/* ---------- Hero ---------- */
function renderHero() {
  const h = DATA.hero;
  if (h) {
    if (h.titre) $("#heroTitre").textContent = h.titre;
    if (h.slogan) $("#heroSlogan").textContent = h.slogan;
    if (h.btn1) $("#heroBtn1").textContent = h.btn1;
    if (h.btn2) $("#heroBtn2").textContent = h.btn2;
  }
}

/* ---------- Interactions ---------- */
function initNav() {
  const header = $("#siteHeader");
  const nav = $("#mainNav");
  const toggle = $("#navToggle");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  $$(".main-nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  // Lien actif selon la section visible
  const sections = $$("main section[id]");
  const links = $$(".nav-link");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => obs.observe(s));
}

function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => obs.observe(el));
}

function initFilters() {
  $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".galerie-item").forEach(item => {
      item.classList.toggle("hidden", f !== "all" && item.dataset.cat !== f);
    });
  }));
}

function initLightbox() {
  const lb = $("#lightbox"), img = $("#lightboxImg"), cap = $("#lightboxCaption");
  const open = (src, caption) => {
    img.src = src; img.alt = caption; cap.textContent = caption;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.addEventListener("click", e => {
    const g = e.target.closest(".galerie-item");
    if (g) {
      open(g.querySelector("img").src, g.dataset ? (g.getAttribute("aria-label") || "").replace("Agrandir : ", "") : "");
    }
    if (e.target.closest("#lightboxClose") || e.target === lb) close();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function initModals() {
  // Boutons « Découvrir » / « Lire la suite » : affiche le détail dans la lightbox (texte)
  document.addEventListener("click", e => {
    const b = e.target.closest(".dest-btn, .actu-btn");
    if (!b) return;
    const lb = $("#lightbox"), img = $("#lightboxImg"), cap = $("#lightboxCaption");
    const texte = b.dataset.texte;
    if (b.classList.contains("actu-btn")) {
      // Pour une actualité : montre le résumé complet
      cap.innerHTML = `<strong style="display:block;font-size:1.1rem;margin-bottom:8px">${esc(b.dataset.titre)}</strong>` +
                      `<span style="opacity:.8">${esc(b.dataset.date)}</span><br><br>${esc(texte)}<br><br>` +
                      `<em>Contenu complet de l'article à venir.</em>`;
      img.removeAttribute("src"); img.style.display = "none";
    } else {
      img.style.display = "block";
      img.src = b.closest(".dest-card").querySelector("img").src;
      cap.innerHTML = `<strong style="display:block;font-size:1.2rem;margin-bottom:8px">${esc(b.dataset.titre)}</strong>${esc(texte)}`;
    }
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
}

function initForm() {
  const form = $("#contactForm");
  const note = $("#formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const required = ["nom", "prenom", "email", "sujet", "message"];
    let ok = true;
    required.forEach(n => {
      const field = form.elements[n];
      const valid = field.value.trim() !== "" && (n !== "email" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value));
      field.style.borderColor = valid ? "" : "#c0392b";
      if (!valid) ok = false;
    });
    if (!ok) {
      note.textContent = "Merci de compléter correctement les champs obligatoires.";
      note.className = "form-note err";
      return;
    }
    // Envoi : ouvre le logiciel de messagerie avec le message pré-rempli
    const c = DATA.contact;
    const sujet = encodeURIComponent("Site ARTDD — " + form.elements.sujet.value);
    const corps = encodeURIComponent(
      `Nom : ${form.elements.nom.value}\nPrénom : ${form.elements.prenom.value}\n` +
      `Email : ${form.elements.email.value}\nTéléphone : ${form.elements.tel.value || "—"}\n\n` +
      form.elements.message.value
    );
    window.location.href = `mailto:${c.email}?subject=${sujet}&body=${corps}`;
    note.textContent = "Votre logiciel de messagerie va s'ouvrir pour envoyer votre message. Merci !";
    note.className = "form-note ok";
    form.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderPiliers();
  renderQui();
  renderMissions();
  renderDestinations();
  renderPatrimoine();
  renderProjets();
  renderActualites();
  renderGalerie();
  renderVideos();
  renderPartenaires();
  renderContact();
  initNav();
  initReveal();
  initFilters();
  initLightbox();
  initModals();
  initForm();
});
