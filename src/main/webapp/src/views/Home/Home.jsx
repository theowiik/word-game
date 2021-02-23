import { Button, Input, Logo } from "components";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-800 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Logo />

        <Input id="pin" name="pin" placeholder="Game PIN" />
        <Input id="name" name="name" placeholder="Your name" />

        <div className="bg-indigo-800  hover:bg-indigo-900 w-96 rounded-xl shadow-xl py-4 mt-8">
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
