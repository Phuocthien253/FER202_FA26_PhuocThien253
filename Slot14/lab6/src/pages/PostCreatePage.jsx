
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import postApi from "../api/postApi";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (title.trim().length < 5) {
      setError("Tiêu đề phải có ít nhất 5 ký tự.");
      return;
    }

    if (body.trim().length < 10) {
      setError("Nội dung phải có ít nhất 10 ký tự.");
      return;
    }

    setLoading(true);
    try {
      await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });
      navigate("/posts");
    } catch (err) {
      setError(err.message || "Không tạo được bài viết.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Create Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tiêu đề</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo bài viết"}
        </Button>
      </Form>
    </>
  );
}
