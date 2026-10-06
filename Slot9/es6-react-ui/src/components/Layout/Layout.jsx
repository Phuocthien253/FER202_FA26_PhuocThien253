import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';

import {
  useTheme,
} from '../../context/ThemeContext';

const Layout = ({
  children,
  title = 'Trang chủ',
}) => {
  const {
    theme,
  } = useTheme();

  return (
    <div
      data-bs-theme={theme}
      className="bg-body text-body min-vh-100 d-flex flex-column"
    >
      <Header />

      <Container className="my-4 flex-grow-1">
        <h2 className="mb-4">
          {title}
        </h2>

        {children}
      </Container>

      <Footer />
    </div>
  );
};

export default Layout;