
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      name: 'Dự án 1',
      description: 'Website giới thiệu cá nhân.'
    },
    {
      id: 2,
      name: 'Dự án 2',
      description: 'Ứng dụng quản lý sinh viên.'
    },
    {
      id: 3,
      name: 'Dự án 3',
      description: 'Website bán hàng cơ bản.'
    }
  ];

  return (
    <Container className="mt-4">
      <h1>Dự án của tôi</h1>

      <Row className="mt-3 g-3">
        {projects.map((project) => (
          <Col md={4} key={project.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  {project.name}
                </Card.Title>

                <Card.Text>
                  {project.description}
                </Card.Text>

                <Button variant="primary">
                  Xem chi tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
