import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

type ErrorProp = {
  message: string;
};

const ErrorComponent = ({ message }: ErrorProp) => {
  return (
    <Container> 
      <Row>
        <Col className="text-center py-3">
            <h1 className="display-1 fw-bold text-dark">404</h1>
            <h2 className="fw-bold text-dark">Uh-oh!</h2>
            <p>{message}</p>
            <Link to="/">
                <Button variant="primary">Go Back</Button>
            </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorComponent;