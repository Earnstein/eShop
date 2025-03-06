import { useGetClientId, useGetOrderById } from "@/apis/api-hooks";
import { useParams } from "react-router-dom";
import { Card, Row, Col, ListGroup, Image } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useMutation } from "@tanstack/react-query";
import { payOrder } from "@/apis/api";
import { toast } from "sonner";
import useAuthStore from "@/store/userState";

type PayOrderPayload = {
  orderId: string;
  details: any;
};

const OrderSummaryPage = () => {
  const { order_id } = useParams();
  const { data, isError, isPending } = useGetOrderById(order_id!);
  const { user: LoggedInUser } = useAuthStore();

  const [{ isPending: isPayPalScriptPending }, paypalDispatch] =
    usePayPalScriptReducer();

  const { mutate, isPending: isPayPending } = useMutation({
    mutationKey: ["pay_order"],
    mutationFn: ({ orderId, details }: PayOrderPayload) =>
      payOrder(orderId, details),
    onSuccess: (data) => {
      toast.success("success");
      console.log(data?.data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const { data: payPalData, isLoading } = useGetClientId();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error fetching order</div>;
  if (!data) return <div>No order found</div>;

  const {
    shippingAddress,
    orderItems,
    user,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = data.data;

  return (
    <div className="py-3">
      <h1 className="mb-4">Order {order_id}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <p>
                <strong>Name: </strong> {user.name}
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <div className="alert alert-success">Delivered</div>
              ) : (
                <div className="alert alert-danger">Not Delivered</div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <p>
                <strong>Method: </strong> {paymentMethod}
              </p>
              {isPaid ? (
                <div className="alert alert-success">Paid</div>
              ) : (
                <div className="alert alert-danger">Not Paid</div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Order Items</Card.Title>
              <ListGroup variant="flush">
                {orderItems.map((item: any) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={`/${item.image}`}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        <p className="mb-0">{item.name}</p>
                      </Col>
                      <Col md={4}>
                        {item.quantity} x ${item.price} = $
                        {item.quantity * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
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
                    <Col>
                      <strong>Total</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderSummaryPage;
