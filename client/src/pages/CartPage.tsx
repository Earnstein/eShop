import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Alert, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import useCartStore, { CartItem } from "@/store/cartState";
import CartProduct from "@/components/CartItem";
import PaginationControls from "@/components/PaginationControls";
import CartSummary from "@/components/CartSummary";
import useMediaQuery from "@/hooks/useMediaQuery";

const ITEMS_PER_PAGE = 3;

const CartPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems, removeFromCart, clearCartItems, addToCart } =
    useCartStore();

  const isTablet = useMediaQuery("(max-width: 768px)");
  const isEmpty = cartItems.length === 0;

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = cartItems.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [cartItems, currentPage, totalPages]);

  const handleUpdateCart = (item: CartItem, quantity: number) => {
    const updatedItem: CartItem = { ...item, qty: quantity };
    addToCart(updatedItem);
    toast.info("Cart item updated");
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    toast.info("Item removed from cart");

    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Row className="mt-4">
      <Col md="8">
        <FaArrowLeft
          className="my-3"
          size={20}
          onClick={() => window.history.back()}
        />
        {isEmpty ? (
          <Alert variant="info">
            Your Shopping Cart is Empty <Link to={"/"}>Go back</Link>
          </Alert>
        ) : (
          <>
            <ListGroup variant="flush">
              {/*CART COMPONENT*/}
              {currentItems.map((item) => (
                <CartProduct
                  key={item._id}
                  item={item}
                  onRemove={handleRemoveFromCart}
                  onUpdate={handleUpdateCart}
                />
              ))}
            </ListGroup>

            {/*PAGINATION COMPONENT*/}
            {cartItems.length > ITEMS_PER_PAGE && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {!isTablet && (
              <Button
                type="button"
                className="btn-block"
                size="sm"
                onClick={() => {
                  clearCartItems();
                  toast("Cart Cleared");
                }}
              >
                Clear Cart
              </Button>
            )}
          </>
        )}
      </Col>
      {/*CART SUMMARY COMPONENT*/}
      <Col md="4">
        <CartSummary
          totalItems={cartItems.reduce((acc, item) => acc + item.qty, 0)}
          totalAmount={cartItems.reduce(
            (acc, item) => acc + item.qty * item.price,
            0
          )}
          isEmpty={isEmpty}
        />
      </Col>
    </Row>
  );
};

export default CartPage;
