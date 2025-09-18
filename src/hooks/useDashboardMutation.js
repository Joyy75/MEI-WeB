import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const baseUrl = 'https://mei-mm.org/backend/api/v1';

const fetchDashboard = async ({ queryKey }) => {
  const [_key] = queryKey;
  const response = await axios.get(`${baseUrl}/dashboard`);
  return response.data;
};

export const useDashboardQuery = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });
};
