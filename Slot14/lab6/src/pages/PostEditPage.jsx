
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import postApi from "../api/postApi";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      try {
        const response = await postApi.getById(id);
        if (active) {
          setTitle(response.data.title || "");
          setBody(response.data.body || "");
        }
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (title.trim().length < 5 || body.trim().length < 10) {
      setError("Tiêu đề cần ít nhất 5 ký tự, nội dung ít nhất 10 ký tự.");
      return;
    }

    setSaving(true);
    try {
      await postApi.update(id, {
        id: Number(id),
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || "Không cập nhật được bài viết.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Spinner animation="border" />;

  return (
    <>
      <h2>Edit Post #{id}</h2>
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

        <Button type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </Form>
    </>
  );
}
