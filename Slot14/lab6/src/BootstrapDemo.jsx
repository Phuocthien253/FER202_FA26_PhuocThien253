
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Modal,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";

export default function BootstrapDemo() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [post, setPost] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (title.trim().length < 5) {
      newErrors.title = "Tiêu đề phải có ít nhất 5 ký tự.";
    }

    if (body.trim().length < 10) {
      newErrors.body = "Nội dung phải có ít nhất 10 ký tự.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    // Demo giao diện; chưa gửi dữ liệu lên API
    setTimeout(() => {
      setPost({ title: title.trim(), body: body.trim() });
      setMessage("Đã tạo bài viết demo thành công!");
      setShowToast(true);
      setLoading(false);
    }, 500);
  };

  const handleDelete = () => {
    setPost(null);
    setShowModal(false);
    setMessage("Đã xóa bài viết demo.");
    setShowToast(true);
  };

  return (
    <div className="container py-4">
      <h2>NC5 - React Bootstrap</h2>

      {loading && (
        <Alert variant="info">
          <Spinner size="sm" animation="border" className="me-2" />
          Đang xử lý...
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Tạo bài viết demo</Card.Title>

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                value={title}
                isInvalid={Boolean(errors.title)}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập ít nhất 5 ký tự"
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={body}
                isInvalid={Boolean(errors.body)}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Nhập ít nhất 10 ký tự"
              />
              <Form.Control.Feedback type="invalid">
                {errors.body}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : "Tạo bài viết demo"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {post && (
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <Button
              variant="danger"
              onClick={() => setShowModal(true)}
            >
              Xóa bài viết
            </Button>
          </Card.Body>
        </Card>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc muốn xóa bài viết demo này không?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xác nhận xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Lab 6</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
