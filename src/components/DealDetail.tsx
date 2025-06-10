import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, DollarSign, Calendar, User, Target, Activity, Plus, MessageSquare, FileText, TrendingUp } from 'lucide-react';

interface DealDetailProps {
  dealId: string;
  onBack: () => void;
}

const DealDetail: React.FC<DealDetailProps> = ({ dealId, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock deal data - in real app, this would be fetched based on dealId
  const deal = {
    id: dealId,
    title: 'Enterprise Integration Package',
    value: '$25,000',
    contact: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    stage: 'Negotiation',
    probability: 80,
    dueDate: '2024-02-15',
    createdDate: '2024-01-10',
    lastActivity: '2 days ago',
    description: 'Complete enterprise integration package including platform setup, data migration, and training.',
    tags: ['Enterprise', 'High Value'],
    owner: 'John Doe'
  };

  const stageHistory = [
    { stage: 'Qualified', date: '2024-01-10', probability: 25 },
    { stage: 'Proposal', date: '2024-01-15', probability: 50 },
    { stage: 'Negotiation', date: '2024-01-20', probability: 80 }
  ];

  const activities = [
    { id: 1, type: 'call', title: 'Contract negotiation call', date: '2024-01-22', duration: '45 min', notes: 'Discussed pricing and implementation timeline' },
    { id: 2, type: 'email', title: 'Updated proposal sent', date: '2024-01-20', notes: 'Sent revised proposal with new pricing structure' },
    { id: 3, type: 'meeting', title: 'Technical requirements meeting', date: '2024-01-18', duration: '60 min', notes: 'Detailed technical discussion with IT team' }
  ];

  const tasks = [
    { id: 1, title: 'Prepare final contract', dueDate: '2024-01-25', priority: 'high', completed: false, assignee: 'John Doe' },
    { id: 2, title: 'Schedule implementation kickoff', dueDate: '2024-01-28', priority: 'medium', completed: false, assignee: 'Jane Smith' },
    { id: 3, title: 'Send technical documentation', dueDate: '2024-01-23', priority: 'high', completed: true, assignee: 'John Doe' }
  ];

  const documents = [
    { id: 1, name: 'Initial Proposal.pdf', type: 'proposal', uploadDate: '2024-01-15', size: '2.4 MB' },
    { id: 2, name: 'Technical Requirements.docx', type: 'requirements', uploadDate: '2024-01-18', size: '1.8 MB' },
    { id: 3, name: 'Contract Draft.pdf', type: 'contract', uploadDate: '2024-01-22', size: '3.1 MB' }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Qualified': return 'bg-blue-100 text-blue-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Deal Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Deal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Deal Value</p>
                      <p className="text-2xl font-bold text-slate-900">{deal.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Probability</p>
                      <p className="font-medium text-slate-900">{deal.probability}%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Contact</p>
                      <p className="font-medium text-slate-900">{deal.contact}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Expected Close</p>
                      <p className="font-medium text-slate-900">{deal.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Last Activity</p>
                      <p className="font-medium text-slate-900">{deal.lastActivity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Deal Owner</p>
                      <p className="font-medium text-slate-900">{deal.owner}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Description</h3>
              <p className="text-slate-700">{deal.description}</p>
            </div>

            {/* Stage Progress */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Stage History</h3>
              <div className="space-y-4">
                {stageHistory.map((stage, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900">{stage.stage}</span>
                        <span className="text-sm text-slate-500">{stage.date}</span>
                      </div>
                      <p className="text-sm text-slate-500">Probability: {stage.probability}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Deal Activities</h3>
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

      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Deal Tasks</h3>
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
                    <p className="text-sm text-slate-500 mt-1">
                      Due: {task.dueDate} • Assigned to: {task.assignee}
                    </p>
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

      case 'documents':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Documents</h3>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">{doc.name}</h4>
                      <p className="text-sm text-slate-500">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Download
                    </button>
                    <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{deal.title}</h1>
              <p className="text-slate-600">{deal.contact} • {deal.company}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStageColor(deal.stage)}`}>
                  {deal.stage}
                </span>
                {deal.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900">{deal.value}</p>
              <p className="text-sm text-slate-500">{deal.probability}% probability</p>
              <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${deal.probability}%` }}
                />
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
            { id: 'tasks', label: 'Tasks' },
            { id: 'documents', label: 'Documents' }
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

export default DealDetail;