import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const MusicPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("/posts/music");
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container all-category-posts-container">
      {posts &&
        posts.map(post => {
          return (
            <div key={post._id} className="card mb-3">
              <div
                className="card-body"
                onClick={() => {
                  navigate(`/post/${post._id}`);
                }}
                style={{
                  backgroundImage: `url(${post.image.url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "400px",
                  cursor: "pointer"
                }}></div>
              <div className="card-footer" style={{ height: "200px" }}>
                <h4>{post.title}</h4>
                <h5>
                  <span>
                    {!post.postedBy.avatar ? (
                      <span className="pe-2">
                        <Avatar
                          size={32}
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            fontSize: "14px"
                          }}>
                          {post.postedBy.username[0].toUpperCase()}
                        </Avatar>
                      </span>
                    ) : (
                      <span className="pe-2">
                        <Avatar src={post.postedBy.avatar.url} size={32} />
                      </span>
                    )}
                  </span>
                  <span
                    style={{ color: "#40A9FF", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/user/${post.postedBy._id}`);
                    }}>
                    {post.postedBy.username}
                  </span>
                </h5>
                <p style={{ fontWeight: "400", color: "#000000cc", textAlign: "justify" }}>
                  {post.description.split(" ").length < 10
                    ? post.description
                    : post.description
                        .split(" ")
                        .filter((char, index) => {
                          return index < 10;
                        })
                        .join(" ") +
                      " " +
                      "..."}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MusicPosts;
