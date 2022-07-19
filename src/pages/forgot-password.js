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
  const [user, setUser] = useState({});
  const [question, setQuestion] = useState(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const navigate = useNavigate();

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
      console.log();
      const { data } = await axios.put("/forgot-password", {
        email: user.email,
        answer: user.answer,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword
      });
      console.log(data);
      setOk(data.ok);
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
            <h1>Reset your password</h1>
          </div>
        </div>
      </div>
      {question !== null ? (
        <>
          <div className="row py-5">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={resetPassword}>
                <div className="form-group p-2">
                  <small>
                    <label className="text-muted">Your question</label>
                  </small>
                  <input defaultValue={question} className="form-control" />
                </div>
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
                <div className="form-group p-2 d-flex justify-content-center">
                  <button
                    className="btn btn-dark"
                    disabled={!user.newPassword || !user.confirmNewPassword || !user.answer}>
                    {loading ? <SyncOutlined spin className="py-1" /> : "Reset Password"}
                  </button>
                </div>
              </form>
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
                    <p>You can now log in with your new password.</p>
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
        </>
      ) : (
        <>
          <div className="row py-5">
            <div className="col-md-6 offset-md-3">
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
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ForgotPassword;
