# Base de datos

Este proyecto usa **MongoDB** (documental), gestionado con Mongoose desde
`backend/models/Ticket.js`. No requiere scripts de migración: la colección
`tickets` se crea automáticamente al insertar el primer documento.

## Esquema de la colección `tickets`

| Campo        | Tipo   | Valores permitidos                     |
|--------------|--------|------------------------------------------|
| titulo       | String | texto libre (máx. 120 caracteres)         |
| descripcion  | String | texto libre (máx. 2000 caracteres)        |
| categoria    | String | `Red`, `Hardware`, `Software`             |
| prioridad    | String | `Alta`, `Media`, `Baja`                   |
| estado       | String | `Abierto`, `En Progreso`, `Cerrado`       |
| createdAt    | Date   | generado automáticamente                  |
| updatedAt    | Date   | generado automáticamente                  |

## Datos de ejemplo (seed)

Puedes insertar estos tickets de prueba con `POST /api/tickets` para tener
datos con los que probar el Dashboard y el Listado:

```json
[
  { "titulo": "No hay acceso a internet en Lab 3", "descripcion": "Los equipos no tienen conexión desde las 9am.", "categoria": "Red", "prioridad": "Alta", "estado": "Abierto" },
  { "titulo": "Impresora sin tóner", "descripcion": "La impresora del piso 2 no imprime.", "categoria": "Hardware", "prioridad": "Media", "estado": "En Progreso" },
  { "titulo": "Error al iniciar sesión en el ERP", "descripcion": "El sistema muestra 'credenciales inválidas' aunque son correctas.", "categoria": "Software", "prioridad": "Alta", "estado": "Cerrado" }
]
```

## Configuración en MongoDB Atlas (resumen)

1. Crea un cluster gratuito (M0).
2. Database Access → crea un usuario con contraseña.
3. Network Access → agrega `0.0.0.0/0` (para pruebas del curso).
4. Connect → "Drivers" → copia la cadena `mongodb+srv://...` y pégala en `backend/.env` como `MONGO_URI`.
