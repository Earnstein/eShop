import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface ChildrenProp {
  children: React.ReactNode;
}
const FormContainter: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainter;
