import React from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";

const Error = () => {
  const navigate = useNavigate();

  return (
    <main className="container error-container d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-danger" style={{ fontSize: "5rem" }}>
        <ExclamationCircleFilled />
      </h1>
      <h1>404</h1>
      <h3>Oops!</h3>
      <h6 className="mb-5">Can't find the page you are looking for.</h6>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}>
        Back to our Home Page
      </button>
    </main>
  );
};

export default Error;
