import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import InputField from './InputField';
import AppButton from './AppButton';

import {
  fields,
  genders,
  majors,
  initialValues,
} from '../data/registerConfig';

import {
  validateRegister,
} from '../utils/validateRegister';

const ValidatedRegisterForm = () => {
  const [values, setValues] =
    useState(initialValues);

  const [touched, setTouched] =
    useState({});

  const [success, setSuccess] =
    useState('');

  const errors =
    validateRegister(values);

  const isValid =
    Object.keys(errors).length === 0;

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

    setSuccess('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const showError = (name) =>
    touched[name]
      ? errors[name]
      : undefined;

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched =
      Object.keys(values).reduce(
        (result, name) => ({
          ...result,
          [name]: true,
        }),
        {}
      );

    setTouched(allTouched);

    if (!isValid) {
      return;
    }

    const registeredName =
      values.fullName;

    setSuccess(
      `Đăng ký thành công! Chào mừng ${registeredName}`
    );

    setValues(initialValues);
    setTouched({});
  };

  return (
    <Row className="justify-content-center my-4">
      <Col md={8}>
        <Card>
          <Card.Header
            as="h4"
            className="text-center"
          >
            Form đăng ký có Validation
          </Card.Header>

          <Card.Body>
            {success && (
              <Alert variant="success">
                {success}
              </Alert>
            )}

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
                  onBlur={handleBlur}
                  error={showError(field.id)}
                />
              ))}

              {/* Giới tính */}
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
                      id={`validated-gender-${gender}`}
                      label={gender}
                      value={gender}
                      checked={
                        values.gender ===
                        gender
                      }
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>

              {/* Chuyên ngành */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Chuyên ngành
                </Form.Label>

                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    Boolean(
                      showError('major')
                    )
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
                  {showError('major')}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Điều khoản */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label="Tôi đồng ý với điều khoản dịch vụ"
                  checked={values.agree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    Boolean(
                      showError('agree')
                    )
                  }
                  feedback={
                    showError('agree')
                  }
                  feedbackType="invalid"
                />
              </Form.Group>

              <AppButton type="submit">
                Đăng ký
              </AppButton>

              <div
                className={
                  isValid
                    ? 'text-success mt-3'
                    : 'text-danger mt-3'
                }
              >
                {isValid
                  ? 'Thông tin hợp lệ'
                  : `Còn ${
                      Object.keys(errors)
                        .length
                    } mục chưa hợp lệ`}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ValidatedRegisterForm;