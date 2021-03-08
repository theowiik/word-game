import axios from "axios";
import { Button, UserTile } from "components";
import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export function PresentWord() {
  const [word, setWord] = useState("DEFAULTWORD");
  const [progress, setProgress] = useState(100);

  const [hasPosted, setHasPosted] = useState(false);

  const players = [
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
  ];

  function onMessageReceived(event) {
    console.log("PResent word got a message");

    //Update player status from msg

    let eventPayload;
    try {
      console.log("Attempting to parse: ");
      console.log(event.data);
      eventPayload = JSON.parse(event.data.players);
    } catch (error) {
      console.log("Could not parse JSON");
    }
    console.log(eventPayload);
  }

  const { readyState } = useWebSocket("ws://localhost:8080/ws/game", {
    onOpen: () => console.log("Connection with WebSocket opened"),
    onMessage: (event) => onMessageReceived(event),
  });

  const postAnswer = (answer) => {
    axios
      .post(`/games/12345/`, {answer: answer})
      .then((res) => {
        console.log("Posted answer for player");
        console.log(res);
        setHasPosted(true);
      })
      .catch((err) => {
        console.log("Failed to post answer");
        console.log(err);
      });
  };

  function getRandomWord() {
    const words = [
      "February",
      "May",
      "pneumonoultramicroscopicsilicovolcanoconiosis",
    ];

    const random = Math.floor(Math.random() * words.length);
    return words[random];
  }

  const changeWord = () => {
    setWord(getRandomWord().toUpperCase());
  };

  const sessionStart = (interval) => {
    interval = setInterval(() => {
      setProgress((progress) => progress - 1);
    }, 200);
  };

  useEffect(() => {
    let interval;
    sessionStart(interval);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    console.log("Post " + event.target.answer.value + " to Server");
    //postAnswer(answer);
  };

  return (
    <div className="dark:bg-gray-800 w-full min-h-screen dark:text-white py-40">
      <div className="h-full flex flex-col sm:flex-row">
        {/* PLAYER LIST */}
        <div className="h-10 sm:h-screen w-72  justify-center">
          <p className="ml-5">{`6/${players.length} har svarat`}</p>
          <div className="invisible sm:visible">
            {players.map((player) => {
              return <UserTile name={player.name} color={player.color} />;
            })}
          </div>
        </div>
        {/* WORD */}
        <div className="h-screen w-full px-5 sm:px-20">
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center justify-center mb-10 "
            onClick={changeWord}
          >
            {word}
          </h1>{" "}
          <div className="w-full overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-green-100">
            <div
              style={{ width: `${progress}%` }}
              className="transition-all ease-linear duration-200 shadow-none whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
          {!hasPosted || progress == 0 ? (
            <form
              onSubmit={handleAnswerSubmit}
              className="flex flex-col w-full"
            >
              <textarea
                name="answer"
                className="p-5 rounded-lg text-white dark:bg-gray-600  border-none h-72 my-10"
                placeholder="Write your explanation.."
              ></textarea>

              <Button primary label="Submit your answer" />
            </form>
          ) : (
            <div className="w-full p-10 rounded-lg bg-gray-600 text-center text-bold">
              Your answer is submitted
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
