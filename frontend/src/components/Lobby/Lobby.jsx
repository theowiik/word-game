import axios from 'axios';
import { Button, Container, LobbyInfo, UserTile } from 'components';
import { useGame } from 'contexts/game';
import { colors } from 'lib/constants'
import React from 'react';

export const Lobby = () => {
  const { players, pin } = useGame();

  const startGame = () => {
    axios
      .post(`/games/${pin}/start`, {})
      .then((res) => {
        console.log('Started game');
        console.log(res);
      })
      .catch((err) => {
        console.log('Failed to start game');
        console.log(err);
      });
  };

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
        <Button label="Start game" primary onClick={startGame} />
      </div>
    </Container>
  );
};
