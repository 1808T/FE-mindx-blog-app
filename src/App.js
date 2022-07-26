import React from "react";
import { UserProvider } from "./context/index";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/index";
import PostDetail from "./pages/post-detail";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import Profile from "./pages/user/profile";
import AllUserPost from "./pages/user/post/all-post";
import CreatePost from "./pages/user/post/create-post";
import EditPost from "./pages/user/post/edit-post";

const App = () => {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:post_id" element={<PostDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="user">
          <Route path="profile" element={<Profile />} />
          <Route path="your-posts" element={<AllUserPost />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit/:post_id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
