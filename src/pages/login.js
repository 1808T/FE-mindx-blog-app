import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined, FacebookFilled, GoogleSquareFilled, GithubFilled } from "@ant-design/icons";

const Login = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user: {},
    token: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/login", {
        email: user.email,
        password: user.password
      });
      // UPDATE GLOBAL CONTEXT
      setState({
        user: data.user,
        token: data.token
      });
      // SAVE TOKEN IN LOCAL STORAGE
      window.localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
      toast.success(data.message, { theme: "colored" });
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  // PREVENT LOGGED-IN USER FROM ACCESSING LOGIN PAGE
  if (state && state.token) navigate("/");

  return (
    <main className="container-fluid d-flex justify-content-center login-container-fluid">
      <div className="container login-container">
        <div className="d-flex justify-content-center" id="login-container">
          <div className="d-flex flex-column justify-content-center align-items-center login-frame">
            <h1>Hello, friends!</h1>
            <h6>Enter your personal details and start your journey with us</h6>
            <Link to="/register" className="btn btn-outline-light">
              Register
            </Link>
          </div>
          <form
            className="d-flex flex-column justify-content-center align-items-center login-form"
            onSubmit={handleSubmit}>
            <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
              <img src="/images/logo.svg" className="brand-logo mb-3" alt="logo" />
              <h4>Login</h4>
              <div className="d-flex justify-content-evenly">
                <FacebookFilled className="btn btn-outline-light login-btn me-2" />
                <GoogleSquareFilled className="btn btn-outline-light login-btn me-2" />
                <GithubFilled className="btn btn-outline-light login-btn" />
              </div>
            </div>
            <Input
              title="E-mail address"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              handleChange={handleChange}
            />
            <Input
              title="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleChange={handleChange}
            />
            <div className="form-group mb-3">
              <Link to="/forgot-password" className="align-self-end">
                Forgot your password?
              </Link>
            </div>
            <div className="form-group mb-3 d-flex justify-content-center">
              <button
                className="btn btn-secondary text-white"
                disabled={!user.email || !user.password}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
