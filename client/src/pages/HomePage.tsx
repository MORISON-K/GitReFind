import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div className="text-center py-12 md:py-20 dark:text-white min-h-screen dark:bg-neutral-950">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 dark:text-white">
        Welcome to GitReFind
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto dark:text-white">
         Find what you need, faster and with more context today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/search"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-slate-800 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:slate-300 dark:bg-cyan-950 transition-transform transform hover:scale-105"
        >
          <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
          Start Searching
        </Link>
        <Link
          to="/history"
          className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          <ClockIcon className="h-5 w-5 mr-2" />
          View History
        </Link>
      </div>
    </div>
  );
};

export default Home;
