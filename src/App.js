import React from "react";
import { UserProvider } from "./context/index";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/user/profile";
import ForgotPassword from "./pages/forgot-password";
import CreatePost from "./pages/user/post/create-post";
import EditPost from "./pages/user/post/get-post";

const App = () => {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="user">
          <Route path="create-post" element={<CreatePost />} />
          <Route path="profile" element={<Profile />} />
          <Route path="your-posts" element={<EditPost />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
