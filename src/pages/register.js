import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined, FacebookFilled, GoogleSquareFilled, GithubFilled } from "@ant-design/icons";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    answer: ""
  });
  const [checkbox, setCheckbox] = useState(false);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleCheckbox = e => {
    setCheckbox(e.target.checked);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/register", {
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        question: user.question,
        answer: user.answer
      });
      setOk(data.ok);
      setUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        answer: ""
      });
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  if (state && state.token) navigate("/");

  return (
    <main className="container-fluid d-flex justify-content-center register-container-fluid">
      <div className="container register-container">
        <div className="d-flex justify-content-center" id="register-container">
          <form
            className="d-flex flex-column justify-content-center align-items-center register-form"
            onSubmit={handleSubmit}>
            <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
              <h4>Register</h4>
              <div
                className="d-flex justify-content-evenly register-icons mb-3"
                style={{ width: "100%" }}>
                <FacebookFilled className="btn btn-outline-secondary register-btn" />
                <GoogleSquareFilled className="btn btn-outline-secondary register-btn" />
                <GithubFilled className="btn btn-outline-secondary register-btn" />
              </div>
            </div>
            <Input
              title="Enter your username *"
              type="text"
              name="username"
              placeholder="Enter your username"
              handleChange={handleChange}
              value={user.username}
            />
            <Input
              title="Enter your e-mail address *"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              handleChange={handleChange}
              value={user.email}
            />
            <Input
              title="Enter your password *"
              type="password"
              name="password"
              placeholder="Enter your password"
              handleChange={handleChange}
              value={user.password}
            />
            <Input
              title="Confirm your password *"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              handleChange={handleChange}
              value={user.confirmPassword}
            />
            <div className="form-group mb-3">
              <small>
                <label className="text-black">Pick a question</label>
              </small>
              <select
                className="form-select form-select-sm"
                defaultValue="Choose an option ..."
                name="question"
                onChange={handleChange}>
                <option disabled hidden>
                  Choose an option ...
                </option>
                <option>What is your favorite color?</option>
                <option>What is your best friend's name?</option>
                <option>What city you were born?</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <small className="form-text text-black">
                ⁉ You can use this to reset your password if forgotten.
              </small>
            </div>
            <Input
              title="Enter your answer *"
              type="text"
              name="answer"
              placeholder="Write your answer here"
              handleChange={handleChange}
              value={user.answer}
            />
            <div
              className="form-group mb-3 d-flex justify-content-center"
              style={{ flexDirection: "row", justifyContent: "center" }}>
              <input
                type="checkbox"
                id="checkbox"
                value="agree"
                className="agree-checkbox"
                onChange={handleCheckbox}
                style={{ width: "5vh" }}
              />
              <small>
                <label htmlFor="checkbox">
                  By clicking checkbox, you agree to our Terms and Conditions and Privacy Policy
                </label>
              </small>
            </div>
            <div className="form-group mb-3 d-flex justify-content-center">
              <button className="btn btn-dark text-white" disabled={!checkbox}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Register"}
              </button>
            </div>
          </form>
          <div className="d-flex flex-column justify-content-center align-items-center register-frame">
            <h1>Welcome Back!</h1>
            <h6>To keep connected with us please login with your personal info</h6>
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Modal title="Congratulation!!!" visible={ok} onCancel={() => setOk(false)} footer={null}>
          <div>
            <p>Register successfully !!!</p>
          </div>
          <div className="d-flex justify-content-end">
            <Link to="/login" className="btn btn-outline-dark btn-sm">
              Go to Login
            </Link>
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default Register;
