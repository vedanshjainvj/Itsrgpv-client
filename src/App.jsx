import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import PyqsPage from './pages/PyqsPage';
import GalleryPage from './pages/GalleryPage';
import ToppersNotesPage from './pages/ToppersNotesPage';
import HostelsPage from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import DemandsPage from './pages/DemandsPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import PostCommentPage from './pages/PostCommentPage';
import RaiseDemandPage from './pages/RaiseDemandPage';
import SettingsPage from './pages/SettingsPage';
import { AuthProvider } from './context/AuthContext';
import FestsPage from './pages/FestsPage';
import FestDetailPage from './pages/FestDetailPage';
import './styles/app.css';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<div className="min-h-[80vh] flex items-center justify-center text-white text-center px-4 py-20"><h1 className="text-3xl font-bold mb-2">Academics</h1><p className="text-gray-400">This page is under construction.</p></div>} />
            <Route path="/resources" element={<div className="min-h-[80vh] flex items-center justify-center text-white text-center px-4 py-20"><h1 className="text-3xl font-bold mb-2">Resources</h1><p className="text-gray-400">This page is under construction.</p></div>} />
            <Route path="/resources/pyqs" element={<PyqsPage />} />
            <Route path="/resources/notes" element={<ToppersNotesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/student-corner" element={<div className="min-h-[80vh] flex items-center justify-center text-white text-center px-4 py-20"><h1 className="text-3xl font-bold mb-2">Student Corner</h1><p className="text-gray-400">This page is under construction.</p></div>} />
            <Route path="/hostels" element={<HostelsPage />} />
            <Route path="/hostels/:id" element={<HostelDetailPage />} />
            <Route path="/demands" element={<DemandsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/fests" element={<FestsPage />} />
            <Route path="/fests/:id" element={<FestDetailPage />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/post-comment" element={<PostCommentPage />} />
            <Route path="/raise-demand" element={<RaiseDemandPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            <Route path="*" element={<div className="min-h-[80vh] flex items-center justify-center text-white text-center px-4 py-20"><h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1><p className="text-gray-400">The page you are looking for doesn't exist.</p></div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;