import { useGetProduct } from "@/apis/api-hooks";
import Rating from "@/components/Rating";
import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";



const ProductPage = () => {
  const { id } = useParams();
  const { data, isPending } = useGetProduct(id!);
  return (
    <React.Fragment>
      <Link to="/">
        <Button className="btn-block my-3" type="button">
          Go Back
        </Button>
      </Link>
        {isPending && <span>loading</span>}
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
