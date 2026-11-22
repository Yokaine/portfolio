# Portfolio

Mon portfolio : un frontend React (Vite) et une petite API Symfony, le tout lançable avec Docker.

```
portfolio/
├── backend/    API Symfony (projets, formulaire de contact)
├── frontend/   site React
└── docker-compose.yml
```

## Lancer en local

```bash
docker compose up --build
```

Le site est sur http://localhost:5173 et l'API sur http://localhost:8000/api/projects.

Sans Docker :

```bash
cd backend && composer install && php -S localhost:8000 -t public
cd frontend && npm install && npm run dev
```

## Modifier le contenu

- Texte, compétences et liens : `frontend/src/data/site.js`
- Projets : `backend/data/projects.json`, à recopier dans `frontend/public/projects.json`
- CV et captures : `frontend/public/cv.pdf` et `frontend/public/images/`

## Déploiement

Le frontend est publié sur GitHub Pages à chaque push sur `main` (Settings → Pages → Source : GitHub Actions). Sans API, le site lit `projects.json` et le formulaire de contact n'est pas affiché.

Pour brancher l'API, hébergez `backend/` quelque part où PHP tourne, ajoutez l'URL dans la variable `API_URL` du dépôt et mettez à jour `CORS_ALLOW_ORIGIN` dans `backend/.env`. En production, passez `APP_ENV` à `prod`, `APP_DEBUG` à `0` et changez `APP_SECRET`.
