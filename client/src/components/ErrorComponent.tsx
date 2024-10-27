import { Button, Container, Row, Col } from "react-bootstrap";

type ErrorProp = {
  message: string;
  status: number;
};

const ErrorComponent: React.FC<ErrorProp> = ({ message, status }) => {
  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          <h1 className="display-1 fw-bold text-dark">{status}</h1>
          <h2 className="fw-bold text-dark">Uh-oh!</h2>
          <p>{message}</p>
          <Button variant="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorComponent;
