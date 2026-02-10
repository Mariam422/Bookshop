import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { ResetStore } from "../passwordResetStore/resetStore";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const setUser = ResetStore((state) => state.setUser);

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/register",
        values,
      );
      console.log("Register Success:", res.data);
      setUser(res.data.data);
      navigate("/");
    } catch (err) {
      setErrors({ api: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const registerSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("The email field is required.")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your password"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-gray-100">
      <div className=" w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-center text-pink-600 font-semibold mb-6">
          Create Account
        </h2>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            terms: false,
          }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex gap-4 mb-4">
                {["first_name", "last_name"].map((field, idx) => (
                  <div className="w-1/2" key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {field === "first_name" ? "First Name" : "Last Name"}
                    </label>
                    <Field
                      type="text"
                      name={field}
                      placeholder={field === "first_name" ? "John" : "Smith"}
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-pink-500"
                    />
                    <ErrorMessage
                      name={field}
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
              </div>

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

              <div className="mb-4">
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

              <div className="mb-3">
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

              <div className="flex items-center gap-2 mb-5">
                <Field
                  type="checkbox"
                  name="terms"
                  className="accent-pink-600"
                />
                <span className="text-sm">
                  Agree with{" "}
                  <span className="text-pink-600">Terms & Conditions</span>
                </span>
              </div>
              <ErrorMessage
                name="terms"
                component="p"
                className="text-red-500 text-sm mb-3"
              />

              <ErrorMessage
                name="api"
                component="p"
                className="text-red-600 text-sm my-2 text-center"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium transition disabled:opacity-50"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-pink-600 ml-2 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px"></div>
        </div>

        <button className="w-full border border-gray-300 py-2 rounded-md mb-3 hover:bg-gray-50 transition shadow flex items-center justify-center gap-2">
          <Icon icon="logos:google-icon" width="20" />
          Sign up with Google
        </button>

        <button className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition shadow flex items-center justify-center gap-2">
          <Icon icon="logos:facebook" width="20" />
          Sign up with Facebook
        </button>
      </div>
    </div>
  );
}
