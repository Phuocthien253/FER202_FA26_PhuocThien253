
import React, { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);


const handlePatch = async () => {
  if (!title.trim()) return;

  setUpdating(true);
  setError(null);
  setResult(null);

  try {
    const response = await axios.patch(
      'https://jsonplaceholder.typicode.com/posts/1',
      { title: title }
    );

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


  return (
    <div className="container mt-4">
      <h2>PATCH - Update Post Title #1</h2>

      <div className="mb-3">
        <label className="form-label">
          New Title
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Enter new title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <button
        className="btn btn-warning"
        onClick={handlePatch}
        disabled={!title.trim() || updating}
      >
        {updating ? 'Updating...' : 'Update Title (PATCH)'}
      </button>

      {error && (
        <div className="alert alert-danger mt-3">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="alert alert-success mt-4">
          <h5>Title Updated Successfully!</h5>
          <p>Status: {result.status}</p>

          <pre>
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PatchPost;
