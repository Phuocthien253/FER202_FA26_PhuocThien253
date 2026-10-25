import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Spinner } from 'react-bootstrap';

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts/1'
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Header>Phần 1 — GET một bài viết</Card.Header>
      <Card.Body>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Lỗi: {error}</Alert>}
        {data && (
          <>
            <h5>{data.title}</h5>
            <p>{data.body}</p>
            <small>Post ID: {data.id}</small>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default AxiosDemo;