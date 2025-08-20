import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, PhoneCall, MapPin } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { INDIAN_STATES } from '../context/ResourceContext';
import IconDisplay from './IconDisplay';
import { cn } from '../utils/cn';

const ContactsSection = () => {
  const { contacts } = useResources();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(contacts.map(contact => contact.category))], [contacts]);
  const availableStates = useMemo(() => ['All', ...INDIAN_STATES.filter(state => contacts.some(contact => contact.state === state))], [contacts]);

  const filteredContacts = useMemo(() => contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || contact.category === selectedCategory;
    const matchesState = selectedState === 'All' || contact.state === selectedState;
    return matchesSearch && matchesCategory && matchesState;
  }), [contacts, searchTerm, selectedCategory, selectedState]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            Emergency & Important Contacts
          </motion.h2>
          <p className="text-xl text-gray-600">Critical phone numbers for emergencies and essential services</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col lg:flex-row flex-wrap gap-4 justify-center items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full sm:w-64 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none shadow-lg"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none shadow-lg appearance-none bg-white w-full sm:w-auto min-w-[200px]"
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
              className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:outline-none shadow-lg appearance-none bg-white w-full sm:w-auto min-w-[200px]"
            >
              {availableStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, rotateX: 5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    'w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center',
                    {
                      'from-red-500 to-red-600': contact.category === 'Emergency',
                      'from-green-500 to-green-600': contact.category === 'Support & Helpline',
                      'from-blue-500 to-blue-600': contact.category === 'Information & Services',
                      'from-purple-500 to-purple-600': contact.category === 'Local Police',
                      'from-indigo-500 to-indigo-600': contact.category === 'Government Offices',
                      'from-pink-500 to-pink-600': contact.category === 'Healthcare Services',
                      'from-yellow-500 to-yellow-600': contact.category === 'Educational Institutions',
                      'from-teal-500 to-teal-600': contact.category === 'Utility Services',
                      'from-orange-500 to-orange-600': contact.category === 'Transportation',
                      'from-cyan-500 to-cyan-600': contact.category === 'Banking & Finance',
                      'from-lime-500 to-lime-600': contact.category === 'Consumer Services',
                      'from-rose-500 to-rose-600': contact.category === 'Tourist Services',
                      'from-gray-500 to-gray-600': ![
                        'Emergency', 'Support & Helpline', 'Information & Services', 'Local Police',
                        'Government Offices', 'Healthcare Services', 'Educational Institutions',
                        'Utility Services', 'Transportation', 'Banking & Finance', 'Consumer Services',
                        'Tourist Services'
                      ].includes(contact.category)
                    }
                  )}>
                    <IconDisplay 
                      iconName={contact.icon} 
                      imageUrl={contact.imageUrl} 
                      className="h-6 w-6 text-white" 
                    />
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium mb-1 block ${
                      contact.category === 'Emergency' ? 'bg-red-100 text-red-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {contact.category}
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {contact.state}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {contact.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {contact.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-800">
                    {contact.number}
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 group"
                  >
                    <PhoneCall className="h-4 w-4 group-hover:animate-pulse" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <IconDisplay iconName="Phone" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No contacts found matching your criteria</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ContactsSection;
