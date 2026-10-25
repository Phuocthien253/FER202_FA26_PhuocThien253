
import { useEffect, useCallback } from "react";
import { Button, Spinner, Alert, Card } from "react-bootstrap";
import postApi from "./api/postApi";
import useAxios from "./hooks/useAxios";

export default function UseAxiosDemo() {
  const getPosts = useCallback(
    () => postApi.getAll({ _limit: 5 }),
    []
  );

  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useAxios(getPosts);

  useEffect(() => {
    refetch().catch(() => {});
  }, [refetch]);

  return (
    <div className="my-4">
      <h2>NC8 - Custom Hook useAxios</h2>

      <Button
        onClick={() => refetch().catch(() => {})}
        disabled={loading}
        className="mb-3"
      >
        {loading ? "Đang tải..." : "Refetch - Tải lại bài viết"}
      </Button>

      {loading && (
        <div>
          <Spinner animation="border" size="sm" /> Đang tải dữ liệu...
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {posts?.map((post) => (
        <Card key={post.id} className="mb-2">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
