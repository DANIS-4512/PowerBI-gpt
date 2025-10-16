import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4 animate-fade-in">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="w-full p-5 rounded-xl shadow-md bg-slate-800/50 flex items-center space-x-2 border border-slate-800">
            <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 bg-slate-500 rounded-full animate-pulse"></div>
        </div>
    </div>
  );
};