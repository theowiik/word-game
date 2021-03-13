import React, { useEffect, useState } from 'react';

export function Timer({ duration }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((progress) => progress - 1);
    }, duration);
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
