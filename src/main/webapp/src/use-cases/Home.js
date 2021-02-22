
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <div>
          <h1>Home Page</h1>
        </div>
      </div>
      <div>
        <div className="bg-indigo-800">
          <Link to="/lobby">
            <a>Move to lobby</a>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <Link to="/game-settings">
            <a >Start a game</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
