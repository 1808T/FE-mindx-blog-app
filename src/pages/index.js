import { UserContext } from "../context";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Home = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (state !== null) {
      setLoading(true);
      navigate("/create-post");
    } else {
      toast.error("You must log in to post an article");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center py-5">Home Page</h1>
          <div className="form-group p-2 d-flex justify-content-center">
            <button className="btn btn-dark" onClick={handleClick}>
              {loading ? <SyncOutlined spin className="py-1" /> : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
