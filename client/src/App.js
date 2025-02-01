import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route
import Home from './Components/Home';
import EventsHome from './Components/EventsHome';
import EventsGrid from './Components/EventsGrid';
import Cursor from './Components/cursor';
import CadetGrid from './Components/CadetGrid';

function App() {
  return (
    <Router>
      <div className="App">
        <Cursor/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsHome />} />
          <Route path="/events/:eventId" element={<EventsGrid />} />
          <Route path="/cadets/:cadetId" element={<CadetGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
