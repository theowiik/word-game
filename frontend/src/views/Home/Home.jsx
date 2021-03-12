import { Button, Input, Logo } from "components";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { gameExists } from "services/database-service";


export function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pin = e.target.pin.value;
    
    if (await gameExists(pin)) {
      setMessage("Joining lobby");
      history.push(`/game/${pin}`);
    } else {
      setMessage(`Failed to find game with pin: ${pin}`);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gray-800 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Logo height="139" width="342" />

        {message && (
          <div className="h-10 bg-red-700 bg-opacity-50 text-white w-full mb-4 flex items-center justify-center rounded-lg">
            {message}
          </div>
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          <Input id="pin" name="pin" placeholder="Game PIN" />
          
          <div className="w-full mt-4">
            <Button label="Move to Lobby" primary large type="submit" />
          </div>
        </form>

        <div className="mt-24">
          <Link to="/game-settings">
            <Button label="Create a game" secondary></Button>
          </Link>
        </div>
      </div>

      {loading && (
        <div className="w-full h-full absolute top-0 left-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-white text-4xl font-bold">
          Loading game...
        </div>
      )}
    </div>
  );
}
