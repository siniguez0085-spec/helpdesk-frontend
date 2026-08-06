// Todas las llamadas HTTP a la API REST del backend viven aqui,
// para mantener los componentes libres de logica de red.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function manejarRespuesta(res) {
  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}));
    throw new Error(cuerpo.mensaje || `Error HTTP ${res.status}`);
  }
  return res.json();
}

export async function obtenerTickets() {
  const res = await fetch(`${API_URL}/tickets`);
  return manejarRespuesta(res);
}

export async function obtenerTicketPorId(id) {
  const res = await fetch(`${API_URL}/tickets/${id}`);
  return manejarRespuesta(res);
}

export async function crearTicket(datos) {
  const res = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}

export async function actualizarTicket(id, datos) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return manejarRespuesta(res);
}

export async function eliminarTicket(id) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'DELETE',
  });
  return manejarRespuesta(res);
}
