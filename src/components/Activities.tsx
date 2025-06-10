import React, { useState } from 'react';
import { Phone, Mail, Calendar, Video, Clock, Filter, Plus } from 'lucide-react';
import Modal from './ui/Modal';
import ActivityDetail from './ActivityDetail';

const Activities: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const [newActivity, setNewActivity] = useState({
    type: 'call',
    title: '',
    contact: '',
    company: '',
    date: '',
    time: '',
    duration: '',
    notes: ''
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'call',
      title: 'Follow-up call with Sarah Johnson',
      contact: 'Sarah Johnson',
      company: 'TechCorp Solutions',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '25 min',
      status: 'completed',
      notes: 'Discussed implementation timeline and budget approval process.'
    },
    {
      id: 2,
      type: 'email',
      title: 'Proposal sent to Mike Chen',
      contact: 'Mike Chen',
      company: 'Innovate Labs',
      date: '2024-01-15',
      time: '2:15 PM',
      duration: null,
      status: 'pending',
      notes: 'Sent detailed proposal with pricing options and implementation plan.'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Demo presentation for Emma Davis',
      contact: 'Emma Davis',
      company: 'Global Technologies',
      date: '2024-01-14',
      time: '3:00 PM',
      duration: '45 min',
      status: 'completed',
      notes: 'Successful demo. Client impressed with features and requested detailed quote.'
    },
    {
      id: 4,
      type: 'video',
      title: 'Video conference with Robert Wilson',
      contact: 'Robert Wilson',
      company: 'StartupX',
      date: '2024-01-14',
      time: '11:00 AM',
      duration: '30 min',
      status: 'missed',
      notes: 'Client did not join the scheduled call. Follow-up required.'
    }
  ]);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const activity = {
      id: activities.length + 1,
      ...newActivity,
      status: 'pending'
    };
    setActivities([activity, ...activities]);
    setNewActivity({
      type: 'call',
      title: '',
      contact: '',
      company: '',
      date: '',
      time: '',
      duration: '',
      notes: ''
    });
    setIsAddModalOpen(false);
  };

  const filteredActivities = activities.filter(activity => 
    selectedFilter === 'all' || activity.type === selectedFilter
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'video': return Video;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-700';
      case 'email': return 'bg-purple-100 text-purple-700';
      case 'meeting': return 'bg-green-100 text-green-700';
      case 'video': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Show activity detail if an activity is selected
  if (selectedActivityId) {
    return (
      <ActivityDetail 
        activityId={selectedActivityId} 
        onBack={() => setSelectedActivityId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activities</h1>
          <p className="text-slate-600 mt-2">Track all your sales activities and communications</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Log Activity</span>
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Activities</option>
            <option value="call">Calls</option>
            <option value="email">Emails</option>
            <option value="meeting">Meetings</option>
            <option value="video">Video Calls</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div 
              key={activity.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedActivityId(activity.id)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(activity.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{activity.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        {activity.contact} • {activity.company}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-slate-500">
                    <span>{activity.date}</span>
                    <span>{activity.time}</span>
                    {activity.duration && <span>{activity.duration}</span>}
                  </div>
                  
                  {activity.notes && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{activity.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No activities found matching your criteria.</p>
        </div>
      )}

      {/* Add Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log New Activity"
      >
        <form onSubmit={handleAddActivity} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Activity Type</label>
            <select
              value={newActivity.type}
              onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="call">Phone Call</option>
              <option value="email">Email</option>
              <option value="meeting">Meeting</option>
              <option value="video">Video Call</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Activity Title *</label>
            <input
              type="text"
              required
              value={newActivity.title}
              onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter activity title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person *</label>
              <input
                type="text"
                required
                value={newActivity.contact}
                onChange={(e) => setNewActivity({...newActivity, contact: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contact name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
              <input
                type="text"
                value={newActivity.company}
                onChange={(e) => setNewActivity({...newActivity, company: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
              <input
                type="date"
                required
                value={newActivity.date}
                onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
              <input
                type="time"
                value={newActivity.time}
                onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
              <input
                type="text"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30 min"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
            <textarea
              value={newActivity.notes}
              onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add notes about this activity..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log Activity
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Activities;