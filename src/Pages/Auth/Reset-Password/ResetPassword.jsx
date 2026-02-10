import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResetStore } from "../passwordResetStore/resetStore";

export default function ResetPassword() {
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const setOtp = ResetStore((state) => state.setOtp)


  const initialValues = { d1: "", d2: "", d3: "", d4: "", d5: "", d6: "" };
  const validationSchema = Yup.object({
    d1: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d2: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d3: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d4: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d5: Yup.string().matches(/^\d$/, "Required").required("Required"),
    d6: Yup.string().matches(/^\d$/, "Required").required("Required"),
  });

  const handleSubmit = (values) => {
    const otp =
      values.d1 + values.d2 + values.d3 + values.d4 + values.d5 + values.d6;
    setOtp(otp);
    navigate("/NewPassword");
  };

  const handleAutoFocus = (e, index) => {
    if (e.target.value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0)
      inputsRef.current[index - 1].focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="shadow-md rounded-lg p-8 w-full max-w-md text-center bg-white">
        <h2 className="text-pink-600 font-semibold mb-4">
          Enter Verification Code
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex justify-between gap-3 my-6">
                {["d1", "d2", "d3", "d4", "d5", "d6"].map((name, index) => (
                  <Field name={name} key={name}>
                    {({ field }) => (
                      <input
                        {...field}
                        ref={(el) => (inputsRef.current[index] = el)}
                        maxLength="1"
                        inputMode="numeric"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                          handleAutoFocus(e, index);
                        }}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        className={`w-12 h-12 text-center text-lg border-2 rounded-xl focus:ring-2 ${
                          errors[name] && touched[name]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-pink-500"
                        }`}
                      />
                    )}
                  </Field>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-2 rounded-md"
              >
                Continue
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
