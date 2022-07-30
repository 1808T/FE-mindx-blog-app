import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "antd";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ state, postId }) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState("");
  const textareaRef = useRef(null);

  const handleComment = e => {
    setComment(e.target.value);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //auto-height textarea
  useEffect(() => {
    textareaRef.current.style.height = "8vh";
    textareaRef.current.style.width = "30vw";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [comment]);

  const getComments = async () => {
    try {
      const { data } = await axios.get(`/comment/${postId}`);
      setPostComments(data.comments);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const postComment = async e => {
    e.preventDefault();
    if (!state) return toast.error("Please login.", { theme: "colored" });
    try {
      const { data } = await axios.post("/comment", {
        postId,
        content: comment
      });
      console.log(data.message);
      getComments();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const handleDeleteComment = async commentId => {
    try {
      const { data } = await axios.delete("/comment", {
        data: {
          postId,
          commentId
        }
      });
      console.log(data);
      toast.success(data.message, { theme: "colored" });
      getComments();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setEditMode(false);
  };

  const handleEditComment = e => {
    setEditComment(e.target.innerText);
  };

  const submitEditComment = async commentId => {
    try {
      const { data } = await axios.put("/comment", {
        postId,
        commentId,
        content: editComment
      });
      toast.success(data.message, { theme: "colored" });
      setEditMode(false);
    } catch (err) {
      console.log(err);
      toast.err(err.response.data.message, { theme: "colored" });
    }
  };

  return (
    <>
      <form onSubmit={postComment} className="d-flex align-items-end justify-content-center">
        <div className="form-group me-3">
          <label className="text-muted">Comment</label>
          <textarea
            className="form-control text-area"
            ref={textareaRef}
            name="comment"
            onChange={handleComment}
            placeholder="Write something here ..."
            value={comment}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-outline-primary">Post</button>
        </div>
      </form>

      {postComments &&
        postComments.map(postComment => {
          return (
            <div key={postComment._id} className="card">
              <div className="card-header d-flex justify-content-between">
                <h6>
                  {postComment && postComment.postedBy && !postComment.postedBy.avatar ? (
                    <>
                      <Avatar
                        style={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf"
                        }}>
                        {postComment.postedBy.username[0].toUpperCase()}
                      </Avatar>
                      {postComment.postedBy.username}
                    </>
                  ) : (
                    <>
                      <Avatar src={postComment.postedBy.avatar.url} width={32} />
                      {postComment.postedBy.username}
                    </>
                  )}
                </h6>
                <h6>{moment(postComment.createdAt).format("LLL")}</h6>
              </div>
              <div
                className="card-body"
                contentEditable={editMode}
                onInput={handleEditComment}
                suppressContentEditableWarning={true}>
                {postComment.content}
              </div>
              {postComment.postedBy._id === state.user._id ? (
                <div className="card-footer d-flex justify-content-end">
                  {editMode ? (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          submitEditComment(postComment._id);
                        }}>
                        Update
                      </button>
                      <button className="btn btn-primary" onClick={cancelEditMode}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary me-2" onClick={handleEditMode}>
                        Edit
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleDeleteComment(postComment._id);
                        }}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Comment;
