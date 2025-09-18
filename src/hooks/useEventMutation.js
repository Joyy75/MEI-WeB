import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://mei-mm.org/backend/api/v1';

export const useEventCreateMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/events`, data);
      return response.data;
    },
  });

export const useEventUpdateMutation = () =>
  useMutation({
    mutationFn: async ({ id, data }) => {
      data.append('_method', 'PUT');

      const response = await axios.post(`${baseUrl}/events/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
  });

export const useEventDeleteMutation = () =>
  useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${baseUrl}/events/${id}`);
      return response.data;
    },
  });

const fetchEvents = async ({ queryKey }) => {
  const [_key, page, searchTerm] = queryKey;
  const response = await axios.get(`${baseUrl}/events`, {
    params: { page, search: searchTerm || '' },
  });
  return response.data;
};

const fetchEvent = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const response = await axios.get(`${baseUrl}/events/${id}`);
  return response.data;
};

export const useEventsQuery = (page = 1, searchTerm = '') => {
  return useQuery({
    queryKey: ['events', page, searchTerm],
    queryFn: fetchEvents,
  });
};

export const useEventQuery = (id) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: fetchEvent,
    enabled: !!id,
  });
}; 