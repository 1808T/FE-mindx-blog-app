import { UserContext } from "../../context";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "antd";
import {
  SnippetsOutlined,
  SearchOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  UserDeleteOutlined
} from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";

const UserManagement = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [usernameAscendingOrder, setUsernameAscendingOrder] = useState(null);
  const [emailAscendingOrder, setEmailAscendingOrder] = useState(null);
  const [dateAscendingOrder, setDateAscendingOrder] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const roleStateUser = state && state.user.role ? state.user.role : undefined;
  useEffect(() => {
    if (roleStateUser === "admin") getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleStateUser]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/admin/all-users");
      setAllUsers(data.users);
      setFilteredUsers(data.users);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const deleteUser = async user_id => {
    try {
      const { data } = await axios.delete(`/admin/user/${user_id}`);
      toast.success(data.message, { theme: "colored" });
      getAllUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const searchUser = query => {
    const searchByUsername = allUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers([...searchByUsername]);
  };

  const sortByUsername = () => {
    if (!usernameAscendingOrder) {
      const sortByUsername = filteredUsers.sort((a, b) => {
        let userA = a.username;
        let userB = b.username;
        return userA < userB ? -1 : userA > userB ? 1 : 0;
      });
      setFilteredUsers([...sortByUsername]);
      setUsernameAscendingOrder(true);
    } else {
      const sortByUsername = filteredUsers.sort((a, b) => {
        let userA = a.username;
        let userB = b.username;
        return userA < userB ? 1 : userA > userB ? -1 : 0;
      });
      setFilteredUsers([...sortByUsername]);
      setUsernameAscendingOrder(false);
    }
  };

  const sortByEmail = () => {
    if (!emailAscendingOrder) {
      const sortByEmail = filteredUsers.sort((a, b) => {
        let emailA = a.email;
        let emailB = b.email;
        return emailA < emailB ? -1 : emailA > emailB ? 1 : 0;
      });
      setFilteredUsers([...sortByEmail]);
      setEmailAscendingOrder(true);
    } else {
      const sortByEmail = filteredUsers.sort((a, b) => {
        let emailA = a.email;
        let emailB = b.email;
        return emailA < emailB ? 1 : emailA > emailB ? -1 : 0;
      });
      setFilteredUsers([...sortByEmail]);
      setEmailAscendingOrder(false);
    }
  };

  const sortByJoinDate = () => {
    if (!dateAscendingOrder) {
      const sortedByJoinDate = filteredUsers.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateA - dateB;
      });
      setFilteredUsers([...sortedByJoinDate]);
      setDateAscendingOrder(true);
    } else {
      const sortedByJoinDate = filteredUsers.sort((a, b) => {
        let dateA = new Date(a.updatedAt);
        let dateB = new Date(b.updatedAt);
        return dateB - dateA;
      });
      setFilteredUsers([...sortedByJoinDate]);
      setDateAscendingOrder(false);
    }
  };

  if (state === null || (state && state.user.role !== "admin")) navigate("/");

  return (
    <div className="container user-management-container font-face-mulish">
      <div className="d-flex justify-content-center align-items-center">
        <h1>User Management</h1>
      </div>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Link
          className="btn btn-outline-dark d-flex align-items-center p-2 border-0"
          to="/admin/post-management">
          <SnippetsOutlined style={{ fontSize: "150%" }} />
        </Link>
        <SearchOutlined style={{ fontSize: "150%", color: "#5c6e9a" }} className="p-2" />
        <input
          type="text"
          className="form-control"
          style={{ width: "30%" }}
          placeholder="Enter username"
          onChange={e => {
            searchUser(e.target.value);
          }}
        />
      </div>
      <div className="table-container font-face-mulish text-black">
        <table>
          <thead>
            <tr>
              <th>
                <div
                  className="d-flex align-items-center justify-content-center"
                  onClick={sortByUsername}>
                  <span>Username</span>
                  <div className="d-flex flex-column ps-2">
                    <CaretUpOutlined hidden={usernameAscendingOrder === true} />
                    <CaretDownOutlined hidden={usernameAscendingOrder === false} />
                  </div>
                </div>
              </th>
              <th>
                <div
                  className="d-flex align-items-center justify-content-center"
                  onClick={sortByEmail}>
                  <span>Email</span>
                  <div className="d-flex flex-column ps-2">
                    <CaretUpOutlined hidden={emailAscendingOrder === true} />
                    <CaretDownOutlined hidden={emailAscendingOrder === false} />
                  </div>
                </div>
              </th>
              <th>
                <div
                  className="d-flex align-items-center justify-content-center"
                  onClick={sortByJoinDate}>
                  <span>Join Date</span>
                  <div className="d-flex flex-column ps-2">
                    <CaretUpOutlined hidden={dateAscendingOrder === false} />
                    <CaretDownOutlined hidden={dateAscendingOrder === true} />
                  </div>
                </div>
              </th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers &&
              filteredUsers.map(user => {
                return (
                  <tr key={user._id}>
                    <td>
                      <div className="p-2 user-avatar-management">
                        {user && !user.avatar ? (
                          <Avatar
                            size={44}
                            style={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf"
                            }}>
                            {user.username[0].toUpperCase()}
                          </Avatar>
                        ) : (
                          <Avatar src={user.avatar.url} size={44} />
                        )}
                        <Link
                          className="p-2 link-username"
                          to={`/user/${user._id}`}
                          style={{ color: "#9CA7C4" }}>
                          {user.username}
                        </Link>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{moment(user.createdAt).format("L")}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <UserDeleteOutlined
                          className="btn btn-outline-danger p-2 text-black"
                          style={{ border: "none", fontSize: "125%" }}
                          onClick={() => {
                            deleteUser(user._id);
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

export default UserManagement;
