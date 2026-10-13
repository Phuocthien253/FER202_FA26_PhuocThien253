
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EventPage() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Body>
          <Card.Title as="h1">
            FPTU Tech Day 2026
          </Card.Title>

          <Card.Text>
            Chào mừng bạn đến với sự kiện công nghệ
            FPTU Tech Day 2026!
          </Card.Text>

          <Button
            variant="primary"
            onClick={() => navigate('/register')}
          >
            Đăng ký ngay
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
