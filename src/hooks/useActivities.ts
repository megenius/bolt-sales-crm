import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { activitiesApi } from '../api/activities';
import { Activity } from '../store/slices/activitiesSlice';
import { useAppDispatch } from './useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';

export const useActivities = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const activitiesQuery = useQuery({
    queryKey: ['activities'],
    queryFn: activitiesApi.getActivities,
    staleTime: 5 * 60 * 1000,
  });

  const createActivityMutation = useMutation({
    mutationFn: activitiesApi.createActivity,
    onSuccess: (newActivity) => {
      queryClient.setQueryData(['activities'], (old: Activity[] = []) => [newActivity, ...old]);
      dispatch(addNotification({
        type: 'success',
        message: 'Activity logged successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to log activity',
      }));
    },
  });

  const updateActivityMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Activity> }) =>
      activitiesApi.updateActivity(id, updates),
    onSuccess: (updatedActivity) => {
      queryClient.setQueryData(['activities'], (old: Activity[] = []) =>
        old.map(activity => activity.id === updatedActivity.id ? updatedActivity : activity)
      );
      queryClient.setQueryData(['activity', updatedActivity.id], updatedActivity);
      dispatch(addNotification({
        type: 'success',
        message: 'Activity updated successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update activity',
      }));
    },
  });

  const deleteActivityMutation = useMutation({
    mutationFn: activitiesApi.deleteActivity,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['activities'], (old: Activity[] = []) =>
        old.filter(activity => activity.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: ['activity', deletedId] });
      dispatch(addNotification({
        type: 'success',
        message: 'Activity deleted successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete activity',
      }));
    },
  });

  return {
    activities: activitiesQuery.data || [],
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
    createActivity: createActivityMutation.mutate,
    updateActivity: updateActivityMutation.mutate,
    deleteActivity: deleteActivityMutation.mutate,
    isCreating: createActivityMutation.isPending,
    isUpdating: updateActivityMutation.isPending,
    isDeleting: deleteActivityMutation.isPending,
  };
};

export const useActivity = (id: number) => {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: () => activitiesApi.getActivity(id),
    enabled: !!id,
  });
};