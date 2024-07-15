import React from "react";
import Header from "@/components/Header";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default App;
