import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const pathName = window.location.pathname;

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

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <header className="text-bg-dark">
      <nav
        className="navbar bg-dark d-flex justify-content-between mb-3 ps-3"
        hidden={current === "/login" || current === "/register"}>
        <div className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <Link to="/">
            <img src="/images/logo.svg" alt="blog-logo" style={{ width: 40, height: 40 }} />
          </Link>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white btn btn-dark ms-2 me-2">
                Home
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="nav-link px-2 text-white btn btn-dark ms-2 me-2">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2 text-white btn btn-dark ms-2 me-2">
                About
              </Link>
            </li>
          </ul>
        </div>
        {state === null ? (
          <div className="d-flex p-2 me-2">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-warning">
              Register
            </Link>
          </div>
        ) : (
          <div className="d-flex">
            <form className="text-light d-flex me-2 p-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-light"
                type="submit"
                onClick={e => e.preventDefault()}>
                Search
              </button>
            </form>

            <div className="btn-group pe-2">
              <button type="button" className="btn btn-dark d-flex align-items-center">
                <Link to="/user/profile" style={{ color: "white" }}>
                  {(state && !state.user.avatar) || (state && state.user.avatar === "") ? (
                    <Avatar
                      style={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf"
                      }}>
                      {state && state.user.username && state.user.username[0].toUpperCase()}
                    </Avatar>
                  ) : (
                    <Avatar src={avatar.url} />
                  )}
                  <span className="ms-2">{state && state.user.username}</span>
                </Link>
              </button>
              <button
                type="button"
                className="btn btn-dark dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <span className="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link className="dropdown-item" to="/user/your-posts">
                    Your posts
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/change-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={logout}>
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>

            <div className="btn-group pe-2 ms-2">
              <button className="btn btn-dark">Notification</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Nav;
