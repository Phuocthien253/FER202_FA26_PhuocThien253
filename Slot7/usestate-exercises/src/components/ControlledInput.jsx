import { useState } from 'react';
import { Form, Container, Card } from 'react-bootstrap';

export default function ControlledInput() {
  const [text, setText] = useState('');

  return (
    <Container className="d-flex justify-content-center align-items-center py-4">
      <Card className="p-4 bg-dark text-white border-secondary text-center" style={{ width: '22rem' }}>
        <Form.Group className="mb-4" controlId="formControlledInput">
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text here..."
            className="fs-5"
          />
        </Form.Group>
        <Card.Title className="display-6">Input text: {text}</Card.Title>
      </Card>
    </Container>
  );
}