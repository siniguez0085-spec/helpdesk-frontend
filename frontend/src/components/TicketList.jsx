import { useEffect, useState } from 'react';
import { obtenerTickets, actualizarTicket, eliminarTicket } from '../services/api.js';

function formatearFecha(fechaISO) {
  if (!fechaISO) return '-';
  return new Date(fechaISO).toLocaleDateString('es-EC');
}

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [editandoId, setEditandoId] = useState(null);
  const [borrador, setBorrador] = useState({});

  function cargarTickets() {
    setCargando(true);
    obtenerTickets()
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargarTickets();
  }, []);

  function iniciarEdicion(ticket) {
    setEditandoId(ticket._id);
    setBorrador({ estado: ticket.estado, prioridad: ticket.prioridad });
  }

  async function guardarEdicion(id) {
    try {
      const actualizado = await actualizarTicket(id, borrador);
      setTickets((prev) => prev.map((t) => (t._id === id ? actualizado : t)));
      setEditandoId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminar(id) {
    const confirmado = window.confirm('¿Eliminar este ticket? Esta acción no se puede deshacer.');
    if (!confirmado) return;
    try {
      await eliminarTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const ticketsFiltrados =
    filtroEstado === 'Todos' ? tickets : tickets.filter((t) => t.estado === filtroEstado);

  return (
    <>
      <section>
        <div className="listado__encabezado">
          <h2>Tickets Registrados</h2>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="Todos">Todos los estados</option>
            <option value="Abierto">Abierto</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Cerrado">Cerrado</option>
          </select>
        </div>

        {cargando && <p className="estado-carga">Cargando tickets...</p>}
        {error && <p className="estado-error">{error}</p>}

        {!cargando && ticketsFiltrados.length === 0 && (
          <p className="dashboard__vacio">No hay tickets que coincidan con este filtro.</p>
        )}

        {!cargando && ticketsFiltrados.length > 0 && (
          <div className="tabla-wrapper">
            <table>
              <caption>Registro de incidentes técnicos — Data Center UTM</caption>
              <thead>
                <tr>
                  <th scope="col">Título</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Prioridad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha de creación</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ticketsFiltrados.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>
                      <strong>{ticket.titulo}</strong>
                      <p className="tabla__descripcion">{ticket.descripcion}</p>
                    </td>
                    <td>{ticket.categoria}</td>
                    <td>
                      {editandoId === ticket._id ? (
                        <select
                          value={borrador.prioridad}
                          onChange={(e) => setBorrador((p) => ({ ...p, prioridad: e.target.value }))}
                        >
                          <option value="Alta">Alta</option>
                          <option value="Media">Media</option>
                          <option value="Baja">Baja</option>
                        </select>
                      ) : (
                        <span className={`badge ${ticket.prioridad.toLowerCase()}`}>{ticket.prioridad}</span>
                      )}
                    </td>
                    <td>
                      {editandoId === ticket._id ? (
                        <select
                          value={borrador.estado}
                          onChange={(e) => setBorrador((p) => ({ ...p, estado: e.target.value }))}
                        >
                          <option value="Abierto">Abierto</option>
                          <option value="En Progreso">En Progreso</option>
                          <option value="Cerrado">Cerrado</option>
                        </select>
                      ) : (
                        <span
                          className={`badge-estado badge-estado--${ticket.estado
                            .replace(' ', '-')
                            .toLowerCase()}`}
                        >
                          {ticket.estado}
                        </span>
                      )}
                    </td>
                    <td>{formatearFecha(ticket.createdAt)}</td>
                    <td className="tabla__acciones">
                      {editandoId === ticket._id ? (
                        <>
                          <button className="btn btn-primary" onClick={() => guardarEdicion(ticket._id)}>
                            Guardar
                          </button>
                          <button className="btn btn-secondary" onClick={() => setEditandoId(null)}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-secondary" onClick={() => iniciarEdicion(ticket)}>
                            Editar
                          </button>
                          <button className="btn btn-danger" onClick={() => handleEliminar(ticket._id)}>
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!cargando && (
          <p style={{ marginTop: 16 }}>
            <strong>Total de tickets registrados: {ticketsFiltrados.length}</strong>
          </p>
        )}
      </section>

      <section>
        <h2>Descripción de Estados</h2>
        <dl>
          <dt>Abierto</dt>
          <dd>
            El incidente ha sido registrado y está pendiente de asignación o atención por
            parte del equipo técnico.
          </dd>

          <dt>En Progreso</dt>
          <dd>
            Un técnico ha sido asignado y se encuentra trabajando activamente en la resolución
            del incidente.
          </dd>

          <dt>Cerrado</dt>
          <dd>
            El incidente fue atendido satisfactoriamente y el servicio afectado fue restaurado
            o la solicitud completada.
          </dd>
        </dl>
      </section>
    </>
  );
}
