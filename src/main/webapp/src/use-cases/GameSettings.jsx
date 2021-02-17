import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

let categories = ["My first category", "Another secondary category", "A cat"];

function GameSettings() {
  return (
      <Container>
        <Row>
          <Link to="/">
            <Button className="mr-5" variant="primary">
              Go back
            </Button>
          </Link>
          <h1>Game Settings</h1>{" "}
        </Row>

        <h1>Kategorier</h1>

        <ul>
          {categories.map((category) =>
            <>
              <input type="checkbox" value={category}/>
              <label class="ml-2">{category}</label>
              <br></br>
            </>
          )}
        </ul>
      </Container>
  );
}

export default GameSettings;
