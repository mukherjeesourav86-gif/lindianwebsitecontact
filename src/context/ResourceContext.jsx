import React, { createContext, useContext, useState } from 'react';

const ResourceContext = createContext();

export const useResources = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourceProvider');
  }
  return context;
};

// MOCK DATA
const initialUrls = [
  { id: 1, name: 'Government of India', url: 'https://www.india.gov.in', category: 'Central Government', state: 'All India', description: 'Official portal of Government of India', icon: 'Globe', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 2, name: 'Digital India', url: 'https://digitalindia.gov.in', category: 'Digital Services', state: 'All India', description: 'Digital India initiative portal', icon: 'Smartphone', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' },
];

const initialContacts = [
  { id: 1, name: 'Police Emergency', number: '100', category: 'Emergency', state: 'All India', description: 'For immediate police assistance', icon: 'Shield', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' },
  { id: 2, name: 'Fire Emergency', number: '101', category: 'Emergency', state: 'All India', description: 'Fire department emergency number', icon: 'Flame', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' },
];

const initialPendingUrls = [
  { id: 101, name: 'MyGov Portal', url: 'https://www.mygov.in', category: 'Public Services', state: 'All India', description: 'Citizen engagement platform.', icon: 'Users', imageUrl: '', submittedBy: 'contributor1', seoTitle: 'MyGov India Portal', seoDescription: 'Engage with the Indian government on MyGov, the citizen participation platform.', seoKeywords: 'mygov, citizen engagement, india' }
];

const initialPendingContacts = [
  { id: 201, name: 'National Cyber Crime Reporting Portal', number: '1930', category: 'Cyber Crime', state: 'All India', description: 'Report cyber threats and crimes.', icon: 'Shield', imageUrl: '', submittedBy: 'contributor1', seoTitle: '', seoDescription: '', seoKeywords: '' }
];

const initialSeoSettings = {
  title: 'India Resources Portal - Important URLs & Contacts',
  description: 'Complete directory of India\'s most important government websites, emergency contacts, and essential services',
  keywords: 'India, government websites, emergency contacts, digital india, government services, indian states, emergency numbers',
  author: 'India Resources Portal',
  ogImage: 'https://ibb.co/67X3xfSV',
  twitterHandle: '@dualitedev',
  canonicalUrl: 'https://alpha.dualite.dev',
  lastUpdated: new Date().toISOString()
};

export const INDIAN_STATES = ['All India', 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

export const DEFAULT_URL_CATEGORIES = [
  'Central Government', 'State Government', 'Digital Services', 'Finance & Banking', 'Employment & Jobs', 'Transport & Travel', 'Identity & Documents', 'Healthcare & Medical', 'Education & Learning', 'Agriculture & Farming', 'Business & Commerce', 'Legal & Judiciary', 'Social Welfare', 'Tax & Revenue', 'Public Services', 'Tourism & Culture', 'Environment & Forest', 'Energy & Power', 'Communication & IT', 'Defense & Security'
];

export const DEFAULT_CONTACT_CATEGORIES = [
  'Emergency', 'Support & Helpline', 'Information & Services', 'Local Police', 'Government Offices', 'Healthcare Services', 'Educational Institutions', 'Utility Services', 'Transportation', 'Banking & Finance', 'Consumer Services', 'Tourist Services', 'Disaster Management', 'Anti-Corruption', 'Cyber Crime', 'Women & Child Safety', 'Senior Citizen Helpline', 'Agriculture & Farming', 'Animal Welfare', 'Blood Banks', 'Legal Aid', 'Public Grievances'
];

export const AVAILABLE_ICONS = [
  'Globe', 'Smartphone', 'Calculator', 'Briefcase', 'Train', 'CreditCard', 'Building', 'Shield', 'Flame', 'Heart', 'Users', 'Baby', 'MapPin', 'Phone', 'Mail', 'Home', 'Car', 'Plane', 'Book', 'GraduationCap', 'Hospital', 'Stethoscope', 'Banknote', 'Landmark', 'Scale', 'Gavel', 'FileText', 'Settings', 'Wifi', 'Zap', 'Leaf', 'TreePine', 'Camera', 'Music', 'Palette', 'Award', 'Star', 'Flag', 'Target', 'Clock'
];

export const ResourceProvider = ({ children }) => {
  const [urls, setUrls] = useState(initialUrls);
  const [contacts, setContacts] = useState(initialContacts);
  const [pendingUrls, setPendingUrls] = useState(initialPendingUrls);
  const [pendingContacts, setPendingContacts] = useState(initialPendingContacts);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([{ username: 'contributor1', password: 'password' }]);

  const [customUrlCategories, setCustomUrlCategories] = useState(['Custom URL Test']);
  const [customContactCategories, setCustomContactCategories] = useState(['Custom Contact Test']);
  const [seoSettings, setSeoSettings] = useState(initialSeoSettings);

  const getAllUrlCategories = () => [...DEFAULT_URL_CATEGORIES, ...customUrlCategories];
  const getAllContactCategories = () => [...DEFAULT_CONTACT_CATEGORIES, ...customContactCategories];

  // Published Resource Management
  const addUrl = (url) => setUrls(prev => [...prev, { ...url, id: Date.now() }]);
  const updateUrl = (id, updatedUrl) => setUrls(prev => prev.map(url => url.id === id ? { ...url, ...updatedUrl } : url));
  const deleteUrl = (id) => setUrls(prev => prev.filter(url => url.id !== id));
  const addContact = (contact) => setContacts(prev => [...prev, { ...contact, id: Date.now() }]);
  const updateContact = (id, updatedContact) => setContacts(prev => prev.map(contact => contact.id === id ? { ...contact, ...updatedContact } : contact));
  const deleteContact = (id) => setContacts(prev => prev.filter(contact => contact.id !== id));

  // Pending Submission Management
  const submitUrl = (url) => setPendingUrls(prev => [...prev, { ...url, id: Date.now(), submittedBy: currentUser.username }]);
  const submitContact = (contact) => setPendingContacts(prev => [...prev, { ...contact, id: Date.now(), submittedBy: currentUser.username }]);
  
  const approveUrl = (id) => {
    const itemToApprove = pendingUrls.find(item => item.id === id);
    if (itemToApprove) {
      addUrl(itemToApprove);
      setPendingUrls(prev => prev.filter(item => item.id !== id));
    }
  };
  const rejectUrl = (id) => setPendingUrls(prev => prev.filter(item => item.id !== id));
  
  const approveContact = (id) => {
    const itemToApprove = pendingContacts.find(item => item.id === id);
    if (itemToApprove) {
      addContact(itemToApprove);
      setPendingContacts(prev => prev.filter(item => item.id !== id));
    }
  };
  const rejectContact = (id) => setPendingContacts(prev => prev.filter(item => item.id !== id));

  // Category Management
  const addCustomUrlCategory = (category) => { if (category && !getAllUrlCategories().includes(category)) setCustomUrlCategories(prev => [...prev, category]); };
  const addCustomContactCategory = (category) => { if (category && !getAllContactCategories().includes(category)) setCustomContactCategories(prev => [...prev, category]); };
  const removeCustomUrlCategory = (category) => setCustomUrlCategories(prev => prev.filter(cat => cat !== category));
  const removeCustomContactCategory = (category) => setCustomContactCategories(prev => prev.filter(cat => cat !== category));

  // SEO & Content Management
  const updateSeoSettings = (newSettings) => setSeoSettings(prev => ({ ...prev, ...newSettings, lastUpdated: new Date().toISOString() }));

  // Auth Management
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setCurrentUser({ role: 'admin', username: 'admin' });
      return true;
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser({ role: 'contributor', username: user.username });
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    if (users.some(u => u.username === username) || username === 'admin') {
      return { success: false, message: 'Username already exists.' };
    }
    setUsers(prev => [...prev, { username, password }]);
    setCurrentUser({ role: 'contributor', username });
    return { success: true };
  };

  const logout = () => setCurrentUser(null);

  return (
    <ResourceContext.Provider value={{
      urls, contacts, pendingUrls, pendingContacts, currentUser, users,
      customUrlCategories, customContactCategories, seoSettings,
      DEFAULT_URL_CATEGORIES, DEFAULT_CONTACT_CATEGORIES,
      getAllUrlCategories, getAllContactCategories,
      addUrl, updateUrl, deleteUrl, addContact, updateContact, deleteContact,
      submitUrl, submitContact, approveUrl, rejectUrl, approveContact, rejectContact,
      addCustomUrlCategory, addCustomContactCategory, removeCustomUrlCategory, removeCustomContactCategory,
      updateSeoSettings, login, register, logout
    }}>
      {children}
    </ResourceContext.Provider>
  );
};
