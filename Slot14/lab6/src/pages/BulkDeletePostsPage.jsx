
import { useEffect, useState, useCallback } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import postApi from "../api/postApi";

export default function BulkDeletePostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await postApi.getAll();
      setPosts(response.data);
    } catch (err) {
      setError(err.message || "Không tải được bài viết.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function toggleSelect(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0) {
      setMessage("Vui lòng chọn ít nhất một bài viết.");
      return;
    }

    const idsToDelete = [...selectedIds];
    const originalPosts = [...posts];

    // Optimistic update: cập nhật giao diện ngay lập tức
    setPosts((current) =>
      current.filter((post) => !idsToDelete.includes(post.id))
    );
    setSelectedIds([]);
    setMessage("");
    setError("");

    // Gửi tất cả yêu cầu xóa, kể cả khi một yêu cầu thất bại
    const results = await Promise.allSettled(
      idsToDelete.map((id) => postApi.remove(id))
    );

    const failedIds = results
      .map((result, index) =>
        result.status === "rejected" ? idsToDelete[index] : null
      )
      .filter((id) => id !== null);

    if (failedIds.length > 0) {
      // Khôi phục dữ liệu của những bài xóa thất bại
      const failedPosts = originalPosts.filter((post) =>
        failedIds.includes(post.id)
      );

      setPosts((current) => {
        const currentIds = current.map((post) => post.id);
        return [
          ...current,
          ...failedPosts.filter((post) => !currentIds.includes(post.id)),
        ];
      });

      setError(
        `Xóa thất bại ${failedIds.length} bài viết. Các bài này đã được khôi phục trên giao diện.`
      );
    } else {
      setMessage(`Đã xóa thành công ${idsToDelete.length} bài viết.`);
    }
  }

  return (
    <div className="container py-4">
      <h2>NC10 - Bulk Delete Posts</h2>
      <p>Chọn nhiều bài viết rồi xóa cùng lúc.</p>

      {loading && <Spinner animation="border" />}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading &&
        posts.map((post) => (
          <Card key={post.id} className="mb-2">
            <Card.Body className="d-flex align-items-center gap-3">
              <Form.Check
                type="checkbox"
                checked={selectedIds.includes(post.id)}
                onChange={() => toggleSelect(post.id)}
                label=""
              />
              <div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        ))}

      <Button
        variant="danger"
        onClick={handleBulkDelete}
        disabled={loading || selectedIds.length === 0}
      >
        Xóa {selectedIds.length} bài đã chọn
      </Button>

      <Button
        variant="outline-secondary"
        className="ms-2"
        onClick={loadPosts}
        disabled={loading}
      >
        Tải lại
      </Button>
    </div>
  );
}
