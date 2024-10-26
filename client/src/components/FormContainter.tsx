import { PropsWithChildren } from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainter: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-md-4 mt-2">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainter;
