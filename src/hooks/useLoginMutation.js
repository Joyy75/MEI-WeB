import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = 'https://mei-mm.org/backend/api/auth'
export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/login`, {
        ...data,
        isAdmin: 1,
      });
      return response.data;
    },
  });
