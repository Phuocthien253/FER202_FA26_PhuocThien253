import Form from 'react-bootstrap/Form';

const InputField = ({
  id,
  label,
  helpText,
  error,
  ...inputProps
}) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && (
        <Form.Label>
          {label}
          {inputProps.required && (
            <span className="text-danger"> *</span>
          )}
        </Form.Label>
      )}

      <Form.Control
        {...inputProps}
        isInvalid={Boolean(error)}
      />

      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>

      {!error && helpText && (
        <Form.Text className="text-muted">
          {helpText}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default InputField;