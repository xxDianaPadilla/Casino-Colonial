import { useState } from 'react';
import Home from './pages/Home';
import GamesDashboard from './pages/GameDashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/dashboard' element={<GamesDashboard/>}/> 
        </Routes>
    </Router>
    </>
  )
}

export default App;