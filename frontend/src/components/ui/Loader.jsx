import React from 'react';

const Loader = ({ label = 'Loading...', className = '' }) => (
  <div className={`flex flex-col items-center justify-center py-16 text-slate-400 ${className}`}>
    <div className="w-10 h-10 border-4 border-slate-200 border-t-[#284A50] rounded-full animate-spin mb-4" />
    <p className="text-sm font-semibold">{label}</p>
  </div>
);

export default Loader;
