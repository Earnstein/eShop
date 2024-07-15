import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
type RatingProps = {
    rating: number,
    numReviews?: number,
}

const Rating = ({ rating, numReviews }: RatingProps) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {rating >= i + 1 ? <FaStar /> : rating >= i + 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
      ))}
      <span className="rating-text ms-2">
        {numReviews ? `${numReviews} reviews` : "No rating"}
      </span>
    </div>
  );
};

export default Rating