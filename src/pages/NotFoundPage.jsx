import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mt-20">
      <h1 className="text-6xl text-gray-600 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-2">Oops! Page not found.</p>
      <p className="text-lg text-gray-700 mb-8">The page you are looking for might be under construction.</p>
      <Link to="/" className="text-blue-500 hover:underline text-lg">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
