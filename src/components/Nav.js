import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
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
            className={`btn btn-dark text-light nav-link p-2 ${current === "/login" && "active"}`}
            to="/login">
            Login
          </Link>
        </div>
      ) : (
        <>
          <form className="text-light d-flex p-2" role="search">
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
          <Link
            className={`btn btn-dark text-light nav-link p-2 ${current === "/profile" && "active"}`}
            to="/profile">
            {state && state.user.username}
          </Link>
          <button onClick={logout} className="btn btn-dark p-2">
            Log Out
          </button>
        </>
      )}
    </nav>
  );
};
export default Nav;
