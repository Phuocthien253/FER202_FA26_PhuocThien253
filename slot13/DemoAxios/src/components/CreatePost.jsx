import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form } from 'react-bootstrap';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        { title, body, userId: 1 }
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
      <Card.Header>2.2 — POST tạo bài viết</Card.Header>
      <Card.Body>
        <Form onSubmit={handleCreate}>
          <Form.Control
            className="mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            required
          />
          <Form.Control
            as="textarea"
            className="mb-2"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Nội dung"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Tạo bài viết'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {result && (
          <Alert variant="success" className="mt-3">
            POST thành công — Status: 201, ID: {result.id}
            <pre className="mb-0 mt-2">{JSON.stringify(result, null, 2)}</pre>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default CreatePost;