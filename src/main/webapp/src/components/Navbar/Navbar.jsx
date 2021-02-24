import { Link } from "react-router-dom";

export function Navbar({ label, onBackClickPath }) {
  return (
    <div className="relative w-full flex justify-center pt-11">
      <div className="absolute left-0 ml-20">
        <Link to="/">
          <a>Go back</a>
        </Link>
      </div>
      <h1 className="text-gray-50 text-4xl font-bold">{label}</h1>
    </div>
  );
}
