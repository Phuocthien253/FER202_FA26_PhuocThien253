
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Form, Card, Spinner, Alert } from "react-bootstrap";
import postApi from "../api/postApi";
import useDebounce from "../hooks/useDebounce";
export default function SearchPostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [input, setInput] = useState(query);
  const debouncedQuery = useDebounce(input.trim(), 500);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Đồng bộ input với URL
 useEffect(() => {
  setSearchParams(
    (previous) => {
      const next = new URLSearchParams(previous);

      if (debouncedQuery) {
        next.set("q", debouncedQuery);
      } else {
        next.delete("q");
      }

      return next;
    },
    { replace: true }
  );
}, [debouncedQuery, setSearchParams]);

  // Debounce: chờ 500ms sau khi ngừng gõ
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = input.trim();

      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          if (value) {
            next.set("q", value);
          } else {
            next.delete("q");
          }

          return next;
        },
        { replace: true }
      );

      setDebouncedQuery(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [input, setSearchParams]);

  // Tìm kiếm bài viết bằng JSON Server
  useEffect(() => {
    let cancelled = false;

    async function searchPosts() {
      setLoading(true);
      setError("");

      try {
        const response = await postApi.getAll(
          debouncedQuery ? { q: debouncedQuery } : {}
        );

        if (!cancelled) {
          setPosts(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Không thể tải bài viết.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    searchPosts();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <div className="container py-4">
      <h2>NC9 - Debounce Search</h2>

      <Form.Group className="mb-3">
        <Form.Label>Tìm bài viết theo tiêu đề hoặc nội dung</Form.Label>
        <Form.Control
          type="search"
          placeholder="Nhập từ khóa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Form.Text>
          Từ khóa được lưu trên URL dưới dạng ?q=...
        </Form.Text>
      </Form.Group>

      {loading && (
        <div className="mb-3">
          <Spinner animation="border" size="sm" /> Đang tìm kiếm...
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <p>Tìm thấy {posts.length} bài viết.</p>
      )}

      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Link to={`/posts/${post.id}`}>Xem chi tiết</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
