import { useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';

export default function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Container className="d-flex justify-content-center align-items-center py-4">
      <Card className="p-4 bg-dark text-white border-secondary text-center" style={{ width: '18rem' }}>
        <div>
          <Button
            variant="light"
            className="fs-5 px-4 mb-4"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? 'Hide' : 'Show'}
          </Button>
        </div>
        {isVisible && <Card.Title className="display-6">Toggle me!</Card.Title>}
      </Card>
    </Container>
  );
}
