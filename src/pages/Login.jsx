import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../context";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    setLoading(true);
    const data = await login(user);
    setLoading(false);
    if (data.hasOwnProperty("msg")) {
      toast.error(data.msg);
    }
    if (data.user) {
      // update context
      setUser({
        user: data.user,
        token: data.token,
      });

      // save to local storage
      window.localStorage.setItem("auth", JSON.stringify(data));
      // redirect somethings
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    }
  };

  const login = async (user) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="mt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl border-b-4 mb-4 pb-2 border-blue-500">
          Login Form
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-500">
              Email
            </label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-[2px] rounded-md px-3 py-2 w-[250px] sm:w-[500px]"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-[2px] rounded-md px-3 py-2 w-[250px] sm:w-[500px]"
            />
          </div>
          <br />

          <Link to={"/register"} className="text-right underline text-blue-800">
            Not A Member? Register
          </Link>
          <br />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-400 rounded-md text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
