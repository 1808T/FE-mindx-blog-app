import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CheckOutlined, FormOutlined } from "@ant-design/icons";

const UserPostList = ({ allUserPosts, getAllUserPosts }) => {
  const deletePost = async post_id => {
    console.log(post_id);
    try {
      const { data } = await axios.delete(`/your-posts/delete/${post_id}`);
      toast.success(data.message, { theme: "colored" });
      getAllUserPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  return (
    <div className="container your-post-container font-face-mulish text-black">
      {allUserPosts && allUserPosts.length === 0 ? (
        <h1>No post found!</h1>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Article</th>
                <th>Post Date</th>
                <th>Category</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {allUserPosts &&
                allUserPosts.map((userPost, index) => {
                  return (
                    <tr key={userPost._id}>
                      <td>{index + 1}</td>
                      <td className="d-flex align-items-center h-100">
                        <span>
                          <Image
                            src={userPost.image.url}
                            width={64}
                            height="auto"
                            className="p-2"
                          />
                        </span>
                        <span className="text-start">
                          {userPost.title && userPost.title.split("").length < 20
                            ? userPost.title
                            : userPost.title
                                .split("")
                                .filter((char, index) => {
                                  return index < 25;
                                })
                                .join("") + "..."}
                        </span>
                      </td>
                      <td>{moment(userPost.createdAt).format("L")}</td>
                      <td>{userPost.category.name}</td>
                      <td>
                        <div
                          className={
                            userPost.status === "draft"
                              ? " status-draft btn p-1"
                              : " status-approved btn p-1"
                          }>
                          {userPost.status === "draft" ? (
                            <div className="d-flex justify-content-center">
                              <FormOutlined className="p-1" />
                              <span>{userPost.status}</span>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-evenly">
                              <CheckOutlined className="p-1" />
                              <span>{userPost.status}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      {userPost.status === "approved" ? (
                        <></>
                      ) : (
                        <td className="d-flex justify-content-evenly">
                          <div>
                            <Link to={`/user/edit/${userPost._id}`}>
                              <EditFilled
                                className="btn btn-outline-info p-2 text-black"
                                style={{ border: "none", fontSize: "125%" }}
                              />
                            </Link>
                          </div>
                          <div>
                            <DeleteFilled
                              className="btn btn-outline-danger p-2 text-black"
                              style={{ border: "none", fontSize: "125%" }}
                              type="button"
                              onClick={() => {
                                deletePost(userPost._id);
                              }}
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPostList;
