import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, TrashIcon } from '@heroicons/react/24/outline';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('search-history') || '[]');
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('search-history');
    setHistory([]);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 min-h-screen dark:bg-gray-950">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0 dark:text-white">Search History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center text-sm text-red-500 hover:text-red-700 self-start sm:self-center"
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            Clear History
          </button>
        )}
      </div>
      {history.length > 0 ? (
        <ul className="space-y-3">
          {history.map((term, index) => (
            <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-md">
              <Link to={`/search?q=${encodeURIComponent(term)}`} className="text-blue-600 hover:underline truncate mr-4 dark:text-white">
                {term}
              </Link>
              <ClockIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4 dark:text-white text-2xl">Your search history is empty.</p>
      )}
    </div>
  );
};

export default HistoryPage;
