import React from 'react';

interface UserDownloadStatsProps {
  remainingDownloads: number;
  totalDownloads: number;
}

const UserDownloadStats: React.FC<UserDownloadStatsProps> = ({ remainingDownloads, totalDownloads }) => {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">Download Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Remaining Free Downloads</p>
          <p className="text-3xl font-bold text-white">{remainingDownloads}</p>
        </div>
        <div>
          <p className="text-gray-400">Total Downloads</p>
          <p className="text-3xl font-bold text-white">{totalDownloads}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="bg-zinc-700 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-yellow-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(remainingDownloads / 20) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {remainingDownloads} / 20 free downloads remaining
        </p>
      </div>
    </div>
  );
};

export default UserDownloadStats;

