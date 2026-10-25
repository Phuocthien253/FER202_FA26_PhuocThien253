
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Lab 6 - Axios
        </Navbar.Brand>
<Nav.Link as={NavLink} to="/posts/search">
  Search Posts
</Nav.Link>
        <Navbar.Toggle aria-controls="main-navbar" />
<Nav.Link as={NavLink} to="/posts/bulk-delete">
  Bulk Delete
</Nav.Link>
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Axios Demo
            </Nav.Link>
            <Nav.Link as={NavLink} to="/http-requests">
              HTTP Requests
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts/create">
              Create Post
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
