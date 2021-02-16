import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App">
      <Container>
        {" "}
        <Row>
          <Col>
            <Button variant="primary">Hej</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success">hej</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
