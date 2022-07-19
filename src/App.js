import React from "react";
import { UserProvider } from "./context/index";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import ForgotPassword from "./pages/forgot-password";

const App = () => {
  return (
    <UserProvider>
      <Nav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
