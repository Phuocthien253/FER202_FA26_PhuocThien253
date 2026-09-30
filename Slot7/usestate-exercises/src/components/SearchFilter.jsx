import { useState } from "react";
import {
  Card,
  Form,
  ListGroup,
} from "react-bootstrap";

function SearchFilter() {
  const [search, setSearch] = useState("");

  // Danh sách mẫu
  const items = [
    "ReactJS",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "NodeJS",
  ];

  const filteredItems = items.filter((item) =>
    item
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">
          Bài 6: Search Filter
        </Card.Title>

        <Form.Group className="mb-4">
          <Form.Label>
            Tìm kiếm
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Nhập từ khóa..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </Form.Group>

        <ListGroup>
          {filteredItems.map((item) => (
            <ListGroup.Item key={item}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SearchFilter;