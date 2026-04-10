// ─────────────────────────────────────────────
//  Sélection des éléments du DOM
// ─────────────────────────────────────────────

// Toutes les cellules de la grille (9 éléments)
const cells = document.querySelectorAll(".cell");

// Bandeau affichant le tour en cours ou le résultat final
const statusText = document.getElementById("status");

// Bouton pour relancer une nouvelle partie
const resetBtn = document.getElementById("reset-btn");

// Boutons de sélection du mode : Joueur vs Joueur / Joueur vs Ordinateur
const pvpBtn = document.getElementById("pvp-btn");
const pvcBtn = document.getElementById("pvc-btn");

// ─────────────────────────────────────────────
//  État de la partie
// ─────────────────────────────────────────────

// Joueur dont c'est le tour : "X" (toujours en premier) ou "O"
let currentPlayer = "X";

// Les 9 cases de la grille : "" = vide, "X" ou "O" = occupée
let gameState = Array(9).fill("");

// true tant que la partie est en cours, false après victoire ou match nul
let gameActive = true;

// true si le mode Joueur vs Ordinateur est activé
let isVsAi = false;

// ─────────────────────────────────────────────
//  Combinaisons gagnantes
// ─────────────────────────────────────────────

// Chaque tableau contient les 3 indices de cases qui forment un alignement
// (3 lignes horizontales, 3 colonnes, 2 diagonales)
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // lignes
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // colonnes
  [0, 4, 8],
  [2, 4, 6], // diagonales
];

// ─────────────────────────────────────────────
//  Gestion du clic sur une cellule
// ─────────────────────────────────────────────

// Appelée à chaque clic sur la grille
// Bloque le coup si : tour de l'IA, case déjà prise, ou partie terminée
function handleCellClick(e) {
  if (isVsAi && currentPlayer === "O") return; // tour de l'IA
  const index = parseInt(e.target.getAttribute("data-index"));
  if (gameState[index] !== "" || !gameActive) return;
  playMove(e.target, index);
}

// ─────────────────────────────────────────────
//  Jouer un coup (humain ou IA)
// ─────────────────────────────────────────────

// Enregistre le coup dans gameState, met à jour l'affichage,
// vérifie le résultat, puis passe au joueur suivant
function playMove(cell, index) {
  gameState[index] = currentPlayer;

  // Affiche le symbole dans la cellule avec la couleur du joueur
  cell.textContent = currentPlayer;
  cell.style.color =
    currentPlayer === "X" ? "var(--x-color)" : "var(--o-color)";

  // Marque la cellule comme occupée + lance l'animation d'apparition
  cell.classList.add("taken", "pop");
  cell.addEventListener("animationend", () => cell.classList.remove("pop"), {
    once: true,
  });

  // Si la partie est terminée (victoire ou nul), on s'arrête ici
  if (checkResult()) return;

  // Alterne le joueur courant
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(
    `Tour du Joueur ${currentPlayer}`,
    currentPlayer === "X" ? "turn-x" : "turn-o",
  );

  // En mode IA, déclenche le coup de l'ordinateur avec un léger délai
  if (isVsAi && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

// ─────────────────────────────────────────────
//  Vérification du résultat
// ─────────────────────────────────────────────

// Parcourt toutes les combinaisons gagnantes
// Retourne true si la partie est terminée (victoire ou match nul)
function checkResult() {
  for (const [a, b, c] of winningConditions) {
    // Vérifie que les 3 cases sont identiques et non vides
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      const winner = gameState[a];

      // Met en surbrillance les 3 cellules gagnantes
      [a, b, c].forEach((i) =>
        document.querySelector(`[data-index="${i}"]`).classList.add("win"),
      );

      setStatus(`Le Joueur ${winner} a gagné !`, "win");
      updateScore(winner);
      gameActive = false;
      return true;
    }
  }

  // Match nul : toutes les cases sont remplies sans alignement
  if (!gameState.includes("")) {
    setStatus("Match nul !", "draw");
    gameActive = false;
    return true;
  }

  return false;
}

// ─────────────────────────────────────────────
//  Mise à jour du bandeau de statut
// ─────────────────────────────────────────────

// Modifie le texte et la classe CSS du bandeau
// La classe CSS (turn-x, turn-o, win, draw) change la couleur du texte
function setStatus(text, modifier) {
  statusText.textContent = text;
  statusText.className = modifier;
}

// ─────────────────────────────────────────────
//  Coup de l'ordinateur (IA aléatoire)
// ─────────────────────────────────────────────

// Récupère toutes les cases vides et en choisit une au hasard
function aiMove() {
  const empty = gameState
    .map((v, i) => (v === "" ? i : null))
    .filter((v) => v !== null);
  if (empty.length === 0) return;
  const idx = empty[Math.floor(Math.random() * empty.length)];
  playMove(document.querySelector(`[data-index="${idx}"]`), idx);
}

// ─────────────────────────────────────────────
//  Mise à jour du score
// ─────────────────────────────────────────────

// Incrémente le compteur de la carte score du gagnant ("X" ou "O")
function updateScore(winner) {
  const el = document.getElementById(winner === "X" ? "score-x" : "score-o");
  el.textContent = parseInt(el.textContent) + 1;
}

// ─────────────────────────────────────────────
//  Bouton "Nouvelle partie"
// ─────────────────────────────────────────────

resetBtn.addEventListener("click", () => {
  // Réinitialise l'état interne
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  setStatus("Tour du Joueur X", "turn-x");

  // Vide visuellement chaque cellule et retire toutes ses classes dynamiques
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.color = "";
    cell.className = "cell"; // supprime : taken, win, pop
  });
});

// ─────────────────────────────────────────────
//  Boutons de sélection du mode de jeu
// ─────────────────────────────────────────────

pvpBtn.addEventListener("click", () => {
  isVsAi = false;
  pvpBtn.classList.add("active");
  pvcBtn.classList.remove("active");
  document.getElementById("label-o").textContent = "Joueur 2";
});

pvcBtn.addEventListener("click", () => {
  isVsAi = true;
  pvcBtn.classList.add("active");
  pvpBtn.classList.remove("active");
  document.getElementById("label-o").textContent = "Ordinateur";
});

// ─────────────────────────────────────────────
//  Initialisation : écoute les clics sur les cellules
// ─────────────────────────────────────────────
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
