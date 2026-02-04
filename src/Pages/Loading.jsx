import React from 'react';

const Loading = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-25 to-white"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Glowing Orbital Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-pink-500 bg-opacity-20 rounded-full animate-ping"></div>
          <div className="relative w-16 h-16 border-4 border-t-transparent border-pink-400 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-pink-600 bg-opacity-10 rounded-full animate-pulse"></div>
        </div>
        {/* Minimalist Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-600 text-2xl font-bold tracking-wide font-['Inter']">
            Loading...
          </span>
          <span className="text-gray-400 text-sm font-medium animate-pulse">
            Crafting your experience
          </span>
        </div>
        {/* Subtle Progress Bars */}
        <div className="flex gap-2">
          <div className="w-3 h-8 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-8 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-8 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;