import React, { useEffect } from "react";
import { Image, Avatar } from "antd";
import parse from "html-react-parser";
import moment from "moment";

const Post = ({ postDetail }) => {
  return (
    <div className="container">
      <div className="card mb-5">
        <div className="card-header d-flex justify-content-between">
          <h5>Title: {postDetail.title}</h5>
          <h6>
            avatar: <Avatar size={32} src={postDetail.postedBy.avatar} />
            <br />
            author: {postDetail.postedBy.username}
            <br />
            time: {moment(postDetail.updatedAt).fromNow()}
          </h6>
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
