# Informe — Actividad 9: Desarrollo del Frontend e Integración Full Stack

**Estudiante:**
**Fecha:**
**Materia:** Desarrollo de Sistemas Informáticos — Unidad 4

## 1. Descripción técnica del sistema

El sistema "Help Desk" permite registrar, listar, actualizar y eliminar incidentes
técnicos (tickets) mediante una arquitectura cliente-servidor:

- **Frontend:** SPA en React (Vite + React Router), modularizada en cuatro
  componentes: Navegación (Navbar), Dashboard, Registro de Incidentes (TicketForm)
  y Listado de Tickets (TicketList).
- **Backend:** API REST en Node.js/Express que expone los endpoints CRUD sobre
  la colección `tickets`.
- **Base de datos:** MongoDB (Atlas en producción), con el esquema
  `titulo, descripcion, categoria, prioridad, estado`.

## 2. Diagrama de arquitectura cliente/servidor

```
[ Usuario / Navegador ]
        │
        ▼
[ Frontend React (Vercel/Netlify) ]
        │  HTTP fetch (JSON)
        ▼
[ Backend Express (Render/Railway) ]
        │  Mongoose
        ▼
[ MongoDB Atlas ]
```

## 3. Enlaces

- Repositorio GitHub: `<PEGA_TU_ENLACE_AQUI>`
- URL pública del backend: `<PEGA_TU_URL_AQUI>`
- URL pública del frontend: `<PEGA_TU_URL_AQUI>`
- Video de sustentación: `<PEGA_TU_ENLACE_AQUI>`

## 4. Capturas de pantalla

_(Inserta aquí capturas del sistema funcionando y de la base de datos con registros reales)_

## 5. Conclusiones técnicas

_(Describe brevemente los retos de la integración frontend-backend, el proceso
de despliegue y qué aprendiste sobre el manejo de una arquitectura Full Stack.)_
