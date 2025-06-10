import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Calendar, User, Flag, Filter } from 'lucide-react';
import Modal from './ui/Modal';

const Tasks: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: 'John Doe',
    contact: '',
    dueDate: '',
    priority: 'medium'
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow up with Sarah Johnson about proposal',
      description: 'Call to discuss budget approval and implementation timeline',
      assignee: 'John Doe',
      contact: 'Sarah Johnson',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'pending',
      completed: false
    },
    {
      id: 2,
      title: 'Send contract to Mike Chen',
      description: 'Prepare and send final contract with negotiated terms',
      assignee: 'Jane Smith',
      contact: 'Mike Chen',
      dueDate: '2024-01-15',
      priority: 'medium',
      status: 'in-progress',
      completed: false
    },
    {
      id: 3,
      title: 'Schedule demo for Emma Davis',
      description: 'Book calendar slot for product demonstration',
      assignee: 'John Doe',
      contact: 'Emma Davis',
      dueDate: '2024-01-17',
      priority: 'low',
      status: 'pending',
      completed: false
    },
    {
      id: 4,
      title: 'Prepare quarterly sales report',
      description: 'Compile Q4 sales data and create presentation',
      assignee: 'Jane Smith',
      contact: null,
      dueDate: '2024-01-18',
      priority: 'high',
      status: 'completed',
      completed: true
    }
  ]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending',
      completed: false
    };
    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      assignee: 'John Doe',
      contact: '',
      dueDate: '',
      priority: 'medium'
    });
    setIsAddModalOpen(false);
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? 'completed' : 'pending' }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    switch (selectedFilter) {
      case 'pending': return !task.completed;
      case 'completed': return task.completed;
      case 'high': return task.priority === 'high';
      case 'overdue': 
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        return dueDate < today && !task.completed;
      default: return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusColor = (status: string, completed: boolean) => {
    if (completed) return 'bg-green-100 text-green-800';
    
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const isOverdue = (dueDate: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-slate-600 mt-2">Manage your sales tasks and automation workflows</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-600">Total Tasks</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{tasks.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {tasks.filter(t => !t.completed).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-600">Completed</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {tasks.filter(t => t.completed).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h3 className="text-sm font-medium text-slate-600">Overdue</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {tasks.filter(t => isOverdue(t.dueDate, t.completed)).length}
          </p>
        </div>
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
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
              isOverdue(task.dueDate, task.completed) ? 'border-red-200 bg-red-50' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start space-x-4">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 flex-shrink-0"
              >
                {task.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      <Flag className="w-3 h-3 inline mr-1" />
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status, task.completed)}`}>
                      {task.completed ? 'completed' : task.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                  {task.contact && (
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{task.contact}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className={isOverdue(task.dueDate, task.completed) ? 'text-red-600 font-medium' : ''}>
                      {task.dueDate}
                    </span>
                  </div>
                  {isOverdue(task.dueDate, task.completed) && (
                    <span className="text-red-600 font-medium text-xs">OVERDUE</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No tasks found matching your criteria.</p>
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Task"
      >
        <form onSubmit={handleAddTask} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Task Title *</label>
            <input
              type="text"
              required
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Assignee</label>
              <select
                value={newTask.assignee}
                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
              <input
                type="text"
                value={newTask.contact}
                onChange={(e) => setNewTask({...newTask, contact: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Related contact (optional)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
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
              Create Task
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tasks;