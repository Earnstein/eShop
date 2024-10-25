import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/apis/api";
import { toast } from "sonner";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

const initialValuesLogin: FormValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: FormValues) => signUp(body),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Sign up successful");
      navigate("/signin");
    },
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const handleFormSubmit: (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => Promise<void> = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    mutate(values);
    if (isSuccess) resetForm();
  };
  return (
    <FormContainter>
      <h1>Sign in</h1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Username <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.name && errors.name)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.name}
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

            <Button variant="primary" type="submit" disabled={isPending}>
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
