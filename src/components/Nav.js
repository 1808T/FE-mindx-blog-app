import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { TableOutlined, SearchOutlined, FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import SearchResult from "../pages/search";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [query, setQuery] = useState("");
  const [searchedPostsByTitle, setSearchedPostsByTitle] = useState([]);
  const [searchedPostsByUsername, setSearchedPostsByUsername] = useState([]);
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

  const toggleSidebar = () => {
    if (hidden === true) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const handleQuery = e => {
    setQuery(e.target.value);
  };

  const searchPosts = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/search", {
        query
      });
      navigate("/search");
      setSearchedPostsByTitle(data.searchByTitle);
      setSearchedPostsByUsername(data.searchByUsername);
      setQuery("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
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
        className="container-fluid d-flex justify-content-between align-item-center nav-container-fluid"
        hidden={current === "/login" || current === "/register" || current === "/forgot-password"}>
        <div className="nav-intro d-flex justify-content-evenly align-items-center font-face-mulish">
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="blog-logo"
              style={{ width: 64, height: 64 }}
              className="p-2"
            />
          </Link>
          <Link to="/FAQs" className="btn btn-outline-secondary text-white nav-link">
            FAQs
          </Link>
          <Link to="/About" className="btn btn-outline-secondary text-white nav-link">
            About
          </Link>
        </div>
        {state === null ? (
          <>
            <div className="d-flex align-items-center p-2 me-2 font-face-mulish">
              <form className="d-flex me-2 search-bar" role="search" onSubmit={searchPosts}>
                <input
                  className="form-control me-2 text-black"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleQuery}
                  value={query}
                />
                <button className="btn btn-outline-secondary d-flex justify-content-center align-items-center text-white">
                  <SearchOutlined style={{ fontSize: "150%" }} />
                </button>
              </form>
              <Link
                to="/login"
                className="btn btn-outline-secondary me-2 text-white d-flex align-items-center login-btn">
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="btn btn-light d-flex align-items-center register-btn"
                style={{ color: "#182A4E" }}>
                <span>Register</span>
              </Link>
            </div>
            <div className="d-flex align-items-center sidebar-btn__2-container">
              <button
                type="button"
                className="btn btn-outline-secondary text-white sidebar-btn__2"
                onClick={toggleSidebar}>
                ☰
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex nav-info justify-content-evenly align-items-center">
              <form className="d-flex me-2 search-bar" role="search" onSubmit={searchPosts}>
                <input
                  className="form-control me-2 text-black"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleQuery}
                  value={query}
                />
                <button className="btn btn-outline-secondary d-flex justify-content-center align-items-center text-white">
                  <SearchOutlined style={{ fontSize: "150%" }} />
                </button>
              </form>
              <Link
                className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-2 create-post-btn"
                to="/user/create-post"
                style={{ border: "none" }}>
                <FormOutlined style={{ fontSize: "150%", color: "white" }} />
              </Link>
              {state && state.user.role === "admin" ? (
                <Link
                  className="btn btn-outline-secondary d-flex justify-content-center align-items-center p-2 management"
                  to="/admin/post-management"
                  style={{ border: "none" }}>
                  <TableOutlined style={{ fontSize: "150%", color: "white" }} />
                </Link>
              ) : (
                <></>
              )}
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
                      <div className="d-flex flex-column justify-content-center align-items-start font-face-mulish ps-3">
                        <div>{state && state.user.username}</div>
                        <div className="user-email">{state && state.user.email}</div>
                      </div>
                    </Link>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-secondary text-white sidebar-btn__1"
                onClick={toggleSidebar}>
                ☰
              </button>
            </div>
            <div className="d-flex align-items-center sidebar-btn__2-container">
              <button
                type="button"
                className="btn btn-outline-secondary text-white sidebar-btn__2"
                onClick={toggleSidebar}>
                ☰
              </button>
            </div>
          </>
        )}
      </nav>
      <Sidebar
        state={state}
        avatar={avatar}
        logout={logout}
        hidden={hidden}
        setHidden={setHidden}
        toggleSidebar={toggleSidebar}
      />
      <SearchResult
        current={current}
        searchedPostsByTitle={searchedPostsByTitle}
        searchedPostsByUsername={searchedPostsByUsername}
      />
    </header>
  );
};

export default Nav;
