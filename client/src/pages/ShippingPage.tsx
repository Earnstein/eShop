import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainter from "@/components/FormContainter";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useCartStore from "@/store/state";
import { useEffect } from "react";

interface FormValues {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const addressSchema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.number().required("Postal code is required"),
  country: yup.string().required("Country is required"),
});

const initialValuesAddress: FormValues = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const ShippingPage = () => {
  const navigate = useNavigate();
  const { saveShippingAddress, shippingAddress, totalPrice } = useCartStore();
  useEffect(() => {
    console.log(shippingAddress);
    console.log(totalPrice);
  }, [shippingAddress]);
  const handleFormSubmit: (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => Promise<void> = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    saveShippingAddress(values);
    resetForm();
    navigate("/payment");
  };
  return (
    <FormContainter>
      <h3 className="text-md-center">Enter Your Shipping Details</h3>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesAddress}
        validationSchema={addressSchema}
      >
        {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="address" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Address <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="20 VI st"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.address && errors.address)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                City <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Lagos"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.city && errors.city)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="postalCode" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Postal Code{" "}
                <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="340221"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.postalCode && errors.postalCode)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.postalCode}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="country" className="mb-4 rounded-0">
              <Form.Label className="title fw-bold">
                Country <span className="text-danger star text-center">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Nigeria"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={Boolean(touched.country && errors.country)}
              />

              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainter>
  );
};

export default ShippingPage;
