import { useEffect, useState } from 'react';

export const SnackBar = ({ message = '', type = 'info', trigger }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!visible) return null;

  const typeStyles = {
    success: 'card',
    error: 'bg-red-500 text-cyan',
    warning: 'bg-yellow-400 text-cyan',
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className={`px-6 py-3 rounded-md shadow-lg ${typeStyles[type]}`}>{message}</div>
    </div>
  );
};
