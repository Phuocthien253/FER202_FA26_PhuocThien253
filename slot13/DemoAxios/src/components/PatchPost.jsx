import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form } from 'react-bootstrap';

function PatchPost() {
  const [id, setId] = useState('1');
  const [title, setTitle] = useState('Only title changed');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { title }
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
      <Card.Header>2.4 — PATCH cập nhật một phần</Card.Header>
      <Card.Body>
        <Form onSubmit={handlePatch}>
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang cập nhật...' : 'PATCH tiêu đề'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {result && (
          <Alert variant="success" className="mt-3">
            PATCH thành công — Status: 200
            <pre className="mb-0 mt-2">{JSON.stringify(result, null, 2)}</pre>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default PatchPost;