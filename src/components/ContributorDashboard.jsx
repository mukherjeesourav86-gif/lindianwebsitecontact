import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Globe, Phone, List, Send, Search, ChevronDown, X } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { INDIAN_STATES, AVAILABLE_ICONS } from '../context/ResourceContext';
import IconDisplay from './IconDisplay';

const ContributorDashboard = () => {
  const { 
    currentUser,
    logout,
    submitUrl,
    submitContact,
    pendingUrls,
    pendingContacts,
    urls,
    contacts,
    getAllUrlCategories,
    getAllContactCategories,
  } = useResources();

  const [activeTab, setActiveTab] = useState('submitUrl');
  const [newItem, setNewItem] = useState(null);
  
  const myPendingSubmissions = [
    ...pendingUrls.filter(item => item.submittedBy === currentUser.username).map(item => ({...item, type: 'URL', status: 'Pending'})),
    ...pendingContacts.filter(item => item.submittedBy === currentUser.username).map(item => ({...item, type: 'Contact', status: 'Pending'}))
  ];

  const myApprovedSubmissions = [
     ...urls.filter(item => item.submittedBy === currentUser.username).map(item => ({...item, type: 'URL', status: 'Approved'})),
    ...contacts.filter(item => item.submittedBy === currentUser.username).map(item => ({...item, type: 'Contact', status: 'Approved'}))
  ];

  const mySubmissions = [...myPendingSubmissions, ...myApprovedSubmissions];

  const cancelAdd = () => setNewItem(null);

  const updateField = (field, value) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.type === 'url') {
      submitUrl(newItem);
    } else {
      submitContact(newItem);
    }
    setNewItem(null);
    setActiveTab('mySubmissions');
  };
  
  const urlCategories = getAllUrlCategories();
  const contactCategories = getAllContactCategories();

  useEffect(() => {
    const createNewItem = (type) => {
      const template = type === 'url' ? 
        { name: '', url: '', category: 'Central Government', state: 'All India', description: '', icon: 'Globe', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' } :
        { name: '', number: '', category: 'Emergency', state: 'All India', description: '', icon: 'Phone', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' };
      setNewItem({ ...template, type });
    };

    if (activeTab === 'submitUrl') {
      createNewItem('url');
    } else if (activeTab === 'submitContact') {
      createNewItem('contact');
    } else {
      setNewItem(null);
    }
  }, [activeTab]);


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contributor Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {currentUser.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>View Site</span>
              </Link>
              <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              <TabButton id="submitUrl" activeTab={activeTab} setActiveTab={setActiveTab} label="Submit URL" color="blue" icon={<Globe className="h-4 w-4" />} />
              <TabButton id="submitContact" activeTab={activeTab} setActiveTab={setActiveTab} label="Submit Contact" color="green" icon={<Phone className="h-4 w-4" />} />
              <TabButton id="mySubmissions" activeTab={activeTab} setActiveTab={setActiveTab} label={`My Submissions (${mySubmissions.length})`} color="purple" icon={<List className="h-4 w-4" />} />
            </nav>
          </div>
        </div>

        {newItem && (activeTab === 'submitUrl' || activeTab === 'submitContact') && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <SubmissionForm 
              newItem={newItem} 
              updateField={updateField} 
              handleSubmit={handleSubmit} 
              cancelAdd={cancelAdd}
              urlCategories={urlCategories}
              contactCategories={contactCategories}
            />
          </motion.div>
        )}

        {activeTab === 'mySubmissions' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mySubmissions.length > 0 ? mySubmissions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="3" className="text-center py-12 text-gray-500">You have no submissions.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ id, activeTab, setActiveTab, label, color, icon }) => {
  const isActive = activeTab === id;
  const colorClasses = {
    blue: 'border-blue-500 text-blue-600',
    green: 'border-green-500 text-green-600',
    purple: 'border-purple-500 text-purple-600',
  };

  return (
    <button onClick={() => setActiveTab(id)} className={`py-2 px-3 border-b-2 font-medium text-sm flex items-center space-x-2 ${isActive ? colorClasses[color] : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

const SubmissionForm = ({ newItem, updateField, handleSubmit, cancelAdd, urlCategories, contactCategories }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Submit New {newItem.type === 'url' ? 'URL' : 'Contact'} for Review</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Name *</label><input type="text" value={newItem.name || ''} onChange={(e) => updateField('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">{newItem.type === 'url' ? 'URL *' : 'Phone Number *'}</label><input type="text" value={newItem[newItem.type === 'url' ? 'url' : 'number'] || ''} onChange={(e) => updateField(newItem.type === 'url' ? 'url' : 'number', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">State *</label><select value={newItem.state || 'All India'} onChange={(e) => updateField('state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">{INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}</select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Category *</label><select value={newItem.category || ''} onChange={(e) => updateField('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">{(newItem.type === 'url' ? urlCategories : contactCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Icon</label><div className="flex items-center space-x-2"><select value={newItem.icon || 'Globe'} onChange={(e) => updateField('icon', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg">{AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><IconDisplay iconName={newItem.icon} imageUrl={newItem.imageUrl} className="h-5 w-5 text-blue-600" /></div></div></div>
        <div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label><input type="url" value={newItem.imageUrl || ''} onChange={(e) => updateField('imageUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
        <div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">Description *</label><textarea value={newItem.description || ''} onChange={(e) => updateField('description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
      </div>
      <details className="mt-6"><summary className="text-sm font-medium text-gray-700 cursor-pointer flex items-center space-x-2"><Search className="h-4 w-4 text-gray-500" /><span>Optional SEO Settings</span><ChevronDown className="h-4 w-4 text-gray-500" /></summary><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4 border rounded-lg bg-gray-50"><div><label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label><input type="text" value={newItem.seoTitle || ''} onChange={(e) => updateField('seoTitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div><div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label><textarea value={newItem.seoDescription || ''} onChange={(e) => updateField('seoDescription', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div><div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords (comma separated)</label><input type="text" value={newItem.seoKeywords || ''} onChange={(e) => updateField('seoKeywords', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div></div></details>
      <div className="flex space-x-4 mt-6"><button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><Send className="h-4 w-4" /><span>Submit for Review</span></button><button type="button" onClick={cancelAdd} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"><X className="h-4 w-4" /><span>Cancel</span></button></div>
    </form>
  );
};

export default ContributorDashboard;
