/* =========================================================
   ARTD Djibouti — Tableau de bord administrateur
   Les modifications sont enregistrées dans localStorage
   (clé : artd_site_data_v1) et affichées en priorité sur le site.
   ========================================================= */

"use strict";

const STORE_KEY = "artd_site_data_v1";
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ---------- État ---------- */
// data : valeurs par défaut fusionnées avec les overrides
function deepClone(o){ return JSON.parse(JSON.stringify(o)); }
function getBase(){ return deepClone((typeof RTD_DEFAULT_DATA !== "undefined") ? RTD_DEFAULT_DATA : {}); }
function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
function lsSet(k,v){ try { localStorage.setItem(k,v); return true; } catch(e){ return false; } }
function lsRemove(k){ try { localStorage.removeItem(k); } catch(e){} }
function getOverrides(){ try { return JSON.parse(lsGet(STORE_KEY) || "{}"); } catch(e){ return {}; } }

let data = getBase();
const ov = getOverrides();
Object.keys(ov).forEach(k => { data[k] = ov[k]; }); // sections déjà modifiées

/* ---------- Utilitaires ---------- */
function toast(msg, ok = true) {
  const t = $("#toast");
  t.textContent = msg;
  t.style.background = ok ? "#2e8b57" : "#c0392b";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
function saveAllSections() {
  const ok = lsSet(STORE_KEY, JSON.stringify(ov));
  $("#saveState").textContent = ok ? "Enregistré ✓" : "⚠️ Enregistrement impossible";
  if (!ok) toast("Enregistrement local impossible — utilisez l'onglet Sauvegarde (export JSON)", false);
  setTimeout(() => $("#saveState").textContent = "", 2500);
}
function markChanged(){ $("#saveState").textContent = "Modifications non enregistrées"; }

/* ---------- Onglets ---------- */
$$(".side-link").forEach(btn => btn.addEventListener("click", () => {
  $$(".side-link").forEach(b => b.classList.remove("active"));
  $$(".admin-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  $("#tab-" + btn.dataset.tab).classList.add("active");
}));

/* =============================================================
   1) TEXTES & CONTACT — champs liés par data-bind="section.cle"
   ============================================================= */
function bindFields() {
  $$("[data-bind]").forEach(el => {
    const path = el.dataset.bind.split(".");
    let val = data;
    path.forEach(p => { val = val ? val[p] : ""; });
    if (el.tagName === "TEXTAREA") el.value = val || ""; else el.value = val || "";
    el.addEventListener("input", () => {
      const last = path[path.length - 1];
      // met à jour data
      let dObj = data;
      path.slice(0, -1).forEach(p => { dObj = dObj[p]; });
      dObj[last] = el.value;
      // met à jour les overrides
      const ovObj = ensureOv(path.slice(0, -1));
      ovObj[last] = el.value;
      markChanged();
    });
  });
}
function ensureOv(pathArr) {
  if (!ov[pathArr[0]]) ov[pathArr[0]] = pathArr.length > 1 ? {} : undefined;
  let obj = ov;
  pathArr.forEach(p => {
    if (typeof obj[p] !== "object" || obj[p] === null) obj[p] = {};
    obj = obj[p];
  });
  return obj;
}

/* =============================================================
   2) LISTES MODIFIABLES (actualités, projets, galerie, vidéos, partenaires)
   ============================================================= */
const LISTES = {
  actualites: {
    mount: "#actualitesList", addBtn: "#btnAddActu", key: "actualites",
    blank: { img: "assets/img/actu-1.svg", alt: "", titre: "Nouvelle actualité", date: "", resume: "" },
    fields: [
      { k: "img", label: "Image (chemin)", wide: true },
      { k: "titre", label: "Titre", wide: true },
      { k: "date", label: "Date affichée" },
      { k: "alt", label: "Texte alternatif (accessibilité)" },
      { k: "resume", label: "Résumé", textarea: true, wide: true }
    ],
    headIcon: "📰", previewImg: true
  },
  projets: {
    mount: "#projetsList", addBtn: "#btnAddProjet", key: "projets",
    blank: { img: "assets/img/projet-1.svg", alt: "", titre: "Nouveau projet", description: "", date: "", lieu: "", partenaires: "", etat: "En cours" },
    fields: [
      { k: "img", label: "Photo (chemin)", wide: true },
      { k: "titre", label: "Titre du projet", wide: true },
      { k: "description", label: "Description", textarea: true, wide: true },
      { k: "date", label: "Date" },
      { k: "lieu", label: "Lieu" },
      { k: "partenaires", label: "Partenaires", wide: true },
      { k: "etat", label: "État", select: ["En cours", "Planifié", "Terminé", "Suspendu"] }
    ],
    headIcon: "📁", previewImg: true
  },
  galerie: {
    mount: "#galerieList", addBtn: "#btnAddPhoto", key: "galerie",
    blank: { img: "assets/img/lac-assal.svg", alt: "", label: "Nouvelle photo", cat: "paysages" },
    fields: [
      { k: "img", label: "Photo (chemin)", wide: true },
      { k: "label", label: "Légende", wide: true },
      { k: "alt", label: "Texte alternatif", wide: true },
      { k: "cat", label: "Catégorie", select: ["tourisme", "culture", "patrimoine", "evenements", "activites", "paysages"] }
    ],
    headIcon: "🖼️", previewImg: true
  },
  videos: {
    mount: "#videosList", addBtn: "#btnAddVideo", key: "videos",
    blank: { titre: "Nouvelle vidéo", texte: "", lien: "" },
    fields: [
      { k: "titre", label: "Titre", wide: true },
      { k: "lien", label: "Lien (YouTube…)", wide: true },
      { k: "texte", label: "Description", textarea: true, wide: true }
    ],
    headIcon: "🎬"
  },
  partenaires: {
    mount: "#partenairesList", addBtn: "#btnAddPartenaire", key: "partenaires",
    blank: { nom: "Nouveau partenaire", logo: "" },
    fields: [
      { k: "nom", label: "Nom du partenaire", wide: true },
      { k: "logo", label: "Logo (chemin, optionnel)", wide: true }
    ],
    headIcon: "🤝"
  }
};

function renderListe(cfg) {
  const mount = $(cfg.mount);
  mount.innerHTML = "";
  data[cfg.key].forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "item-card";
    const titre = item.titre || item.nom || item.label || (cfg.key === "videos" ? item.titre : "Élément");
    const imgHtml = cfg.previewImg
      ? (item.img ? `<img src="${item.img}" alt="" onerror="this.outerHTML='<span class=\\'ph\\'>${cfg.headIcon}</span>'">`
                  : `<span class="ph">${cfg.headIcon}</span>`)
      : `<span class="ph">${cfg.headIcon}</span>`;
    card.innerHTML = `
      <div class="item-head">
        ${imgHtml}
        <span class="head-txt">${(titre || "Élément").slice(0, 70)}</span>
        <button class="item-del" title="Supprimer" aria-label="Supprimer">×</button>
      </div>
      <div class="item-fields"></div>`;
    const fieldsDiv = card.querySelector(".item-fields");
    cfg.fields.forEach(f => {
      const wrap = document.createElement("div");
      if (f.wide) wrap.className = "wide";
      let input;
      if (f.select) {
        input = document.createElement("select");
        f.select.forEach(o => {
          const opt = document.createElement("option");
          opt.value = o; opt.textContent = o;
          input.appendChild(opt);
        });
        input.value = item[f.k] || "";
      } else if (f.textarea) {
        input = document.createElement("textarea");
        input.rows = 3;
        input.value = item[f.k] || "";
      } else {
        input = document.createElement("input");
        input.type = "text";
        input.value = item[f.k] || "";
      }
      const label = document.createElement("label");
      label.style.cssText = "display:block;font-size:.78rem;font-weight:600;color:#0b4f7a;margin-bottom:4px";
      label.textContent = f.label;
      wrap.appendChild(label);
      wrap.appendChild(input);
      fieldsDiv.appendChild(wrap);
      input.addEventListener("input", () => {
        item[f.k] = input.value;
        markChanged();
        if (["titre", "nom", "label"].includes(f.k)) {
          card.querySelector(".head-txt").textContent = input.value.slice(0, 70) || "Élément";
        }
      });
      if (f.select) input.addEventListener("change", () => { item[f.k] = input.value; markChanged(); });
    });
    card.querySelector(".item-del").addEventListener("click", () => {
      if (confirm("Supprimer définitivement cet élément ?")) {
        data[cfg.key].splice(i, 1);
        ov[cfg.key] = data[cfg.key];
        markChanged();
        renderListe(cfg);
      }
    });
    mount.appendChild(card);
  });
}

Object.values(LISTES).forEach(cfg => {
  $(cfg.addBtn).addEventListener("click", () => {
    data[cfg.key].push(deepClone(cfg.blank));
    ov[cfg.key] = data[cfg.key];
    markChanged();
    renderListe(cfg);
    $(cfg.mount).lastElementChild.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

/* ---------- Boutons d'enregistrement ---------- */
$$(".save-btn").forEach(btn => btn.addEventListener("click", () => {
  // Synchronise les listes dans les overrides
  Object.values(LISTES).forEach(cfg => { ov[cfg.key] = data[cfg.key]; });
  saveAllSections();
  toast("Modifications enregistrées avec succès ✓");
}));


/* ---------- Réinitialiser ---------- */
$("#btnReset").addEventListener("click", () => {
  if (confirm("Réinitialiser TOUTES les modifications et revenir aux contenus par défaut ?")) {
    lsRemove(STORE_KEY);
    location.reload();
  }
});

/* ---------- Export / Import ---------- */
$("#btnExport").addEventListener("click", () => {
  Object.values(LISTES).forEach(cfg => { ov[cfg.key] = data[cfg.key]; });
  const full = deepClone(getBase());
  Object.keys(ov).forEach(k => { full[k] = ov[k]; });
  const blob = new Blob([JSON.stringify(full, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "artd-djibouti-contenus.json";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("Fichier de contenus exporté ✓");
});

$("#fileImport").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!imported || typeof imported !== "object") throw new Error("format");
      data = Object.assign(getBase(), imported);
      Object.keys(imported).forEach(k => { ov[k] = imported[k]; });
      lsSet(STORE_KEY, JSON.stringify(ov));
      toast("Contenus importés ✓ — rechargement…");
      setTimeout(() => location.reload(), 1200);
    } catch (err) {
      toast("Fichier JSON invalide ✗", false);
    }
  };
  reader.readAsText(file);
});

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  bindFields();
  Object.values(LISTES).forEach(renderListe);
  if (Object.keys(ov).length) $("#saveState").textContent = "Contenus personnalisés actifs";
});
