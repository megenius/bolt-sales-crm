import React, { useState } from 'react';
import { ArrowLeft, Edit, Trash2, CheckSquare, Square, Calendar, User, Flag, Clock, MessageSquare, FileText, Plus } from 'lucide-react';

interface TaskDetailProps {
  taskId: number;
  onBack: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ taskId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock task data - in real app, this would be fetched based on taskId
  const task = {
    id: taskId,
    title: 'Follow up with Sarah Johnson about proposal',
    description: 'Call to discuss budget approval and implementation timeline. Need to address any concerns and move forward with contract negotiation.',
    assignee: 'John Doe',
    contact: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    dueDate: '2024-01-16',
    priority: 'high',
    status: 'in-progress',
    completed: false,
    createdDate: '2024-01-10',
    createdBy: 'John Doe',
    estimatedTime: '2 hours',
    actualTime: '1.5 hours',
    tags: ['Follow-up', 'Proposal'],
    relatedDeal: 'Enterprise Integration Package',
    progress: 75
  };

  const comments = [
    { id: 1, author: 'John Doe', date: '2024-01-15', text: 'Called Sarah, she needs to discuss with her team. Following up tomorrow.' },
    { id: 2, author: 'Jane Smith', date: '2024-01-14', text: 'Proposal has been reviewed by technical team. Waiting for budget approval.' }
  ];

  const subtasks = [
    { id: 1, title: 'Prepare call agenda', completed: true },
    { id: 2, title: 'Review proposal details', completed: true },
    { id: 3, title: 'Schedule follow-up call', completed: false },
    { id: 4, title: 'Send meeting summary', completed: false }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const isOverdue = () => {
    const today = new Date();
    const due = new Date(task.dueDate);
    return due < today && !task.completed;
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
            <button className="flex-shrink-0">
              {task.completed ? (
                <CheckSquare className="w-8 h-8 text-green-600" />
              ) : (
                <Square className="w-8 h-8 text-slate-400 hover:text-slate-600" />
              )}
            </button>
            <div>
              <h1 className={`text-2xl font-bold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                {task.title}
              </h1>
              <p className="text-slate-600">{task.contact} • {task.company}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {isOverdue() ? 'overdue' : task.status}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                  <Flag className="w-3 h-3 inline mr-1" />
                  {task.priority}
                </span>
                {task.tags.map((tag, index) => (
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

      {/* Task Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Task Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Assignee</p>
                    <p className="font-medium text-slate-900">{task.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className={`font-medium ${isOverdue() ? 'text-red-600' : 'text-slate-900'}`}>
                      {task.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Estimated Time</p>
                    <p className="font-medium text-slate-900">{task.estimatedTime}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Created By</p>
                    <p className="font-medium text-slate-900">{task.createdBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Created Date</p>
                    <p className="font-medium text-slate-900">{task.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Time Spent</p>
                    <p className="font-medium text-slate-900">{task.actualTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Completion</span>
                  <span className="text-sm font-medium text-slate-900">{task.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Description</h3>
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  defaultValue={task.description}
                  rows={4}
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
              <p className="text-slate-700 leading-relaxed">{task.description}</p>
            )}
          </div>

          {/* Subtasks */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Subtasks</h3>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4" />
                <span>Add Subtask</span>
              </button>
            </div>
            <div className="space-y-3">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    checked={subtask.completed}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className={`${subtask.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Comments</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-slate-900">{comment.author}</span>
                    <span className="text-sm text-slate-500">{comment.date}</span>
                  </div>
                  <p className="text-slate-700 mt-1">{comment.text}</p>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <textarea
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <CheckSquare className="w-4 h-4" />
                <span>Mark Complete</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Reschedule</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <User className="w-4 h-4" />
                <span>Reassign</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Add Comment</span>
              </button>
            </div>
          </div>

          {/* Related Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Related</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Contact</p>
                <p className="text-sm text-slate-600">{task.contact}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium text-slate-900">Deal</p>
                <p className="text-sm text-slate-600">{task.relatedDeal}</p>
              </div>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Time Tracking</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Estimated</span>
                <span className="text-sm font-medium text-slate-900">{task.estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Actual</span>
                <span className="text-sm font-medium text-slate-900">{task.actualTime}</span>
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Start Timer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;