import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";

const OtherProfile = () => {
  const [user, setUser] = useState({
    avatar: {},
    about: {}
  });
  const location = useLocation();

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async () => {
    const userId = location.pathname.split("/")[2];
    try {
      const { data } = await axios.get(`/user/${userId}`);
      console.log(data);
      setUser(data.user);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  return (
    <div className="container other-profile-container d-flex flex-column justify-content-center align-items-center">
      <h1>{user.username}</h1>
      <div>
        {user && !user.avatar ? (
          <Avatar
            size={150}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              fontSize: "4.125rem"
            }}>
            {user && user.username[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar src={user.avatar.url} size={150} />
        )}
      </div>
      <div>
        {user && !user.about ? (
          <>No info</>
        ) : (
          <>
            <div>First name: {user.about.firstName}</div>
            <div>Last name: {user.about.lastName}</div>
            <div>Date of birth: {user.about.dob}</div>
            <div>Gender: {user.about.gender}</div>
            <div>Phone: {user.about.phone}</div>
          </>
        )}
      </div>
      <h6>Joined on {moment(user.createdAt).format("ll")}</h6>
    </div>
  );
};

export default OtherProfile;
