import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TicketForm from './components/TicketForm.jsx';
import TicketList from './components/TicketList.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reportar" element={<TicketForm />} />
          <Route path="/tickets" element={<TicketList />} />
        </Routes>
      </main>
      <footer>
        <p>© 2026 Sistema Help Desk - Universidad Técnica de Manabí</p>
      </footer>
    </BrowserRouter>
  );
}
