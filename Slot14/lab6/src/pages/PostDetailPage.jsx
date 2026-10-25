
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Alert, Spinner } from "react-bootstrap";
import postApi from "../api/postApi";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      setLoading(true);
      setError("");
      setPost(null);

      try {
        const response = await postApi.getById(id);
        if (active) setPost(response.data);
      } catch (err) {
        if (active) setError(err.message || "Không tải được bài viết.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!post || !post.id) {
    return <Alert variant="warning">Không tìm thấy bài viết.</Alert>;
  }

  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>

      <Button onClick={() => navigate("/posts")}>
        Quay lại danh sách
      </Button>{" "}
      <Link to={`/posts/${id}/edit`}>Chỉnh sửa</Link>
    </>
  );
}
