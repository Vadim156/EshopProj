import Button from 'react-bootstrap//Button';
import Card from 'react-bootstrap//Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../store.js';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`products/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`products/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price}$</Card.Text>
        <Card.Text className="desc">{product.description}</Card.Text>
        <Rating
        // rating={product.rating.rate}
        // numReviews={product.numReviews}
        ></Rating>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            className="btn-primary"
            onClick={() => addToCartHandler(product)}
          >
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
