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
      console.log(data.user);
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
      <div className="container-fluid">
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Login</h1>
          </div>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <Input
              title="Enter your e-mail address"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              handleChange={handleChange}
            />
            <Input
              title="Enter your password"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleChange={handleChange}
            />
            <div className="form-group p-2 d-flex justify-content-end">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
            <div className="form-group p-2 d-flex justify-content-center">
              <button className="btn btn-dark" disabled={!user.email || !user.password}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Login"}
              </button>
            </div>
          </form>
          <div className="row">
            <div className="col">
              <p className="text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
