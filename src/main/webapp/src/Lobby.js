import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function Lobby() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Link to="/">
          <Button className="mr-5" variant="primary">
            Go back
          </Button>
          </Link>
          <h1>Another Page</h1>{" "}
        </Row>
      </Container>
    </div>
  );
}

export default Lobby;
