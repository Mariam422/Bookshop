import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const handleForgetPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/forget-password",
        values,
      );
      console.log("ForgetPassword Success:", res.data);
      navigate("/ResetPassword", { state: { email: values.email } });
    } catch (err) {
      setErrors({ api: "Failed to send reset code. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt">
      <div className=" w-full max-w-md shadow-lg rounded-lg p-4">
        <h2 className="text-center text-pink-600 font-semibold mb-6 ">
          Forget Password?
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email to receive a reset code
        </p>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgetPassword}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
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
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium transition disabled:opacity-50"
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
