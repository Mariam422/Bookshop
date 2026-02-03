import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import * as Yup from "yup";
import axios from "axios";

export default function NewPassword() {
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const resetCode = localStorage.getItem("resetCode");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = { password: "", password_confirmation: "" };
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "At least 6 chars").required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("https://bookstore.eraasoft.pro/api/reset-password", {
        email,
        resetCode,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Reset failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-full max-w-md shadow-lg rounded-lg p-4">
        <h2 className="text-center text-pink-600 font-semibold mb-6 ">
          Create New Password
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Create a strong password Your new password must be different from
          previous one
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-md pr-10 border-gray-300 focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="password_confirmation"
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 border rounded-md pr-10 border-gray-300 focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-2.5 text-gray-400"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password_confirmation"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
