

## Setup & Rulare FRONTEND

npm install
npm start

Aplicația rulează implicit pe http://localhost:3000

Ce face

Preia datele de la backend prin endpoint-ul /api/content.

Afișează un layout simplu cu navigare între:

Casino Games (grilă de carduri)

Promotions

News

Are un sistem de tab-uri și o zonă de content vizibilă în funcție de selecție.

Mențiune

Pentru realizarea proiectului am primit ajutor de la AI în special pe:

partea de testing

partea de TypeScript (tipuri, structuri de date)

partea de CSS (layout, responsive grid, styling simplu)

## Setup & Rulare BACKEND

npm install
npm run dev   # rulează serverul pe http://localhost:4000

Ce face

Servește datele definite în src/data/casinoContent.ts.

Endpoint principal:

GET /api/content → returnează obiectul complet casinoContent.
