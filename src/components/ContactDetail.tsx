import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail, MapPin, Building, Calendar, DollarSign, Activity, Plus, MessageSquare, FileText } from 'lucide-react';

interface ContactDetailProps {
  contactId: number;
  onBack: () => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contactId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock contact data - in real app, this would be fetched based on contactId
  const contact = {
    id: contactId,
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    role: 'VP of Sales',
    location: 'New York, NY',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    tags: ['Enterprise', 'Hot Lead'],
    createdDate: '2024-01-10',
    lastContact: '2 days ago',
    totalDeals: 3,
    totalValue: '$45,000',
    notes: 'Key decision maker for enterprise solutions. Very interested in our platform integration capabilities.',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: '@sarahjohnson'
    }
  };

  const activities = [
    { id: 1, type: 'call', title: 'Follow-up call', date: '2024-01-15', duration: '25 min', notes: 'Discussed implementation timeline' },
    { id: 2, type: 'email', title: 'Proposal sent', date: '2024-01-12', notes: 'Sent detailed proposal with pricing' },
    { id: 3, type: 'meeting', title: 'Initial meeting', date: '2024-01-08', duration: '45 min', notes: 'Great first impression' }
  ];

  const deals = [
    { id: 1, title: 'Enterprise Integration', value: '$25,000', stage: 'Negotiation', probability: 80 },
    { id: 2, title: 'Platform License', value: '$15,000', stage: 'Proposal', probability: 65 },
    { id: 3, title: 'Support Package', value: '$5,000', stage: 'Qualified', probability: 40 }
  ];

  const tasks = [
    { id: 1, title: 'Send contract for review', dueDate: '2024-01-18', priority: 'high', completed: false },
    { id: 2, title: 'Schedule demo call', dueDate: '2024-01-20', priority: 'medium', completed: false },
    { id: 3, title: 'Follow up on proposal', dueDate: '2024-01-16', priority: 'high', completed: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'prospect': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium text-slate-900">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium text-slate-900">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Company</p>
                      <p className="font-medium text-slate-900">{contact.company}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-medium text-slate-900">{contact.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Created</p>
                      <p className="font-medium text-slate-900">{contact.createdDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Last Contact</p>
                      <p className="font-medium text-slate-900">{contact.lastContact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Notes</h3>
              <p className="text-slate-700">{contact.notes}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">{contact.totalValue}</p>
                <p className="text-sm text-slate-500">Total Deal Value</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">{contact.totalDeals}</p>
                <p className="text-sm text-slate-500">Active Deals</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">{activities.length}</p>
                <p className="text-sm text-slate-500">Total Activities</p>
              </div>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Log Activity</span>
              </button>
            </div>
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-900">{activity.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{activity.date} {activity.duration && `• ${activity.duration}`}</p>
                    <p className="text-slate-700 mt-2">{activity.notes}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {activity.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'deals':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Associated Deals</h3>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Deal</span>
              </button>
            </div>
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-900">{deal.title}</h4>
                    <p className="text-lg font-bold text-slate-900 mt-1">{deal.value}</p>
                    <p className="text-sm text-slate-500">Probability: {deal.probability}%</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                    {deal.stage}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Related Tasks</h3>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            </div>
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">Due: {task.dueDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{contact.name}</h1>
              <p className="text-slate-600">{contact.role} at {contact.company}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                {contact.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'activities', label: 'Activities' },
            { id: 'deals', label: 'Deals' },
            { id: 'tasks', label: 'Tasks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default ContactDetail;