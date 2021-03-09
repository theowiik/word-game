import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import { Button, Container, LobbyInfo, Navbar, UserTile } from "components";
import { getRandomName } from "lib/names";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { gameExists } from "services/database-service";
import SockJS from "sockjs-client";

const websocketEndpointUrl = "http://localhost:8080/chat";
let socket = new SockJS(websocketEndpointUrl);
let stompClient = Stomp.over(socket);

export function Lobby({ name }) {
  const params = useParams();
  const pin = params.pin;
  const max = 10;
  const [players, setPlayers] = useState([]);
  const [gameFound, setGameFound] = useState(false);
  const current = players.length;
  const history = useHistory();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const lobbyEvent = {
    JOIN: "JOIN",
    CHANGE_NAME: "CHANGE_NAME",
  };

  const connectToWebsocket = () => {
    console.log("connecting to websocket");
    socket = new SockJS(websocketEndpointUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      setConnected(true);

      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/messages", (messageOutput) => {
        console.log("got response");
        console.log(JSON.parse(messageOutput.body));
      });
    });
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
        <p>{`Websocket is: ${connected ? "connected" : "not connected"}`} </p>

        <button onClick={connectToWebsocket} className="font-bold">
          connect to websocket
        </button>
        <br />
        <button onClick={sendMessageToWebsocket} className="font-bold">
          send message
        </button>

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
