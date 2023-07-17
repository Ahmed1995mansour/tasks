import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo-svg/Logo.svg';
import './header.styles.scss';

const Header = () => {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const logOut = () => {
    signOut();
    navigate('/login');
  };
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
                <Link className="nav-account" to="/goals">
                  Goals
                </Link>
                <Link className="nav-account" to="/categories">
                  Categories
                </Link>
                <Link className="nav-account" to="/tasks">
                  Tasks
                </Link>

                <NavDropdown
                  className="dropdown"
                  title={auth()?.firstName}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item className="dropdownItem" href="/profile">
                    <Link className="nav-account" to="/profile">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="dropdownItem" href="/account">
                    <Link className="nav-account" to="/account">
                      Account
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item className="dropdownItem link-logout" onClick={() => logOut()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
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
