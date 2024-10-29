import { createOrder, I_OrderBody } from "@/apis/api";
import CheckOutSteps from "@/components/CheckOutSteps";
import Loader from "@/components/Loader";
import useCartStore from "@/store/state";
import useAuthStore from "@/store/userState";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const {
    clearCartItems,
    shippingAddress,
    paymentMethod,
    cartItems,
    totalPrice,
  } = useCartStore();

  const { clearUser } = useAuthStore();
  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemPrice > 1000 ? 0 : 10;
  const taxPrice = Number((0.15 * itemPrice).toFixed(2));

  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (body: I_OrderBody) => createOrder(body),
    onSuccess: () => clearCartItems(),
    onError: (error) => {
      if (error?.response?.status === 401) {
        clearUser();
        navigate("/login?redirect=shipping");
      }
    },
  });

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = () => {
    const newCartItems = cartItems.map((item) => ({
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.qty,
      product_id: item._id,
    }));
    mutate({
      orderItems: newCartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  };

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address:</strong> {shippingAddress.address}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Payment Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              {cartItems.length === 0 && (
                <Alert variant="info">Your Cart is empty</Alert>
              )}
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={`${item._id}-${index}`}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={`picture of a ${item.name}`}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartItems.length === 0 ? 0 : shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {isError && (
                <ListGroup.Item>
                  <Alert variant="danger">
                    {error?.response?.data?.message || error?.message}
                  </Alert>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {isPending ? (
                  <Loader />
                ) : (
                  <Button
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
