import { useReducer, useState } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  city: "",
  state: "",
  zip: "",
  agree: false
};

// useReducer quản lý dữ liệu form
function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.name]: action.value
      };
    default:
      return state;
  }
}

// Kiểm tra dữ liệu
function validate(data) {
  const errors = {};

  if (!data.firstName.trim())
    errors.firstName = "Please enter first name";

  if (!data.lastName.trim())
    errors.lastName = "Please enter last name";

  if (!data.username.trim())
    errors.username = "Please enter username";

  if (!data.city.trim())
    errors.city = "Please enter city";

  if (!data.state.trim())
    errors.state = "Please enter state";

  if (!/^\d{5,6}$/.test(data.zip))
    errors.zip = "Zip must contain 5-6 digits";

  if (!data.agree)
    errors.agree = "You must agree before submitting";

  return errors;
}

function Contact() {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: "firstName", label: "First name", md: 4 },
    { name: "lastName", label: "Last name", md: 4 },
    { name: "username", label: "Username", md: 4 },
    { name: "city", label: "City", md: 6 },
    { name: "state", label: "State", md: 3 },
    { name: "zip", label: "Zip", md: 3 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    dispatch({
      type: "UPDATE",
      name,
      value: type === "checkbox" ? checked : value
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <h1 className="mb-4">Contact Form</h1>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="g-3">
          {fields.map((field) => (
            <Form.Group
              as={Col}
              md={field.md}
              key={field.name}
            >
              <Form.Label>{field.label}</Form.Label>

              <Form.Control
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                isInvalid={!!errors[field.name]}
                placeholder={field.label}
              />

              <Form.Control.Feedback type="invalid">
                {errors[field.name]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
        </Row>

        <Form.Group className="mt-4 mb-3">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Agree to terms and conditions"
            checked={formData.agree}
            onChange={handleChange}
            isInvalid={!!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit Form
        </Button>
      </Form>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Completed Lab5</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Thông tin đã nhập vào form:</h5>

          {fields.map((field) => (
            <p key={field.name}>
              <strong>{field.label}: </strong>
              {formData[field.name]}
            </p>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;