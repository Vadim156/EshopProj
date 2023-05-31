import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../Components/MessageBox.js';
import { Store } from '../store.js';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADD_TO_CART } from '../Actions.js';
import { REMOVE_FROM_CART } from '../Actions.js';

function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const navigate = useNavigate();
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/v1/products/token/${item.token}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: ADD_TO_CART,
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = async (item) => {
    ctxDispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };
  const checkoutHandler = async () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.lenght === 0 ? (
            <MessageBox>
              your Cart is empty.&nbsp; <Link to="/">To Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.token}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      {' '}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{' '}
                      <Link to={`/products/${item.token}`}> {item.name} </Link>
                    </Col>
                    <Col md={3}>
                      {/* ------ */}
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span> {/* +++++++ */}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body variant="flush">
              <ListGroup></ListGroup>
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : ${' '}
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </ListGroup.Item>
              <ListGroupItem>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.lenght === 0}
                    onClick={checkoutHandler()}
                  >
                    {' '}
                    Checkout
                  </Button>
                </div>
              </ListGroupItem>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default CartPage;
