import { Contact } from '../store/slices/contactsSlice';

// Mock API functions - replace with actual API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockContacts: Contact[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    role: 'VP of Sales',
    location: 'New York, NY',
    status: 'active',
    lastContact: '2 days ago',
    dealValue: '$15,000',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    favorite: true,
    tags: ['Enterprise', 'Hot Lead'],
    notes: 'Key decision maker for enterprise solutions. Very interested in our platform integration capabilities.',
    createdDate: '2024-01-10',
    totalDeals: 3,
    totalValue: '$45,000',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@innovate.io',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Labs',
    role: 'CTO',
    location: 'San Francisco, CA',
    status: 'prospect',
    lastContact: '1 week ago',
    dealValue: '$8,500',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    favorite: false,
    tags: ['Tech', 'Startup'],
    notes: 'Technical lead interested in API integration.',
    createdDate: '2024-01-08',
    totalDeals: 1,
    totalValue: '$8,500',
  },
];

export const contactsApi = {
  getContacts: async (): Promise<Contact[]> => {
    await delay(500);
    return mockContacts;
  },

  getContact: async (id: number): Promise<Contact> => {
    await delay(300);
    const contact = mockContacts.find(c => c.id === id);
    if (!contact) throw new Error('Contact not found');
    return contact;
  },

  createContact: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    await delay(500);
    const newContact = {
      ...contact,
      id: Date.now(),
    };
    mockContacts.unshift(newContact);
    return newContact;
  },

  updateContact: async (id: number, updates: Partial<Contact>): Promise<Contact> => {
    await delay(500);
    const index = mockContacts.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Contact not found');
    
    mockContacts[index] = { ...mockContacts[index], ...updates };
    return mockContacts[index];
  },

  deleteContact: async (id: number): Promise<void> => {
    await delay(500);
    const index = mockContacts.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Contact not found');
    mockContacts.splice(index, 1);
  },
};