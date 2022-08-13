import { UserContext } from "../../../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import UserPostList from "../../../components/UserPostList";
import axios from "axios";
import { toast } from "react-toastify";

const AllUserPost = () => {
  const [state] = useContext(UserContext);
  const [allUserPosts, setAllUserPosts] = useState([]);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.token) handlePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.token]);

  const handlePosts = async () => {
    try {
      const { data } = await axios.get(`/your-posts`);
      setAllUserPosts(data.posts);
      data.ok ? setOk(true) : setOk(false);
      return data.posts;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  if (state === null) navigate("/");

  return !ok ? (
    <SyncOutlined
      spin
      style={{ width: "100vw", height: "55vh" }}
      className="d-flex justify-content-center align-items-center text-primary p-5 display-1"
    />
  ) : (
    <>
      <UserPostList
        allUserPosts={allUserPosts}
        setAllUserPosts={setAllUserPosts}
        getAllUserPosts={handlePosts}
      />
    </>
  );
};

export default AllUserPost;
