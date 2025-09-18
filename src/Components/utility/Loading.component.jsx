import { CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center my-20 p-4">
      <CircularProgress color="cyan" />
    </div>
  );
};

