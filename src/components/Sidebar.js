import React from "react";
import Avatar from "antd/lib/avatar/avatar";
import {
  HomeOutlined,
  UserOutlined,
  BookOutlined,
  KeyOutlined,
  SettingOutlined,
  PoweroffOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sidebar = ({ state, avatar, logout, hidden, showSidebar }) => {
  return (
    <div className="sidebar d-flex flex-column align-items-center" hidden={hidden}>
      <div style={{ width: "100%" }} className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary text-white mt-2"
          style={{ border: "none" }}
          onClick={showSidebar}>
          <CloseOutlined
            style={{ fontSize: "125%" }}
            className="d-flex justify-content-center align-items-center"
          />
        </button>
      </div>
      <div
        className="pb-3 d-flex align-items-start justify-content-center"
        style={{ borderBottom: "1px solid white", width: "80%" }}>
        <img src="/images/logo.svg" alt="blog-logo" style={{ width: 64, height: 64 }} />
      </div>
      <div className="pt-3 pb-2">
        {(state && !state.user.avatar) || (state && state.user.avatar === "") ? (
          <Avatar
            size={60}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf"
            }}>
            {state && state.user.username && state.user.username[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar src={avatar.url} size={60} />
        )}
      </div>
      <div className="mb-3 username font-face-mulish">{state && state.user.username}</div>
      <div
        className="mb-3 text-white font-face-mulish d-flex align-items-center"
        style={{ width: "80%" }}>
        <span>MENU</span>
      </div>
      <div className="sidebar-item d-flex flex-column justify-content-center font-face-mulish">
        <Link
          to="/"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <HomeOutlined />
          <span className="ms-3">Dashboard</span>
        </Link>
        <Link
          to="/user/profile"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <UserOutlined />
          <span className="ms-3">Your Profile</span>
        </Link>
        <Link
          to="/user/your-posts"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <BookOutlined />
          <span className="ms-3">Your Posts</span>
        </Link>
        <Link
          to="/user/change-password"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <KeyOutlined />
          <span className="ms-3">Change Password</span>
        </Link>
        <Link
          to="/user/change-password"
          className="sidebar-btn btn btn-outline-secondary text-white mb-3 d-flex justify-content-center align-items-center">
          <SettingOutlined />
          <span className="ms-3">Settings</span>
        </Link>
      </div>
      <div className="sidebar-item d-flex flex-column justify-content-center justify-self-end logout pt-3">
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
