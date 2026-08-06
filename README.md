# Help Desk — Sistema de Gestión de Incidentes

Proyecto para **Desarrollo de Sistemas Informáticos — Unidad 4 (Actividades 8 y 9)**.
SPA en React que consume una API REST en Node.js/Express con MongoDB.

## Estructura del repositorio

```
helpdesk-project/
├── backend/          # API REST (Node.js + Express + MongoDB/Mongoose)
│   ├── config/db.js
│   ├── controllers/ticketController.js
│   ├── models/Ticket.js
│   ├── routes/tickets.js
│   ├── server.js
│   └── .env.example
├── frontend/          # SPA (React + Vite + React Router)
│   └── src/
│       ├── components/ (Navbar, Dashboard, TicketForm, TicketList)
│       ├── services/api.js
│       └── styles/index.css
└── docs/
    └── informe.md     # Plantilla de informe para la entrega
```

## Tecnologías

| Capa      | Tecnología                          |
|-----------|--------------------------------------|
| Frontend  | React 18, Vite, React Router         |
| Backend   | Node.js, Express                     |
| Base de datos | MongoDB (Mongoose)               |
| Pruebas   | Postman / cURL                       |

## 1. Requisitos previos

- Node.js 18+ y npm
- Cuenta gratuita de [MongoDB Atlas](https://www.mongodb.com/atlas) (o MongoDB local)
- Cuenta de GitHub, Render/Railway y Vercel/Netlify (para el despliegue)

## 2. Ejecución local — Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env y coloca tu MONGO_URI (Atlas o local)
npm run dev
```

El servidor queda escuchando en `http://localhost:4000`. Puedes probar que está
vivo abriendo `http://localhost:4000/` en el navegador (debe responder un JSON).

## 3. Ejecución local — Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Verifica que VITE_API_URL apunte a tu backend (http://localhost:4000/api)
npm run dev
```

Abre `http://localhost:5173`.

## 4. Endpoints de la API REST

| Método | Ruta                | Descripción                       |
|--------|----------------------|------------------------------------|
| GET    | /api/tickets          | Lista todos los incidentes         |
| GET    | /api/tickets/:id      | Obtiene un ticket específico        |
| POST   | /api/tickets          | Crea un nuevo incidente             |
| PUT    | /api/tickets/:id      | Actualiza estado o detalles         |
| DELETE | /api/tickets/:id      | Elimina un registro                 |

Ejemplo de body para `POST /api/tickets`:

```json
{
  "titulo": "No hay acceso a internet en Lab 3",
  "descripcion": "Los equipos del laboratorio 3 no tienen conexión desde las 9am.",
  "categoria": "Red",
  "prioridad": "Alta",
  "estado": "Abierto"
}
```

## 5. Probar la API con Postman/cURL

```bash
# Listar tickets
curl http://localhost:4000/api/tickets

# Crear un ticket
curl -X POST http://localhost:4000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Impresora sin tóner","descripcion":"La impresora del piso 2 no imprime","categoria":"Hardware","prioridad":"Media"}'
```

Toma capturas de pantalla de estas pruebas devolviendo **200/201 OK** y el JSON —
la actividad las pide como evidencia.

## 6. Control de versiones (Git)

```bash
git init
git checkout -b develop
git checkout -b feature/backend-api
# ... trabaja en el backend, haz commits ...
git checkout develop
git merge feature/backend-api

git checkout -b feature/frontend-spa
# ... trabaja en el frontend, haz commits ...
git checkout develop
git merge feature/frontend-spa

git remote add origin <URL_DE_TU_REPOSITORIO>
git push -u origin develop
```

## 7. Despliegue en la nube

**Base de datos (MongoDB Atlas):**
1. Crea un cluster gratuito (M0) en MongoDB Atlas.
2. Crea un usuario de base de datos y habilita el acceso desde cualquier IP (0.0.0.0/0) para pruebas.
3. Copia la cadena de conexión `mongodb+srv://...` en `MONGO_URI`.

**Backend (Render):**
1. Sube la carpeta `backend/` a GitHub.
2. En Render, crea un "Web Service" apuntando a ese repo/carpeta.
3. Build command: `npm install` — Start command: `npm start`.
4. Agrega las variables de entorno `MONGO_URI` y `CLIENT_ORIGIN` (la URL de tu frontend en Vercel/Netlify).

**Frontend (Vercel o Netlify):**
1. Sube la carpeta `frontend/` a GitHub.
2. Importa el repo en Vercel/Netlify.
3. Build command: `npm run build` — Output directory: `dist`.
4. Agrega la variable de entorno `VITE_API_URL` con la URL pública de tu backend en Render + `/api`.

Una vez desplegado, verifica que **todo funcione contra las URLs públicas**, sin
depender de `localhost`.

## 8. Checklist antes de entregar

- [ ] Backend corriendo con MongoDB Atlas conectado
- [ ] Los 5 endpoints devuelven JSON correcto (capturas en Postman)
- [ ] Frontend modularizado en Navbar, Dashboard, TicketForm, TicketList
- [ ] CRUD completo funcionando desde la interfaz (crear, listar, editar estado, eliminar)
- [ ] Código subido a GitHub con carpetas `frontend/`, `backend/`, `db/`, `docs/`
- [ ] README con instrucciones de ejecución (este archivo)
- [ ] Video de sustentación grabado (rostro visible, explicación, demo en vivo desde la URL pública)
- [ ] Informe en PDF (usa `docs/informe.md` como base) con enlaces a repo, URL pública y video
