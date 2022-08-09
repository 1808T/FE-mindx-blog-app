import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Avatar } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled
} from "@ant-design/icons";
import parse from "html-react-parser";
import moment from "moment";
import axios from "axios";

const Post = ({
  userId,
  postDetail,
  handleLike,
  handleDislike,
  likes,
  dislikes,
  likeData,
  dislikeData,
  postCategory
}) => {
  const [morePosts, setMorePosts] = useState([]);

  useEffect(() => {
    getPostsWithSameCategory();
  }, [postCategory]);

  const getPostsWithSameCategory = async () => {
    if (postCategory) {
      try {
        const { data } = await axios.get(`/category/${postCategory}`);
        setMorePosts(data.posts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div
        className="container post-detail-container font-face-montserrat d-flex flex-column justify-content-center align-items-center"
        style={{ width: "70vw" }}>
        <div className="d-flex justify-content-center flex-column" style={{ width: "70vw" }}>
          <div className="post-detail-path mb-3">
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to={`/post/${postDetail._id}`}>
              {postDetail && postDetail.title && postDetail.title.split(" ").length < 5
                ? postDetail.title
                : postDetail.title
                    .split(" ")
                    .filter((word, index) => {
                      return index < 5;
                    })
                    .join(" ") + " ..."}
            </Link>
          </div>
          <h1 className="post-detail-title">{postDetail.title}</h1>
        </div>
        <div
          className="post-detail-info d-flex justify-content-between align-items-center mb-5"
          style={{ width: "70vw" }}>
          <div className="post-detail-info d-flex align-items-center">
            <div className="me-2">
              {postDetail && postDetail.postedBy && !postDetail.postedBy.avatar ? (
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf"
                  }}
                  size={40}>
                  {postDetail.postedBy.username[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar size={40} src={postDetail.postedBy.avatar.url} />
              )}
            </div>
            <Link className="pe-3 me-3" style={{ borderRight: "1px solid #00000080" }} to="/">
              {postDetail.postedBy.username}
            </Link>
            <Link className="pe-3 me-3" style={{ borderRight: "1px solid #00000080" }} to="/">
              {postDetail.category.name}
            </Link>
            <div>{moment(postDetail.createdAt).fromNow()}</div>
          </div>
          <div className="d-flex rate">
            <div>
              {likeData.map(like => like.ratedBy).includes(userId) ? (
                <LikeFilled
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleLike();
                  }}
                  style={{ fontSize: "1.5rem", border: "none" }}
                />
              ) : (
                <LikeOutlined
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleLike();
                  }}
                  style={{ fontSize: "1.5rem", border: "none" }}
                />
              )}
              <span>{likes}</span>
            </div>
            <div>
              {dislikeData.map(dislike => dislike.ratedBy).includes(userId) ? (
                <DislikeFilled
                  className="btn btn-outline-danger"
                  onClick={() => {
                    handleDislike();
                  }}
                  style={{ fontSize: "1.5rem", border: "none" }}
                />
              ) : (
                <DislikeOutlined
                  className="btn btn-outline-danger"
                  onClick={() => {
                    handleDislike();
                  }}
                  style={{ fontSize: "1.5rem", border: "none" }}
                />
              )}
              <span>{dislikes}</span>
            </div>
          </div>
        </div>

        <div className="post-detail-content">
          <Image src={postDetail.image.url} width="70vw" height="100%" />
          <div style={{ width: "70vw" }} className="mt-5 mb-4">
            {parse(postDetail.content)}
          </div>
        </div>
        <div
          style={{ width: "70vw", fontSize: "1.5rem", borderTop: "1px solid #6DE4EA" }}
          className="d-flex align-items-center pt-3 pb-3">
          <span>Share this: </span>
          <FacebookFilled
            style={{ fontSize: "125%", border: "none" }}
            className="btn btn-outline-light p-2 text-info"
          />
          <TwitterSquareFilled
            style={{ fontSize: "125%", border: "none" }}
            className="btn btn-outline-light p-2 text-info"
          />
          <InstagramFilled
            style={{ fontSize: "125%", border: "none" }}
            className="btn btn-outline-light p-2 text-info"
          />
        </div>
        {morePosts && morePosts.filter(post => post._id !== postDetail._id).length === 0 ? (
          <></>
        ) : (
          <div>
            <h4 className="mb-3">More Posts:</h4>
            <div className="more-posts-container">
              {morePosts &&
                morePosts
                  .filter(post => post._id !== postDetail._id)
                  .slice(0, 3)
                  .map(post => {
                    return (
                      <div
                        key={post._id}
                        className="card d-flex flex-column justify-content-between">
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
                          <h6>
                            {post.title.split(" ").length < 6
                              ? post.title
                              : post.title
                                  .split(" ")
                                  .filter((word, index) => {
                                    return index < 6;
                                  })
                                  .join(" ") + "..."}
                          </h6>
                          {post.description
                            .split(" ")
                            .filter((char, index) => {
                              return index < 10;
                            })
                            .join(" ") + "..."}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
