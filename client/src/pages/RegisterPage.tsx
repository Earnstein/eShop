import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { I_User, signUp } from "@/apis/api";
import { toast } from "sonner";
import FormGroup from "@/components/FormGroup";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValuesLogin: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const { mutate, isPending, isSuccess } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: I_User) => signUp(body),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Sign up successful");
      navigate("/signin");
    },
    onMutate: () => {
      toast.loading("Signing up...");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message);
      toast.dismiss();
    },
  });

  const handleFormSubmit: (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => Promise<void> = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    const { confirmPassword, ...body } = values;
    mutate(body);
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
            <FormGroup
              label="Username"
              errors={errors.name}
              touched={touched.name}
              name="name"
              type="text"
              placeholder="Username"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              errors={errors.email}
              touched={touched.email}
              name="email"
              type="email"
              placeholder="Email"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              errors={errors.password}
              touched={touched.password}
              name="password"
              type="password"
              placeholder="Password"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              label="Confirm Password"
              errors={errors.confirmPassword}
              touched={touched.confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <Button variant="primary" type="submit" disabled={isPending}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/signin?redirect=${redirect}` : "/signin"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainter>
  );
};

export default RegisterPage;
