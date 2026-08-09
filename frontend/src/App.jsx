import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import Reportar from './components/Reportar.jsx'
import Tickets from './components/Tickets.jsx'

function App() {
  console.log('App renderizada')
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="reportar" element={<Reportar />} />
        <Route path="tickets" element={<Tickets />} />
      </Route>
    </Routes>
  )
}

export default App