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
import Faqs from "./pages/faqs";
import About from "./pages/about";
import Error from "./pages/error";
import ArtPosts from "./pages/category/art";
import BookPosts from "./pages/category/book";
import FoodPosts from "./pages/category/food";
import GamePosts from "./pages/category/game";
import HealthPosts from "./pages/category/health";
import MusicPosts from "./pages/category/music";
import PhotographyPosts from "./pages/category/photography";
import TechnologyPosts from "./pages/category/technology";

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
        <Route path="faqs" element={<Faqs />} />
        <Route path="about" element={<About />} />
        <Route path="admin">
          <Route path="post-management" element={<PostManagement />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
        <Route path="category">
          <Route path="art" element={<ArtPosts />} />
          <Route path="book" element={<BookPosts />} />
          <Route path="food" element={<FoodPosts />} />
          <Route path="game" element={<GamePosts />} />
          <Route path="health" element={<HealthPosts />} />
          <Route path="music" element={<MusicPosts />} />
          <Route path="photography" element={<PhotographyPosts />} />
          <Route path="technology" element={<TechnologyPosts />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
};

export default App;
