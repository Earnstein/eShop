import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/apis/api";
import { toast } from "sonner";
import useAuthStore from "@/store/userState";
import FormGroup from "@/components/FormGroup";

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
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const { mutate, isSuccess, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: FormValues) => signIn(body),

    onMutate: () => {
      toast.loading("Signing in...");
    },
    onSuccess: (data) => {
      setUser(data.data);
      toast.dismiss();
      toast.success("Sign in successful");
      navigate(redirect);
    },
    onError: (error) => {
      clearUser();
      toast.error(error?.response?.data?.message || error?.message);
      toast.dismiss();
    },
  });
  const handleFormSubmit = async (
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
          <Form noValidate onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" disabled={isPending}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Row className="py-3">
        <Col>
          Don't have an account?{" "}
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainter>
  );
};

export default LoginPage;
