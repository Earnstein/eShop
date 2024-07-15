import Header from "@/components/Header";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import HomePage from "./pages/HomePage";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <HomePage/>
        </Container>
      </main>
      <Footer/>
    </>
  );
};

export default App;
