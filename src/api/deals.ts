import { Deal } from '../store/slices/dealsSlice';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockDeals: { [key: string]: Deal[] } = {
  'qualified': [
    { 
      id: '1', 
      title: 'Acme Corp Integration', 
      value: '$15,000', 
      contact: 'Sarah Johnson', 
      company: 'Acme Corp',
      stage: 'qualified',
      probability: 25,
      dueDate: '2024-02-15',
      createdDate: '2024-01-10',
      lastActivity: '2 days ago',
      description: 'Enterprise integration package for Acme Corp',
      tags: ['Enterprise', 'Integration'],
      owner: 'John Doe'
    },
  ],
  'proposal': [
    { 
      id: '3', 
      title: 'Global Solutions Suite', 
      value: '$22,000', 
      contact: 'Emma Davis', 
      company: 'Global Solutions',
      stage: 'proposal',
      probability: 65,
      dueDate: '2024-02-10',
      createdDate: '2024-01-05',
      lastActivity: '1 day ago',
      description: 'Complete software suite for Global Solutions',
      tags: ['Suite', 'Enterprise'],
      owner: 'Jane Smith'
    },
  ],
  'negotiation': [
    { 
      id: '5', 
      title: 'Enterprise Package', 
      value: '$35,000', 
      contact: 'Lisa Anderson', 
      company: 'Enterprise Corp',
      stage: 'negotiation',
      probability: 80,
      dueDate: '2024-02-08',
      createdDate: '2024-01-01',
      lastActivity: '3 hours ago',
      description: 'Large enterprise package with custom features',
      tags: ['Enterprise', 'Custom'],
      owner: 'John Doe'
    },
  ],
  'closed': [
    { 
      id: '6', 
      title: 'Startup Package', 
      value: '$5,500', 
      contact: 'David Kim', 
      company: 'Startup Inc',
      stage: 'closed',
      probability: 100,
      dueDate: '2024-01-30',
      createdDate: '2023-12-15',
      lastActivity: '1 week ago',
      description: 'Basic package for startup company',
      tags: ['Startup', 'Basic'],
      owner: 'Jane Smith'
    },
  ]
};

export const dealsApi = {
  getDeals: async (): Promise<{ [key: string]: Deal[] }> => {
    await delay(500);
    return mockDeals;
  },

  getDeal: async (id: string): Promise<Deal> => {
    await delay(300);
    for (const stage of Object.values(mockDeals)) {
      const deal = stage.find(d => d.id === id);
      if (deal) return deal;
    }
    throw new Error('Deal not found');
  },

  createDeal: async (deal: Omit<Deal, 'id'>): Promise<Deal> => {
    await delay(500);
    const newDeal = {
      ...deal,
      id: Date.now().toString(),
    };
    mockDeals[deal.stage].unshift(newDeal);
    return newDeal;
  },

  updateDeal: async (id: string, updates: Partial<Deal>): Promise<Deal> => {
    await delay(500);
    for (const stage of Object.keys(mockDeals)) {
      const index = mockDeals[stage].findIndex(d => d.id === id);
      if (index !== -1) {
        mockDeals[stage][index] = { ...mockDeals[stage][index], ...updates };
        return mockDeals[stage][index];
      }
    }
    throw new Error('Deal not found');
  },

  deleteDeal: async (id: string): Promise<void> => {
    await delay(500);
    for (const stage of Object.keys(mockDeals)) {
      const index = mockDeals[stage].findIndex(d => d.id === id);
      if (index !== -1) {
        mockDeals[stage].splice(index, 1);
        return;
      }
    }
    throw new Error('Deal not found');
  },

  moveDeal: async (dealId: string, fromStage: string, toStage: string, newIndex: number): Promise<void> => {
    await delay(300);
    const dealIndex = mockDeals[fromStage].findIndex(d => d.id === dealId);
    if (dealIndex !== -1) {
      const [deal] = mockDeals[fromStage].splice(dealIndex, 1);
      deal.stage = toStage as any;
      mockDeals[toStage].splice(newIndex, 0, deal);
    }
  },
};