import { UserContext } from "../context";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar } from "antd";
import moment from "moment";

const Home = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllNewestPosts();
  }, []);

  const getAllNewestPosts = async () => {
    try {
      const { data } = await axios.get("/all-posts");
      setPosts(data.posts);
      console.log(
        data.posts
          .filter(post => {
            return post.category.name === "Book";
          })
          .slice(0, 3)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="d-flex align-items-center flex-column">
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        style={{ width: "70vw" }}>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner ">
          {posts &&
            posts.slice(0, 1).map(post => {
              return (
                <div className="carousel-item active" key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <img src={post.image.url} className="d-block w-100" alt="first-image" />
                  </Link>
                  <div
                    className="carousel-caption d-none d-md-block"
                    style={{ right: "0", left: "0", bottom: "0", background: "#0000004d" }}>
                    <h5 className="text-white">{post.title}</h5>
                    <p className="text-white">{post.description}</p>
                  </div>
                </div>
              );
            })}
          {posts &&
            posts.slice(1, 2).map(post => {
              return (
                <div className="carousel-item" key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <img src={post.image.url} className="d-block w-100 " alt="second-image" />
                  </Link>
                  <div
                    className="carousel-caption d-none d-md-block"
                    style={{ right: "0", left: "0", bottom: "0", background: "#0000004d" }}>
                    <h5 className="text-white">{post.title}</h5>
                    <p className="text-white">{post.description}</p>
                  </div>
                </div>
              );
            })}
          {posts &&
            posts.slice(2, 3).map(post => {
              return (
                <div className="carousel-item" key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <img src={post.image.url} className="d-block w-100 " alt="third-image" />
                  </Link>
                  <div
                    className="carousel-caption d-none d-md-block"
                    style={{ right: "0", left: "0", bottom: "0", background: "#0000004d" }}>
                    <h5 className="text-white">{post.title}</h5>
                    <p className="text-white">{post.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="home-main">
        <div className="container home-title font-face-mulish">
          <h1>Newest Posts</h1>
          <Link className="d-flex align-items-center" to="/" style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
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
                      <span className="pe-2">
                        <Avatar src={post.postedBy.avatar.url} size={32} />
                      </span>
                      <span className="pe-2" style={{ color: "#40A9FF" }}>
                        {post.postedBy.username}
                      </span>
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
          <h1>Art</h1>
          <Link className="d-flex align-items-center" to="/" style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container art-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Art";
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
                        <span className="pe-2">
                          <Avatar src={post.postedBy.avatar.url} size={32} />
                        </span>
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

        <div className="container home-title font-face-mulish">
          <h1>Book</h1>
          <Link className="d-flex align-items-center" to="/" style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container book-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Book";
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
                          {post.title.split(" ").length < 7
                            ? post.title
                            : post.title
                                .split(" ")
                                .filter((char, index) => {
                                  return index < 7;
                                })
                                .join(" ") + " ..."}
                        </h4>
                      </div>
                      <div className="mb-3" style={{ fontWeight: "500" }}>
                        <span className="pe-2">
                          <Avatar src={post.postedBy.avatar.url} size={32} />
                        </span>
                        <span className="pe-2" style={{ color: "#40A9FF" }}>
                          {post.postedBy.username}
                        </span>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontWeight: "400", color: "#000000cc", textAlign: "justify" }}>
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
          <h1>Food</h1>
          <Link className="d-flex align-items-center" to="/" style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container food-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Food";
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
                      <div className="food-post-author mb-3" style={{ fontWeight: "500" }}>
                        <span className="pe-2">
                          <Avatar src={post.postedBy.avatar.url} size={32} />
                        </span>
                        <span className="pe-2" style={{ color: "#40A9FF" }}>
                          {post.postedBy.username}
                        </span>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="food-posts-description">
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
          <h1>Game</h1>
          <Link className="d-flex align-items-center" to="/" style={{ fontSize: "1.5rem" }}>
            More <ArrowRightOutlined style={{ fontSize: "80%" }} className="p-2" />
          </Link>
        </div>
        <div className="container game-posts-container mb-5">
          {posts &&
            posts
              .filter(post => {
                return post.category.name === "Game";
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
                          {post.title.split(" ").length < 7
                            ? post.title
                            : post.title
                                .split(" ")
                                .filter((char, index) => {
                                  return index < 7;
                                })
                                .join(" ") + " ..."}
                        </h4>
                      </div>
                      <div className="mb-3" style={{ fontWeight: "500" }}>
                        <span className="pe-2">
                          <Avatar src={post.postedBy.avatar.url} size={32} />
                        </span>
                        <span className="pe-2" style={{ color: "#40A9FF" }}>
                          {post.postedBy.username}
                        </span>
                        <span className="pe-2" style={{ color: "#00000080" }}>
                          {moment(post.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontWeight: "400", color: "#000000cc", textAlign: "justify" }}>
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
