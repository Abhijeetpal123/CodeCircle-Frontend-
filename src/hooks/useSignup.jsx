import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    passWord: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (formData.passWord.length < 8) {
      setError("Password needs to be at least 8 characters.");
      return;
    }

    if (formData.passWord !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailID: formData.emailID,
          passWord: formData.passWord,
        },
        { withCredentials: true }
      );

      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  };
}