import React from "react";
import { Link } from "react-router-dom";

const Slide = ({ posts }) => {
  return (
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
                  <img src={post.image.url} className="d-block w-100" alt="first-post" />
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
                  <img src={post.image.url} className="d-block w-100 " alt="second-post" />
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
                  <img src={post.image.url} className="d-block w-100 " alt="third-post" />
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
  );
};

export default Slide;
