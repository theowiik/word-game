import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Page() {
  return (
    <div className="App">
      <Container>
        <h1>Another Page</h1>{" "}
        <Row>
          <Col>
            <Button variant="primary">ny sida</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success">ny sida</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Page;
