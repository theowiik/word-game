import { UserTile } from "components";
import React, { useState } from "react";

export function PresentWord() {
  const [word, setWord] = useState("DEFAULTWORD");

  const users = [
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
    { name: "Jesper", color: "peach" },
    { name: "Hentoo", color: "beach" },
    { name: "Sudo", color: "grass" },
    { name: "Theo", color: "ocean" },
  ];

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

  return (
    <div className="App">
      <div className="grid grid-cols-12">
        {/* WORD */}
        <div className="col-span-full lg:col-span-10">
          <h1
            className="text-5xl sm:text-8xl lg:text-9xl font-bold text-center break-all"
            onClick={changeWord}
          >
            {word}
          </h1>{" "}
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
            <div
              style={{ width: "30%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
            ></div>
          </div>
          <p>XX sekunder kvar</p>
          <p>6/6 har svarat</p>
        </div>

        {/* PLAYER LIST */}
        <div className="col-span-full lg:col-span-2 lg:order-first">
          {users.map((user) => {
            return <UserTile name={user.name} color={user.color} />;
          })}
        </div>
      </div>
    </div>
  );
}
