import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  location: string;
  status: 'active' | 'prospect' | 'inactive';
  lastContact: string;
  dealValue: string;
  avatar: string;
  favorite: boolean;
  tags: string[];
  notes?: string;
  createdDate: string;
  totalDeals: number;
  totalValue: string;
}

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  selectedContact: Contact | null;
  editingContact: Contact | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
  selectedContact: null,
  editingContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.unshift(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
      if (state.selectedContact?.id === action.payload.id) {
        state.selectedContact = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(c => c.id !== action.payload);
      if (state.selectedContact?.id === action.payload) {
        state.selectedContact = null;
      }
    },
    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.selectedContact = action.payload;
    },
    setEditingContact: (state, action: PayloadAction<Contact | null>) => {
      state.editingContact = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  setSelectedContact,
  setEditingContact,
  setLoading,
  setError,
} = contactsSlice.actions;

export default contactsSlice.reducer;