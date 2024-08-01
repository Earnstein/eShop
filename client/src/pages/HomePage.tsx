import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard, { ProductProp } from "@/components/ProductCard";
import { useGetProducts } from "../apis/api-hooks";
import Loader from "@/components/Loader";
import { getProduct } from "@/apis/api";
import { useQueryClient } from "@tanstack/react-query";
import { STALETIME } from "@/constants";

const HomePage = () => {
  const queryClient = useQueryClient();
  const { data: response, isLoading, error, isError } = useGetProducts();
  const prefetch = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: () => getProduct(id),
      staleTime: STALETIME,
    });
  };
  return (
    <React.Fragment>
      <h1 className="text-center py-3">Latest Product</h1>
      <Row>
        {isLoading && <Loader />}
        {isError && error?.message && <p>{error?.message}</p>}
        {!isLoading &&
          response?.data.map((product: ProductProp) => (
            <Col
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              onMouseEnter={() => prefetch(product._id)}
              onFocus={() => prefetch(product._id)}
            >
              <ProductCard {...product} />
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default HomePage;
