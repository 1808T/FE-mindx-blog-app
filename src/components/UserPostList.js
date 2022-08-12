import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import { Image } from "antd";
import { EditFilled, DeleteFilled, SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CheckOutlined, FormOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const UserPostList = ({ allUserPosts, getAllUserPosts }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [dateAscendingOrder, setDateAscendingOrder] = useState(null);
  const [categoryAscendingOrder, setCategoryAscendingOrder] = useState(null);
  const [statusAscendingOrder, setStatusAscendingOrder] = useState(null);

  useEffect(() => {
    setUserPosts(allUserPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async post_id => {
    try {
      const { data } = await axios.delete(`/your-posts/delete/${post_id}`);
      toast.success(data.message, { theme: "colored" });
      const posts = await getAllUserPosts();
      setUserPosts(posts);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const searchArticleByTitle = query => {
    setUserPosts(
      allUserPosts.filter(post => {
        return post.title.toLowerCase().includes(query.toLowerCase());
      })
    );
  };

  const sortByPostDate = () => {
    if (!dateAscendingOrder) {
      const sortedByPostDate = userPosts.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateA - dateB;
      });
      setUserPosts([...sortedByPostDate]);
      setDateAscendingOrder(true);
    } else {
      const sortedByPostDate = userPosts.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
      setUserPosts([...sortedByPostDate]);
      setDateAscendingOrder(false);
    }
  };

  const sortByCategory = () => {
    if (!categoryAscendingOrder) {
      const sortedByCategory = userPosts.sort((a, b) => {
        let categoryA = a.category.name;
        let categoryB = b.category.name;

        return categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
      });
      setUserPosts([...sortedByCategory]);
      setCategoryAscendingOrder(true);
    } else {
      const sortedByCategory = userPosts.sort((a, b) => {
        let categoryA = a.category.name;
        let categoryB = b.category.name;

        return categoryA < categoryB ? 1 : categoryA > categoryB ? -1 : 0;
      });
      setUserPosts([...sortedByCategory]);
      setCategoryAscendingOrder(false);
    }
  };

  const sortByStatus = () => {
    if (!statusAscendingOrder) {
      const sortedByStatus = userPosts.sort((a, b) => {
        let statusA = a.status;
        let statusB = b.status;

        return statusA < statusB ? -1 : statusA > statusB ? 1 : 0;
      });
      setUserPosts([...sortedByStatus]);
      setStatusAscendingOrder(true);
    } else {
      const sortedByStatus = userPosts.sort((a, b) => {
        let statusA = a.status;
        let statusB = b.status;

        return statusA < statusB ? 1 : statusA > statusB ? -1 : 0;
      });
      setUserPosts([...sortedByStatus]);
      setStatusAscendingOrder(false);
    }
  };

  return (
    <div className="container your-post-container">
      {allUserPosts && allUserPosts.length === 0 ? (
        <h1>You haven't post anything!!!</h1>
      ) : (
        <main>
          <div className="d-flex justify-content-center">
            <h1>Your Posts</h1>
          </div>
          <div className="your-post-search-bar mb-3">
            <SearchOutlined style={{ fontSize: "150%", color: "#5c6e9a" }} className="p-2" />
            <input
              type="text"
              className="form-control"
              style={{ width: "30%" }}
              placeholder="Enter article title"
              onChange={e => {
                searchArticleByTitle(e.target.value);
              }}
            />
          </div>
          <div className="table-container font-face-mulish text-black">
            <table>
              {userPosts && userPosts.length !== 0 ? (
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        onClick={sortByPostDate}>
                        <span>Post Date</span>
                        <div className="d-flex flex-column ps-2">
                          <CaretUpOutlined hidden={dateAscendingOrder === false} />
                          <CaretDownOutlined hidden={dateAscendingOrder === true} />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        onClick={sortByCategory}>
                        <span>Category</span>
                        <div className="d-flex flex-column ps-2">
                          <CaretUpOutlined hidden={categoryAscendingOrder === true} />
                          <CaretDownOutlined hidden={categoryAscendingOrder === false} />
                        </div>
                      </div>
                    </th>
                    <th>
                      <div
                        className="d-flex align-items-center justify-content-center"
                        onClick={sortByStatus}>
                        <span>Status</span>
                        <div className="d-flex flex-column ps-2">
                          <CaretUpOutlined hidden={statusAscendingOrder === true} />
                          <CaretDownOutlined hidden={statusAscendingOrder === false} />
                        </div>
                      </div>
                    </th>
                    <th>
                      <span>Edit</span>
                    </th>
                  </tr>
                </thead>
              ) : (
                <></>
              )}
              <tbody>
                {userPosts && userPosts.length !== 0 ? (
                  userPosts.map(userPost => {
                    return (
                      <tr key={userPost._id}>
                        <td className="d-flex align-items-center h-100">
                          <span>
                            <Image
                              src={userPost.image.url}
                              width={64}
                              height="auto"
                              className="p-2"
                            />
                          </span>
                          <Link className="text-start link-post-title" to={`/post/${userPost._id}`}>
                            {userPost.title && userPost.title.split("").length < 20
                              ? userPost.title
                              : userPost.title
                                  .split("")
                                  .filter((char, index) => {
                                    return index < 25;
                                  })
                                  .join("") + "..."}
                          </Link>
                        </td>
                        <td>{moment(userPost.updatedAt).format("L")}</td>
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
                  })
                ) : (
                  <tr>
                    <td>No post found!!!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
};

export default UserPostList;
