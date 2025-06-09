import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, MapPin, Filter, Star, MoreVertical, Edit, Trash2 } from 'lucide-react';

const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Solutions',
      role: 'VP of Sales',
      location: 'New York, NY',
      status: 'active',
      lastContact: '2 days ago',
      dealValue: '$15,000',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      favorite: true,
      tags: ['Enterprise', 'Hot Lead']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@innovate.io',
      phone: '+1 (555) 234-5678',
      company: 'Innovate Labs',
      role: 'CTO',
      location: 'San Francisco, CA',
      status: 'prospect',
      lastContact: '1 week ago',
      dealValue: '$8,500',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      favorite: false,
      tags: ['Tech', 'Startup']
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma@globaltech.com',
      phone: '+1 (555) 345-6789',
      company: 'Global Technologies',
      role: 'Product Manager',
      location: 'Austin, TX',
      status: 'active',
      lastContact: '3 days ago',
      dealValue: '$22,000',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      favorite: true,
      tags: ['Enterprise', 'Decision Maker']
    },
    {
      id: 4,
      name: 'Robert Wilson',
      email: 'robert@startupx.com',
      phone: '+1 (555) 456-7890',
      company: 'StartupX',
      role: 'Founder',
      location: 'Seattle, WA',
      status: 'inactive',
      lastContact: '2 weeks ago',
      dealValue: '$12,000',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      favorite: false,
      tags: ['Startup', 'Follow-up']
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || contact.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'prospect': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
          <p className="text-slate-600 mt-2">Manage your leads and customer relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="prospect">Prospect</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {contact.favorite && (
                      <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                    <p className="text-sm text-slate-500">{contact.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{contact.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {contact.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Last contact: {contact.lastContact}</span>
                  <span className="font-semibold text-slate-900">{contact.dealValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Contact</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Company</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Deal Value</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Last Contact</th>
                  <th className="text-right py-4 px-6 font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {contact.favorite && (
                            <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{contact.name}</p>
                          <p className="text-sm text-slate-500">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-slate-900">{contact.company}</p>
                        <p className="text-sm text-slate-500">{contact.role}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900">{contact.dealValue}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-600">{contact.lastContact}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 text-lg">No contacts found matching your criteria.</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;