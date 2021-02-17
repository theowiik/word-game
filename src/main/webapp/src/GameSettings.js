import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function PresentWord() {
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
      </Container>
  );
}

export default PresentWord;
