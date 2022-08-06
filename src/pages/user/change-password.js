import React from "react";
import { UserContext } from "../../context";
import { useState, useContext } from "react";
import axios from "axios";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";

const ChangePassword = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changePassword = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/current-user/change-password", {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        confirmNewPassword: user.confirmNewPassword
      });
      setOk(data.ok);
      setLoading(false);
      setTimeout(() => {
        logout();
      }, 5000);
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <main className="container-fluid change-password-container-fluid">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center font-face-mulish">
          <h1>Change password</h1>
        </div>
        <form onSubmit={changePassword}>
          <Input
            title="Enter your current password *"
            type="password"
            name="currentPassword"
            placeholder="Enter your current password here"
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
              className="btn btn-primary"
              disabled={!user.newPassword || !user.confirmNewPassword || !user.currentPassword}>
              {loading ? <SyncOutlined spin className="py-1" /> : "Change Password"}
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <Modal
              title="Your password has been changed. Please login again."
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
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
