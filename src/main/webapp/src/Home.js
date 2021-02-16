import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Home Page hello</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/lobby">
            <Button variant="primary">Move to lobby</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
