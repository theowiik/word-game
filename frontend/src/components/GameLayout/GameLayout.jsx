import React from "react";
import { Navbar } from "components/Navbar/Navbar";

export const GameLayout = ({ children }) => {
  return (
    <div className=" bg-white text-gray-800 dark:text-white dark:bg-gray-800">
      <Navbar label="Rappakalja" />
      <div className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};
