import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

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
    <main>
      <div className="container-fluid login-container">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group p-2 d-flex flex-column align-items-center">
              <img alt="blog-logo" src="/images/logo.svg" className="blog-logo" />
              <h2 className="mt-4">Login</h2>
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
            <div className="form-group p-2 d-flex justify-content-end">
              <Link to="/forgot-password" className="text-muted">
                Forgot your password?
              </Link>
            </div>
            <div className="form-group p-2 d-flex justify-content-center">
              <button className="btn btn-dark" disabled={!user.email || !user.password}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Login"}
              </button>
            </div>
            <div className="form-group p-2">
              <p className="text-center">
                Don't have an account?
                <Link to="/register">
                  <button type="button" className="btn btn-outline-secondary text-black ms-2">
                    Register
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
