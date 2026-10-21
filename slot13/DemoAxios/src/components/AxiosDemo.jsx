
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosDemo = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Axios Demo - Post List</h2>

      <div className="row">
        {posts.map(post => (
          <div className="col-md-6 mb-3" key={post.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {post.id}. {post.title}
                </h5>
                <p className="card-text">
                  {post.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AxiosDemo;
