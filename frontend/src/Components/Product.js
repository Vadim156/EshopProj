import Button from 'react-bootstrap//Button';
import Card from 'react-bootstrap//Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`product/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>{product.price}$</Card.Text>
        <Button className="btn-primary" variant="">
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
