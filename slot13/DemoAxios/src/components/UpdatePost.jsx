import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form } from 'react-bootstrap';

function UpdatePost() {
  const [id, setId] = useState('1');
  const [title, setTitle] = useState('Updated title');
  const [body, setBody] = useState('Updated body');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { id: Number(id), title, body, userId: 1 }
      );
      setResult(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>2.3 — PUT cập nhật toàn bộ bài viết</Card.Header>
      <Card.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Control
            className="mb-2"
            type="number"
            min="1"
            max="100"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Form.Control
            className="mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Control
            as="textarea"
            className="mb-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang cập nhật...' : 'PUT cập nhật'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {result && (
          <Alert variant="success" className="mt-3">
            PUT thành công — Status: 200
            <pre className="mb-0 mt-2">{JSON.stringify(result, null, 2)}</pre>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default UpdatePost;