import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://mei-mm.org/backend/api/v1';

export const useContactMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/contacts`, data);
      return response.data;
    },
  });

const fetchContacts = async ({ queryKey }) => {
  const [_key, page,searchTerm] = queryKey;
  const response = await axios.get(`${baseUrl}/contacts`, {
    params: { page , search: searchTerm || '',},
  });
  return response.data;
};

export const useContactsQuery = (page = 1, searchTerm = '') => {
  return useQuery({
    queryKey: ['contacts', page,searchTerm],
    queryFn: fetchContacts,
  });
};
