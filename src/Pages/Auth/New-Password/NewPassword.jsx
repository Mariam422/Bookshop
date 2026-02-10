import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { ResetStore } from "../passwordResetStore/resetStore";

export default function NewPassword() {
  const navigate = useNavigate();
  const email = ResetStore((state) => state.email);
  const otp = ResetStore((state) => state.otp);
  const clearReset = ResetStore((state) => state.clearReset);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialValues = { password: "", password_confirmation: "" };
  const validationSchema = Yup.object({
    password: Yup.string().min(6, "At least 6 chars").required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("https://bookstore.eraasoft.pro/api/reset-password", {
        email,
        otp,
        password: values.password,
        password_confirmation: values.password_confirmation,
      });

      clearReset();
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Reset failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-pink-600 font-semibold mb-4 text-center">
          Create New Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label>Password</label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label>Confirm Password</label>
                <div className="relative">
                  <Field
                    type={showConfirm ? "text" : "password"}
                    name="password_confirmation"
                    className="w-full px-3 py-2 border rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-2.5"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage
                  name="password_confirmation"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-2 rounded-md"
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
