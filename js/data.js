/* =========================================================
   Association Rayonnement Touristique et Développement de Djibouti
   Contenus par défaut du site — modifiables via le tableau de bord
   administrateur (admin.html). Les modifications sont enregistrées
   dans le navigateur (localStorage) et prioritaires sur ce fichier.
   ========================================================= */

const RTD_DEFAULT_DATA = {

  contact: {
    nom: "Association Rayonnement Touristique et Développement de Djibouti",
    email: "moussa1621@yahoo.fr",
    tel1: "77 15 71 86",
    tel2: "77 82 11 21",
    adresse: "Djibouti-ville, République de Djibouti",
    horaires: "Lundi – Vendredi : 8h00 – 16h00",
    facebook: "",
    youtube: "",
    instagram: "",
    tiktok: "",
    x: ""
  },

  hero: {
    titre: "Association Rayonnement Touristique et Développement de Djibouti",
    slogan: "« Promouvoir Djibouti, valoriser son patrimoine et contribuer à son développement »",
    btn1: "Découvrir l'association",
    btn2: "Nous contacter"
  },

  quiSommesNous: {
    titre: "Qui sommes-nous ?",
    texte1: "L'Association Rayonnement Touristique et Développement de Djibouti (ARTDD) est une organisation engagée dans la promotion touristique, culturelle, environnementale et socio-économique de la République de Djibouti. Elle œuvre pour faire rayonner les richesses naturelles et culturelles du pays, au service des communautés locales et du développement national.",
    texte2: "Fondée par des citoyens passionnés par leur pays, l'association fédère autour d'elle les acteurs du tourisme, de la culture et du développement : guides, artisans, jeunes entrepreneurs, collectivités et partenaires institutionnels. Ensemble, nous travaillons à faire de Djibouti une destination touristique de référence dans la Corne de l'Afrique et un modèle de développement durable.",
    stat1: { valeur: "20+", libelle: "Membres actifs" },
    stat2: { valeur: "10", libelle: "Destinations valorisées" },
    stat3: { valeur: "100%", libelle: "Engagement pour Djibouti" }
  },

  piliers: [
    { icone: "🧭", titre: "Promotion du tourisme", texte: "Faire connaître les merveilles de Djibouti aux visiteurs nationaux et internationaux." },
    { icone: "🏛️", titre: "Valorisation du patrimoine", texte: "Mettre en valeur le patrimoine culturel et naturel du pays, de génération en génération." },
    { icone: "🌱", titre: "Développement local", texte: "Accompagner les communautés et créer des opportunités économiques durables." },
    { icone: "📣", titre: "Sensibilisation citoyenne", texte: "Encourager la participation des citoyens à la protection et à la promotion de leur pays." },
    { icone: "💡", titre: "Initiatives locales", texte: "Soutenir les entrepreneurs, coopératives et initiatives touristiques et culturelles locales." },
    { icone: "🤝", titre: "Coopération et partenariats", texte: "Construire des alliances avec les institutions, entreprises et organisations partenaires." }
  ],

  missions: [
    { icone: "🌍", titre: "Promotion touristique", texte: "Promouvoir Djibouti comme destination de premier plan aux niveaux régional et international." },
    { icone: "🏛️", titre: "Valorisation du patrimoine", texte: "Inventorier, protéger et valoriser les sites culturels et naturels remarquables du pays." },
    { icone: "🌱", titre: "Protection de l'environnement", texte: "Défendre les écosystèmes fragiles : littoral, déserts, forêts et zones lacustres." },
    { icone: "🤝", titre: "Développement local", texte: "Contribuer au développement socio-économique des régions et des communautés hôtes." },
    { icone: "🎭", titre: "Culture et traditions", texte: "Vivre et transmettre les traditions, les langues et les arts djiboutiens." },
    { icone: "💼", titre: "Soutien aux initiatives économiques", texte: "Accompagner les jeunes et les femmes entrepreneurs du secteur du tourisme et de la culture." },
    { icone: "📢", titre: "Promotion de l'image de Djibouti", texte: "Rayonner positivement, en Djibouti et à l'étranger, à travers des actions de communication." },
    { icone: "🌐", titre: "Coopération et partenariats", texte: "Développer des coopérations avec les institutions, ONG et acteurs du tourisme." }
  ],

  destinations: [
    { img: "assets/img/photos/lac-assal.jpg", titre: "Lac Assal", texte: "Le point le plus bas d'Afrique (−155 m) : une merveille salée au cœur d'un décor volcanique spectaculaire.", alt: "Le Lac Assal et ses rivages de sel" },
    { img: "assets/img/photos/lac-abbe.jpg", titre: "Lac Abbé", texte: "Cheminées de calcaire, sources chaudes et paysages lunaires classés au patrimoine mondial de l'UNESCO.", alt: "Cheminées de calcaire du Lac Abbé" },
    { img: "assets/img/photos/golfe-tadjourah.jpg", titre: "Golfe de Tadjourah", texte: "Un golfe d'une beauté saisissante, paradis de la plongée et de l'observation des requins-baleines.", alt: "Plage de Khor Ambado, Golfe de Tadjourah" },
    { img: "assets/img/photos/sept-freres.jpg", titre: "Îles des Sept Frères", texte: "Un archipel volcanique préservé, refuge d'oiseaux et site de plongée exceptionnel en mer Rouge.", alt: "Île volcanique de Guinni Kôma, îles des Sept Frères" },
    { img: "assets/img/photos/foret-du-day.jpg", titre: "Forêt du Day", texte: "Une forêt de montagne unique, « poumon vert » de Djibouti, au climat frais et à la biodiversité rare.", alt: "Arbre dragon de la forêt du Day" },
    { img: "assets/img/photos/goubet.jpg", titre: "Goubet", texte: "Le « gouffre du Diable » : baie mystérieuse entre falaises basaltiques, requins-baleines et dauphins.", alt: "La baie du Goubet" },
    { img: "assets/img/photos/obock.jpg", titre: "Obock", texte: "Berceau historique du Nord et porte d'entrée des plages sauvages de la région.", alt: "Paysage volcanique de la région d'Obock" },
    { img: "assets/img/photos/tadjourah.jpg", titre: "Tadjourah", texte: "La « ville blanche », joyau d'architecture et capitale historique du golfe : terre de villages authentiques.", alt: "Village d'Oue'a, région de Tadjourah" },
    { img: "assets/img/photos/djibouti-ville.jpg", titre: "Djibouti-Ville", texte: "Capitale animée aux influences arabes, africaines et européennes : marchés, mosquée Hamoudi et vie trépidante.", alt: "Mosquée Hamoudi au cœur de Djibouti-ville" },
    { img: "assets/img/photos/sites-historiques.jpg", titre: "Sites historiques et culturels", texte: "De l'art rupestre de Balho aux vestiges anciens, un patrimoine riche à explorer et protéger.", alt: "Art rupestre de Balho" }
  ],

  patrimoine: [
    { icone: "🎭", titre: "Traditions djiboutiennes", texte: "Coutumes, hospitality et art de vivre djiboutien, héritage des cultures afar et somalie." },
    { icone: "🗣️", titre: "Langues et cultures locales", texte: "L'afar, le somali, l'arabe et le français : une mosaïque linguistique unique en Afrique de l'Est." },
    { icone: "🧶", titre: "Artisanat", texte: "Tressage, poterie, broderie et parfums traditionnels : un savoir-faire à préserver et valoriser." },
    { icone: "💃", titre: "Danses et musiques traditionnelles", texte: "Danses afar et somali, chants et percussions qui rythment les fêtes et cérémonies." },
    { icone: "🏰", titre: "Sites historiques", texte: "Vestiges, anciens sultanats, cimetières de pierres et lieux de mémoire du pays." },
    { icone: "🌿", titre: "Patrimoine naturel", texte: "Mangroves, récifs coralliens, déserts et montagnes : une nature exceptionnelle à protéger." }
  ],

  projets: [
    { img: "assets/img/photos/golfe-tadjourah.jpg", alt: "Projet de circuit écotouristique",
      titre: "Circuit écotouristique « Route du Golfe »",
      description: "Aménagement d'un circuit découverte reliant Tadjourah, Obock et le Lac Assal, avec l'implication des guides et coopératives locaux.",
      date: "2026", lieu: "Région de Tadjourah & Obock",
      partenaires: "Ministère du Tourisme, collectivités locales",
      etat: "En cours" },
    { img: "assets/img/photos/moucha.jpg", alt: "Projet de nettoyage du littoral",
      titre: "Opération « Littoral Propre »",
      description: "Campagnes de sensibilisation et de nettoyage des plages de Djibouti-ville avec les écoles, les jeunes volontaires et les pêcheurs.",
      date: "2026", lieu: "Djibouti-ville",
      partenaires: "Mairie de Djibouti, associations de jeunesse",
      etat: "Planifié" },
    { img: "assets/img/photos/culture.jpg", alt: "Festival de l'artisanat et des cultures",
      titre: "Festival de l'artisanat et des cultures",
      description: "Exposition-vente et animations autour de l'artisanat, des danses et des musiques traditionnelles djiboutiennes.",
      date: "2026", lieu: "Djibouti-ville",
      partenaires: "Chambre de commerce, artisans de Djibouti",
      etat: "En cours" }
  ],

  actualites: [
    { img: "assets/img/photos/djibouti-ville.jpg", alt: "Campagne de promotion touristique à Djibouti-ville",
      titre: "L'association lance sa campagne de promotion touristique",
      date: "12 septembre 2026",
      resume: "Une nouvelle campagne destinée à faire découvrir les trésors touristiques de Djibouti auprès des voyageurs et des partenaires régionaux." },
    { img: "assets/img/photos/foret-du-day.jpg", alt: "Journée de sensibilisation à la forêt du Day",
      titre: "Journée de sensibilisation à la forêt du Day",
      date: "28 août 2026",
      resume: "Avec les écoles de la région, l'association a organisé une journée de découverte et de protection de ce poumon vert du pays." },
    { img: "assets/img/photos/lac-abbe.jpg", alt: "Valorisation du site du Lac Abbé",
      titre: "Vers la valorisation du site du Lac Abbé",
      date: "5 août 2026",
      resume: "L'association accompagne les autorités locales dans la mise en valeur du Lac Abbé et de ses communautés." }
  ],

  galerie: [
    { img: "assets/img/photos/lac-assal.jpg", alt: "Le Lac Assal", cat: "paysages", label: "Lac Assal" },
    { img: "assets/img/photos/lac-abbe.jpg", alt: "Cheminées du Lac Abbé", cat: "paysages", label: "Lac Abbé" },
    { img: "assets/img/photos/golfe-tadjourah.jpg", alt: "Plage de Khor Ambado", cat: "tourisme", label: "Golfe de Tadjourah" },
    { img: "assets/img/photos/sept-freres.jpg", alt: "Île volcanique des Sept Frères", cat: "tourisme", label: "Îles des Sept Frères" },
    { img: "assets/img/photos/moucha.jpg", alt: "Plage de l'île Moucha", cat: "tourisme", label: "Île de Moucha" },
    { img: "assets/img/photos/desert.jpg", alt: "Désert du Grand Bara", cat: "paysages", label: "Désert du Grand Bara" },
    { img: "assets/img/photos/foret-du-day.jpg", alt: "Arbre de la forêt du Day", cat: "paysages", label: "Forêt du Day" },
    { img: "assets/img/photos/culture.jpg", alt: "Tenues traditionnelles djiboutiennes", cat: "culture", label: "Culture & traditions" },
    { img: "assets/img/photos/artisanat.jpg", alt: "Marché de rue à Djibouti", cat: "culture", label: "Marchés & artisanat" },
    { img: "assets/img/photos/sites-historiques.jpg", alt: "Art rupestre de Balho", cat: "patrimoine", label: "Art rupestre de Balho" },
    { img: "assets/img/photos/djibouti-ville.jpg", alt: "Mosquée Hamoudi, Djibouti-ville", cat: "patrimoine", label: "Djibouti-Ville" },
    { img: "assets/img/photos/baleines.jpg", alt: "Requin-baleine du Golfe de Tadjourah", cat: "tourisme", label: "Requin-baleine du Golfe" },
    { img: "assets/img/photos/arta.jpg", alt: "Côte des Sables Blancs, Arta", cat: "paysages", label: "Sables Blancs (Arta)" },
    { img: "assets/img/photos/ali-sabieh.jpg", alt: "Ville d'Ali Sabieh", cat: "patrimoine", label: "Ali Sabieh" },
    { img: "assets/img/photos/dikhil.jpg", alt: "Ville de Dikhil", cat: "activites", label: "Dikhil — vie locale" },
    { img: "assets/img/photos/obock.jpg", alt: "Paysage de la région d'Obock", cat: "evenements", label: "Région d'Obock" }
  ],

  videos: [
    { titre: "Djibouti, destination nature", texte: "Présentation des paysages et destinations touristiques (vidéo à venir).", lien: "" },
    { titre: "Notre association en action", texte: "Reportage sur les activités de l'association (vidéo à venir).", lien: "" },
    { titre: "Patrimoine et traditions", texte: "Documentaire sur la culture djiboutienne (vidéo à venir).", lien: "" }
  ],

  partenaires: [
    { nom: "Ministère du Tourisme", logo: "" },
    { nom: "Ministère de la Culture", logo: "" },
    { nom: "Office National du Tourisme", logo: "" },
    { nom: "Mairie de Djibouti", logo: "" },
    { nom: "Chambre de Commerce", logo: "" },
    { nom: "Agence de l'Environnement", logo: "" },
    { nom: "Opérateurs touristiques", logo: "" },
    { nom: "Associations partenaires", logo: "" }
  ]
};
