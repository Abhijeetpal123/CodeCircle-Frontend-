import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailID: "",
    passWord: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailID: formData.emailID,
          passWord: formData.passWord,
        },
        { withCredentials: true },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <form
        className="w-full max-w-md space-y-5 rounded-2xl bg-slate-900 p-8 shadow-xl"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-slate-400">
            Join CodeCircle and connect with developers.
          </p>
        </div>

        <label
          htmlFor="firstName"
          className="flex flex-col gap-2 text-sm font-medium text-slate-200"
        >
          First Name
          <input
            id="firstName"
            type="text"
            required
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label
          htmlFor="lastName"
          className="flex flex-col gap-2 text-sm font-medium text-slate-200"
        >
          Last Name
          <input
            id="lastName"
            type="text"
            required
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label
          htmlFor="emailID"
          className="flex flex-col gap-2 text-sm font-medium text-slate-200"
        >
          Email
          <input
            id="emailID"
            type="email"
            required
            name="emailID"
            value={formData.emailID}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label
          htmlFor="passWord"
          className="flex flex-col gap-2 text-sm font-medium text-slate-200"
        >
          Password
          <input
            id="passWord"
            type="password"
            required
            name="passWord"
            value={formData.passWord}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
