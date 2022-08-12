import React from "react";
import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteFilled,
  FormOutlined,
  CheckOutlined
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const PostManagement = () => {
  const [state] = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [authorAscendingOrder, setAuthorAscendingOrder] = useState(null);
  const [dateAscendingOrder, setDateAscendingOrder] = useState(null);
  const [categoryAscendingOrder, setCategoryAscendingOrder] = useState(null);
  const [statusAscendingOrder, setStatusAscendingOrder] = useState(null);
  const navigate = useNavigate();

  const roleStateUser = state && state.user.role ? state.user.role : undefined;
  useEffect(() => {
    if (roleStateUser === "admin") getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleStateUser]);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/admin/all-posts");
      setAllPosts(data.posts);
      setFilteredPosts(data.posts);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const deletePost = async post_id => {
    try {
      const { data } = await axios.delete(`/admin/post/${post_id}`);
      toast.success(data.message, { theme: "colored" });
      getAllPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const approvePost = async post_id => {
    try {
      const { data } = await axios.put(`/admin/post/${post_id}`);
      toast.success(data.message, { theme: "colored" });
      getAllPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const searchArticle = query => {
    const searchByTitle = allPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts([...searchByTitle]);
  };

  const sortByAuthor = () => {
    if (!authorAscendingOrder) {
      const sortByAuthor = filteredPosts.sort((a, b) => {
        let authorA = a.postedBy.username;
        let authorB = b.postedBy.username;
        return authorA < authorB ? -1 : authorA > authorB ? 1 : 0;
      });
      setFilteredPosts([...sortByAuthor]);
      setAuthorAscendingOrder(true);
    } else {
      const sortByAuthor = filteredPosts.sort((a, b) => {
        let authorA = a.postedBy.username;
        let authorB = b.postedBy.username;
        return authorA < authorB ? 1 : authorA > authorB ? -1 : 0;
      });
      setFilteredPosts([...sortByAuthor]);
      setAuthorAscendingOrder(false);
    }
  };

  const sortByPostDate = () => {
    if (!dateAscendingOrder) {
      const sortedByPostDate = filteredPosts.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateA - dateB;
      });
      setFilteredPosts([...sortedByPostDate]);
      setDateAscendingOrder(true);
    } else {
      const sortedByPostDate = filteredPosts.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
      setFilteredPosts([...sortedByPostDate]);
      setDateAscendingOrder(false);
    }
  };

  const sortByCategory = () => {
    if (!categoryAscendingOrder) {
      const sortedByCategory = filteredPosts.sort((a, b) => {
        let categoryA = a.category.name;
        let categoryB = b.category.name;

        return categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
      });
      setFilteredPosts([...sortedByCategory]);
      setCategoryAscendingOrder(true);
    } else {
      const sortedByCategory = filteredPosts.sort((a, b) => {
        let categoryA = a.category.name;
        let categoryB = b.category.name;

        return categoryA < categoryB ? 1 : categoryA > categoryB ? -1 : 0;
      });
      setFilteredPosts([...sortedByCategory]);
      setCategoryAscendingOrder(false);
    }
  };

  const sortByStatus = () => {
    if (!statusAscendingOrder) {
      const sortedByStatus = filteredPosts.sort((a, b) => {
        let statusA = a.status;
        let statusB = b.status;

        return statusA < statusB ? -1 : statusA > statusB ? 1 : 0;
      });
      setFilteredPosts([...sortedByStatus]);
      setStatusAscendingOrder(true);
    } else {
      const sortedByStatus = filteredPosts.sort((a, b) => {
        let statusA = a.status;
        let statusB = b.status;

        return statusA < statusB ? 1 : statusA > statusB ? -1 : 0;
      });
      setFilteredPosts([...sortedByStatus]);
      setStatusAscendingOrder(false);
    }
  };

  if (!state || (state && state.user.role !== "admin")) navigate("/");

  return (
    <div className="container post-management-container font-face-mulish">
      <div className="d-flex justify-content-center align-items-center">
        <h1>Post Management</h1>
      </div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Link
          className="btn btn-outline-dark d-flex align-items-center p-2 border-0"
          to="/admin/user-management">
          <UserOutlined style={{ fontSize: "150%" }} />
        </Link>
        <SearchOutlined style={{ fontSize: "150%", color: "#5c6e9a" }} className="p-2" />
        <input
          type="text"
          className="form-control"
          style={{ width: "30%" }}
          placeholder="Enter article title"
          onChange={e => {
            searchArticle(e.target.value);
          }}
        />
      </div>
      <div className="table-container font-face-mulish text-black">
        <table>
          <thead>
            <tr>
              <th>Article</th>
              <th onClick={sortByAuthor}>
                <div
                  className="d-flex align-items-center justify-content-center"
                  onClick={sortByPostDate}>
                  <span>Author</span>
                  <div className="d-flex flex-column ps-2">
                    <CaretUpOutlined hidden={authorAscendingOrder === true} />
                    <CaretDownOutlined hidden={authorAscendingOrder === false} />
                  </div>
                </div>
              </th>
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
          <tbody>
            {filteredPosts &&
              filteredPosts.map(post => {
                return (
                  <tr key={post._id}>
                    <td className="d-flex align-items-center h-100">
                      <span>
                        <Image src={post.image.url} width={64} height="auto" className="p-2" />
                      </span>
                      <Link
                        className="text-start link-post-title"
                        to={`/post/${post._id}`}
                        style={{ color: "#9CA7C4" }}>
                        {post.title && post.title.split("").length < 20
                          ? post.title
                          : post.title
                              .split("")
                              .filter((char, index) => {
                                return index < 25;
                              })
                              .join("") + "..."}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/user/${post.postedBy._id}`}
                        style={{ color: "#9CA7C4" }}
                        className="link-username">
                        {post.postedBy.username}
                      </Link>
                    </td>
                    <td>{moment(post.updatedAt).format("L")}</td>
                    <td>{post.category.name}</td>
                    <td>
                      <div
                        className={
                          post.status === "draft"
                            ? " status-draft btn p-1"
                            : " status-approved btn p-1"
                        }>
                        {post.status === "draft" ? (
                          <div className="d-flex justify-content-center">
                            <FormOutlined className="p-1" />
                            <span>{post.status}</span>
                          </div>
                        ) : (
                          <div className="d-flex justify-content-evenly">
                            <CheckOutlined className="p-1" />
                            <span>{post.status}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="d-flex justify-content-evenly">
                      <div>
                        <CheckOutlined
                          className="btn btn-outline-success p-2 text-black"
                          style={{ border: "none", fontSize: "125%" }}
                          onClick={() => {
                            approvePost(post._id);
                          }}
                        />
                      </div>
                      <div>
                        <DeleteFilled
                          className="btn btn-outline-danger p-2 text-black"
                          style={{ border: "none", fontSize: "125%" }}
                          onClick={() => {
                            deletePost(post._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostManagement;
