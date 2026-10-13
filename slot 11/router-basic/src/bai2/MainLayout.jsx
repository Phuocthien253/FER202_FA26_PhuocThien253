
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Thư viện FPT
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="library-navbar" />

          <Navbar.Collapse id="library-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Trang chủ
              </Nav.Link>

              <Nav.Link as={NavLink} to="/books">
                Sách
              </Nav.Link>

              <Nav.Link as={NavLink} to="/help">
                Hướng dẫn
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="py-4 flex-grow-1">
        <Outlet />
      </Container>

      <footer className="bg-light text-center py-3 border-top">
        © 2026 Thư viện FPT University
      </footer>
    </div>
  );
}
