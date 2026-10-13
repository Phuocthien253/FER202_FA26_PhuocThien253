
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button
} from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';
import { STUDENTS } from './students';

export default function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy dữ liệu tìm kiếm và lớp từ URL
  const q = searchParams.get('q') ?? '';
  const selectedClass = searchParams.get('class') ?? '';

  // Cập nhật một tham số, giữ nguyên các tham số khác
  const updateParam = (key, value, replace = false) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value.trim()) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace }
    );
  };

  // Lọc sinh viên theo từ khóa và lớp
  const filteredStudents = STUDENTS.filter((student) => {
    const keyword = q.trim().toLowerCase();

    const matchSearch =
      student.name.toLowerCase().includes(keyword) ||
      student.id.toLowerCase().includes(keyword);

    const matchClass =
      !selectedClass ||
      student.className === selectedClass;

    return matchSearch && matchClass;
  });

  // Xóa toàn bộ bộ lọc
  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <Container className="mt-4">
      <h1>Danh bạ sinh viên</h1>

      <Row className="mt-4 g-3">
        <Col md={5}>
          <Form.Group>
            <Form.Label>Tìm kiếm sinh viên</Form.Label>

            <Form.Control
              type="text"
              placeholder="Nhập tên hoặc MSSV"
              value={q}
              onChange={(e) =>
                updateParam('q', e.target.value, true)
              }
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group>
            <Form.Label>Lọc theo lớp</Form.Label>

            <Form.Select
              value={selectedClass}
              onChange={(e) =>
                updateParam('class', e.target.value)
              }
            >
              <option value="">Tất cả lớp</option>
              <option value="SE20B01">SE20B01</option>
              <option value="SE20B02">SE20B02</option>
              <option value="SE20B04">SE20B04</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3} className="d-flex align-items-end">
          <Button
            variant="secondary"
            onClick={clearFilters}
          >
            Xóa lọc
          </Button>
        </Col>
      </Row>

      <p className="mt-4">
        Tìm thấy {filteredStudents.length}/{STUDENTS.length} sinh viên
      </p>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>GPA</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.gpa.toFixed(1)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center text-muted"
              >
                Không có sinh viên phù hợp.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
