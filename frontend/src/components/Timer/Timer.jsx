import React, { useEffect, useState } from 'react';


/**
 * The progress bar timer
 * @param start starttime
 * @param end endtime
 * @returns {JSX.Element}
 * @constructor
 */
export function Timer({ start, end }) {
  const [progress, setProgress] = useState(100);
  const duration = end - start;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => progress - 1);
    }, duration/100);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-100">
      <div
        style={{ width: `${progress}%` }}
        className="transition-all ease-linear duration-1000 shadow-none whitespace-nowrap text-white justify-center bg-green-500"
      ></div>
    </div>
  );
}
