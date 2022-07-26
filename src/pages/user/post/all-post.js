import { UserContext } from "../../../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import UserPostList from "../../../components/UserPostList";
import axios from "axios";

const AllUserPost = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (state && state.token) handlePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.token]);

  const handlePosts = async () => {
    try {
      const { data } = await axios.get(`/user/your-posts`);
      setUserPosts(data.posts);
      data.ok ? setOk(true) : setOk(false);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  state === null &&
    setTimeout(() => {
      handlePosts();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center align-items-center display-1 text-primary p-5"
    />
  ) : (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center py-5">Your Posts</h1>
          </div>
        </div>
      </div>
      <div>
        <UserPostList userPosts={userPosts} />
      </div>
    </>
  );
};

export default AllUserPost;
