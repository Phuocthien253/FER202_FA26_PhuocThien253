
import { Container, Card, Button } from 'react-bootstrap';
import {
  Link,
  useLocation,
  Navigate
} from 'react-router-dom';

export default function SuccessPage() {
  const data = useLocation().state;

  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <h1>Đăng ký thành công!</h1>

          <p>
            Cảm ơn <strong>{data.name}</strong>,
            vé đã gửi tới <strong>{data.email}</strong>.
          </p>

          <p>
            Buổi tham dự: <strong>{data.session}</strong>
          </p>

          <Button
            as={Link}
            to="/register"
            variant="primary"
            className="me-2"
          >
            Đăng ký thêm người khác
          </Button>

          <Button
            as={Link}
            to="/"
            variant="outline-secondary"
          >
            Về trang sự kiện
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
