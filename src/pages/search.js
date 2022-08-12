import React, { useEffect } from "react";

const SearchResult = ({ current, searchedPostsByTitle, searchedPostsByUsername }) => {
  return current === "/search" ? (
    <div className="container search-result-container">
      <div>
        {searchedPostsByTitle && searchedPostsByTitle.length === 0 ? (
          <h1>No post found!!!</h1>
        ) : (
          <>
            <h1>Matched Title</h1>
            {searchedPostsByTitle.map(post => {
              return (
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <h3>{post.postedBy.username}</h3>
                  <img src={post.image.url} style={{ width: "300px", height: "300px" }} />
                  <p>{post.content}</p>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div>
        {searchedPostsByUsername && searchedPostsByUsername.length === 0 ? (
          <h1>No post found!!!</h1>
        ) : (
          <>
            <h1>Matched Author</h1>
            {searchedPostsByUsername.map(post => {
              return (
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <h3>{post.postedBy.username}</h3>
                  <img src={post.image.url} style={{ width: "300px", height: "300px" }} />
                  <p>{post.content}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SearchResult;
