import { Link } from "react-router-dom";

let categories = ["My first category", "Another secondary category", "A cat"];

function GameSettings() {
  return (
    <div>
      <div>
        <Link to="/">
          <a>Go back</a>
        </Link>
        <h1>Game Settings</h1>{" "}
      </div>

      <h1>Kategorier</h1>

      <ul>
        {categories.map((category) => (
          <>
            <input type="checkbox" value={category} />
            <label class="ml-2">{category}</label>
            <br></br>
          </>
        ))}
      </ul>
    </div>
  );
}

export default GameSettings;
