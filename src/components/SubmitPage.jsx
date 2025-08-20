import React from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { useResources } from '../context/ResourceContext';
import { UserPlus, LogIn, Info } from 'lucide-react';

const SubmitPage = () => {
  const { currentUser } = useResources();

  // If user is already logged in, redirect them to their dashboard where they can submit.
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  // If user is not logged in, show the registration prompt.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-2xl text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community to Contribute</h2>
        <p className="text-lg text-gray-600 mb-8">
          To add new resources and help keep our directory up-to-date, you need to be a registered contributor. Please log in or create an account.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg"
            >
              <UserPlus className="h-5 w-5" />
              <span>Register Now</span>
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg"
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </motion.button>
          </Link>
        </div>
         <div className="mt-12">
            <Link to="/" className="text-gray-600 hover:text-gray-800 font-medium">
                &larr; Back to Home
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitPage;
