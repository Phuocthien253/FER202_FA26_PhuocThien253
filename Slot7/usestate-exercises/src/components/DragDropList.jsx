import { useState } from "react";
import {
  Card,
  ListGroup,
} from "react-bootstrap";

function DragDropList() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);

  const [draggingItem, setDraggingItem] =
    useState(null);

  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  const handleDragEnter = (index) => {
    if (
      draggingItem === null ||
      draggingItem === index
    ) {
      return;
    }

    const newItems = [...items];

    const [draggedItem] = newItems.splice(
      draggingItem,
      1
    );

    newItems.splice(
      index,
      0,
      draggedItem
    );

    setItems(newItems);
    setDraggingItem(index);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">
          Bài 7: Drag and Drop List
        </Card.Title>

        <ListGroup>
          {items.map((item, index) => (
            <ListGroup.Item
              key={item}
              draggable
              onDragStart={() =>
                handleDragStart(index)
              }
              onDragEnter={() =>
                handleDragEnter(index)
              }
              onDragEnd={handleDragEnd}
              onDragOver={(event) =>
                event.preventDefault()
              }
              style={{
                cursor: "grab",
                opacity:
                  draggingItem === index
                    ? 0.5
                    : 1,
              }}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default DragDropList;