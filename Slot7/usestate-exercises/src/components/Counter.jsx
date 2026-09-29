import { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Container className="d-flex justify-content-center align-items-center py-4">
      <Card className="text-center p-4 bg-dark text-white border-secondary" style={{ width: '18rem' }}>
        <Card.Body>
          <Button variant="light" className="mb-4 fs-5 px-3 py-1" onClick={() => setCount((prev) => prev + 1)}>
            Increment
          </Button>
          <Card.Title className="display-6">Count: {count}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
}