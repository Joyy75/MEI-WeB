import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  px-4 text-center">
      <img
        src="assets/not-found.svg"
        alt="Not Found"
        className="w-72 mb-6 animate-fade-in"
      />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="font-serif mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 card  rounded-xl shadow  transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

