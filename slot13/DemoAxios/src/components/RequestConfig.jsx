import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Card, Spinner } from 'react-bootstrap';

function RequestConfig() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: { _page: 1, _limit: 3 },
          headers: { Accept: 'application/json' },
          timeout: 5000,
        });

        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          data: response.data,
        });
      } catch (err) {
        if (err.code === 'ECONNABORTED') {
          setError('Request quá thời gian (timeout)');
        } else if (err.response) {
          setError(`Server trả lỗi ${err.response.status}`);
        } else {
          setError(err.message);
        }
      }
    };

    fetchWithConfig();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Header>2.6 — Request Config</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!info && !error && <Spinner animation="border" size="sm" />}
        {info && (
          <>
            <p>Status: {info.status}</p>
            <p>Content-Type: {info.contentType}</p>
            <pre>{JSON.stringify(info.data, null, 2)}</pre>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default RequestConfig;