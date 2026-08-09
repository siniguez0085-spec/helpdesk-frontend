import { useEffect, useState } from 'react';
import { obtenerTickets } from '../services/api.js';

// Cuenta cuantos tickets hay por cada valor de un campo dado.
function contarPor(tickets, campo) {
  return tickets.reduce((acc, ticket) => {
    const clave = ticket[campo];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {});
}

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerTickets()
      .then(setTickets)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const porEstado = contarPor(tickets, 'estado');
  const porPrioridad = contarPor(tickets, 'prioridad');

  return (
    <>
      <section>
        <h2>Bienvenido al Sistema</h2>
        <p>
          Este sistema de Mesa de Ayuda de la Universidad Técnica de Manabí está diseñado
          para administrar y dar seguimiento a las incidencias y solicitudes de soporte
          tecnológico generadas por estudiantes, docentes y personal administrativo. Su
          función principal es registrar, categorizar, asignar y supervisar los
          requerimientos relacionados con infraestructura de red, equipos informáticos y
          servicios de software institucional.
        </p>
      </section>

      <section>
        <h2>Servicios Disponibles</h2>
        <ul style={{ listStylePosition: 'inside' }}>
          <li>Registro de Incidentes</li>
          <li>Seguimiento de Tickets</li>
          <li>Gestión de Prioridades</li>
          <li>Control de Estados</li>
        </ul>
      </section>

      <section>
        <h2>Resumen de Incidentes</h2>

        {cargando && <p className="estado-carga">Cargando panel...</p>}
        {error && <p className="estado-error">No se pudo cargar el panel: {error}</p>}

        {!cargando && !error && (
          <>
            <p className="dashboard__resumen">
              Total de tickets registrados: <strong>{tickets.length}</strong>
            </p>

            <div className="dashboard__grid">
              <div className="card">
                <h2>Por estado</h2>
                {['Abierto', 'En Progreso', 'Cerrado'].map((clave) => (
                  <div className="tarjeta__fila" key={clave}>
                    <span>{clave}</span>
                    <span
                      className={`badge-estado badge-estado--${clave
                        .replace(' ', '-')
                        .toLowerCase()}`}
                    >
                      {porEstado[clave] || 0}
                    </span>
                  </div>
                ))}
              </div>

              <div className="card">
                <h2>Por prioridad</h2>
                {['Alta', 'Media', 'Baja'].map((clave) => (
                  <div className="tarjeta__fila" key={clave}>
                    <span>{clave}</span>
                    <span className={`badge ${clave.toLowerCase()}`}>
                      {porPrioridad[clave] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {tickets.length === 0 && (
              <p className="dashboard__vacio">
                Aún no hay incidentes registrados. Ve a "Reportar Incidente" para crear el
                primero.
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}
