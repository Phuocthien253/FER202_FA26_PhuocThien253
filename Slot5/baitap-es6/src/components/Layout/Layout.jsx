import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Trang chủ' }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <Container className="my-4 flex-grow-1">
      <h2 className="mb-4">{title}</h2>
      {children}
    </Container>
    <Footer />
  </div>
);

export default Layout;