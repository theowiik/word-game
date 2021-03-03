import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { getRandomName } from 'lib/names';
import { useCallback, useEffect, useState } from "react";
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

  // const webSocket = new WebSocket("ws://localhost:8080/socialgame/players");
  // let webSocketSession;

  // const lobbyState = {
  //   JOIN: "JOIN",
  //   CHANGE_NAME: "CHANGE_NAME"
  // }

  //   webSocket.onerror = (event) => {
  //     onError(event);
  //   };

  //   webSocket.onopen = (event) => {
  //     onOpen(event);
  //   };

  //   webSocket.onmessage = (event) => {
  //     onMessage(event);
  //   };

  function onMessageReceived(event) {
    let eventPayload;
    try {
      console.log("Attempting to parse: ");
      console.log(event.data);
      eventPayload = JSON.parse(event.data);

      setPlayers(eventPayload.players);
    } catch (error) {
      console.log("Could not parse JSON");
    }
    console.log(eventPayload);
  }

  // function onOpen(event) {
  //   console.log("Established connection");
  // }

  // function onError(event) {
  //   console.log("An error occurred:" + event.data);
  // }

  // function send(payload) {
  //   webSocket.send(JSON.stringify(payload));
  // }

  const {
    sendMessage,
    lastMessage,
    readyState,
    
  } = useWebSocket("ws://localhost:8080/socialgame/players", { onOpen: () => console.log('Connection with WebSocket opened'), onMessage: (event) => onMessageReceived(event) });

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

  const joinGame = useCallback(() => {
    // join game
    sendMessage(
      JSON.stringify({
        eventType: lobbyState.JOIN,
        name: name ?? getRandomName(),
        pin: pin,
      }),
      []
    );
  });

  useEffect(() => {
    checkIfGameExists();
    joinGame();
  }, []);

  const coolButtonPressed = () => {
    console.log("sending packet");
    const payload = {
      name: "John Doe",
      game: pin,
      eventType: lobbyState.JOIN,
    };
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
          {players.map((player) => {
            return <UserTile name={player.name} color="peach" />;
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
