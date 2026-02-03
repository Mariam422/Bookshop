import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRef } from "react";

export default function ResetPassword() {
  const inputsRef = useRef([]);

  const initialValues = {
    d1: "",
    d2: "",
    d3: "",
    d4: "",
  };

  const validationSchema = Yup.object({
    d1: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d2: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d3: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d4: Yup.string().matches(/^\d$/, "Required").required("Required"),
  });

  const handleSubmit = async (values) => {
    const code = values.d1 + values.d2 + values.d3 + values.d4;

    try {
      const res = await axios.post(
        "https://bookstore.eraasoft.pro/api/reset-password",
        {
          resetCode: code,
        },
      );

      console.log(res.data);
      alert("Code verified successfully ");
    } catch (error) {
      console.error(error);
      alert("Invalid or expired code ");
    }
  };

  const handleAutoFocus = (e, index) => {
    if (e.target.value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt">
      <div className=" shadow-md rounded-xl p-8 w-full max-w-sm text-center">
        <h2 className="text-center text-pink-600 font-semibold mb-6">
          Reset your password!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enter the 4-digit code that you received on your email
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="flex justify-between gap-2 my-6">
                {["d1", "d2", "d3", "d4"].map((name, index) => (
                  <Field name={name} key={name}>
                    {({ field }) => (
                      <input
                        {...field}
                        ref={(el) => (inputsRef.current[index] = el)}
                        maxLength="1"
                        type="text"
                        inputMode="numeric"
                        onInput={(e) => handleAutoFocus(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        className={`w-14 h-14 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 ${
                          errors[name] && touched[name]
                            ? "border-red-500 focus:ring-red-400"
                            : "focus:ring-pink-500"
                        }`}
                      />
                    )}
                  </Field>
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-medium transition disabled:opacity-50"
              >
                {isSubmitting ? "Verifying..." : "Verify Code"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
