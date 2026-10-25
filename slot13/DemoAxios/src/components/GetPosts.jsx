import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap';

function GetPosts() {
  const [userId, setUserId] = useState('1');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        { params: { userId, _limit: 5 } }
      );
      setPosts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>2.1 — GET danh sách với query params</Card.Header>
      <Card.Body>
        <Form onSubmit={fetchPosts} className="d-flex gap-2 mb-3">
          <Form.Control
            type="number"
            min="1"
            max="10"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
          <Button type="submit" disabled={loading}>Lấy bài viết</Button>
        </Form>

        {loading && <Spinner animation="border" size="sm" />}
        {error && <Alert variant="danger">{error}</Alert>}

        <ListGroup>
          {posts.map((post) => (
            <ListGroup.Item key={post.id}>
              <strong>{post.id}. {post.title}</strong>
              <div>{post.body}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default GetPosts;