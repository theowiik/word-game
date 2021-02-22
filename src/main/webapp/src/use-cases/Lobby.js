import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import LobbyInfo from "../components/lobby/LobbyInfo";
import Button from "../components/button";

function Lobby() {
  const lobbyPin = "123456";
  const max = 10;
  const current = 4;

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-gray-800 dark:text-white">
      <Container>
        <LobbyInfo lobbyPin={lobbyPin} max={max} current={current} />

        <div>
          <Link to="/">
            <a>Go back</a>
          </Link>
          <h1>Another Page</h1>{" "}
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

export default Lobby;
