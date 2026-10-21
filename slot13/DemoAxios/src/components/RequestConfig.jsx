
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/posts',
        params: {
          _page: 1,
          _limit: 3
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer demo-token-123'
        },
        timeout: 5000
      });

      setInfo({
        status: response.status,
        contentType: response.headers['content-type'],
        total: response.headers['x-total-count'],
        data: response.data
      });

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setError('Request qua thoi gian');
      } else if (error.response) {
        setError(`Server tra loi ${error.response.status}`);
      } else {
        setError(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return (
    <div className="alert alert-danger">
      Error: {error}
    </div>
  );
}

if (!info) {
  return <div>Khong co du lieu</div>;
}


  return (
    <div className="container mt-4">
      <h2>Axios Request Configuration</h2>

      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">
            Response Information
          </h5>

          <p>
            <strong>Status:</strong> {info.status}
          </p>

          <p>
            <strong>Content-Type:</strong> {info.contentType}
          </p>

          <p>
            <strong>Total Posts:</strong> {info.total ?? 'N/A'}
          </p>

          <h5>Post List</h5>

          <ul className="list-group">
            {info.data.map(post => (
              <li
                key={post.id}
                className="list-group-item"
              >
                #{post.id} - {post.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestConfig;
