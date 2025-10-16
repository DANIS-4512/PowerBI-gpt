import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-800 bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 flex items-center gap-3">
       <div className="p-1.5 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
      </div>
      <h1 className="text-lg font-semibold text-slate-200">
        PowerBI-VisualGPT
      </h1>
    </header>
  );
};