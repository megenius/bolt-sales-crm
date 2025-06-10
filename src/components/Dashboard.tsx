import React, { useState } from 'react';
import { TrendingUp, Users, Target, DollarSign, ArrowUp, ArrowDown, Calendar, Phone, Mail, Clock } from 'lucide-react';
import MetricCard from './ui/MetricCard';
import Chart from './ui/Chart';
import Modal from './ui/Modal';

const Dashboard: React.FC = () => {
  const [isQuickActionModalOpen, setIsQuickActionModalOpen] = useState(false);
  const [quickActionType, setQuickActionType] = useState('');

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green' as const
    },
    {
      title: 'Active Deals',
      value: '45',
      change: '+8.2%',
      trend: 'up' as const,
      icon: Target,
      color: 'blue' as const
    },
    {
      title: 'New Leads',
      value: '124',
      change: '+15.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'purple' as const
    },
    {
      title: 'Conversion Rate',
      value: '23.5%',
      change: '-2.1%',
      trend: 'down' as const,
      icon: TrendingUp,
      color: 'red' as const
    }
  ];

  const recentDeals = [
    { company: 'Acme Corp', value: '$15,000', stage: 'Negotiation', probability: 80, contact: 'Sarah Johnson' },
    { company: 'TechStart Inc', value: '$8,500', stage: 'Proposal', probability: 65, contact: 'Mike Chen' },
    { company: 'Global Solutions', value: '$22,000', stage: 'Discovery', probability: 40, contact: 'Emma Davis' },
    { company: 'Innovation Labs', value: '$12,000', stage: 'Qualified', probability: 25, contact: 'Robert Wilson' }
  ];

  const activities = [
    { type: 'Call', contact: 'Sarah Johnson', time: '2 hours ago', status: 'completed', icon: Phone },
    { type: 'Email', contact: 'Mike Chen', time: '4 hours ago', status: 'pending', icon: Mail },
    { type: 'Meeting', contact: 'Emma Davis', time: '1 day ago', status: 'completed', icon: Calendar },
    { type: 'Call', contact: 'Robert Wilson', time: '2 days ago', status: 'missed', icon: Phone }
  ];

  const upcomingTasks = [
    { task: 'Follow up with Acme Corp', time: 'Today 2:00 PM', priority: 'high' },
    { task: 'Send proposal to TechStart', time: 'Tomorrow 10:00 AM', priority: 'medium' },
    { task: 'Demo for Global Solutions', time: 'Friday 3:00 PM', priority: 'high' },
    { task: 'Quarterly review meeting', time: 'Next Monday', priority: 'low' }
  ];

  const handleQuickAction = (actionType: string) => {
    setQuickActionType(actionType);
    setIsQuickActionModalOpen(true);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Proposal': return 'bg-blue-100 text-blue-800';
      case 'Discovery': return 'bg-purple-100 text-purple-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const renderQuickActionForm = () => {
    switch (quickActionType) {
      case 'contact':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter contact name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter company" />
            </div>
          </form>
        );
      case 'deal':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Deal Title</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter deal title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Value</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="$10,000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Contact person" />
            </div>
          </form>
        );
      case 'meeting':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Title</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter meeting title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date & Time</label>
              <input type="datetime-local" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Attendees</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter attendee emails" />
            </div>
          </form>
        );
      case 'email':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter recipient email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter subject" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your message"></textarea>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Good morning, John! 👋</h1>
            <p className="text-blue-100 mt-2 text-lg">Here's what's happening with your sales today.</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Today's Date</p>
            <p className="text-xl font-semibold">{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart - Takes 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Sales Performance</h3>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                7 Days
              </button>
              <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                30 Days
              </button>
              <button className="px-3 py-1 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                90 Days
              </button>
            </div>
          </div>
          <Chart />
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Upcoming Tasks</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{task.task}</p>
                  <p className="text-xs text-slate-500 mt-1">{task.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Deals and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Deals */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Deals</h3>
            <Target className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentDeals.map((deal, index) => (
              <div key={index} className="group p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-slate-900">{deal.company}</p>
                    <p className="text-sm text-slate-500">{deal.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{deal.value}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Probability</span>
                  <span className="text-sm font-medium text-slate-900">{deal.probability}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Recent Activities</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.type} with {activity.contact}
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('contact')}
            className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
          >
            <Users className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-blue-900">Add Contact</span>
          </button>
          <button 
            onClick={() => handleQuickAction('deal')}
            className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
          >
            <Target className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-900">Create Deal</span>
          </button>
          <button 
            onClick={() => handleQuickAction('meeting')}
            className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group"
          >
            <Calendar className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-900">Schedule Meeting</span>
          </button>
          <button 
            onClick={() => handleQuickAction('email')}
            className="flex flex-col items-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
          >
            <Mail className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-orange-900">Send Email</span>
          </button>
        </div>
      </div>

      {/* Quick Action Modal */}
      <Modal
        isOpen={isQuickActionModalOpen}
        onClose={() => setIsQuickActionModalOpen(false)}
        title={`Quick ${quickActionType.charAt(0).toUpperCase() + quickActionType.slice(1)}`}
      >
        {renderQuickActionForm()}
        <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-slate-200">
          <button
            onClick={() => setIsQuickActionModalOpen(false)}
            className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;