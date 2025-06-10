import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '../api/contacts';
import { Contact } from '../store/slices/contactsSlice';
import { useAppDispatch } from './useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';

export const useContacts = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: contactsApi.getContacts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createContactMutation = useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: (newContact) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) => [newContact, ...old]);
      dispatch(addNotification({
        type: 'success',
        message: 'Contact created successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to create contact',
      }));
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Contact> }) =>
      contactsApi.updateContact(id, updates),
    onSuccess: (updatedContact) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) =>
        old.map(contact => contact.id === updatedContact.id ? updatedContact : contact)
      );
      queryClient.setQueryData(['contact', updatedContact.id], updatedContact);
      dispatch(addNotification({
        type: 'success',
        message: 'Contact updated successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update contact',
      }));
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: contactsApi.deleteContact,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['contacts'], (old: Contact[] = []) =>
        old.filter(contact => contact.id !== deletedId)
      );
      queryClient.removeQueries({ queryKey: ['contact', deletedId] });
      dispatch(addNotification({
        type: 'success',
        message: 'Contact deleted successfully',
      }));
    },
    onError: () => {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete contact',
      }));
    },
  });

  return {
    contacts: contactsQuery.data || [],
    isLoading: contactsQuery.isLoading,
    error: contactsQuery.error,
    createContact: createContactMutation.mutate,
    updateContact: updateContactMutation.mutate,
    deleteContact: deleteContactMutation.mutate,
    isCreating: createContactMutation.isPending,
    isUpdating: updateContactMutation.isPending,
    isDeleting: deleteContactMutation.isPending,
  };
};

export const useContact = (id: number) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsApi.getContact(id),
    enabled: !!id,
  });
};