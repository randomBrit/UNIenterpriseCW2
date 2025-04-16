import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import Submit from './pages/Submit';
import NavigationBar from './components/NavigationBar';
import StorySearch from './pages/StorySearch';
import Dashboard from './pages/DashBoard';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // Or a spinner/loading screen

  return currentUser ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/stories" element={<StorySearch />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;