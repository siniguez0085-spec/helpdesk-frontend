const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    enum: ['Red', 'Hardware', 'Software']
  },
  prioridad: {
    type: String,
    required: true,
    enum: ['Alta', 'Media', 'Baja'],
    default: 'Media'
  },
  estado: {
    type: String,
    required: true,
    enum: ['Abierto', 'En Progreso', 'Cerrado'],
    default: 'Abierto'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', TicketSchema);