import { Link } from "react-router-dom";

function Lobby() {
  return (
    <div className="App">
      <div>
        <div>
          <Link to="/">
            <a>Go back</a>
          </Link>
          <h1>Another Page</h1>{" "}
        </div>
        <div>
          <Link to="/present-word">
            <a>Start Game</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
