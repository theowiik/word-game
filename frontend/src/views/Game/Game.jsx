import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { gameExists } from "services/database-service";
import {GameLayout} from "components";

function Game() {
  const params = useParams();
  const pin = params.pin;
  const [gameFound, setGameFound] = useState(false);

  const history = useHistory();

  const checkIfGameExists = async () => {
    if (await gameExists(pin)) {
      setGameFound(true);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    checkIfGameExists();
  }, []);

  return <GameLayout>
      <h1>States</h1>
  </GameLayout>;
}

export default Game;
