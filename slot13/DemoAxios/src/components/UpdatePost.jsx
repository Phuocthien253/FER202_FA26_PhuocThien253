
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);

  // Giu nguyen useEffect va handleUpdate ben duoi


  // GET: Lay du lieu bai viet hien tai
  
useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await axios.get(URL);
      setPost(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingPost(false);
    }
  };

  fetchPost();
}, []);

  // PUT: Cap nhat toan bo bai viet

const handleUpdate = async (e) => {
  e.preventDefault();
  setUpdating(true);
  setError(null);
  setResult(null);

  try {
    const response = await axios.put(URL, {
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body
    });

    setResult({
      status: response.status,
      data: response.data
    });

  } catch (error) {
    setError(error.message);

  } finally {
    setUpdating(false);
  }
};


if (loadingPost) return <div>Loading...</div>;
if (!post) return <div>Error: {error || 'Cannot load post'}</div>;

  return (
    <div className="container mt-4">
      <h2>PUT - Update Post #{post.id}</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={post.title}
            onChange={(e) =>
              setPost({ ...post, title: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            rows="4"
            value={post.body}
            onChange={(e) =>
              setPost({ ...post, body: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Post (PUT)'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-4">
          <h5>Post Updated Successfully!</h5>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
