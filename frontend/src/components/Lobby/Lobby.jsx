import React from "react";
import { Container, LobbyInfo, UserTile, Button } from "components";
import { useGame } from "contexts/game";
import { Link } from "react-router-dom";



export const Lobby = () => {
    const { players, pin } = useGame()
    const colors = ["grass", "peach"];

  return (
  
    <Container>
      <LobbyInfo lobbyPin={pin} max={10} current={players.length} />
      <div className="flex flex-wrap">
        {players.map((player, i) => {
          return (
            <div key={`player-${i}`}>
              <UserTile name={player.name} color={colors[i % colors.length]} />
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center mb-16 sm:mb-20 md:mb-32">
   
        <Link to="/present-word">
          <Button label="Start game" primary />
        </Link>
      </div>
    </Container>
  );
};
