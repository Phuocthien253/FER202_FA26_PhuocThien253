
import { Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

export default function HelpLayout() {
  return (
    <>
      <h1>Hướng dẫn sử dụng thư viện</h1>

      <Nav variant="tabs" className="mt-3 mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="faq">
            Câu hỏi thường gặp
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} to="rules">
            Nội quy
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </>
  );
}
