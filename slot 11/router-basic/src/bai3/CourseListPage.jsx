
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { courses } from './courses';

export default function CourseListPage() {
  return (
    <Container className="mt-4">
      <h1>Danh sách môn học</h1>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, index) => (
            <tr key={course.code}>
              <td>{index + 1}</td>

              <td>
                <Link to={`/courses/${course.code}`}>
                  {course.code}
                </Link>
              </td>

              <td>{course.name}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
