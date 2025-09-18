import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = 'https://mei-mm.org/backend/api/auth';

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/register`, data);
      return response.data;
    },
  });


