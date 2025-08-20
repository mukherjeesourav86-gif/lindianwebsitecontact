import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Search, Filter, MapPin } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { INDIAN_STATES } from '../context/ResourceContext';
import IconDisplay from './IconDisplay';

const UrlsSection = () => {
  const { urls } = useResources();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(urls.map(url => url.category))], [urls]);
  const availableStates = useMemo(() => ['All', ...INDIAN_STATES.filter(state => urls.some(url => url.state === state))], [urls]);

  const filteredUrls = useMemo(() => urls.filter(url => {
    const matchesSearch = url.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || url.category === selectedCategory;
    const matchesState = selectedState === 'All' || url.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  }), [urls, searchTerm, selectedCategory, selectedState]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Important Websites
          </motion.h2>
          <p className="text-xl text-gray-600">Quick access to essential Indian government and service portals</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full sm:w-64 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg appearance-none bg-white w-full sm:w-auto min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg appearance-none bg-white w-full sm:w-auto min-w-[200px]"
            >
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* URLs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUrls.map((url, index) => (
            <motion.div
              key={url.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotateX: 5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <IconDisplay 
                      iconName={url.icon} 
                      imageUrl={url.imageUrl} 
                      className="h-6 w-6 text-white" 
                    />
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                      {url.category}
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {url.state}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {url.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {url.description}
                </p>
                
                <a
                  href={url.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold group"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUrls.length === 0 && (
          <div className="text-center py-12">
            <IconDisplay iconName="Globe" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No websites found matching your criteria</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default UrlsSection;
