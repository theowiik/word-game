import { Button, Input, Logo } from "components";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export function Home() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  

  const gameExists = (pin) => {
    Axios.get(`http://localhost:8080/socialgame/ws/games/${pin}`)
    .then((res) => {
      //if (Array.isArray(res.data)) setCategories(res.data);
    })
    .catch((err) => {
      console.log("Failed to find game");
      console.log(err);
    });
  }

  const handleSubmit = (e) => {


    e.preventDefault();
    setLoading(true);
    const pin = e.target.pin.value;
    const name = e.target.name.value;

    


  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-gray-800 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Logo />

        <form className="w-full" onSubmit={handleSubmit}>
          <Input id="pin" name="pin" placeholder="Game PIN" />
          <Input id="name" name="name" placeholder="Your name" />
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
    </div>
  );
}
