import React from "react";
import { Image, Avatar } from "antd";
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
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
  dislikeData
}) => {
  return (
    <div className="container">
      <div className="card mb-5">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h5>Title: {postDetail.title}</h5>
            <h6>
              avatar:
              {postDetail && postDetail.postedBy && !postDetail.postedBy.avatar ? (
                <Avatar
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf"
                  }}>
                  {postDetail.postedBy.username[0].toUpperCase()}
                </Avatar>
              ) : (
                <Avatar size={32} src={postDetail.postedBy.avatar.url} />
              )}
              <br />
              author: {postDetail.postedBy.username}
              <br />
              time: {moment(postDetail.updatedAt).fromNow()}
            </h6>
          </div>
          <div className="d-flex">
            <div>
              {likeData.map(like => like.ratedBy).includes(userId) ? (
                <LikeFilled
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleLike();
                  }}
                />
              ) : (
                <LikeOutlined
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleLike();
                  }}
                />
              )}
              {likes}
            </div>
            <div>
              {dislikeData.map(dislike => dislike.ratedBy).includes(userId) ? (
                <DislikeFilled
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleDislike();
                  }}
                />
              ) : (
                <DislikeOutlined
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleDislike();
                  }}
                />
              )}
              {dislikes}
            </div>
          </div>
        </div>
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          {postDetail.image && postDetail.image.url ? (
            <>
              Image:
              <Image width={500} src={postDetail.image.url} />
              Content:
              {parse(postDetail.content)}
            </>
          ) : (
            <p>Content: {postDetail.content}</p>
          )}
        </div>
        <div className="card-footer">
          <h6>Description: {postDetail.description}</h6>
        </div>
      </div>
    </div>
  );
};

export default Post;
