import { Link } from "react-router-dom";
import Button from "../components/button";
import Logo from "../components/logo";

function Home() {
  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-800 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Logo />

        <input
          className="appearance-none rounded-none rounded-lg mb-4 font-bold bg-gray-50 dark:bg-gray-700 border-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-elva-1-600 focus:border-elva-1-600 focus:z-10 sm:text-xl"
          placeholder="Game PIN"
        />
        <input
          className="appearance-none rounded-none rounded-lg mb-4 font-bold bg-gray-50 dark:bg-gray-700 border-none relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-elva-1-600 focus:border-elva-1-600 focus:z-10 sm:text-xl"
          placeholder="Your name"
        />

        <div className="bg-indigo-800  hover:bg-indigo-900 w-96 rounded-xl shadow-xl py-5">
          <Link to="/lobby">
            <a className="w-full h-full flex justify-center items-center text-white font-bold text-lg">
              Move to lobby
            </a>
          </Link>
        </div>

        <div className="mt-24">
          <Link to="/game-settings">
            <Button label="Create a game" secondary></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
