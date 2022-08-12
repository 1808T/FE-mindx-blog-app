import { UserContext } from "../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar } from "antd";
import moment from "moment";
import Slide from "../components/Slide";

const Home = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/all-approved-posts");
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="d-flex align-items-center flex-column">
      <div className="container category-container font-face-mulish d-flex justify-content-between align-items-center">
        <Link to="/category/art">Art</Link>
        <Link to="/category/book">Book</Link>
        <Link to="/category/food">Food</Link>
        <Link to="/category/game">Game</Link>
        <Link to="/category/health">Health And Fitness</Link>
        <Link to="/category/music">Music</Link>
        <Link to="/category/photography">Photography</Link>
        <Link to="/category/technology">Technology</Link>
      </div>
      <Slide posts={posts} />
      <div className="home-main container">
        <div className="container home-title font-face-mulish">
          <h1>Newest Posts</h1>
        </div>
        <div className="container newest-posts-container mb-5">
          {posts &&
            posts.slice(0, 2).map(post => {
              return (
                <div
                  key={post._id}
                  className="card d-flex flex-column justify-content-between font-face-montserrat text-black">
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
                  <div
                    className="card-footer d-flex flex-column justify-content-center p-5"
                    style={{ height: "200px" }}>
                    <div className="d-flex justify-content-between">
                      <h4 style={{ fontWeight: "bold" }}>
                        {post.title.split(" ").length < 6
                          ? post.title
                          : post.title
                              .split(" ")
                              .filter((char, index) => {
                                return index < 6;
                              })
                              .join(" ") + " ..."}
                      </h4>
                      <h5 style={{ color: "blue" }}>{post.category.name}</h5>
                    </div>
                    <div className="mb-3" style={{ fontWeight: "500" }}>
                      {post && post.postedBy && !post.postedBy.avatar ? (
                        <span className="pe-2">
                          <Avatar
                            size={32}
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                              fontSize: "14px"
                            }}>
                            {post && post.postedBy && post.postedBy.username[0].toUpperCase()}
                          </Avatar>
                        </span>
                      ) : (
                        <span className="pe-2">
                          <Avatar src={post.postedBy.avatar.url} size={32} />
                        </span>
                      )}
                      <Link
                        className="pe-2"
                        style={{ color: "#40A9FF" }}
                        to={`/user/${post.postedBy._id}`}>
                        {post.postedBy.username}
                      </Link>
                      <span className="pe-2" style={{ color: "#00000080" }}>
                        {moment(post.updatedAt).fromNow()}
                      </span>
                    </div>
                    <div>
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
                </div>
              );
            })}
        </div>

        <div className="container home-title font-face-mulish">
          <h1>Game</h1>
          <Link
            className="d-flex align-items-center"
            to="/category/game"
            style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container game-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Game";
              })
              .slice(0, 3)
              .map(post => {
                return (
                  <div
                    key={post._id}
                    className="card d-flex flex-column justify-content-between font-face-montserrat text-black">
                    <Link
                      className="card-body"
                      style={{
                        backgroundImage: `url(${post.image.url})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                      }}
                      to={`/post/${post._id}`}></Link>
                    <div className="card-footer d-flex flex-column justify-content-center p-5">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 style={{ fontWeight: "bold" }}>{post.title}</h4>
                      </div>
                      <div className="game-post-author mb-3" style={{ fontWeight: "500" }}>
                        {post && post.postedBy && !post.postedBy.avatar ? (
                          <span className="pe-2">
                            <Avatar
                              size={32}
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                                fontSize: "14px"
                              }}>
                              {post && post.postedBy && post.postedBy.username[0].toUpperCase()}
                            </Avatar>
                          </span>
                        ) : (
                          <span className="pe-2">
                            <Avatar src={post.postedBy.avatar.url} size={32} />
                          </span>
                        )}
                        <span className="pe-2" style={{ color: "#40A9FF" }}>
                          {post.postedBy.username}
                        </span>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="game-posts-description">
                        <p
                          style={{
                            fontWeight: "400",
                            color: "#000000cc",
                            textAlign: "justify"
                          }}>
                          {post.description
                            .split(" ")
                            .filter((char, index) => {
                              return index < 15;
                            })
                            .join(" ") +
                            " " +
                            "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="container home-title font-face-mulish">
          <h1>Music</h1>
          <Link
            className="d-flex align-items-center"
            to="/category/music"
            style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container newest-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Music";
              })
              .slice(0, 2)
              .map(post => {
                return (
                  <div
                    key={post._id}
                    className="card d-flex flex-column justify-content-between font-face-montserrat text-black">
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
                    <div
                      className="card-footer d-flex flex-column justify-content-center p-5"
                      style={{ height: "200px" }}>
                      <div className="d-flex justify-content-between">
                        <h4 style={{ fontWeight: "bold" }}>
                          {post.title.split(" ").length < 6
                            ? post.title
                            : post.title
                                .split(" ")
                                .filter((char, index) => {
                                  return index < 6;
                                })
                                .join(" ") + " ..."}
                        </h4>
                        <h5 style={{ color: "blue" }}>{post.category.name}</h5>
                      </div>
                      <div className="mb-3" style={{ fontWeight: "500" }}>
                        {post && post.postedBy && !post.postedBy.avatar ? (
                          <span className="pe-2">
                            <Avatar
                              size={32}
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                                fontSize: "14px"
                              }}>
                              {post && post.postedBy && post.postedBy.username[0].toUpperCase()}
                            </Avatar>
                          </span>
                        ) : (
                          <span className="pe-2">
                            <Avatar src={post.postedBy.avatar.url} size={32} />
                          </span>
                        )}
                        <Link
                          className="pe-2"
                          style={{ color: "#40A9FF" }}
                          to={`/user/${post.postedBy._id}`}>
                          {post.postedBy.username}
                        </Link>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div>
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
                  </div>
                );
              })}
        </div>

        <div className="container home-title font-face-mulish">
          <h1>Technology</h1>
          <Link
            className="d-flex align-items-center"
            to="/category/technology"
            style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container art-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Technology";
              })
              .slice(0, 3)
              .map(post => {
                return (
                  <div
                    key={post._id}
                    className="card d-flex flex-column justify-content-between font-face-montserrat text-black">
                    <Link
                      className="card-body"
                      style={{
                        backgroundImage: `url(${post.image.url})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                      }}
                      to={`/post/${post._id}`}></Link>
                    <div className="card-footer d-flex flex-column justify-content-center p-5">
                      <div className="d-flex align-items-center justify-content-between">
                        <h4 style={{ fontWeight: "bold" }}>{post.title}</h4>
                      </div>
                      <div className="art-post-author mb-3" style={{ fontWeight: "500" }}>
                        {post && post.postedBy && !post.postedBy.avatar ? (
                          <span className="pe-2">
                            <Avatar
                              size={32}
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                                fontSize: "14px"
                              }}>
                              {post && post.postedBy && post.postedBy.username[0].toUpperCase()}
                            </Avatar>
                          </span>
                        ) : (
                          <span className="pe-2">
                            <Avatar src={post.postedBy.avatar.url} size={32} />
                          </span>
                        )}
                        <span className="pe-2" style={{ color: "#40A9FF" }}>
                          {post.postedBy.username}
                        </span>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="art-posts-description">
                        <p
                          style={{
                            fontWeight: "400",
                            color: "#000000cc",
                            textAlign: "justify"
                          }}>
                          {post.description
                            .split(" ")
                            .filter((char, index) => {
                              return index < 15;
                            })
                            .join(" ") +
                            " " +
                            "..."}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </main>
  );
};

export default Home;
