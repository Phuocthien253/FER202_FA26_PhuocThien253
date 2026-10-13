
import { Alert, Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { findCourse } from './courses';

export default function CourseDetailPage() {
  const { code } = useParams();
  const course = findCourse(code);

  if (!course) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          Không tìm thấy môn học có mã {code}
        </Alert>

        <Link to="/courses">
          ← Quay lại danh sách
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Chi tiết môn học</h1>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>

          <Card.Text>
            <strong>Mã môn:</strong> {course.code}
          </Card.Text>

          <Card.Text>
            <strong>Học kỳ:</strong> {course.semester}
          </Card.Text>

          <Card.Text>
            <strong>Số tín chỉ:</strong> {course.credits}
          </Card.Text>

          <Card.Text>
            <strong>Mô tả:</strong> {course.desc}
          </Card.Text>

          <Link
            to="/courses"
            className="btn btn-primary"
          >
            ← Quay lại danh sách
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
