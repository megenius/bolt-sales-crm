import { Activity } from '../store/slices/activitiesSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockActivities: Activity[] = [
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
    notes: 'Discussed implementation timeline and budget approval process.',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-18',
    participants: ['Sarah Johnson', 'John Doe'],
    tags: ['Follow-up', 'Implementation'],
    createdBy: 'John Doe',
    createdDate: '2024-01-15'
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
    notes: 'Sent detailed proposal with pricing options and implementation plan.',
    outcome: 'neutral',
    followUpRequired: false,
    participants: ['Mike Chen'],
    tags: ['Proposal', 'Pricing'],
    createdBy: 'Jane Smith',
    createdDate: '2024-01-15'
  },
];

export const activitiesApi = {
  getActivities: async (): Promise<Activity[]> => {
    await delay(500);
    return mockActivities;
  },

  getActivity: async (id: number): Promise<Activity> => {
    await delay(300);
    const activity = mockActivities.find(a => a.id === id);
    if (!activity) throw new Error('Activity not found');
    return activity;
  },

  createActivity: async (activity: Omit<Activity, 'id'>): Promise<Activity> => {
    await delay(500);
    const newActivity = {
      ...activity,
      id: Date.now(),
    };
    mockActivities.unshift(newActivity);
    return newActivity;
  },

  updateActivity: async (id: number, updates: Partial<Activity>): Promise<Activity> => {
    await delay(500);
    const index = mockActivities.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Activity not found');
    
    mockActivities[index] = { ...mockActivities[index], ...updates };
    return mockActivities[index];
  },

  deleteActivity: async (id: number): Promise<void> => {
    await delay(500);
    const index = mockActivities.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Activity not found');
    mockActivities.splice(index, 1);
  },
};