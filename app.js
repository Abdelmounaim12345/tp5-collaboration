// Données de démonstration (aucun backend pour ce TP)
const taches = [
  { id: 1, titre: "Créer le dépôt GitHub", statut: "terminee" },
  { id: 2, titre: "Ajouter les collaborateurs", statut: "terminee" },
  { id: 3, titre: "Développer la recherche", statut: "a-faire" },
  { id: 4, titre: "Développer le filtre par statut", statut: "a-faire" },
  { id: 5, titre: "Résoudre le conflit Git", statut: "a-faire" }
];

// Filtres : chaque fonctionnalité remplace le corps de sa fonction
function filtreRecherche(tache) {
  const champ = document.getElementById("recherche");
  const texte = champ ? champ.value.trim().toLowerCase() : "";
  return tache.titre.toLowerCase().includes(texte);
}

// (espace réservé pour la fonctionnalité de filtre)

function filtreStatut(tache) {
  const select = document.getElementById("filtre-statut");
  const valeur = select ? select.value : "toutes";

  if (valeur === "a-faire") return tache.statut === "a-faire";
  if (valeur === "terminees") return tache.statut === "terminee";
  return true;
}

function appliquerFiltres() {
  const liste = taches.filter(filtreRecherche).filter(filtreStatut);
  afficherTaches(liste);
}

function creerElementTache(tache) {
  const li = document.createElement("li");
  li.className = "tache" + (tache.statut === "terminee" ? " terminee" : "");

  const titre = document.createElement("span");
  titre.className = "tache-titre";
  titre.textContent = tache.titre;

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "bouton-statut";
  bouton.dataset.id = tache.id;
  bouton.textContent = tache.statut === "terminee" ? "Terminée" : "À faire";

  li.append(titre, bouton);
  return li;
}

function afficherTaches(liste) {
  const ul = document.getElementById("liste-taches");
  ul.innerHTML = "";
  liste.forEach((tache) => ul.appendChild(creerElementTache(tache)));
  majCompteur(liste);
}

function majCompteur(liste) {
  const compteur = document.getElementById("compteur");
  compteur.textContent = liste.length + (liste.length > 1 ? " tâches" : " tâche");
}

function basculerStatut(id) {
  const tache = taches.find((t) => t.id === id);
  if (!tache) return;
  tache.statut = tache.statut === "terminee" ? "a-faire" : "terminee";
  appliquerFiltres();
}

document.addEventListener("input", appliquerFiltres);
document.addEventListener("change", appliquerFiltres);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("liste-taches").addEventListener("click", (evenement) => {
    const bouton = evenement.target.closest("button[data-id]");
    if (bouton) basculerStatut(Number(bouton.dataset.id));
  });
  appliquerFiltres();
});
