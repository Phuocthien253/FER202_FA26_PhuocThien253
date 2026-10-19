
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: 1,
      })
      .then(response => {
        setResult({
          status: response.status,
          data: response.data
        });
        setTitle('');
        setBody('');
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-4">
      <h2>POST - Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            placeholder="Enter post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-4">
          <h5>Post Created Successfully!</h5>
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
