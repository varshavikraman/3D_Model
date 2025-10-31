import React from 'react';
import { Link } from 'react-router-dom';

const ModelCard = ({ model }) => {

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="group p-6 rounded-xl border border-white/10 bg-gray-800/50 hover:-translate-y-1 hover:border-purple-600/30 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent flex-1 mr-2" title={model.name}>
          {model.name}
        </h3>
      </div>

      <div className="mb-5 rounded-xl border border-white/10 overflow-hidden relative bg-gradient-to-b from-gray-900/70 to-gray-800/50">
        {model.thumbnailUrl ? (
          <img
            src={model.thumbnailUrl}
            alt={model.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-500 text-sm">
            <svg
              className="w-10 h-10 text-gray-600 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 3v4M8 3v4m-5 4h18"
              />
            </svg>
            No Thumbnail
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70"></div>

        <div className="absolute bottom-2 left-2 text-white/90 text-sm font-medium drop-shadow-md">
          {model.name.length > 20 ? model.name.slice(0, 20) + "..." : model.name}
        </div>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-300">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <span>{formatFileSize(model.fileSize)}</span>
        </div>

        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{formatDate(model.uploadDate)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link
          to={`/viewer/${model._id}`}
          className="flex-1 border border-purple-600/50 text-purple-600 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-purple-600/10 flex items-center justify-center "
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View in 3D
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;