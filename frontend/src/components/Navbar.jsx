import { NavLink } from 'react-router-dom';

// Encabezado y menu de navegacion, basados en el header de
// index.html / reportar.html / tickets.html de la maquetacion original.
export default function Navbar() {
  const linkClase = ({ isActive }) => 'nav-link' + (isActive ? ' nav-link--activo' : '');

  return (
    <>
      <header className="encabezado">
        <img src="/logo.png" alt="Logo Universidad Tecnica de Manabi" />
        <h1>UNIVERSIDAD TÉCNICA DE MANABÍ</h1>
        <h2>Tecnologías de la Información</h2>
        <h3>Desarrollo de Sistemas Informáticos</h3>
        <h2>Sistema Help Desk</h2>
        <hr />
      </header>

      <nav className="navbar">
        <ul className="navbar__enlaces">
          <li>
            <NavLink to="/" end className={linkClase}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/reportar" className={linkClase}>
              Reportar Incidente
            </NavLink>
          </li>
          <li>
            <NavLink to="/tickets" className={linkClase}>
              Ver Tickets
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
