import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { RepoDetails } from '../types';
import { StarIcon, BeakerIcon, ArrowLeftIcon, QrCodeIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const RepoDetail: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [details, setDetails] = useState<RepoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/repos/${owner}/${repo}/`);
        setDetails(response.data);
      } catch (err) {
        setError('Failed to fetch repository details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (owner && repo) {
      fetchDetails();
    }
  }, [owner, repo]);

  if (loading) return <p className="text-center">Loading repository details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!details) return <p className="text-center">Repository not found.</p>;

  return (
    <div className='min-h-screen'>
      <Link to="/search" className="inline-flex items-center mb-6 text-blue-600 dark:text-teal-50 hover:underline">
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to Search
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-8 dark:bg-slate-950 dark:text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 break-all mb-2 sm:mb-0 dark:text-white">{details.full_name}</h1>
          <a href={details.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:hover:bg-slate-50 self-start sm:self-center dark:text-slate-400">
            <EyeIcon className="h-6 w-6" />
          </a>
        </div>

        <p className="text-gray-600 mb-6 dark:text-white">{details.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
          <div className="p-4 bg-gray-100 rounded-lg">
            <StarIcon className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
            <p className="font-semibold">{details.stargazers_count.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Stars</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <BeakerIcon className="h-6 w-6 mx-auto text-green-500 mb-1" />
            <p className="font-semibold">{details.forks_count.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Forks</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <QrCodeIcon className="h-6 w-6 mx-auto text-purple-500 mb-1" />
            <p className="font-semibold">{details.language}</p>
            <p className="text-sm text-gray-500">Language</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <EyeIcon className="h-6 w-6 mx-auto text-red-500 mb-1" />
            <p className="font-semibold">{details.subscribers_count.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Watchers</p>
          </div>
        </div>

        {details.readme_html && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <DocumentTextIcon className="h-6 w-6 mr-2" />
              README.md
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: details.readme_html }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoDetail;
