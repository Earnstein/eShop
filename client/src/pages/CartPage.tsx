import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import useCartStore from "@/store/state";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCartItems } = useCartStore();
  const isEmpty = cartItems.length === 0;

  return (
    <Row className="mt-4">
      <Col md="8">
        <h1 className="mb-4">Shopping Cart</h1>
        {isEmpty ? (
          <Alert variant="info">
            Your Shopping Cart is Empty <Link to={"/"}>Go back</Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <figure>
                      <Image
                        src={`/${item.image}`}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </figure>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col>
                    <span>{item.qty}</span>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="light"
                      onClick={() => {
                        removeFromCart(item._id!)
                        toast.info("Item removed from cart")
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <Button type="button" className="btn-block" onClick={()=>{
          clearCartItems()
          toast("Cart Cleared")
          }}>
          Clear Cart
        </Button>
      </Col>
      <Col md="4">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/login?redirect=/shipping")}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
