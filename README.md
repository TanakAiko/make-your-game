# Todo List pour le Développement de Tetris en JavaScript

## Classe Game

- [ ] **Attributs** :
  - `grid`: représente la grille de jeu (matrice).
  - `currentPiece`: la pièce en cours de jeu.
  - `score`: score actuel du joueur.
  - `timer`: gestionnaire pour le temps de chute des pièces.
  - `isPaused`: état du jeu (pausé ou non).
- [ ] **Méthodes** :
  - `start()`: initialise et démarre le jeu.
  - `pause()`: met le jeu en pause.
  - `resume()`: reprend le jeu après une pause.
  - `reset()`: réinitialise le jeu.
  - `update()`: mise à jour de l'état du jeu à chaque tick.
  - `render()`: affiche l'état actuel du jeu sur l'écran.

## Classe Piece (Tetriminos)

- [ ] **Attributs** :
  - `shape`: matrice définissant la forme de la pièce.
  - `position`: position actuelle de la pièce dans la grille.
  - `color`: couleur de la pièce.
- [ ] **Méthodes** :
  - `rotate()`: effectue une rotation de la pièce.
  - `drop()`: fait descendre la pièce d'une ligne.
  - `moveLeft()`: déplace la pièce d'une colonne vers la gauche.
  - `moveRight()`: déplace la pièce d'une colonne vers la droite.
  - `isColliding()`: vérifie si la pièce entre en collision avec les limites de la grille ou d'autres pièces.

## Classe Board

- [ ] **Attributs** :
  - `grid`: matrice représentant la grille de jeu.
- [ ] **Méthodes** :
  - `clearLines()`: vérifie et efface les lignes complètes.
  - `isValidMove()`: détermine si un mouvement de pièce est valide.
  - `freezePiece()`: fige la pièce actuelle dans la grille lorsque sa descente est terminée.
  - `drawBoard()`: dessine le contenu de la grille sur l'écran.

## Classe Renderer

- [ ] **Attributs** :
  - `canvas`: élément canvas pour le dessin.
  - `context`: contexte 2D du canvas.
- [ ] **Méthodes** :
  - `drawPiece(piece)`: dessine une pièce sur le canvas.
  - `drawBoard(board)`: dessine la grille de jeu sur le canvas.
  - `clear()`: nettoie le canvas.

## Classe ScoreManager

- [ ] **Attributs** :
  - `score`: score actuel.
  - `lines`: nombre de lignes complétées.
- [ ] **Méthodes** :
  - `addScore(linesCleared)`: calcule le score basé sur les lignes effacées.
  - `updateDisplay()`: met à jour l'affichage du score sur l'interface.

## Configuration et Chargement des Ressources

- [ ] Charger les ressources graphiques (si nécessaire).
- [ ] Définir les configurations de base (taille de grille, vitesses de chute, etc.).

## Développement de l'Interface Utilisateur

- [ ] Créer des boutons pour jouer, mettre en pause, et réinitialiser le jeu.
- [ ] Afficher le score et le niveau actuel du joueur.
- [ ] Gérer les entrées utilisateur via le clavier.

## Tests et Optimisation

- [ ] Écrire des tests pour chaque méthode des classes principales.
- [ ] Profiler le jeu pour détecter et corriger les goulots d'étranglement de performances.

## Documentation

- [ ] Documenter le code source et les méthodes principales.
- [ ] Rédiger un README pour le dépôt GitHub du projet.