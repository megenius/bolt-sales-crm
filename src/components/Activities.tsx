import React, { useState } from 'react';
import { Phone, Mail, Calendar, Video, Clock, Filter, Plus } from 'lucide-react';

const Activities: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
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
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activities</h1>
          <p className="text-slate-600 mt-2">Track all your sales activities and communications</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
            <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
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
    </div>
  );
};

export default Activities;