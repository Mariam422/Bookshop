import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ResetStore } from "../passwordResetStore/resetStore";
import * as Yup from "yup";
import axios from "axios";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const setEmail = ResetStore((state) => state.setEmail);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleForgetPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post(
        "https://bookstore.eraasoft.pro/api/forget-password",
        values,
      );
      setEmail(values.email);
      navigate("/reset-password");
    } catch (err) {
      setErrors({ api: "Failed to send reset code. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-pink-600 font-semibold mb-4 text-center">
          Forget Password?
        </h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgetPassword}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {errors.api && (
                <p className="text-red-500 text-sm mb-3">{errors.api}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md"
              >
                {isSubmitting ? "Sending..." : "Send Reset Code"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
