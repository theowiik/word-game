import { Link } from 'react-router-dom';

/**
 * A template to display the top of every screen, sets label and redirect back button if needed
 * @param label title of the page
 * @param onBackClickPath what page to be redirected to
 * @returns {JSX.Element}
 * @constructor
 */
export function Navbar({ label, onBackClickPath }) {
  return (
    <div className="relative w-full pt-11">
      {onBackClickPath && (
        <div className='absolute top-10 sm:left-10'>
        <Link to={onBackClickPath}>
          <span className="bg-gray-600 py-2 px-4 rounded-full text-sm ml-5">
            Back to home
          </span>
        </Link>
        </div>
       
      )}

      <h1 className="mt-16 sm:mt-0 text-gray-50 text-4xl font-bold text-center">{label}</h1>
    </div>
  );
}
