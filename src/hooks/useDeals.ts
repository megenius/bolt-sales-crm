import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealsApi } from '../api/deals';
import { Deal } from '../store/slices/dealsSlice';
import { useAppDispatch } from './useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';

export const useDeals = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const dealsQuery = useQuery({
    queryKey: ['deals'],
    queryFn: dealsApi.getDeals,
    staleTime: 5 * 60 * 1000,
  });

  const createDealMutation = useMutation({
    mutationFn: dealsApi.createDeal,
    onSuccess: (newDeal) => {
      queryClient.setQueryData(['deals'], (old: { [key: string]: Deal[] } = {}) => ({
        ...old,
        [newDeal.stage]: [newDeal, ...(old[newDeal.stage] || [])],
      }));
      dispatch(addNotification({
        type: 'success',
        message: 'Deal created successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to create deal',
      }));
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Deal> }) =>
      dealsApi.updateDeal(id, updates),
    onSuccess: (updatedDeal) => {
      queryClient.setQueryData(['deals'], (old: { [key: string]: Deal[] } = {}) => {
        const newData = { ...old };
        Object.keys(newData).forEach(stage => {
          newData[stage] = newData[stage].map(deal => 
            deal.id === updatedDeal.id ? updatedDeal : deal
          );
        });
        return newData;
      });
      queryClient.setQueryData(['deal', updatedDeal.id], updatedDeal);
      dispatch(addNotification({
        type: 'success',
        message: 'Deal updated successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update deal',
      }));
    },
  });

  const deleteDealMutation = useMutation({
    mutationFn: dealsApi.deleteDeal,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['deals'], (old: { [key: string]: Deal[] } = {}) => {
        const newData = { ...old };
        Object.keys(newData).forEach(stage => {
          newData[stage] = newData[stage].filter(deal => deal.id !== deletedId);
        });
        return newData;
      });
      queryClient.removeQueries({ queryKey: ['deal', deletedId] });
      dispatch(addNotification({
        type: 'success',
        message: 'Deal deleted successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete deal',
      }));
    },
  });

  const moveDealMutation = useMutation({
    mutationFn: ({ dealId, fromStage, toStage, newIndex }: {
      dealId: string;
      fromStage: string;
      toStage: string;
      newIndex: number;
    }) => dealsApi.moveDeal(dealId, fromStage, toStage, newIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
    },
  });

  return {
    deals: dealsQuery.data || {},
    isLoading: dealsQuery.isLoading,
    error: dealsQuery.error,
    createDeal: createDealMutation.mutate,
    updateDeal: updateDealMutation.mutate,
    deleteDeal: deleteDealMutation.mutate,
    moveDeal: moveDealMutation.mutate,
    isCreating: createDealMutation.isPending,
    isUpdating: updateDealMutation.isPending,
    isDeleting: deleteDealMutation.isPending,
    isMoving: moveDealMutation.isPending,
  };
};

export const useDeal = (id: string) => {
  return useQuery({
    queryKey: ['deal', id],
    queryFn: () => dealsApi.getDeal(id),
    enabled: !!id,
  });
};