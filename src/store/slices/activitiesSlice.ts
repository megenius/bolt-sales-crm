import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Activity {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'video';
  title: string;
  contact: string;
  company: string;
  date: string;
  time: string;
  duration: string | null;
  status: 'completed' | 'pending' | 'missed';
  notes: string;
  outcome?: 'positive' | 'neutral' | 'negative';
  followUpRequired?: boolean;
  followUpDate?: string;
  participants?: string[];
  tags?: string[];
  createdBy?: string;
  createdDate?: string;
}

interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  selectedActivity: Activity | null;
  editingActivity: Activity | null;
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null,
  selectedActivity: null,
  editingActivity: null,
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.unshift(action.payload);
    },
    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.activities.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.activities[index] = action.payload;
      }
      if (state.selectedActivity?.id === action.payload.id) {
        state.selectedActivity = action.payload;
      }
    },
    deleteActivity: (state, action: PayloadAction<number>) => {
      state.activities = state.activities.filter(a => a.id !== action.payload);
      if (state.selectedActivity?.id === action.payload) {
        state.selectedActivity = null;
      }
    },
    setSelectedActivity: (state, action: PayloadAction<Activity | null>) => {
      state.selectedActivity = action.payload;
    },
    setEditingActivity: (state, action: PayloadAction<Activity | null>) => {
      state.editingActivity = action.payload;
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
  setActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  setSelectedActivity,
  setEditingActivity,
  setLoading,
  setError,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;