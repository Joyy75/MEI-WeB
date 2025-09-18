import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://mei-mm.org/backend/api/v1';

export const useVolunteerCreateMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/volunteers`, data);
      return response.data;
    },
  });

export const useVolunteerUpdateMutation = () =>
  useMutation({
    mutationFn: async ({ id, data }) => {
      data.append('_method', 'PUT');

      const response = await axios.post(`${baseUrl}/volunteers/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
  });

export const useVolunteerDeleteMutation = () =>
  useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${baseUrl}/volunteers/${id}`);
      return response.data;
    },
  });

const fetchVolunteers = async ({ queryKey }) => {
  const [_key, page, searchTerm ,isAll] = queryKey;
  const response = await axios.get(`${baseUrl}/volunteers`, {
    params: { page, search: searchTerm || '' , isAll : isAll || false },
  });
  return response.data;
};

const fetchVolunteer = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const response = await axios.get(`${baseUrl}/volunteers/${id}`);
  return response.data;
};

  export const useVolunteersQuery = (page = 1, searchTerm = '' , isAll = false) => {
    return useQuery({
      queryKey: ['volunteers', page, searchTerm , isAll],
      queryFn: fetchVolunteers,
    });
  };

export const useVolunteerQuery = (id) => {
  return useQuery({
    queryKey: ['volunteer', id],
    queryFn: fetchVolunteer,
    enabled: !!id,
  });
};
