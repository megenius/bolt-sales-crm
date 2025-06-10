import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail, Calendar, Video, Clock, User, Building, MessageSquare, FileText } from 'lucide-react';

interface ActivityDetailProps {
  activityId: number;
  onBack: () => void;
}

const ActivityDetail: React.FC<ActivityDetailProps> = ({ activityId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock activity data - in real app, this would be fetched based on activityId
  const activity = {
    id: activityId,
    type: 'call',
    title: 'Follow-up call with Sarah Johnson',
    contact: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    date: '2024-01-15',
    time: '10:30 AM',
    duration: '25 min',
    status: 'completed',
    notes: 'Discussed implementation timeline and budget approval process. Sarah confirmed that the technical team is ready to proceed with the integration. Next steps: Send detailed implementation plan and schedule technical kickoff meeting.',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-18',
    participants: ['Sarah Johnson', 'John Doe'],
    tags: ['Follow-up', 'Implementation'],
    createdBy: 'John Doe',
    createdDate: '2024-01-15'
  };

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

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const Icon = getActivityIcon(activity.type);

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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{activity.title}</h1>
              <p className="text-slate-600">{activity.contact} • {activity.company}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getOutcomeColor(activity.outcome)}`}>
                  {activity.outcome}
                </span>
                {activity.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Activity Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Activity Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Date & Time</p>
                    <p className="font-medium text-slate-900">{activity.date} at {activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Duration</p>
                    <p className="font-medium text-slate-900">{activity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Contact</p>
                    <p className="font-medium text-slate-900">{activity.contact}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Company</p>
                    <p className="font-medium text-slate-900">{activity.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Created By</p>
                    <p className="font-medium text-slate-900">{activity.createdBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Created Date</p>
                    <p className="font-medium text-slate-900">{activity.createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Notes</h3>
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  defaultValue={activity.notes}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-end space-x-2">
                  <button className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 leading-relaxed">{activity.notes}</p>
            )}
          </div>

          {/* Participants */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Participants</h3>
            <div className="space-y-3">
              {activity.participants.map((participant, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {participant.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium text-slate-900">{participant}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Follow-up */}
          {activity.followUpRequired && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow-up Required</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Due: {activity.followUpDate}</span>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Follow-up Task
                </button>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span>Schedule Call</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Meeting</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            </div>
          </div>

          {/* Related Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Related</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Contact</p>
                <p className="text-sm text-slate-600">{activity.contact}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Company</p>
                <p className="text-sm text-slate-600">{activity.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;