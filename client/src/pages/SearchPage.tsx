import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import type { Repo } from '../types';
import RepoCard from '../components/RepoCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchParams({ q: query });

    try {
      const response = await axios.get<{ items: Repo[] }>(`/api/search/`, { params: { q: query } });
      setResults(response.data.items || response.data || []);
      
      const history = JSON.parse(localStorage.getItem('search-history') || '[]');
      const newHistory = [query, ...history.filter((item: string) => item !== query)].slice(0, 10);
      localStorage.setItem('search-history', JSON.stringify(newHistory));
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[30vh] px-4 py-10">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GitHub repositories..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map(repo => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
