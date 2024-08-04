import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
  isEmpty: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalItems,
  totalAmount,
  isEmpty
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Subtotal ({totalItems}) items</h2>
          ${totalAmount.toFixed(2)}
        </ListGroup.Item>
        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            disabled={isEmpty}
            onClick={() => navigate("/login?redirect=/shipping")}
          >
            Proceed To Checkout
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default CartSummary;
