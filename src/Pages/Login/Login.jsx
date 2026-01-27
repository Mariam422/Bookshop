import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/login",
        values,
      );
      console.log(res.data);
    } catch (err) {
      setErrors({ api: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-center text-pink-600 font-semibold mb-6">
          Welcome Back!
        </h2>

        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
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

              <div className="mb-2">
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

              <ErrorMessage
                name="api"
                component="p"
                className="text-red-600 text-sm my-2 text-center"
              />

              <div className="flex items-center justify-between text-sm mb-5">
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="accent-pink-600"
                  />
                  Remember me
                </label>
                <a href="#" className="text-pink-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium transition disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px"></div>
        </div>

        <button className="w-full border border-gray-300 py-2 rounded-md mb-3 hover:bg-gray-50 transition shadow flex items-center justify-center gap-2">
          <Icon icon="logos:google-icon" width="20" />
          Login with Google
        </button>

        <button className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition shadow flex items-center justify-center gap-2">
          <Icon icon="logos:facebook" width="20" />
          Login with Facebook
        </button>
      </div>
    </div>
  );
}
