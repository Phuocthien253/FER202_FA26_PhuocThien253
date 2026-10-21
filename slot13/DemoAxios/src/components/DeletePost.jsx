
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // GET: Lay 5 bai viet dau tien
  useEffect(() => {
    axios
      .get(API, {
        params: { _limit: 5 }
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // DELETE: Xoa bai viet theo ID
  const handleDelete = (id) => {
    if (!window.confirm(`Xoa bai viet #${id}?`)) {
      return;
    }

    setDeletingId(id);
    setError(null);
    setMessage('');

    axios
      .delete(`${API}/${id}`)
      .then(response => {
        setPosts(prevPosts =>
          prevPosts.filter(post => post.id !== id)
        );

        setMessage(
          `Da xoa bai viet #${id} - Status: ${response.status}`
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>DELETE - Delete Post</h2>

      {message && (
        <div className="alert alert-success mt-3">
          {message}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-3">
          Error: {error}
        </div>
      )}

      <ul className="list-group mt-3">
        {posts.map(post => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center gap-3"
          >
            <span>
              #{post.id} - {post.title}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId !== null}
            >
              {deletingId === post.id
                ? 'Deleting...'
                : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;
