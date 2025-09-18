import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://mei-mm.org/backend/api/v1';

export const useCourseCreateMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/courses`, data);
      return response.data;
    },
  });

export const useCourseUpdateMutation = () =>
  useMutation({
    mutationFn: async ({ id, data }) => {
      data.append('_method', 'PUT');

      const response = await axios.post(`${baseUrl}/courses/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
  });

export const useCourseDeleteMutation = () =>
  useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${baseUrl}/courses/${id}`);
      return response.data;
    },
  });

const fetchCourses = async ({ queryKey }) => {
  const [_key, page, searchTerm] = queryKey;
  const response = await axios.get(`${baseUrl}/courses`, {
    params: { page, search: searchTerm || '' },
  });
  return response.data;
};

const fetchCourse = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const response = await axios.get(`${baseUrl}/courses/${id}`);
  return response.data;
};

export const useCoursesQuery = (page = 1, searchTerm = '') => {
  return useQuery({
    queryKey: ['courses', page, searchTerm],
    queryFn: fetchCourses,
  });
};

export const useCourseQuery = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: fetchCourse,
    enabled: !!id,
  });
}; 