import { Container, Row, Col } from "react-bootstrap";

const year = new Date().getFullYear();
const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <h6>Copyright &copy; eShop {year}</h6>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;