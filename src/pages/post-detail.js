import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import axios from "axios";

const PostDetail = () => {
  const { post_id } = useParams();
  const [postDetail, setPostDetail] = useState({
    postedBy: {
      avatar: {}
    }
  });

  useEffect(() => {
    handlePostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostById = async () => {
    const { data } = await axios.get(`/post/${post_id}`);
    setPostDetail(data.post);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="display-1 text-center py-5">Post Detail</h1>
            <div className="form-group p-2 d-flex justify-content-center"></div>
          </div>
        </div>
      </div>
      <Post postDetail={postDetail} />
    </>
  );
};

export default PostDetail;
