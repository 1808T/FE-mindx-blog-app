import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import { SyncOutlined } from "@ant-design/icons";

const Profile = () => {
  const [state] = useContext(UserContext);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");
      data.ok ? setOk(true) : setOk(false);
    } catch (err) {
      navigate("/login");
    }
  };

  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center align-items-center display-1 text-primary p-5"
    />
  ) : (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center py-5">Profile Page</h1>
            {JSON.stringify(state)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
