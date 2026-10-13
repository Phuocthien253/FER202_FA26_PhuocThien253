
import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    session: 'Sáng'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('Vui lòng nhập họ tên!');
      return;
    }

    if (!form.email.includes('@')) {
      setError('Email không hợp lệ!');
      return;
    }

    setError('');

    navigate('/success', {
      state: {
        ...form,
        name: form.name.trim()
      },
      replace: true
    });
  };

  return (
    <Container className="mt-4">
      <h1>Đăng ký sự kiện</h1>

      {error && (
        <Alert variant="danger">{error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Buổi tham dự</Form.Label>
          <Form.Select
            name="session"
            value={form.session}
            onChange={handleChange}
          >
            <option value="Sáng">Sáng</option>
            <option value="Chiều">Chiều</option>
          </Form.Select>
        </Form.Group>

        <Button
          type="button"
          variant="secondary"
          className="me-2"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>

        <Button type="submit" variant="primary">
          Gửi đăng ký
        </Button>
      </Form>
    </Container>
  );
}
