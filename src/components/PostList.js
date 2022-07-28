import React from "react";
import { Image, Avatar } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import { NavLink } from "react-router-dom";

const PostList = ({ allPosts }) => {
  return (
    <div className="container">
      {allPosts &&
        allPosts.map(post => {
          return (
            <div key={post._id} className="card mb-5">
              <div className="card-header d-flex justify-content-between">
                <div>
                  <Avatar size={32} src={post.postedBy.avatar.url} />
                  <h5>author: {post.postedBy.username}</h5>
                </div>

                <h6>time: {moment(post.updatedAt).fromNow()}</h6>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                {post.image && post.image.url ? (
                  <>
                    Image:
                    <Image width={500} src={post.image.url} />
                    Content:
                    {parse(post.content)}
                  </>
                ) : (
                  <p>Content: {post.content}</p>
                )}
              </div>
              <div className="card-footer d-flex flex-column justify-content-center align-items-center">
                <h5>Title: {post.title}</h5>
                <h6>Description: {post.description}</h6>
                <NavLink to={`post/${post._id}`}>
                  <button className="btn btn-dark">Detail</button>
                </NavLink>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
