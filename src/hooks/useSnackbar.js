import { useState } from 'react';

export const useSnackbar = () => {
  const [snack, setSnack] = useState({
    message: '',
    type: 'info',
    trigger: false,
  });

  const showSnack = (message, type = 'info') => {
    setSnack({ message, type, trigger: true });
  };

  return { ...snack, showSnack };
};
