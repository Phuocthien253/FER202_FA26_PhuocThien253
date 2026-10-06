import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import {
  APP_NAME,
  menuItems,
} from '../../data/menu';

import {
  useTheme,
} from '../../context/ThemeContext';

import {
  useAuth,
} from '../../context/AuthContext';

const Header = () => {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  return (
    <Navbar
      bg={
        theme === 'dark'
          ? 'dark'
          : 'primary'
      }
      variant="dark"
      expand="md"
    >
      <Container>
        <Navbar.Brand href="#home">
          {APP_NAME}
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-nav"
        />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {menuItems.map(
              ({ label, href }) => (
                <Nav.Link
                  key={label}
                  href={href}
                >
                  {label}
                </Nav.Link>
              )
            )}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Button
              size="sm"
              variant="outline-light"
              onClick={toggleTheme}
            >
              {theme === 'light'
                ? '🌙 Tối'
                : '☀️ Sáng'}
            </Button>

            {isLoggedIn ? (
              <>
                <Navbar.Text className="text-white">
                  Xin chào,{' '}
                  {user.name}
                </Navbar.Text>

                <Button
                  size="sm"
                  variant="light"
                  onClick={logout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Navbar.Text className="text-white-50">
                Chưa đăng nhập
              </Navbar.Text>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;