import axios from "axios";
import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { getRandomName } from "lib/names";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { gameExists } from "services/database-service";
import { createStompClient } from "services/websocketService";

export function Lobby({ name }) {
  const websocketEndpointUrl = "http://localhost:8080/chat";
  const subscribeToEndpoint = "/topic/messages";
  const handleMessage = (message) => {
    setMessages((messages) => [...messages, JSON.parse(message.body)]);
  };

  const memoizedHandleMessage = useCallback(handleMessage, []);

  const stompClient = useMemo(
    () =>
      createStompClient(
        websocketEndpointUrl,
        subscribeToEndpoint,
        memoizedHandleMessage
      ),
    [websocketEndpointUrl, subscribeToEndpoint, memoizedHandleMessage]
  );

  useEffect(() => {
    console.log("i just shat myself");
  }, [stompClient]);

  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const current = players.length;
  const history = useHistory();
  const [messages, setMessages] = useState([]);

  const lobbyEvent = {
    JOIN: "JOIN",
    CHANGE_NAME: "CHANGE_NAME",
  };

  const sendMessageToWebsocket = () => {
    console.log("sending message to websocket");
    stompClient.send(
      "/app/chat",
      {},
      JSON.stringify({ from: "me", text: "you" })
    );
  };

  const colors = ["grass", "peach"];

  const authorizeGame = async () => {
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
    authorizeGame();
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
        <p>{`Game exists: ${gameFound}`}</p>

        <br />

        <button onClick={sendMessageToWebsocket} className="font-bold">
          send message
        </button>

        <br />
        <br />
        <p className="font-bold">Messages</p>
        <div>
          {messages.map((msg) => {
            return <p>{msg.state}</p>;
          })}
        </div>

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
