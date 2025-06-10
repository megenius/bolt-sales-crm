import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  contact: string | null;
  company?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  completed: boolean;
  createdDate: string;
  createdBy: string;
  estimatedTime?: string;
  actualTime?: string;
  tags?: string[];
  relatedDeal?: string;
  progress?: number;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
  editingTask: Task | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
  editingTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      if (state.selectedTask?.id === action.payload.id) {
        state.selectedTask = action.payload;
      }
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? 'completed' : 'pending';
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.selectedTask?.id === action.payload) {
        state.selectedTask = null;
      }
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setEditingTask: (state, action: PayloadAction<Task | null>) => {
      state.editingTask = action.payload;
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
  setTasks,
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  setSelectedTask,
  setEditingTask,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;