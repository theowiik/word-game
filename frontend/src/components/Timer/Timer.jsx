import React, { useEffect, useState } from 'react';

export function Timer({ start, end }) {

  const [progress, setProgress] = useState(100);
  const totalTime = end - start;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(((end - new Date().getTime()) / totalTime) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="w-full overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-100">
      <div
        style={{ width: `${progress}%` }}
        className="transition-all ease-linear duration-1000 shadow-none whitespace-nowrap text-white justify-center bg-green-500"
      ></div>
    </div>
  );
}
