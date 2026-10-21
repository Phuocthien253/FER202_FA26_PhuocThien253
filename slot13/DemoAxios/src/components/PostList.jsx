
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: {
            userId: 1,
            _limit: 5
          }
        }
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  return (
    <div>
      <h2>GET - Danh sách bài viết cua User 1</h2>

      <ul className="list-group mt-3">
        {posts.map(post => (
          <li className="list-group-item" key={post.id}>
            #{post.id} - {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
