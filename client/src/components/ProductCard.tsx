import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "@/components/Rating";

export type ProductProp = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};
const ProductCard: React.FC<ProductProp> = (product) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Link as={Link} to={`/product/${product._id}`}>
        <figure>
          <Card.Img src={product.image} variant="top" />
        </figure>
      </Card.Link>
      <Card.Body>
        <Card.Link as={Link} to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-truncate">
            <strong>{product.name}</strong>
          </Card.Title>
        </Card.Link>

        <Card.Text as="h3">
          <span className="text-primary">${product.price}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Rating numReviews={product.numReviews} rating={product.rating}/>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
