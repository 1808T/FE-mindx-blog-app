import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Comment from "../components/Comment";
import axios from "axios";
import { toast } from "react-toastify";

const PostDetail = () => {
  const [state] = useContext(UserContext);
  const { post_id } = useParams();
  const [postDetail, setPostDetail] = useState({
    title: "",
    content: "",
    status: "",
    postedBy: {
      avatar: {}
    },
    category: {},
    image: {}
  });
  const [stage, setStage] = useState(null);
  const [likes, setLikes] = useState({
    data: [],
    count: 0
  });
  const [dislikes, setDislikes] = useState({
    data: [],
    count: 0
  });
  const [postCategory, setPostCategory] = useState("");

  useEffect(() => {
    handlePostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    countRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const handlePostById = async () => {
    try {
      const { data } = await axios.get(`/post/${post_id}`);
      setPostDetail(data.post);
      setPostCategory(data.post.category._id);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const handleLike = async () => {
    if (!state) return toast.error("Please login", { theme: "colored" });
    setStage(true);
    try {
      const { data } = await axios.put("/rate", {
        postId: post_id,
        ratedBy: state.user._id,
        rate: true
      });
      console.log(data);
      handlePostById();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
    setStage(null);
  };

  const handleDislike = async () => {
    if (!state) return toast.error("Please login", { theme: "colored" });
    setStage(false);
    try {
      const { data } = await axios.put("/rate", {
        postId: post_id,
        ratedBy: state.user._id,
        rate: false
      });
      console.log(data);
      handlePostById();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
    setStage(null);
  };

  const countRate = async () => {
    try {
      const { data } = await axios.get(`/count-rate/${post_id}`);
      setLikes({
        data: data.likes,
        count: data.likes.length
      });
      setDislikes({
        data: data.dislikes,
        count: data.dislikes.length
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <Post
        userId={state && state.user._id}
        postDetail={postDetail}
        handleLike={handleLike}
        handleDislike={handleDislike}
        likes={likes.count}
        dislikes={dislikes.count}
        likeData={likes.data}
        dislikeData={dislikes.data}
        postId={post_id}
        state={state}
        postCategory={postCategory}
      />
      <Comment state={state} postDetail={postDetail} />
    </>
  );
};

export default PostDetail;
