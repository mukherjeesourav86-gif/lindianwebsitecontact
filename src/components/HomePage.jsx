import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Phone, Shield, UserCog, LogIn, UserPlus, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import UrlsSection from './UrlsSection';
import ContactsSection from './ContactsSection';
import SeoHead from './SeoHead';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { urls, contacts, currentUser, logout } = useResources();

  const renderAuthButtons = () => {
    if (currentUser) {
      return (
        <>
          {currentUser.role === 'admin' ? (
            <Link to="/admin">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                <UserCog className="h-4 w-4" />
                <span>Admin</span>
              </motion.button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </motion.button>
            </Link>
          )}
          <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </motion.button>
        </>
      );
    }
    return (
      <>
        <Link to="/submit">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md">
            <PlusCircle className="h-4 w-4" />
            <span>Submit Resource</span>
          </motion.button>
        </Link>
        <Link to="/login">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-md">
            <UserPlus className="h-4 w-4" />
            <span>Register</span>
          </motion.button>
        </Link>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <SeoHead />
      
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-saffron-600 to-green-600 bg-clip-text text-transparent">
                  India Resources Portal
                </h1>
                <p className="text-sm text-gray-600">Essential URLs & Contacts Directory</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </motion.header>

      <main>
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-saffron-600 via-blue-500 to-green-600 bg-clip-text text-transparent"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              भारत के महत्वपूर्ण संसाधन
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Your community-driven directory for India&apos;s most important government websites, emergency contacts, and essential services.
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <motion.div whileHover={{ y: -5, rotateY: 5 }} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-100">
                <Globe className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Important URLs</h3>
                <p className="text-gray-600 mb-4">Access to {urls.length}+ essential government and service websites</p>
                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600">{urls.length}</span>
                  <span className="text-sm text-blue-600 ml-1">Websites</span>
                </div>
              </motion.div>
              
              <motion.div whileHover={{ y: -5, rotateY: -5 }} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100">
                <Phone className="h-12 w-12 text-green-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Emergency Contacts</h3>
                <p className="text-gray-600 mb-4">Quick access to {contacts.length}+ critical phone numbers</p>
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold text-green-600">{contacts.length}</span>
                  <span className="text-sm text-green-600 ml-1">Contacts</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <UrlsSection />
        <ContactsSection />
        
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="py-20 bg-white"
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Become a Contributor!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Help us build the most comprehensive directory for India. Share important URLs and contacts to empower our community.
            </p>
            <Link to="/submit">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-saffron-500 to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg text-lg"
              >
                Add a Resource Now
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">India Resources Portal</h3>
          <p className="text-gray-400 mb-4">
            Empowering citizens with quick access to essential government services and emergency contacts
          </p>
          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <span>🇮🇳</span>
            <span>Built for Digital India Initiative</span>
            <span>🇮🇳</span>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Last Updated: {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
