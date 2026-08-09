const Ticket = require('../models/Ticket');
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ fechaCreacion: -1 });
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener los tickets',
      error: error.message
    });
  }
};
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        mensaje: 'Ticket no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al obtener el ticket',
      error: error.message
    });
  }
};
exports.createTicket = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;
    
    // Validación básica
    if (!titulo || !descripcion || !categoria) {
      return res.status(400).json({
        success: false,
        mensaje: 'Los campos título, descripción y categoría son obligatorios'
      });
    }
    const nuevoTicket = await Ticket.create({
      titulo,
      descripcion,
      categoria,
      prioridad: prioridad || 'Media',
      estado: estado || 'Abierto'
    });
    res.status(201).json({
      success: true,
      mensaje: 'Ticket creado exitosamente',
      data: nuevoTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al crear el ticket',
      error: error.message
    });
  }
};
exports.updateTicket = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;
    
    const ticketActualizado = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        categoria,
        prioridad,
        estado,
        fechaActualizacion: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!ticketActualizado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Ticket no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      mensaje: 'Ticket actualizado exitosamente',
      data: ticketActualizado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al actualizar el ticket',
      error: error.message
    });
  }
};
exports.deleteTicket = async (req, res) => {
  try {
    const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticketEliminado) {
      return res.status(404).json({
        success: false,
        mensaje: 'Ticket no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      mensaje: 'Ticket eliminado exitosamente',
      data: ticketEliminado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mensaje: 'Error al eliminar el ticket',
      error: error.message
    });
  }
};