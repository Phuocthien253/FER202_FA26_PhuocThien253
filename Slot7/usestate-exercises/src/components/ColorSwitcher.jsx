import { useState } from "react";
import {
  Card,
  Form,
} from "react-bootstrap";

function ColorSwitcher() {
  const [color, setColor] = useState("");

  return (
    <Card className="p-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">
          Bài 5: Color Switcher
        </Card.Title>

        <Form.Group className="mb-4">
          <Form.Label>
            Chọn màu
          </Form.Label>

          <Form.Select
            value={color}
            onChange={(event) =>
              setColor(event.target.value)
            }
          >
            <option value="">
              Select a color
            </option>

            <option value="red">
              Red
            </option>

            <option value="blue">
              Blue
            </option>

            <option value="green">
              Green
            </option>

            <option value="yellow">
              Yellow
            </option>
          </Form.Select>
        </Form.Group>

        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor:
              color || "#e9ecef",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
          className="mx-auto"
        />
      </Card.Body>
    </Card>
  );
}

export default ColorSwitcher;