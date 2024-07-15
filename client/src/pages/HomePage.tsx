import products from "@/constants/products";
import {Row, Col } from "react-bootstrap";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  return (
    <>
        <h1 className="text-center py-3">Latest Product</h1>
       <Row>
       {products.map((product)=>(
            <Col sm={12} md={6} lg={4} xl={3}>
                <ProductCard {...product}/>
            </Col>
        ))}
       </Row>
    </>
  )
}

export default HomePage