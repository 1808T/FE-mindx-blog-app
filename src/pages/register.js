import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

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
    <main>
      <div className="container-fluid">
        <div className="row py-5 bg-secondary text-light">
          <div className="col text-center">
            <h1>Register</h1>
          </div>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
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
            <div className="form-group p-2">
              <small>
                <label className="text-muted">Pick a question</label>
              </small>
              <select
                className="form-select"
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
            <small className="form-text text-muted">
              ⁉ You can use this to reset your password if forgotten.
            </small>
            <Input
              title="Enter your answer *"
              type="text"
              name="answer"
              placeholder="Write your answer here"
              handleChange={handleChange}
              value={user.answer}
            />
            <div className="form-group p-2 d-flex justify-content-center">
              <input
                type="checkbox"
                id="checkbox"
                value="agree"
                className="agree-checkbox"
                onChange={handleCheckbox}
              />
              <label htmlFor="checkbox">
                By clicking checkbox, you agree to our Terms and Conditions and Privacy Policy
              </label>
            </div>
            <div className="form-group p-2 d-flex justify-content-center">
              <button className="btn btn-dark" disabled={!checkbox}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Register"}
              </button>
            </div>
          </form>
          <div className="row">
            <div className="col">
              <p className="text-center">
                Already have an account? Go to <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <Modal
              title="Congratulation!!!"
              visible={ok}
              onCancel={() => setOk(false)}
              footer={null}>
              <div>
                <p>Register successfully !!!</p>
              </div>
              <div className="d-flex justify-content-end">
                <Link to="/login" className="btn btn-dark btn-sm">
                  Go to Login
                </Link>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
