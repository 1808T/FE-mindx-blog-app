import React from "react";
import Avatar from "antd/lib/avatar/avatar";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  KeyOutlined,
  SettingOutlined,
  PoweroffOutlined,
  CloseOutlined,
  FormOutlined,
  TableOutlined,
  LoginOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = ({ state, avatar, logout, hidden, toggleSidebar }) => {
  return !state ? (
    <div className="sidebar d-flex flex-column align-items-center" hidden={hidden}>
      <div style={{ width: "100%" }} className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary text-white mt-2"
          style={{ border: "none" }}
          onClick={toggleSidebar}>
          <CloseOutlined
            style={{ fontSize: "125%" }}
            className="d-flex justify-content-center align-items-center"
          />
        </button>
      </div>
      <div className="pb-5 pt-5 d-flex align-items-start justify-content-center logo-login-sidebar">
        <img src="/images/logo.svg" alt="blog-logo" style={{ width: 64, height: 64 }} />
      </div>
      <div className="btn-login-group">
        <Link
          to="/login"
          onClick={toggleSidebar}
          className="btn btn-outline-secondary me-2 text-white d-flex align-items-center">
          <LoginOutlined className="ps-2 pe-2" />
          <span>Login</span>
        </Link>
        <Link
          to="/register"
          onClick={toggleSidebar}
          className="btn btn-light d-flex align-items-center"
          style={{ color: "#182A4E" }}>
          <UserAddOutlined className="ps-2 pe-2" />
          <span>Register</span>
        </Link>
      </div>
    </div>
  ) : (
    <div className="sidebar d-flex flex-column align-items-center" hidden={hidden}>
      <div style={{ width: "100%" }} className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary text-white mt-2"
          style={{ border: "none" }}
          onClick={toggleSidebar}>
          <CloseOutlined
            style={{ fontSize: "125%" }}
            className="d-flex justify-content-center align-items-center"
          />
        </button>
      </div>
      <div
        className="pb-3 d-flex flex-column align-items-center justify-content-center logo-sidebar"
        style={{ borderBottom: "1px solid white", width: "80%" }}>
        <img src="/images/logo.svg" alt="blog-logo" style={{ width: 64, height: 64 }} />
        <div className="nav-link-sidebar">
          <Link
            to="/FAQs"
            className="btn btn-outline-secondary text-white"
            onClick={toggleSidebar}
            style={{ border: "none" }}>
            FAQs
          </Link>
          <Link
            to="/About"
            className="btn btn-outline-secondary text-white"
            onClick={toggleSidebar}
            style={{ border: "none" }}>
            About
          </Link>
        </div>
      </div>
      <div className="pt-3 pb-2">
        {(state && !state.user.avatar) || (state && state.user.avatar === "") ? (
          <Link
            to="/user/profile"
            className="d-flex flex-column justify-content-center align-items-center"
            onClick={toggleSidebar}>
            <Avatar
              size={60}
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf"
              }}
              className="mb-2">
              {state && state.user.username && state.user.username[0].toUpperCase()}
            </Avatar>
            <div className="mb-3 username font-face-mulish">{state && state.user.username}</div>
          </Link>
        ) : (
          <Link
            to="/user/profile"
            onClick={toggleSidebar}
            className="d-flex flex-column justify-content-center align-items-center">
            <Avatar src={avatar.url} size={60} className="mb-2" />
            <div className="mb-3 username font-face-mulish">{state && state.user.username}</div>
          </Link>
        )}
      </div>
      <div
        className="mb-3 text-white font-face-mulish d-flex align-items-center"
        style={{ width: "80%" }}>
        <span>MENU</span>
      </div>
      <div className="sidebar-item d-flex flex-column justify-content-center font-face-mulish">
        {state && state.user.role === "admin" ? (
          <Link
            className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center management-sidebar"
            to="/admin/post-management"
            onClick={toggleSidebar}>
            <TableOutlined style={{ fontSize: "150%" }} />
            <span className="ms-3">Manage Post</span>
          </Link>
        ) : (
          <></>
        )}
        <Link
          to="/user/create-post"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center create-btn-sidebar"
          onClick={toggleSidebar}>
          <FormOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">New Post</span>
        </Link>
        <Link
          to="/"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}>
          <HomeOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">Dashboard</span>
        </Link>
        <Link
          to="/user/profile"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}>
          <UserOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">Your Profile</span>
        </Link>
        <Link
          to="/user/your-posts"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}>
          <BookOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">Your Posts</span>
        </Link>
        <Link
          to="/user/change-password"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}>
          <KeyOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">Change Password</span>
        </Link>
        <Link
          to="/user/change-password"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center"
          onClick={toggleSidebar}>
          <SettingOutlined style={{ fontSize: "150%" }} />
          <span className="ms-3">Settings</span>
        </Link>
      </div>
      <div
        className="sidebar-item d-flex flex-column justify-content-center justify-self-end logout pt-3"
        onClick={toggleSidebar}>
        <Link
          to="/"
          onClick={logout}
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <PoweroffOutlined />
          <span className="ms-3">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
