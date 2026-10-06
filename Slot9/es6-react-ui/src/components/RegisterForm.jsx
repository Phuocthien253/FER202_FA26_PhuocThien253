import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import InputField from './InputField';
import AppButton from './AppButton';

import {
  fields,
  genders,
  majors,
  initialValues,
} from '../data/registerConfig';

const validate = (values) => {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên';
  }

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  }

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword =
      'Vui lòng nhập lại mật khẩu';
  } else if (
    values.confirmPassword !== values.password
  ) {
    errors.confirmPassword =
      'Mật khẩu nhập lại không khớp';
  }

  if (!values.major) {
    errors.major = 'Vui lòng chọn chuyên ngành';
  }

  if (!values.agree) {
    errors.agree = 'Bạn cần đồng ý điều khoản';
  }

  return errors;
};

const RegisterForm = () => {
  const [values, setValues] =
    useState(initialValues);

  const [errors, setErrors] =
    useState({});

  const [submitted, setSubmitted] =
    useState(null);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }

    setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <Row className="justify-content-center my-4">
      <Col md={8}>
        <Card>
          <Card.Header
            as="h4"
            className="text-center"
          >
            Đăng ký tài khoản
          </Card.Header>

          <Card.Body>
            <Form
              noValidate
              onSubmit={handleSubmit}
            >
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  {...field}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                />
              ))}

              <Form.Group className="mb-3">
                <Form.Label>
                  Giới tính
                </Form.Label>

                <div>
                  {genders.map((gender) => (
                    <Form.Check
                      inline
                      key={gender}
                      type="radio"
                      name="gender"
                      id={`gender-${gender}`}
                      label={gender}
                      value={gender}
                      checked={
                        values.gender === gender
                      }
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Chuyên ngành
                </Form.Label>

                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  isInvalid={
                    Boolean(errors.major)
                  }
                >
                  <option value="">
                    -- Chọn chuyên ngành --
                  </option>

                  {majors.map((major) => (
                    <option
                      key={major}
                      value={major}
                    >
                      {major}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.major}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label="Tôi đồng ý với điều khoản dịch vụ"
                  checked={values.agree}
                  onChange={handleChange}
                  isInvalid={
                    Boolean(errors.agree)
                  }
                  feedback={errors.agree}
                  feedbackType="invalid"
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <AppButton type="submit">
                  Đăng ký
                </AppButton>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handleReset}
                >
                  Làm lại
                </Button>
              </div>
            </Form>

            {submitted && (
              <Alert
                variant="success"
                className="mt-4"
              >
                <strong>
                  Đã nhận đăng ký của{' '}
                  {submitted.fullName}
                </strong>

                <pre className="mt-3 mb-0">
                  {JSON.stringify(
                    submitted,
                    null,
                    2
                  )}
                </pre>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;