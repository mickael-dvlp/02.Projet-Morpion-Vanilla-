# Morpion

Jeu de morpion (Tic-Tac-Toe) jouable dans le navigateur, développé en HTML, CSS et JavaScript vanilla.

---

## Aperçu

Deux modes de jeu disponibles :

- **Joueur vs Joueur** — deux joueurs s'affrontent sur le même écran
- **Joueur vs Ordinateur** — l'IA choisit ses cases aléatoirement

---

## Fonctionnalités

- Grille 3×3 interactive avec animations au clic
- Détection automatique de la victoire (lignes, colonnes, diagonales)
- Détection du match nul
- Mise en surbrillance des 3 cases gagnantes
- Scores persistants entre les parties (remis à zéro uniquement au rechargement)
- Indicateur de tour coloré (bleu = X, rouge = O, doré = victoire)
- Coup de l'IA déclenché avec un délai de 500 ms pour simuler une réflexion

---

## Structure des fichiers

```
02.Morpion/
├── index.html   # Structure de la page (grille, cartes de score, boutons)
├── style.css    # Mise en page et design (thème clair, animations, responsive)
├── script.js    # Logique du jeu (état, tours, détection victoire, IA)
└── README.md    # Ce fichier
```

---

## Logique du jeu (`script.js`)

| Élément | Rôle

| `gameState` | Tableau de 9 cases représentant la grille (`""`, `"X"` ou `"O"`) |
| `currentPlayer` | Joueur actif (`"X"` ou `"O"`) |
| `gameActive` | Booléen bloquant les interactions après une fin de partie |
| `winningConditions` | 8 combinaisons gagnantes (3 lignes, 3 colonnes, 2 diagonales) |
| `playMove()` | Enregistre un coup, met à jour l'affichage, vérifie le résultat |
| `checkResult()` | Parcourt les combinaisons gagnantes et détecte victoire ou nul |
| `aiMove()` | Choisit une case vide au hasard pour l'ordinateur |
| `setStatus()` | Met à jour le bandeau de statut (texte + classe CSS) |
| `updateScore()` | Incrémente le compteur de la carte score du gagnant |

---

## Design (`style.css`)

- Fond dégradé clair
- Disposition en 3 colonnes : carte score X — grille — carte score O
- Cartes blanches avec ombre douce et bordure colorée selon le joueur
- Animations CSS : apparition des symboles (`pop`), pulsation des cases gagnantes (`pulse-win`), entrée de page (`fade-up/down`)
- Responsive : passage en colonne unique sous 620 px

---

## Technologies

- **HTML5**
- **CSS3**
- **JavaScript ES6+**

---

## Amélioration prévu

- Amélioration de l'IA, beaucoup trop simple pour le moment
- Ajout d'un mode Dark (uniquement en JS)
- Possibilité de mettre un nom de joueur au lieu d'être appelé joueur
- Mettre un bouron refresh pour relancer les score à 0
- Remettre à 0 lorsque l'on passe de joueur à ordinateur et vice-versa
