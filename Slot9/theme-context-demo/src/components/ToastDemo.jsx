import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useToast } from "../contexts/ToastContext";

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div>
      <h2>Notification / Toast Demo</h2>

      <Stack direction="horizontal" gap={2}>
        <Button
          variant="success"
          onClick={() =>
            showToast(
              "Thao tác thành công!",
              "success"
            )
          }
        >
          Success Toast
        </Button>

        <Button
          variant="warning"
          onClick={() =>
            showToast(
              "Đây là cảnh báo!",
              "warning"
            )
          }
        >
          Warning Toast
        </Button>

        <Button
          variant="danger"
          onClick={() =>
            showToast(
              "Đã xảy ra lỗi!",
              "danger"
            )
          }
        >
          Danger Toast
        </Button>
      </Stack>
    </div>
  );
}