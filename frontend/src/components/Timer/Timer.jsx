import React from 'react';

export function Timer({ progress }) {
  
  return (
    <div className="w-full overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-100">
      <div
        style={{ width: `${100 - progress}%` }}
        className="transition-all ease-linear duration-1000 shadow-none whitespace-nowrap text-white justify-center bg-green-500"
      ></div>
    </div>
  );
}
