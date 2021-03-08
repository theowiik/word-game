import { Link } from "react-router-dom";
import {Button } from 'components';

export function Navbar({ label, onBackClickPath }) {
  return (
    <div className="relative w-full flex justify-center items-center pt-11">
      <div className="absolute left-0 ml-20">
        <Link to="/">
          <Button label='Go back' secondary/>
        </Link>
      </div>
      <h1 className="text-gray-800 dark:text-gray-50 text-4xl font-bold">{label}</h1>
    </div>
  );
}
