import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route
import Home from './Components/Home';
import Akila from './Components/Akila'; // Import Akila component
import Padma from './Components/Padma'; // Import Padma component
import Mom from './Components/Mom'; // Import Mom component
import Dad from './Components/Dad'; // Import Dad component
import EventsHome from './Components/EventsHome';
import EventsGrid from './Components/EventsGrid';
import Cursor from './Components/cursor';

function App() {
  return (
    <Router>
      <div className="App">
        <Cursor/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/akila" element={<Akila />} />
          <Route path="/padma" element={<Padma />} />
          <Route path="/mom" element={<Mom />} />
          <Route path="/dad" element={<Dad />} />
          <Route path="/events" element={<EventsHome />} />
          <Route path="/events/:eventId" element={<EventsGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
