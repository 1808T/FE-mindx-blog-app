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
import OtherProfile from "./pages/other-profile";
import ChangePassword from "./pages/user/change-password";
import AllUserPost from "./pages/user/post/your-posts";
import CreatePost from "./pages/user/post/create-post";
import EditPost from "./pages/user/post/edit-post";
import Footer from "./components/Footer";
import SearchResult from "./pages/search";
import UserManagement from "./pages/admin/user-management";
import PostManagement from "./pages/admin/post-management";
import Error from "./pages/error";
import artPosts from "./pages/category/art";
import bookPosts from "./pages/category/book";
import foodPosts from "./pages/category/food";
import gamePosts from "./pages/category/game";
import healthPosts from "./pages/category/health";
import musicPosts from "./pages/category/music";
import photographyPosts from "./pages/category/photography";
import technologyPosts from "./pages/category/technology";

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
        <Route path="search" element={<SearchResult />} />
        <Route path="user">
          <Route path=":user_id" element={<OtherProfile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="your-posts" element={<AllUserPost />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit/:post_id" element={<EditPost />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        <Route path="faqs" />
        <Route path="about" />
        <Route path="admin">
          <Route path="post-management" element={<PostManagement />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
        <Route path="category">
          <Route path="art" element={<artPosts />} />
          <Route path="book" element={<bookPosts />} />
          <Route path="food" element={<foodPosts />} />
          <Route path="game" element={<gamePosts />} />
          <Route path="health" element={<healthPosts />} />
          <Route path="music" element={<musicPosts />} />
          <Route path="photography" element={<photographyPosts />} />
          <Route path="technology" element={<technologyPosts />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
};

export default App;
