import React from "react";
import { Image } from "antd";
import parse from "html-react-parser";
import moment from "moment";

const Post = ({ allPosts }) => {
  return (
    <div className="container">
      {allPosts &&
        allPosts.map(post => {
          return (
            <div key={post._id} className="card mb-5">
              <div className="card-header d-flex justify-content-between">
                <h5>Title: {post.title}</h5>
                <h6>
                  author: {post.postedBy.username}
                  <br />
                  time: {moment(post.updatedAt).fromNow()}
                </h6>
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
              <div className="card-footer">
                <h6>Description: {post.description}</h6>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
