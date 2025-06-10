import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks';
import { Task } from '../store/slices/tasksSlice';
import { useAppDispatch } from './useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';

export const useTasks = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: tasksApi.getTasks,
    staleTime: 5 * 60 * 1000,
  });

  const createTaskMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) => [newTask, ...old]);
      dispatch(addNotification({
        type: 'success',
        message: 'Task created successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to create task',
      }));
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) =>
      tasksApi.updateTask(id, updates),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      queryClient.setQueryData(['task', updatedTask.id], updatedTask);
      dispatch(addNotification({
        type: 'success',
        message: 'Task updated successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update task',
      }));
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.filter(task => task.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: ['task', deletedId] });
      dispatch(addNotification({
        type: 'success',
        message: 'Task deleted successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete task',
      }));
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: tasksApi.toggleTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      dispatch(addNotification({
        type: 'success',
        message: `Task ${updatedTask.completed ? 'completed' : 'reopened'}`,
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update task',
      }));
    },
  });

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
    isToggling: toggleTaskMutation.isPending,
  };
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksApi.getTask(id),
    enabled: !!id,
  });
};