import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2, Save, X, Image, Tag, Settings, Check, XCircle, Search, Clock, Globe, Phone } from 'lucide-react';
import { useResources } from '../context/ResourceContext';
import { INDIAN_STATES, AVAILABLE_ICONS, DEFAULT_URL_CATEGORIES, DEFAULT_CONTACT_CATEGORIES } from '../context/ResourceContext';
import IconDisplay from './IconDisplay';
import { cn } from '../utils/cn';

const AdminPanel = () => {
  const { 
    urls, contacts, pendingUrls, pendingContacts,
    getAllUrlCategories, getAllContactCategories, customUrlCategories, customContactCategories,
    addCustomUrlCategory, removeCustomUrlCategory, addCustomContactCategory, removeCustomContactCategory,
    seoSettings, updateSeoSettings, logout, 
    addUrl, updateUrl, deleteUrl, 
    addContact, updateContact, deleteContact,
    approveUrl, rejectUrl, approveContact, rejectContact
  } = useResources();

  const [activeTab, setActiveTab] = useState('pending');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  
  const [editingSeo, setEditingSeo] = useState(false);
  const [tempSeoSettings, setTempSeoSettings] = useState(seoSettings);

  const [newUrlCategory, setNewUrlCategory] = useState('');
  const [newContactCategory, setNewContactCategory] = useState('');

  const startEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setNewItem(null);
  };

  const startAdd = (type) => {
    const template = type === 'url' ? 
      { name: '', url: '', category: 'Central Government', state: 'All India', description: '', icon: 'Globe', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' } :
      { name: '', number: '', category: 'Emergency', state: 'All India', description: '', icon: 'Phone', imageUrl: '', seoTitle: '', seoDescription: '', seoKeywords: '' };
    setNewItem({ ...template, type });
    setEditingItem(null);
  };

  const saveItem = () => {
    if (editingItem) {
      if (editingItem.type === 'url') updateUrl(editingItem.id, editingItem);
      else updateContact(editingItem.id, editingItem);
    } else if (newItem) {
      if (newItem.type === 'url') addUrl(newItem);
      else addContact(newItem);
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItem(null);
  };

  const updateField = (field, value) => {
    if (editingItem) setEditingItem(prev => ({ ...prev, [field]: value }));
    else setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const saveSeoSettings = () => {
    updateSeoSettings(tempSeoSettings);
    setEditingSeo(false);
  };

  const handleAddUrlCategory = (e) => {
    e.preventDefault();
    addCustomUrlCategory(newUrlCategory.trim());
    setNewUrlCategory('');
  };

  const handleAddContactCategory = (e) => {
    e.preventDefault();
    addCustomContactCategory(newContactCategory.trim());
    setNewContactCategory('');
  };

  const currentItem = editingItem || newItem;
  const urlCategories = getAllUrlCategories();
  const contactCategories = getAllContactCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
              <TabButton id="pending" activeTab={activeTab} setActiveTab={setActiveTab} label={`Pending (${pendingUrls.length + pendingContacts.length})`} color="orange" icon={<Clock className="h-4 w-4" />} />
              <TabButton id="urls" activeTab={activeTab} setActiveTab={setActiveTab} label={`Manage URLs (${urls.length})`} color="blue" icon={<Globe className="h-4 w-4" />} />
              <TabButton id="contacts" activeTab={activeTab} setActiveTab={setActiveTab} label={`Manage Contacts (${contacts.length})`} color="green" icon={<Phone className="h-4 w-4" />} />
              <TabButton id="categories" activeTab={activeTab} setActiveTab={setActiveTab} label="Categories" color="indigo" icon={<Tag className="h-4 w-4" />} />
              <TabButton id="settings" activeTab={activeTab} setActiveTab={setActiveTab} label="SEO Settings" color="purple" icon={<Settings className="h-4 w-4" />} />
            </nav>
          </div>
        </div>

        {activeTab === 'pending' && <PendingSection items={[...pendingUrls, ...pendingContacts]} onApproveUrl={approveUrl} onRejectUrl={rejectUrl} onApproveContact={approveContact} onRejectContact={rejectContact} />}
        
        {(activeTab === 'urls' || activeTab === 'contacts') && (
          <>
            {!currentItem && <div className="mb-6"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => startAdd(activeTab === 'urls' ? 'url' : 'contact')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center space-x-2"><Plus className="h-5 w-5" /><span>Add New {activeTab === 'urls' ? 'URL' : 'Contact'}</span></motion.button></div>}
            {currentItem && <EditForm currentItem={currentItem} updateField={updateField} saveItem={saveItem} cancelEdit={cancelEdit} urlCategories={urlCategories} contactCategories={contactCategories} />}
            {!currentItem && <DataTable items={activeTab === 'urls' ? urls : contacts} type={activeTab} onEdit={startEdit} onDelete={activeTab === 'urls' ? deleteUrl : deleteContact} />}
          </>
        )}

        {activeTab === 'categories' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-8">
            <CategorySection title="URL Categories" defaultCategories={DEFAULT_URL_CATEGORIES} customCategories={customUrlCategories} onAdd={handleAddUrlCategory} onRemove={removeCustomUrlCategory} newCategory={newUrlCategory} setNewCategory={setNewUrlCategory} color="blue" />
            <CategorySection title="Contact Categories" defaultCategories={DEFAULT_CONTACT_CATEGORIES} customCategories={customContactCategories} onAdd={handleAddContactCategory} onRemove={removeCustomContactCategory} newCategory={newContactCategory} setNewCategory={setNewContactCategory} color="green" />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Global SEO Settings</h3>
              <div className="flex space-x-2">{editingSeo ? (<><button onClick={saveSeoSettings} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save</span></button><button onClick={() => setEditingSeo(false)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"><X className="h-4 w-4" /><span>Cancel</span></button></>) : (<button onClick={() => setEditingSeo(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><Edit2 className="h-4 w-4" /><span>Edit</span></button>)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label><input type="text" value={editingSeo ? tempSeoSettings.title : seoSettings.title} onChange={(e) => editingSeo && setTempSeoSettings(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 read-only:bg-gray-100" readOnly={!editingSeo} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-2">Author</label><input type="text" value={editingSeo ? tempSeoSettings.author : seoSettings.author} onChange={(e) => editingSeo && setTempSeoSettings(prev => ({ ...prev, author: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 read-only:bg-gray-100" readOnly={!editingSeo} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label><textarea value={editingSeo ? tempSeoSettings.description : seoSettings.description} onChange={(e) => editingSeo && setTempSeoSettings(prev => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 read-only:bg-gray-100" readOnly={!editingSeo} /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma separated)</label><input type="text" value={editingSeo ? tempSeoSettings.keywords : seoSettings.keywords} onChange={(e) => editingSeo && setTempSeoSettings(prev => ({ ...prev, keywords: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 read-only:bg-gray-100" readOnly={!editingSeo} /></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ id, activeTab, setActiveTab, label, color, icon }) => {
  const isActive = activeTab === id;
  return (
    <button onClick={() => setActiveTab(id)} className={cn(
      'py-2 px-3 border-b-2 font-medium text-sm flex items-center space-x-2',
      {
        'border-transparent text-gray-500 hover:text-gray-700': !isActive,
        'border-orange-500 text-orange-600': isActive && color === 'orange',
        'border-blue-500 text-blue-600': isActive && color === 'blue',
        'border-green-500 text-green-600': isActive && color === 'green',
        'border-indigo-500 text-indigo-600': isActive && color === 'indigo',
        'border-purple-500 text-purple-600': isActive && color === 'purple',
      }
    )}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

const PendingSection = ({ items, onApproveUrl, onRejectUrl, onApproveContact, onRejectContact }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <h3 className="text-lg font-semibold text-gray-800 p-4 border-b">Pending Submissions</h3>
    {items.length === 0 ? <p className="p-4 text-gray-500">No pending submissions.</p> : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map(item => {
              const type = item.url ? 'url' : 'contact';
              return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4"><div className="flex items-center space-x-3"><div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><IconDisplay iconName={item.icon} imageUrl={item.imageUrl} className="h-5 w-5 text-orange-600" /></div><div><div className="text-sm font-medium text-gray-900">{item.name}</div><div className="text-sm text-gray-500 max-w-xs truncate">{type === 'url' ? item.url : item.number}</div>{(item.seoTitle || item.seoDescription || item.seoKeywords) && <span className="text-xs text-green-600 font-semibold block mt-1">SEO Data Submitted</span>}</div></div></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.submittedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => type === 'url' ? onApproveUrl(item.id) : onApproveContact(item.id)} className="text-green-600 hover:text-green-900"><Check className="h-5 w-5" /></button>
                  <button onClick={() => type === 'url' ? onRejectUrl(item.id) : onRejectContact(item.id)} className="text-red-600 hover:text-red-900"><XCircle className="h-5 w-5" /></button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const EditForm = ({ currentItem, updateField, saveItem, cancelEdit, urlCategories, contactCategories }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h3 className="text-lg font-semibold mb-4">{currentItem.id ? 'Edit' : 'Add New'} {currentItem.type === 'url' ? 'URL' : 'Contact'}</h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-2">Name *</label><input type="text" value={currentItem.name || ''} onChange={(e) => updateField('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-2">{currentItem.type === 'url' ? 'URL *' : 'Phone Number *'}</label><input type="text" value={currentItem[currentItem.type === 'url' ? 'url' : 'number'] || ''} onChange={(e) => updateField(currentItem.type === 'url' ? 'url' : 'number', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-2">State *</label><select value={currentItem.state || 'All India'} onChange={(e) => updateField('state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">{INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}</select></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-2">Category *</label><select value={currentItem.category || ''} onChange={(e) => updateField('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">{(currentItem.type === 'url' ? urlCategories : contactCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-2">Icon</label><div className="flex items-center space-x-2"><select value={currentItem.icon || 'Globe'} onChange={(e) => updateField('icon', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg">{AVAILABLE_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><IconDisplay iconName={currentItem.icon} imageUrl={currentItem.imageUrl} className="h-5 w-5 text-blue-600" /></div></div></div>
      <div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label><div className="flex items-center space-x-2"><input type="url" value={currentItem.imageUrl || ''} onChange={(e) => updateField('imageUrl', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" /><Image className="h-5 w-5 text-gray-400" /></div></div>
      <div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">Description *</label><textarea value={currentItem.description || ''} onChange={(e) => updateField('description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
    </div>
    <details className="mt-6"><summary className="text-sm font-medium text-gray-700 cursor-pointer flex items-center space-x-2"><Search className="h-4 w-4 text-gray-500" /><span>Item-Specific SEO Settings (Optional)</span></summary><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4 border rounded-lg bg-gray-50"><div><label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label><input type="text" value={currentItem.seoTitle || ''} onChange={(e) => updateField('seoTitle', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div><div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">SEO Description</label><textarea value={currentItem.seoDescription || ''} onChange={(e) => updateField('seoDescription', e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div><div className="md:col-span-2 lg:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords (comma separated)</label><input type="text" value={currentItem.seoKeywords || ''} onChange={(e) => updateField('seoKeywords', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div></div></details>
    <div className="flex space-x-4 mt-6"><button onClick={saveItem} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save</span></button><button onClick={cancelEdit} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"><X className="h-4 w-4" /><span>Cancel</span></button></div>
  </motion.div>
);

const DataTable = ({ items, type, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{type === 'urls' ? 'URL' : 'Number'}</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4"><div className="flex items-center space-x-3"><div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', { 'bg-blue-100': type === 'urls', 'bg-green-100': type === 'contacts' })}><IconDisplay iconName={item.icon} imageUrl={item.imageUrl} className={cn('h-5 w-5', { 'text-blue-600': type === 'urls', 'text-green-600': type === 'contacts' })} /></div><div><div className="text-sm font-medium text-gray-900">{item.name}</div><div className="text-sm text-gray-500 max-w-xs truncate">{item.description}</div></div></div></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><div className="max-w-xs truncate">{type === 'urls' ? item.url : item.number}</div></td>
              <td className="px-6 py-4 whitespace-nowrap"><div className="flex flex-col space-y-1"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{item.category}</span><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.state}</span></div></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"><button onClick={() => onEdit(item, type === 'urls' ? 'url' : 'contact')} className="text-blue-600 hover:text-blue-900"><Edit2 className="h-4 w-4" /></button><button onClick={() => { if (window.confirm('Are you sure?')) onDelete(item.id) }} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CategorySection = ({ title, defaultCategories, customCategories, onAdd, onRemove, newCategory, setNewCategory, color }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      <Tag className={cn('h-5 w-5 mr-2', {
        'text-blue-500': color === 'blue',
        'text-green-500': color === 'green',
      })} />
      {title}
    </h3>
    <form onSubmit={onAdd} className="flex gap-2 mb-6">
      <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Add new category..." className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      <button type="submit" className={cn('text-white p-2 rounded-lg flex items-center justify-center', {
        'bg-blue-600 hover:bg-blue-700': color === 'blue',
        'bg-green-600 hover:bg-green-700': color === 'green',
      })}><Plus className="h-5 w-5" /></button>
    </form>
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">CUSTOM CATEGORIES</h4>
        <div className="space-y-2">
          {customCategories.length > 0 ? customCategories.map(cat => (
            <div key={cat} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-sm text-gray-800">{cat}</span>
              <button onClick={() => onRemove(cat)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </div>
          )) : <p className="text-sm text-gray-400">No custom categories added.</p>}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2 mt-6">DEFAULT CATEGORIES</h4>
        <div className="flex flex-wrap gap-2">{defaultCategories.map(cat => (<span key={cat} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{cat}</span>))}</div>
      </div>
    </div>
  </div>
);

export default AdminPanel;
