import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo-svg/Logo.svg';
import './header.styles.scss';

const UserNav = () => {
  const { isLoading, logout, isAuthenticated, loginWithRedirect, user } = useAuth0();

  if (isLoading) return null;
  if (isAuthenticated)
    return (
      <NavDropdown title={user?.nickname} id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />

        <NavDropdown.Item className="link-logout" onClick={() => logout()}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );

  return (
    <Nav.Link>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </Nav.Link>
  );
};

const Header = () => {
  return (
    <div className="header">
      <>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <Logo />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button className="btn-search" variant="outline-primary">
                  Search
                </Button>
              </Form>
              <Nav className="ms-auto my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll>
                <div className="nav-item">
                  <NavLink className="nav-account" to="/account">
                    Account
                  </NavLink>
                </div>

                <UserNav />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
};

export default Header;
