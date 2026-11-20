# CinéTrack — Catalogue de Films et Séries

Application web interactive de découverte et de gestion de films et séries, développée en JavaScript vanilla (modules ES6) avec persistance via `localStorage` (favoris) et intégration d'une API REST créée avec MockAPI.

## Démo & Liens
- **Site en ligne :** [Lien Vercel](https://cin-track.vercel.app/)
- **Planification :** [Tableau Jira](https://abdellaheltrach.atlassian.net/jira/software/projects/SCRUM/boards/1?filter=&groupBy=none&atlOrigin=eyJpIjoiZmQxNmU2OTFhNzY2NGM5NmI5ZTMzOWQ2MzNmYzI5NDciLCJwIjoiaiJ9)

---

## Configuration API (MockAPI)

Chaque utilisateur configure son propre endpoint MockAPI :

```text
[https://VOTRE-ID.mockapi.io/api/v1](https://VOTRE-ID.mockapi.io/api/v1)
```

### Schéma des Ressources

#### 1. `shows` / `contents`
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | Object ID / String | Identifiant unique du contenu |
| `title` | String | Titre du film ou de la série |
| `description` | String | Synopsis |
| `image` | String | URL de l'affiche / image |
| `type` | String | `"movie"` ou `"series"` |
| `releaseYear` | Number | Année de sortie |
| `duration` | Number | Durée en minutes (films) |
| `seasons` | Array | Liste des saisons (séries) |
| `genres` | Array | Genres |
| `directors` | Array | Réalisateurs |
| `productionCountries` | Array | Pays de production |

#### 2. `comments`
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | Object ID / String | Identifiant unique du commentaire |
| `showId` / `contentId` | String | Identifiant du film ou de la série associé |
| `author` | String | Nom de l'auteur |
| `comment` / `text` | String | Contenu du commentaire |
| `date` / `createdAt` | String / Date | Date de publication |

---

## Fonctionnalités Clés
- **Catalogue & Cartes (`index.html`) :** Affichage dynamique sous forme de cartes avec image, titre, année de sortie, genres et type (`movie` ou `series`).
- **Recherche & Filtres :** Recherche textuelle et filtre par type (*Tout*, *Films*, *Séries*) avec mise à jour de la pagination.
- **Pagination :** Navigation par pages dans le catalogue.
- **Fenêtre Modale Détaillée & Commentaires :** Affichage complet des informations au clic sur une carte, chargement des commentaires associés, message *"Add first comment"* lorsqu'il n'y en a aucun, et ajout d'un commentaire (nom + message) sans rechargement de la page.
- **Page d'Administration (`admin.html`) :** Consultation de la liste des contenus, ajout et modification via un formulaire unique avec validation (champs obligatoires, année entre 1900 et l'année en cours, URL d'image, durée ou saisons), et suppression après confirmation (`GET`, `POST`, `PUT`, `DELETE`).
- **Gestion des Favoris & Sidebar :** Ajout et suppression de favoris sans doublon (avec `stopPropagation`), affichage dans la sidebar avec statistiques (`reduce`) et persistance via `localStorage`.
- **États de Chargement & Erreurs :** Affichage d'états de chargement, messages de succès/erreur et gestion des erreurs réseau avec `try/catch`.

---

## Technologies Utilisées
- HTML5 / Tailwind CSS
- JavaScript ES6+ (Modules ES, `async/await`, `Fetch API`, `try/catch`, `map`, `filter`, `find`, `reduce`)
- MockAPI REST API (`GET`, `POST`, `PUT`, `DELETE`)
- Persistance locale (`localStorage`, `JSON.stringify`, `JSON.parse`)
- Git & GitHub

---

## Structure du Projet

```text
Cin-Track/
├── admin.html          # Page d'administration (CRUD films et séries)
├── index.html          # Page principale du catalogue
├── README.md           # Documentation du projet
├── .gitignore          # Fichiers ignorés par Git
├── img/                # Ressources graphiques (logos, icônes)
│   ├── Logo.png
│   └── Phone Logo.png
└── js/                 # Logique JavaScript modulaire
    ├── admin.js        # Gestion de l'interface et opérations CRUD admin
    ├── api.js          # Requêtes HTTP vers MockAPI (GET, POST, PUT, DELETE)
    ├── data.js         # Gestion du localStorage (favoris)
    ├── main.js         # Point d'entrée principal et initialisation des événements
    ├── ui.js           # Rendu du DOM (cartes, modale, commentaires, sidebar, pagination)
    └── validation.js   # Validation des formulaires et gestion des messages d'erreur
```