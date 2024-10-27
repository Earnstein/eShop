import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useCartStore from "@/store/state";
import FormGroup from "@/components/FormGroup";
import CheckOutSteps from "@/components/CheckOutSteps";

interface ShippingFormValues {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const shippingSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.number().required("Postal code is required"),
  country: yup.string().required("Country is required"),
});

const initialShippingValues: ShippingFormValues = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const ShippingPage = () => {
  const navigate = useNavigate();
  const { saveShippingAddress, shippingAddress } = useCartStore();

  const handleSubmit = async (
    values: ShippingFormValues,
    { resetForm }: FormikHelpers<ShippingFormValues>
  ) => {
    saveShippingAddress(values);
    resetForm();
    navigate("/payment");
  };

  return (
    <FormContainter>
      <CheckOutSteps step1 step2 />
      <h3 className="text-md-center">Enter Your Shipping Details</h3>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialShippingValues}
        validationSchema={shippingSchema}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup
              errors={errors.address}
              touched={touched.address}
              name="address"
              type="text"
              placeholder="20 VI st"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              errors={errors.city}
              touched={touched.city}
              name="city"
              type="text"
              placeholder="Lagos"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              errors={errors.postalCode}
              touched={touched.postalCode}
              name="postalCode"
              type="text"
              placeholder="340221"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <FormGroup
              errors={errors.country}
              touched={touched.country}
              name="country"
              type="text"
              placeholder="Nigeria"
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {shippingAddress.address && (
        <Row className="py-3">
          <Col>
            Already added an address? <Link to="/payment">Go to Payment</Link>
          </Col>
        </Row>
      )}
    </FormContainter>
  );
};

export default ShippingPage;
