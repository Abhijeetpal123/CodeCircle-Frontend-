import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailID: "",
    passWord: "",
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
    setIsSubmitting(true);

    try {
      await axios.post(
        `${BASE_URL}/login`,
        {
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