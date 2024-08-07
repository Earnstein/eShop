import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesLogin: FormValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const handleFormSubmit = async (
    values: FormValues,
    {resetForm}: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    resetForm();
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
          noValidate
          
          onSubmit={handleSubmit}
          >
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
            Don't have an account? <Link to="/signup">Register</Link>
          </Col>
        </Row>
    </FormContainter>
  );
};

export default LoginPage;