export const modules = [
  {
    id: "m1",
    title: "Introduction à l’IA",
    goal: "Définir IA, ML, DL et illustrer par des exemples.",
    systemInstruction: "Tu es un pédagogue en IA. Explique clairement les notions d’IA, ML et DL avec exemples concrets et analogies simples."
  },
  {
    id: "m2",
    title: "Comprendre le projet",
    goal: "Clarifier l’objectif et l’architecture globale de l’app.",
    systemInstruction: "Tu aides à cadrer le projet: objectifs, acteurs, flux front-only, API Gemini, stockage local, limites et risques."
  },
  {
    id: "m3",
    title: "Préparation de l’environnement",
    goal: "Installer Node.js, configurer Git et le dossier projet.",
    systemInstruction: "Tu guides l’installation Node.js, vérifications de version, config Git, et l’organisation du répertoire."
  },
  {
    id: "m4",
    title: "Créer le projet React",
    goal: "Initialiser Vite/CRA, intégrer Tailwind et Router.",
    systemInstruction: "Tu fournis les commandes et fichiers clés pour créer une app React avec Vite, Tailwind CSS et React Router."
  },
  {
    id: "m5",
    title: "Inscription et stockage local",
    goal: "Formulaire d’inscription et persistance localStorage.",
    systemInstruction: "Tu donnes les étapes pour un faux signup, schéma de données utilisateur et sauvegarde sécurisée basique en localStorage."
  },
  {
    id: "m6",
    title: "Liste des modules et progression",
    goal: "Afficher les modules et persister la progression.",
    systemInstruction: "Tu expliques la structure des modules, calcul du pourcentage et la mise à jour de la progression dans localStorage."
  },
  {
    id: "m7",
    title: "Interface de chat",
    goal: "UI du chat avec historique minimal et envoi.",
    systemInstruction: "Tu fournis une approche pour l’affichage des messages, la saisie et la gestion d’un historique côté front."
  },
  {
    id: "m8",
    title: "Intégration de l’API Gemini",
    goal: "Envoyer des requêtes simples et afficher la réponse.",
    systemInstruction: "Tu indiques comment appeler Gemini depuis le front, gérer la clé côté dev et afficher proprement la réponse."
  },
  {
    id: "m9",
    title: "Conversations multi-tours",
    goal: "Transmettre l’historique à Gemini pour un dialogue suivi.",
    systemInstruction: "Tu précises comment re-construire l’historique messages (user/model) et l’inclure à chaque appel."
  },
  {
    id: "m10",
    title: "Personnalisation par instructions système",
    goal: "Adapter ton rôle/personnalité selon le module.",
    systemInstruction: "Tu définis des systemInstruction contextuelles (mentor React, architecte front, etc.) et leurs impacts."
  },
  {
    id: "m11",
    title: "Sortie structurée",
    goal: "Configurer responseSchema et enums pour JSON fiable.",
    systemInstruction: "Tu proposes des schémas JSON pour checklists, plans de leçon et extraits de code, avec contraintes de types."
  },
  {
    id: "m12",
    title: "Gestion de l’état global",
    goal: "Centraliser user/modules/chat avec Redux/Zustand/Context.",
    systemInstruction: "Tu recommandes un store léger, slices ou context, et la synchro sélective avec localStorage."
  },
  {
    id: "m13",
    title: "Tests et déploiement",
    goal: "Tester les flux et préparer le déploiement.",
    systemInstruction: "Tu expliques des tests UI basiques, scénarios d’erreurs API, et un déploiement Vercel/GitHub Pages."
  },
  {
    id: "m14",
    title: "Améliorations et fonctionnalités avancées",
    goal: "Polir l’UI et optimiser les appels Gemini.",
    systemInstruction: "Tu proposes des améliorations: relance, thèmes, export, proxy clé API, et réduction de coûts/latence."
  }
];
