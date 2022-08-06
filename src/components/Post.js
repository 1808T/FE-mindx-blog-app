import React from "react";
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

const Post = ({
  userId,
  postDetail,
  handleLike,
  handleDislike,
  likes,
  dislikes,
  likeData,
  dislikeData,
  state
}) => {
  return (
    <>
      <div className="container post-detail-container font-face-montserrat">
        <div className="post-detail-path mb-3">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to={`/${postDetail._id}`}>{postDetail.title}</Link>
        </div>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ width: "70vw" }}>
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
        <div>
          <h4>More Posts</h4>
        </div>
      </div>
    </>
  );
};

export default Post;
