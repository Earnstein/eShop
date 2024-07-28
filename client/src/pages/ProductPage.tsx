import { useGetProduct } from "@/apis/api-hooks";
import Rating from "@/components/Rating";
import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Loader from '@/components/Loader';
import useCartStore, { CartItem } from '@/store/state';



const ProductPage = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useGetProduct(id!);
  const { addToCart } = useCartStore();
  const handleCart = () => {
    const newProduct: CartItem = {
      _id: data?._id,
      name: data?.name,
      qty: data?.countInStock || 2,
      price: 100,
      image: data?.image,
    }
    addToCart(newProduct);
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
