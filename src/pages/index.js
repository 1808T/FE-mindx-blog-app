import { UserContext } from "../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Image } from "antd";
import PostList from "../components/PostList";

const Home = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <main className="home-main">
        <div className="container home-title">
          <h1>Feature Posts</h1>
        </div>
        <div className="container home-container">
          {posts &&
            posts.map(post => {
              return (
                <div key={post._id} className="card d-flex flex-column justify-content-between">
                  <Link
                    className="card-body"
                    style={{
                      backgroundImage: `url(${post.image.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      height: "400px"
                    }}
                    to={`/post/${post._id}`}></Link>
                  <div className="card-footer d-flex flex-column justify-content-center">
                    <h5 style={{ color: "blue" }}>{post.category.name}</h5>
                    <h6>{post.title}</h6>
                    {post.description
                      .split(" ")
                      .filter((char, index) => {
                        return index < 10;
                      })
                      .join(" ") + " ..."}
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
