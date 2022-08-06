import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FacebookFilled,
  GoogleSquareFilled,
  GithubFilled,
  YoutubeFilled,
  LinkedinFilled,
  PhoneFilled,
  HomeFilled,
  PrinterFilled
} from "@ant-design/icons";

const Footer = () => {
  const [current, setCurrent] = useState("");
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    setCurrent(pathName);
  }, [pathName]);

  return (
    <footer
      className="container-fluid footer-container-fluid d-flex align-items-center p-5 justify-content-between"
      hidden={current === "/login" || current === "/register" || current === "/forgot-password"}>
      <div className="d-flex text-white align-items-center" style={{ width: "18%" }}>
        <img
          src="/images/logo.svg"
          style={{ width: "64px", height: "64px" }}
          className="p-1"
          alt="logo"
        />
        <div className="d-flex align-items-center">
          <Link
            to="/about"
            className="text-white btn btn-outline-secondary"
            style={{ border: "none" }}>
            About
          </Link>
        </div>
      </div>
      <div
        className="d-flex flex-column justify-content-evenly font-face-mulish p-2"
        style={{ fontSize: "1rem", width: "20vw" }}>
        <div className="d-flex align-items-center">
          <HomeFilled style={{ fontSize: "125%" }} className="p-2" />
          <span>Hanoi, Vietnam</span>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <PhoneFilled style={{ fontSize: "125%" }} className="p-2" />
            <span>123-456-789</span>
          </div>
          <div className="d-flex align-items-center">
            <PrinterFilled style={{ fontSize: "125%" }} className="p-2" />
            <span>123-456-789</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end font-face-mulish">
        <div className="d-flex justify-content-end align-items-center text-white">
          <span className="text-end">Social media: </span>
          <FacebookFilled
            style={{ fontSize: "150%", border: "none" }}
            className="btn btn-outline-secondary p-2"
          />
          <GoogleSquareFilled
            style={{ fontSize: "150%", border: "none" }}
            className="btn btn-outline-secondary p-2"
          />
          <GithubFilled
            style={{ fontSize: "150%", border: "none" }}
            className="btn btn-outline-secondary p-2"
          />
          <YoutubeFilled
            style={{ fontSize: "150%", border: "none" }}
            className="btn btn-outline-secondary p-2"
          />
          <LinkedinFilled
            style={{ fontSize: "150%", border: "none" }}
            className="btn btn-outline-secondary p-2"
          />
        </div>
        <div className="text-white d-flex justify-content-end" style={{ fontSize: "1rem" }}>
          Copyright @ 2022. Your Company. We love you!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
