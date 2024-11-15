import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-red-600 border-solid-10 w-8 h-8 rounded-full animate-spin"></div>
      <p className="font-bold text-sm ml-2">Loading...</p>
    </div>
  );
}

export default Loader;
