# Site web — Association Rayonnement Touristique et Développement de Djibouti (ARTDD)

Site institutionnel moderne, responsive et entièrement en français.

## Structure

```
site/
├── index.html              → Page d'accueil (toutes les sections)
├── admin.html              → Tableau de bord administrateur
├── mentions-legales.html   → Mentions légales
├── confidentialite.html    → Politique de confidentialité
├── css/
│   ├── style.css           → Styles du site public
│   └── admin.css           → Styles du tableau de bord
├── js/
│   ├── data.js             → CONTENUS DU SITE (modifiables)
│   ├── main.js             → Rendu du site public
│   └── admin.js             → Logique du tableau de bord
└── assets/
    ├── logo.png            → Logo officiel de l'association
    └── img/
        ├── photos/          → Photographies réelles de Djibouti (crédits : photos/CREDITS.md)
        └── *.svg            → Illustrations de secours (remploçables)
```

## Mise en ligne

Le site est **100 % statique** : aucun serveur spécial n'est requis.
Déposez simplement le dossier `site/` chez un hébergeur (ou Netlify, GitHub Pages…).

## Administration des contenus

1. Ouvrez `admin.html` dans un navigateur.
2. Modifiez les **textes**, **actualités**, **projets**, **photos**, **vidéos**,
   **partenaires** et **informations de contact**, puis cliquez sur **Enregistrer**.
3. Les modifications sont enregistrées dans le navigateur et visibles immédiatement sur `index.html`.

> ⚠️ Les modifications du tableau de bord sont stockées **dans le navigateur**
> (localStorage). Pour les publier définitivement :
> - Onglet **Sauvegarde** → **Exporter les contenus (JSON)**
> - Remplacez le contenu de `js/data.js` par : `const RTD_DEFAULT_DATA = <contenu du fichier exporté>;`

## Remplacer les photos actuelles par vos propres photos

1. Placez vos photos dans `assets/img/photos/`.
2. Dans le tableau de bord (ou dans `js/data.js`), indiquez le chemin,
   par ex. `assets/img/photos/lac-assal-officiel.jpg`.

Les photos actuelles proviennent de Wikimedia Commons (libres de diffusion) —
leurs sources sont listées dans `assets/img/photos/CREDITS.md`.

## Ajouter les réseaux sociaux

Tableau de bord → **Contact** → champs Facebook, YouTube, Instagram, TikTok, X.

## Adresse du siège & carte

Renseignez l'adresse exacte dans le tableau de bord (onglet **Contact**), puis
modifiez dans `index.html` l'URL de la carte Google Maps :
`https://www.google.com/maps?q=VOTRE+ADRESSE&output=embed`

## Multilingue (à venir)

Le site est prêt pour l'ajout ultérieur de l'arabe, du somali et de l'anglais :
tous les textes visibles sont centralisés dans `js/data.js` (et dans le
tableau de bord), ce qui facilitera la création de versions traduites
(`data-ar.js`, `data-so.js`, `data-en.js`) avec le même design.

## Recommandations SEO

- `index.html` contient déjà : balises meta description/keywords,
  Open Graph (partage Facebook/WhatsApp), Twitter Card et données
  structurées JSON-LD (Google).
- Après mise en ligne, déclarez le site sur
  [Google Search Console](https://search.google.com/search-console)
  et mettez à jour l'URL canonique dans `index.html`.

## Contact de l'association

- 📧 moussa1621@yahoo.fr
- 📞 77 15 71 86 / 77 82 11 21

© 2026 Association Rayonnement Touristique et Développement de Djibouti. Tous droits réservés.
