import { UserContext } from "../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import PostList from "../components/PostList";

const Home = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (state !== null) {
      setLoading(true);
      navigate("/user/create-post");
    } else {
      navigate("/login");
      toast.error("Please login !!!", { theme: "colored" });
    }
  };

  useEffect(() => {
    handlePosts();
  }, []);

  const handlePosts = async () => {
    try {
      const { data } = await axios.get("/all-posts");
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
      <div>
        <PostList allPosts={posts} />
      </div>
    </>
  );
};

export default Home;
