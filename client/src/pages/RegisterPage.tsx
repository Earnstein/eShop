import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin: FormValues = {
    username: "",
    email: "",
    password: "",
};

const RegisterPage = () => {
  const handleFormSubmit: (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => Promise<void> = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    resetForm();
    console.log(values);
  };
  return (
    <FormContainter>
      <h1>Sign in</h1>
      <Formik 
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        })=>(
          <Form
          onSubmit={handleSubmit}
          >
            <Form.Group controlId="password" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Username <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.username && errors.username)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Email <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.email && errors.email)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Password <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.password && errors.password)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Row className="py-3">
          <Col>
            Already have an account? <Link to="/signin">Login</Link>
          </Col>
        </Row>
    </FormContainter>
  );
};

export default RegisterPage;