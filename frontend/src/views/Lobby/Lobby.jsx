import axios from "axios";
import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { getRandomName } from "lib/names";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { gameExists } from "services/database-service";

export function Lobby({ name }) {
  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const current = players.length;
  const history = useHistory();

  const lobbyState = {
    JOIN: "JOIN",
    CHANGE_NAME: "CHANGE_NAME",
  };

  function onMessageReceived(event) {
    console.log("i got a message!!!!!!!");
    fetchPlayers();

    let eventPayload;
    try {
      console.log("Attempting to parse: ");
      console.log(event.data); //VI FÅR EN STRÄNG HÄR! INTE ETT OBJECT
      eventPayload = JSON.parse(event.data.players);
    } catch (error) {
      console.log("Could not parse JSON");
    }
    console.log(eventPayload);
  }

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080/ws/players",
    {
      onOpen: () => console.log("Connection with WebSocket opened"),
      onMessage: (event) => onMessageReceived(event),
    }
  );

  const colors = ["grass", "peach"];

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      history.push("/");
    }
  };

  const fetchPlayers = () => {
    axios
      .get(`/games/${pin}`, {
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

  const joinGame = () => {
    axios
      .post(`/games/${pin}/join/${getRandomName()}`, {})
      .then((res) => {
        console.log("wohoo ok! i joined the game");
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed to join game.");
        console.log(err);
      });
  };

  useEffect(() => {
    checkIfGameExists();
    joinGame();
  }, []);

  const coolButtonPressed = () => {
    console.log("sending to join with a post request");
    joinGame();
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <Navbar label="Lobby" onBackClickPath="/" />
      <Container>
        <LobbyInfo lobbyPin={pin} max={max} current={current} />
        <p>
          {`Game exists: ${
            gameFound ? "yaa" : "naa"
          } and websocket is: ${connectionStatus}`}{" "}
        </p>

        <div className="flex flex-wrap">
          {players.map((player, i) => {
            return (
              <div key={`player-${i}`}>
                <UserTile
                  name={player.name}
                  color={colors[i % colors.length]}
                />
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
          <button onClick={coolButtonPressed}>hello : )</button>
          <Link to="/present-word">
            <Button label="Start game" primary />
          </Link>
        </div>
      </Container>
    </div>
  );
}
