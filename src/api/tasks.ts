import { Task } from '../store/slices/tasksSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockTasks: Task[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
    title: 'Send contract to Mike Chen',
    description: 'Prepare and send final contract with negotiated terms',
    assignee: 'Jane Smith',
    contact: 'Mike Chen',
    company: 'Innovate Labs',
    dueDate: '2024-01-15',
    priority: 'medium',
    status: 'in-progress',
    completed: false,
    createdDate: '2024-01-12',
    createdBy: 'Jane Smith',
    estimatedTime: '1 hour',
    actualTime: '45 min',
    tags: ['Contract', 'Legal'],
    relatedDeal: 'API Integration Package',
    progress: 50
  },
];

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    await delay(500);
    return mockTasks;
  },

  getTask: async (id: number): Promise<Task> => {
    await delay(300);
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    await delay(500);
    const newTask = {
      ...task,
      id: Date.now(),
    };
    mockTasks.unshift(newTask);
    return newTask;
  },

  updateTask: async (id: number, updates: Partial<Task>): Promise<Task> => {
    await delay(500);
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = { ...mockTasks[index], ...updates };
    return mockTasks[index];
  },

  deleteTask: async (id: number): Promise<void> => {
    await delay(500);
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    mockTasks.splice(index, 1);
  },

  toggleTask: async (id: number): Promise<Task> => {
    await delay(300);
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    
    task.completed = !task.completed;
    task.status = task.completed ? 'completed' : 'pending';
    return task;
  },
};