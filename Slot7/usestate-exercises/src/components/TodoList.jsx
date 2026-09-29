import { useState } from 'react';
import { Form, Button, ListGroup, Card, Container, Row, Col } from 'react-bootstrap';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học lập trình .NET' },
    { id: 2, text: 'Học lập trình Java' }
  ]);
  const [task, setTask] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    setTodos((prev) => [...prev, { id: Date.now(), text: task.trim() }]);
    setTask('');
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container className="py-4">
      <Row className="g-4 justify-content-center align-items-start">
        {/* Khung Nhập Task */}
        <Col md={5}>
          <Form onSubmit={handleAddTodo} className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Please input a Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button type="submit" variant="danger" className="text-nowrap px-3">
              Add Todo
            </Button>
          </Form>
        </Col>

        {/* Bảng Danh sách Todo */}
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white text-center fw-bold fs-5 py-2 text-dark border-0">
              Todo List
            </Card.Header>
            <Card.Body className="p-2">
              <ListGroup variant="flush">
                {todos.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center border-0 mb-2 rounded bg-light text-dark"
                  >
                    <span className="fs-6 fw-medium">{item.text}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
                {todos.length === 0 && (
                  <p className="text-center text-muted my-2">No tasks available</p>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

