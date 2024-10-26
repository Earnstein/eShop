import { Form } from "react-bootstrap";
type FormProps = {
  name: string;
  type: string;
  label?: string;
  placeholder: string;
  touched: any;
  errors: any;
  handleBlur: any;
  handleChange: any;
};

const FormGroup: React.FC<FormProps> = ({
  name,
  type,
  placeholder,
  label,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  return (
    <Form.Group controlId={name} className="mb-2 rounded-0">
      <Form.Label className="title fw-bold">
        {label || name.charAt(0).toUpperCase() + name.slice(1)}
        <span className="text-danger star text-center">*</span>
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={Boolean(touched && errors)}
      />

      <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormGroup;
