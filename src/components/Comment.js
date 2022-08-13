import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "antd";
import { EditFilled, DeleteFilled, CheckCircleFilled, StopOutlined } from "@ant-design/icons";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";

const Comment = ({ state, postDetail }) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editModeId, setEditModeId] = useState("");
  const [editComment, setEditComment] = useState("");
  const textareaRef = useRef(null);
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const handleComment = e => {
    setComment(e.target.value);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //auto-height textarea
  useEffect(() => {
    textareaRef.current.style.height = "30px";
    textareaRef.current.style.width = "50vw";
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
      setComment("");
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
      toast.success(data.message, { theme: "colored" });
      getComments();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const handleEditMode = commentId => {
    setEditMode(true);
    setEditModeId(commentId);
    const focusElement = document.getElementById(commentId);
    setTimeout(function () {
      focusElement.focus();
    }, 0);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditComment("");
  };

  const handleEditComment = e => {
    setEditComment(e.target.value);
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
      setEditModeId("");
      getComments();
    } catch (err) {
      console.log(err);
      toast.err(err.response.data.message, { theme: "colored" });
    }
  };

  return (
    <div
      className="comment-container container mt-3"
      hidden={postDetail && postDetail.status !== "approved"}>
      <h2>Comments</h2>
      <form onSubmit={postComment} className="d-flex align-items-end mb-4">
        <div className="form-group me-3">
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
            <div
              key={postComment._id}
              className="d-flex flex-column justify-content-center font-face-montserrat mb-4"
              style={{ background: "#c4c4c44d", width: "50vw", borderRadius: "5px" }}>
              <div className="d-flex justify-content-end p-1" style={{ color: "#000000cc" }}>
                {postComment.postedBy &&
                state &&
                state.user &&
                postComment.postedBy._id === state.user._id ? (
                  <>
                    {editMode && postComment._id === editModeId ? (
                      <>
                        <CheckCircleFilled
                          className="btn btn-outline-success p-1"
                          style={{ border: "none" }}
                          onClick={() => {
                            submitEditComment(postComment._id);
                          }}
                        />
                        <StopOutlined
                          className="btn btn-outline-danger p-1"
                          style={{ border: "none" }}
                          onClick={() => {
                            cancelEditMode();
                          }}
                        />
                      </>
                    ) : (
                      <div>
                        <EditFilled
                          className="btn btn-outline-primary p-1"
                          style={{ border: "none" }}
                          onClick={() => {
                            handleEditMode(postComment._id);
                          }}
                        />
                        <DeleteFilled
                          className="btn btn-outline-danger p-1"
                          style={{ border: "none" }}
                          onClick={() => {
                            handleDeleteComment(postComment._id);
                          }}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="d-flex">
                <div className="comment-user-info d-flex flex-column justify-content-center align-items-center p-2">
                  <h6>
                    {postComment && postComment.postedBy && !postComment.postedBy.avatar ? (
                      <>
                        <Avatar
                          size={64}
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf"
                          }}>
                          {postComment.postedBy.username[0].toUpperCase()}
                        </Avatar>
                      </>
                    ) : (
                      <>
                        <Avatar src={postComment.postedBy.avatar.url} size={64} />
                      </>
                    )}
                  </h6>
                  <div
                    style={{ fontSize: "1.125rem", color: "#000000cc" }}
                    className="comment-username">
                    {postComment.postedBy.username}
                  </div>
                </div>
                <div className="comment-content-container p-2 pe-4 d-flex flex-column justify-content-between">
                  {editMode && postComment._id === editModeId ? (
                    <textarea
                      className="form-control text-area"
                      onChange={handleEditComment}
                      value={editComment}></textarea>
                  ) : (
                    <div
                      style={{ fontSize: "1.125rem" }}
                      id={postComment._id}
                      className="comment-content">
                      {postComment.content}
                    </div>
                  )}

                  <div className="align-self-end pb-2 comment-time">
                    <span>{moment(postComment.createdAt).format("LLL")}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      {/* {postComments &&
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
        })} */}
    </div>
  );
};

export default Comment;
