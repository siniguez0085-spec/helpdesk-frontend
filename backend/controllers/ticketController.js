const Ticket = require('../models/Ticket');

/**
 * Elimina etiquetas HTML basicas de un texto para mitigar XSS
 * antes de guardar datos que el cliente ingreso.
 */
function sanitize(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/<\/?[^>]+(>|$)/g, '').trim();
}

// GET /api/tickets -> lista todos los incidentes (mas nuevo primero)
async function getTickets(req, res) {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los tickets', error: error.message });
  }
}

// GET /api/tickets/:id -> busca un ticket especifico
async function getTicketById(req, res) {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID de ticket invalido', error: error.message });
  }
}

// POST /api/tickets -> registra un nuevo incidente
async function createTicket(req, res) {
  try {
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;

    const nuevoTicket = new Ticket({
      titulo: sanitize(titulo),
      descripcion: sanitize(descripcion),
      categoria,
      prioridad,
      estado,
    });

    const ticketGuardado = await nuevoTicket.save();
    res.status(201).json(ticketGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el ticket', error: error.message });
  }
}

// PUT /api/tickets/:id -> actualiza estado o detalles de un ticket
async function updateTicket(req, res) {
  try {
    const cambios = { ...req.body };
    if (cambios.titulo) cambios.titulo = sanitize(cambios.titulo);
    if (cambios.descripcion) cambios.descripcion = sanitize(cambios.descripcion);

    const ticketActualizado = await Ticket.findByIdAndUpdate(req.params.id, cambios, {
      new: true, // devuelve el documento ya actualizado
      runValidators: true, // valida los enum (categoria, prioridad, estado)
    });

    if (!ticketActualizado) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json(ticketActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el ticket', error: error.message });
  }
}

// DELETE /api/tickets/:id -> elimina un registro
async function deleteTicket(req, res) {
  try {
    const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticketEliminado) {
      return res.status(404).json({ mensaje: 'Ticket no encontrado' });
    }
    res.status(200).json({ mensaje: 'Ticket eliminado correctamente', ticket: ticketEliminado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el ticket', error: error.message });
  }
}

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
