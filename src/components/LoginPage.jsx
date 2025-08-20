import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { LogIn, Home, UserPlus } from 'lucide-react';
import { useResources } from '../context/ResourceContext';

const LoginPage = () => {
  const { login, currentUser } = useResources();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const success = login(credentials.username, credentials.password);
    if (success) {
      navigate(credentials.username === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };
  
  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-2">Login to continue</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input type="text" value={credentials.username} onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter username" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={credentials.password} onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Enter password" required />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Login
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center justify-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
