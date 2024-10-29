import { Nav, Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import useCartStore from "@/store/state";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "@/apis/api";
import { toast } from "sonner";
import useAuthStore from "@/store/userState";
import { useGetCurrentUser } from "@/apis/api-hooks";
import { useEffect } from "react";

const Header = () => {
  const { cartItems } = useCartStore();
  const { user, clearUser } = useAuthStore();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => signOut(),
    onMutate: () => {
      toast.info("Logging out");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logged out successfully");
      clearUser();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  useEffect(() => {
    if (!currentUser) {
      toast.info("Session expired, please login again");
      clearUser();
    }
  }, [currentUser, clearUser]);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand>eShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="nav-link">
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge pill bg="success">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {user.name ? (
                <NavDropdown title={"Profile"} id="username">
                  <Nav.Link as={Link} to="/profile" className="p-0">
                    <NavDropdown.Item>{user.name}</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={() => mutate()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/signin" className="nav-link">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
