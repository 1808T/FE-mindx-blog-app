import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  useEffect(() => {
    setCurrent(pathName);
  }, [pathName]);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    navigate("/login");
  };

  return (
    <nav className="navbar bg-dark d-flex mb-3">
      <Link
        className={`btn btn-dark text-light nav-link me-auto p-2 ${
          current === "/" ? "active" : ""
        }`}
        to="/">
        Home
      </Link>
      {state === null ? (
        <div className="d-flex p-2">
          <Link
            className={`btn btn-dark text-light nav-link me-3 p-2 ${
              current === "/login" && "active"
            }`}
            to="/login">
            Login
          </Link>
        </div>
      ) : (
        <>
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

          <div className="btn-group me-5">
            <button
              type="button"
              className="btn btn-dark d-flex align-items-center"
              onClick={() => {
                navigate("/user/profile");
              }}>
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf"
                }}>
                {state && state.user.username && state.user.username[0]}
              </Avatar>
              <span className="ms-2">{state && state.user.username}</span>
            </button>
            <button
              type="button"
              className="btn btn-dark dropdown-toggle dropdown-toggle-split"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
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
        </>
      )}
    </nav>
  );
};
export default Nav;
