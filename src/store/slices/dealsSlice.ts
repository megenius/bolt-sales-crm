import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Deal {
  id: string;
  title: string;
  value: string;
  contact: string;
  company: string;
  stage: 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  dueDate: string;
  createdDate: string;
  lastActivity: string;
  description: string;
  tags: string[];
  owner: string;
}

interface DealsState {
  deals: { [key: string]: Deal[] };
  loading: boolean;
  error: string | null;
  selectedDeal: Deal | null;
  editingDeal: Deal | null;
}

const initialState: DealsState = {
  deals: {
    qualified: [],
    proposal: [],
    negotiation: [],
    closed: [],
  },
  loading: false,
  error: null,
  selectedDeal: null,
  editingDeal: null,
};

const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setDeals: (state, action: PayloadAction<{ [key: string]: Deal[] }>) => {
      state.deals = action.payload;
    },
    addDeal: (state, action: PayloadAction<{ stage: string; deal: Deal }>) => {
      const { stage, deal } = action.payload;
      if (state.deals[stage]) {
        state.deals[stage].unshift(deal);
      }
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const deal = action.payload;
      // Find and update deal in any stage
      Object.keys(state.deals).forEach(stage => {
        const index = state.deals[stage].findIndex(d => d.id === deal.id);
        if (index !== -1) {
          state.deals[stage][index] = deal;
        }
      });
      if (state.selectedDeal?.id === deal.id) {
        state.selectedDeal = deal;
      }
    },
    moveDeal: (state, action: PayloadAction<{ dealId: string; fromStage: string; toStage: string; newIndex: number }>) => {
      const { dealId, fromStage, toStage, newIndex } = action.payload;
      const dealIndex = state.deals[fromStage].findIndex(d => d.id === dealId);
      
      if (dealIndex !== -1) {
        const [deal] = state.deals[fromStage].splice(dealIndex, 1);
        deal.stage = toStage as any;
        state.deals[toStage].splice(newIndex, 0, deal);
      }
    },
    deleteDeal: (state, action: PayloadAction<string>) => {
      Object.keys(state.deals).forEach(stage => {
        state.deals[stage] = state.deals[stage].filter(d => d.id !== action.payload);
      });
      if (state.selectedDeal?.id === action.payload) {
        state.selectedDeal = null;
      }
    },
    setSelectedDeal: (state, action: PayloadAction<Deal | null>) => {
      state.selectedDeal = action.payload;
    },
    setEditingDeal: (state, action: PayloadAction<Deal | null>) => {
      state.editingDeal = action.payload;
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
  setDeals,
  addDeal,
  updateDeal,
  moveDeal,
  deleteDeal,
  setSelectedDeal,
  setEditingDeal,
  setLoading,
  setError,
} = dealsSlice.actions;

export default dealsSlice.reducer;