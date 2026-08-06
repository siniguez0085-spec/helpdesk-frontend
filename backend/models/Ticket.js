const mongoose = require('mongoose');

/**
 * Esquema de la coleccion "tickets".
 * Representa un incidente reportado al Help Desk.
 */
const ticketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El titulo es obligatorio'],
      trim: true,
      maxlength: 120,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripcion es obligatoria'],
      trim: true,
      maxlength: 2000,
    },
    categoria: {
      type: String,
      enum: ['Red', 'Hardware', 'Software'],
      required: [true, 'La categoria es obligatoria'],
    },
    prioridad: {
      type: String,
      enum: ['Alta', 'Media', 'Baja'],
      required: [true, 'La prioridad es obligatoria'],
    },
    estado: {
      type: String,
      enum: ['Abierto', 'En Progreso', 'Cerrado'],
      default: 'Abierto',
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automaticamente
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
