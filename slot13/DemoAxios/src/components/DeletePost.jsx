import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form } from 'react-bootstrap';

function DeletePost() {
  const [id, setId] = useState('1');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setResult(`DELETE thành công — Status: ${response.status}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>2.5 — DELETE bài viết</Card.Header>
      <Card.Body>
        <Form onSubmit={handleDelete} className="d-flex gap-2">
          <Form.Control
            type="number"
            min="1"
            max="100"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </Form>

        {result && <Alert variant="success" className="mt-3">{result}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );
}

export default DeletePost;