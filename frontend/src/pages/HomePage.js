import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingComponent from '../Components/LoadingComponent.js';
import MessageBox from '../Components/MessageBox.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get('/api/v1/products');
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: error.message });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>EShop</title>
      </Helmet>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((prod) => (
              <Col lg={3} md={3} sm={6}>
                {console.log(prod)}
                <Product product={prod}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
