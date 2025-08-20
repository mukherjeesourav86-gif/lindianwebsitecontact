import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ContributorDashboard from './components/ContributorDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { ResourceProvider } from './context/ResourceContext';
import SubmitPage from './components/SubmitPage';

function App() {
  return (
    <ResourceProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute role="contributor">
                  <ContributorDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ResourceProvider>
  );
}

export default App;
