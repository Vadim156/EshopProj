import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './store.js';
import { useContext } from 'react';
import SigninPage from './pages/SignInPage';
import { USER_SIGNOUT } from './Actions.js';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: USER_SIGNOUT });
    localStorage.removeItem('userInfo');
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>EShop</NavBar.Brand>
              </LinkContainer>
              <Nav className="ms-auto w-50 justify-content-end">
                <Link to="/cart" className="nav-link" element={<CartPage />}>
                  <i className="fas fa-shopping-cart text-white"></i>

                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    className="text-white"
                    title={userInfo.name}
                    id="basic-nav-dropdown"
                  >
                    <Link.Container to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </Link.Container>
                    <Link.Container to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </Link.Container>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item text-white"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link text-white" to="/signin">
                    Sign In{' '}
                  </Link>
                )}
              </Nav>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products/:token" element={<ProductPage />} />
              <Route path="/signIn" element={<SigninPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">ALL RIGHTS RESERVED</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
