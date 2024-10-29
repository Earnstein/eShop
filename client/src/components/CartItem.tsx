import { CartItem } from "@/store/cartState";
import React from "react";
import { Col, Row, ListGroup, Image, Form, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";

interface CartItemProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
  onUpdate: (item: CartItem, quantity: number) => void;
}

const CartProduct: React.FC<CartItemProps> = ({ item, onRemove, onUpdate }) => {
  const isTablet = useMediaQuery("(max-width: 768px)");
  const marginClass = isTablet ? "my-1" : "my-0";
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate(item, Number(e.target.value));
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col md={2}>
          <figure>
            <Image src={`/${item.image}`} alt={item.name} fluid rounded />
          </figure>
        </Col>
        <Col md={3}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </Col>
        <Col md={2}>$ {item.price}</Col>
        <Col>
          <Form.Select
            size="sm"
            value={item.qty}
            onChange={handleChange}
            className={marginClass}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="light"
            onClick={() => onRemove(item._id!)}
            className={marginClass}
          >
            <FaTrash />
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartProduct;
