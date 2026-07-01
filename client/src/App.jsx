import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/users/Home';
import EventsPage from './pages/users/EventsPage';
import EventDetail from './pages/users/EventDetail';

// Admin Pages
import AdminLayout from './pages/admin/Layout';
import AddEvent from './pages/admin/AddEvent';
import EditEvent from './pages/admin/EditEvent';
import ListEvents from './pages/admin/ListEvents';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:type" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="/admin/add-event" element={<AddEvent />} />
           <Route path="/admin/list-events" element={<ListEvents />} />
           <Route path="/admin/edit-event/:id" element={<EditEvent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
