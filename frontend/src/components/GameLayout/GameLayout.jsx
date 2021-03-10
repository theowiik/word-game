import React from "react";
import { Navbar } from "components/Navbar/Navbar";

function GameLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 flex justify-center items-center">
      <Navbar />
      {children}
    </div>
  );
}

export default GameLayout;
