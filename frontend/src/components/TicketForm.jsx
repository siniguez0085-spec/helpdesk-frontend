import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTicket } from '../services/api.js';

const ESTADO_INICIAL = {
  titulo: '',
  descripcion: '',
  categoria: '',
  prioridad: '',
};

export default function TicketForm() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.titulo.trim() || !form.descripcion.trim() || !form.categoria || !form.prioridad) {
      setError('Todos los campos marcados son obligatorios.');
      return;
    }

    setEnviando(true);
    try {
      await crearTicket(form);
      setExito(true);
      setForm(ESTADO_INICIAL);
      setTimeout(() => navigate('/tickets'), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section>
      <h2>Reportar Nuevo Incidente</h2>

      <p style={{ marginBottom: '20px', color: 'var(--secundario)' }}>
        Complete el formulario a continuación para registrar un incidente técnico. Todos los
        campos marcados son obligatorios. Un técnico será asignado una vez procesada la
        solicitud.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 480 }}>
        <fieldset>
          <legend>Datos del Incidente</legend>

          <label htmlFor="titulo">Título del incidente</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            maxLength={120}
            required
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            maxLength={2000}
            rows={4}
            required
          />

          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">-- Seleccione una categoría --</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Red">Red</option>
          </select>

          <fieldset>
            <legend>Prioridad</legend>

            <label className="opcion-radio">
              <input
                type="radio"
                name="prioridad"
                value="Alta"
                checked={form.prioridad === 'Alta'}
                onChange={handleChange}
                required
              />
              Alta
            </label>

            <label className="opcion-radio">
              <input
                type="radio"
                name="prioridad"
                value="Media"
                checked={form.prioridad === 'Media'}
                onChange={handleChange}
              />
              Media
            </label>

            <label className="opcion-radio">
              <input
                type="radio"
                name="prioridad"
                value="Baja"
                checked={form.prioridad === 'Baja'}
                onChange={handleChange}
              />
              Baja
            </label>
          </fieldset>
        </fieldset>

        {error && <p className="estado-error">{error}</p>}
        {exito && <p className="estado-exito">Ticket creado. Redirigiendo al listado...</p>}

        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Crear Ticket'}
        </button>
      </form>
    </section>
  );
}
