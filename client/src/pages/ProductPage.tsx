import { useGetProduct } from "@/apis/api-hooks";
import Rating from "@/components/Rating";
import React from "react";
import { Button, Card, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from '@/components/Loader';
import useCartStore, { CartItem } from '@/store/state';
import { toast } from "sonner";



const ProductPage = () => {
  const [ qty , setQty ] = React.useState(1);
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { data, isPending, isError, error } = useGetProduct(id!);
  const handleCart = () => {
    const newProduct: CartItem = {
      _id: data._id,
      name: data.name,
      qty: qty,
      price: data.price,
      image: data.image,
      countInStock: data.countInStock,
    }
    addToCart(newProduct);
    toast.success("Item added to cart")
  }

  return (
    <React.Fragment>
      <Link to="/">
        <Button className="btn-block my-3" type="button">
          Go Back
        </Button>
      </Link>
      {isPending && <Loader/>}
      {isError && error?.message && <p>{error?.message} {error?.response?.status}</p>}
        {data && (
         <Row>
           <Col md={5}>
          <figure>
            <Image src={`/${data?.image}`} alt={data?.name} fluid />
          </figure>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{data?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              {data && (
                <Rating
                  rating={data?.rating}
                  numReviews={data?.numReviews}
                />
              )}
            </ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Description:</span> {data?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${data?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {data && data?.countInStock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
                {data && data?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          size="sm"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(data?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={data && data?.countInStock === 0}
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
