import { Card } from "react-bootstrap"

type Props = {
    _id: string,
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number
}
const ProductCard = ( product : Props) => {
  return (
    <Card className="my-3 p-3 rounded">
        <a href={`/product/${product._id}`}>
            <figure>
                <Card.Img src={product.image} variant="top"/>
            </figure>
        </a>
        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="h3">
                <span className="text-primary">${product.price}</span>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default ProductCard