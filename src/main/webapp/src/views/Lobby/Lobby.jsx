import axios from "axios";
import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { gameExists } from "services/database-service";

export function Lobby() {
  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const current = players.length;
  const history = useHistory();

  const fetchPlayers = () => {
    axios
      .get(`http://localhost:8080/socialgame/ws/games/${pin}`, {
        headers: { Accept: "application/json" },
      })
      .then((res) => {
        if (Array.isArray(res?.data.players)) {
          setPlayers(res.data.players);
        }
      })
      .catch((err) => {
        console.log("Failed to fetch players");
        console.log(err);
      });
  };

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    fetchPlayers();
    checkIfGameExists();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <Navbar label="Lobby" onBackClickPath="/" />
      <Container>
        <LobbyInfo lobbyPin={pin} max={max} current={current} />
        <p>Game exists: {gameFound ? "yaa" : "naa"}</p>

        <div className="flex flex-wrap">
          {players.map((player) => {
            {
              console.log("--");
            }
            {
              console.log(player);
            }
            return <UserTile name={player.username} color="grass" />;
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
          <Link to="/present-word">
            <Button label="Start game" primary />
          </Link>
        </div>
      </Container>
    </div>
  );
}
