import React from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";

const SearchResult = ({ current, searchedPostsByTitle, searchedPostsByUsername }) => {
  const navigate = useNavigate();

  return current === "/search" ? (
    <div className="container search-result-container">
      {searchedPostsByTitle &&
      searchedPostsByTitle.length === 0 &&
      searchedPostsByUsername &&
      searchedPostsByUsername.length === 0 ? (
        <h1>No post found!!!</h1>
      ) : (
        <>
          {searchedPostsByTitle.length === 0 ? (
            <></>
          ) : (
            <div className="container search-by-title-container mb-5">
              <h1>Matched Title</h1>
              {searchedPostsByTitle.map(post => {
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
                    <div className="card-footer">
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
                      <p>{parse(post.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {searchedPostsByUsername.length === 0 ? (
            <></>
          ) : (
            <div className="container search-by-title-container">
              <h1>Matched author</h1>
              {searchedPostsByUsername.map(post => {
                return (
                  <div key={post._id} className="card mb-5">
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
                    <div className="card-footer">
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
                      <p>{parse(post.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default SearchResult;
