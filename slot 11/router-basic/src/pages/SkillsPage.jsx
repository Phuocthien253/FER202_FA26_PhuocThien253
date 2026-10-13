
import { Container, ListGroup } from 'react-bootstrap';

export default function SkillsPage() {
  return (
    <Container className="mt-4">
      <h1>Kỹ năng của tôi</h1>

      <ListGroup className="mt-3">
        <ListGroup.Item>HTML & CSS</ListGroup.Item>
        <ListGroup.Item>JavaScript</ListGroup.Item>
        <ListGroup.Item>ReactJS</ListGroup.Item>
        <ListGroup.Item>SQL</ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
