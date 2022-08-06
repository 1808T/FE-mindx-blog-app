import React from "react";
import { UserContext } from "../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    answer: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [question, setQuestion] = useState(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitEmail = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/forgot-password", {
        email: user.email
      });
      setQuestion(data.question);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const resetPassword = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/forgot-password", {
        email: user.email,
        answer: user.answer,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword
      });
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  if (state && state.token) navigate("/");

  return (
    <>
      {/* <main>
        <div className="container-fluid">
          <div className="row py-5 bg-secondary text-light">
            <div className="col text-center">
              <h1>Reset your password</h1>
            </div>
          </div>
        </div>
        {question !== null ? (
          <>
            <form onSubmit={resetPassword}>
              <div className="form-group mb-3">
                <small>
                  <label className="text-muted">Your question</label>
                </small>
                <input defaultValue={question} className="form-control form-control-sm" />
              </div>
              <small className="form-text text-muted">✅ Answer this to reset your password</small>
              <Input
                title="Enter your answer *"
                type="text"
                name="answer"
                placeholder="Write your answer here"
                handleChange={handleChange}
              />
              <Input
                title="Enter your new password *"
                type="password"
                name="newPassword"
                placeholder="Enter your password"
                handleChange={handleChange}
              />
              <Input
                title="Confirm your new password *"
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm your password"
                handleChange={handleChange}
              />
              <div className="form-group p-2 d-flex justify-content-center">
                <button
                  className="btn btn-dark"
                  disabled={!user.newPassword || !user.confirmNewPassword || !user.answer}>
                  {loading ? <SyncOutlined spin className="py-1" /> : "Reset Password"}
                </button>
              </div>
            </form>
            <div>
              <Modal
                title="Congratulation!!!"
                visible={ok}
                onCancel={() => setOk(false)}
                footer={null}>
                <div>
                  <p>You can now log in with your new password.</p>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to="/login" className="btn btn-dark btn-sm">
                    Go to Login
                  </Link>
                </div>
              </Modal>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitEmail}>
            <Input
              title="Enter your e-mail address *"
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              handleChange={handleChange}
            />
            <div className="form-group p-2 d-flex justify-content-center">
              <button className="btn btn-dark" disabled={!user.email}>
                {loading ? <SyncOutlined spin className="py-1" /> : "Send"}
              </button>
            </div>
          </form>
        )}
      </main> */}
      <main className="container-fluid d-flex justify-content-center forgot-password-container-fluid">
        <div className="container forgot-password-container">
          <div className="d-flex justify-content-center" id="forgot-password-container">
            <div className="d-flex flex-column justify-content-center align-items-center forgot-password-frame">
              <h1>Oops!</h1>
              <h6>Fill the form to reset your password</h6>
            </div>
            {question !== null ? (
              <form
                className="d-flex flex-column justify-content-center align-items-center forgot-password-form"
                onSubmit={resetPassword}>
                <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
                  <img src="/images/logo.svg" className="brand-logo mb-3" alt="logo" />
                  <h4>Reset Password</h4>
                </div>
                <div className="form-group mb-3 forgot-password-form-container">
                  <small>
                    <label className="text-muted">Your question</label>
                  </small>
                  <input defaultValue={question} className="form-control form-control-sm" />
                  <small className="form-text text-muted">
                    ✅ Answer this to reset your password
                  </small>
                  <Input
                    title="Enter your answer *"
                    type="text"
                    name="answer"
                    placeholder="Write your answer here"
                    handleChange={handleChange}
                  />
                  <Input
                    title="Enter your new password *"
                    type="password"
                    name="newPassword"
                    placeholder="Enter your password"
                    handleChange={handleChange}
                  />
                  <Input
                    title="Confirm your new password *"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm your password"
                    handleChange={handleChange}
                  />
                  <div className="form-group mb-3 d-flex justify-content-center">
                    <button
                      className="btn btn-dark"
                      disabled={!user.newPassword || !user.confirmNewPassword || !user.answer}>
                      {loading ? <SyncOutlined spin className="py-1" /> : "Reset Password"}
                    </button>
                  </div>
                </div>
                <div>
                  <Modal
                    title="Congratulation!!!"
                    visible={ok}
                    onCancel={() => setOk(false)}
                    footer={null}>
                    <div>
                      <p>You can now log in with your new password.</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Link to="/login" className="btn btn-outline-dark btn-sm">
                        Go to Login
                      </Link>
                    </div>
                  </Modal>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSubmitEmail}
                className="d-flex flex-column justify-content-center align-items-center forgot-password-form">
                <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
                  <img src="/images/logo.svg" className="brand-logo mb-3" alt="logo" />
                  <h4>Reset Password</h4>
                </div>
                <div className="forgot-password-form-container">
                  <Input
                    title="Enter your e-mail address *"
                    type="email"
                    name="email"
                    placeholder="Enter your e-mail"
                    handleChange={handleChange}
                  />
                </div>
                <div className="form-group p-2 d-flex justify-content-center">
                  <button className="btn btn-dark" disabled={!user.email}>
                    {loading ? <SyncOutlined spin className="py-1" /> : "Send"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
