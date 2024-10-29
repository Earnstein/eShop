import { useGetProduct } from "@/apis/api-hooks";
import Rating from "@/components/Rating";
import React from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import useCartStore, { CartItem } from "@/store/state";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";

const ProductPage = () => {
  const [qty, setQty] = React.useState(1);
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { data: response, isPending, isError, error } = useGetProduct(id!);
  const handleCart = () => {
    const newProduct: CartItem = {
      _id: response.data._id,
      name: response.data.name,
      qty: qty,
      price: response.data.price,
      image: response.data.image,
      countInStock: response.data.countInStock,
    };
    addToCart(newProduct);
    toast.success("Item added to cart");
  };

  return (
    <React.Fragment>
      <FaArrowLeft
        className="my-3"
        size={20}
        onClick={() => window.history.back()}
      />

      {isPending && <Loader />}
      {isError && error?.message && (
        <p>
          {error?.response?.data?.message || error?.message}{" "}
          {error?.response?.status}
        </p>
      )}
      {response && (
        <Row>
          <Col md={5}>
            <figure>
              <Image
                src={`/${response?.data.image}`}
                alt={response?.data.name}
                fluid
              />
            </figure>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{response?.data.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {response && (
                  <Rating
                    rating={response?.data.rating}
                    numReviews={response?.data.numReviews}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="fw-bold">Description:</span>{" "}
                {response?.data.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${response?.data.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {response && response?.data.countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {response && response?.data.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          size="sm"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(response?.data.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={response && response?.data.countInStock === 0}
                    onClick={handleCart}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default ProductPage;
