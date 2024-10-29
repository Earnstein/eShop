import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useCartStore from "@/store/cartState";
import CheckOutSteps from "@/components/CheckOutSteps";
import { useEffect } from "react";

type FormValues = {
  paymentMethod: string;
};

const initialValues: FormValues = {
  paymentMethod: "PayPal",
};
const validationSchema = yup.object({
  paymentMethod: yup.string().required("Please select a payment method"),
});

const PaymentPage = () => {
  const navigate = useNavigate();
  const { savePaymentMethod, shippingAddress } = useCartStore();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const handleFormSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    savePaymentMethod(values.paymentMethod);
    resetForm();
    navigate("/placeorder");
  };
  return (
    <FormContainter>
      <CheckOutSteps step1 step2 step3 />
      <h3>Payment Method</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  name="paymentMethod"
                  id="PayPal"
                  value={values.paymentMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked
                  className="my-2"
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainter>
  );
};

export default PaymentPage;
