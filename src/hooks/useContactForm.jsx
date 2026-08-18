import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialValues = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length < 2) errors.name = "That name looks too short.";

  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email address.";

  if (!values.message.trim()) errors.message = "Please write a message.";
  else if (values.message.trim().length < 10)
    errors.message = "Message should be at least 10 characters.";

  return errors;
}

export function useContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...values, [name]: value }) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validate(values);
    setErrors(currentErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(currentErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      // ---------------------------------------------------------
      // NO BACKEND: we simulate a successful send.
      // To make this REAL later, replace the block below with a
      // fetch() to an email/form service (e.g. Formspree, Resend,
      // EmailJS). Build & test that request in Postman first, then
      // paste the working fetch here. Example shape:
      //
      // const res = await fetch("https://your-form-endpoint", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });
      // if (!res.ok) throw new Error("Request failed");
      // ---------------------------------------------------------
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrors({});
  };

  return {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}