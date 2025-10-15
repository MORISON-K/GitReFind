import React from 'react';
import { Link } from 'react-router-dom';
import type { Repo } from '../types';
import { StarIcon, QrCodeIcon, EyeIcon } from '@heroicons/react/24/outline';

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="flex items-center mb-2">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} className="w-8 h-8 rounded-full mr-3" />
        <Link to={`/repo/${repo.full_name}`} className="text-lg font-semibold text-blue-600 hover:underline break-all">
          {repo.full_name}
        </Link>
      </div>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{repo.description}</p>
      <div className="flex items-center text-sm text-gray-500 mt-auto">
        <div className="flex items-center mr-4">
          <StarIcon className="w-4 h-4 mr-1" />
          <span>{repo.stargazers_count}</span>
        </div>
        {repo.language && (
          <div className="flex items-center">
            <QrCodeIcon className="w-4 h-4 mr-1" />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="ml-auto">
          <Link to={`/repo/${repo.full_name}`} className="flex items-center text-blue-500 hover:text-blue-700">
            <EyeIcon className="w-4 h-4 mr-1" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
