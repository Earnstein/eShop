import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard, { ProductProp } from "@/components/ProductCard";
import { useGetProducts } from '../apis/api-hooks';
import Loader from '@/components/Loader';

const HomePage = () => {
  const { data:products, isLoading } = useGetProducts();
  return (
    <React.Fragment>
      <h1 className="text-center py-3">Latest Product</h1>
      <Row>
        {isLoading && <Loader/>}
        {!isLoading && products.map((product: ProductProp) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default HomePage;
