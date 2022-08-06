import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { BellFilled, SearchOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const pathName = window.location.pathname;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (state && state.user.avatar) handleAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.user.avatar]);

  useEffect(() => {
    setCurrent(pathName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const handleAvatar = () => {
    setAvatar(state && state.user.avatar);
  };

  const showSidebar = () => {
    if (hidden === true) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    setHidden(true);
    navigate("/login");
  };

  return (
    <header className="text-bg-dark">
      <nav
        className="container-fluid d-flex justify-content-between align-items-center nav-container-fluid"
        hidden={current === "/login" || current === "/register" || current === "/forgot-password"}>
        <div className="nav-intro d-flex justify-content-evenly align-items-center font-face-mulish">
          <Link to="/">
            <img src="/images/logo.svg" alt="blog-logo" style={{ width: 64, height: 64 }} />
          </Link>
          <Link to="/FAQs" className="btn btn-outline-secondary text-white nav-link">
            FAQs
          </Link>
          <Link to="/About" className="btn btn-outline-secondary text-white nav-link">
            About
          </Link>
        </div>
        <form className="d-flex me-2 search-bar" role="search">
          <input
            className="form-control me-2 text-black"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <SearchOutlined
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center text-white"
            style={{ fontSize: "150%" }}
          />
        </form>
        {state === null ? (
          <div className="d-flex p-2 me-2 font-face-mulish">
            <Link to="/login" className="btn btn-outline-secondary me-2 text-white">
              Login
            </Link>
            <Link to="/register" className="btn btn-light" style={{ color: "#182A4E" }}>
              Register
            </Link>
          </div>
        ) : (
          <div className="d-flex nav-info justify-content-evenly align-items-center">
            <Link
              className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-2"
              to="/user/create-post">
              <EditOutlined style={{ fontSize: "150%", color: "white" }} />
            </Link>
            <div className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-2">
              <BellFilled style={{ fontSize: "150%", color: "white" }} />
            </div>
            <div className="user-info d-flex justify-content-evenly">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-outline-secondary d-flex justify-content-center align-items-center profile-frame">
                  <Link
                    to="/user/profile"
                    style={{ color: "black" }}
                    className="d-flex align-items-center justify-content-center">
                    {(state && !state.user.avatar) || (state && state.user.avatar === "") ? (
                      <Avatar
                        size={44}
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf"
                        }}>
                        {state && state.user.username && state.user.username[0].toUpperCase()}
                      </Avatar>
                    ) : (
                      <Avatar src={avatar.url} size={44} />
                    )}
                    {/* <span className="ms-2 font-face-mulish">{state && state.user.username}</span> */}
                    <div className="d-flex flex-column justify-content-center align-items-start font-face-mulish ps-3">
                      <div>{state && state.user.username}</div>
                      <div>{state && state.user.email}</div>
                    </div>
                  </Link>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary text-white"
              onClick={showSidebar}>
              ☰
            </button>
          </div>
        )}
      </nav>
      <Sidebar
        state={state}
        avatar={avatar}
        logout={logout}
        hidden={hidden}
        showSidebar={showSidebar}
      />
    </header>
  );
};

export default Nav;
