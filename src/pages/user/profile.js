import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { SyncOutlined, LoadingOutlined, CameraTwoTone } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Avatar } from "antd";
import Input from "../../components/Input";

const Profile = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: ""
  });

  const [avatar, setAvatar] = useState({
    url: "",
    public_id: ""
  });

  useEffect(() => {
    if (state && state.token) getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.token]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatar = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const { data } = await axios.post("/upload-image", formData);
      setAvatar({
        url: data.url,
        public_id: data.public_id
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/current-user", {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        address: user.address,
        avatar: avatar.url
      });
      // UPDATE LOCAL STORAGE
      const info = JSON.parse(localStorage.getItem("auth"));
      info.user = data.user;
      localStorage.setItem("auth", JSON.stringify(info));
      // UPDATE CONTEXT
      setState({ ...state, user: data.user });
      toast.success(data.message, { theme: "colored" });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");
      data.ok ? setOk(true) : setOk(false);
    } catch (err) {
      navigate("/login");
    }
  };

  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center align-items-center display-2 text-primary p-5"
    />
  ) : (
    <>
      <main>
        <div className="container-fluid">
          <div className="row py-5 bg-secondary text-light">
            <div className="col text-center">
              <h1>Your Profile</h1>
            </div>
          </div>
        </div>

        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group p-2 d-flex justify-content-center">
                <div>
                  <p className="text-muted" style={{ fontSize: "80%" }}>
                    Your avatar
                  </p>
                  <label htmlFor="image-uploader">
                    {avatar && avatar.url ? (
                      <div>
                        <div className="mb-3">
                          <Avatar size={200} src={avatar.url} />
                        </div>
                        <label htmlFor="second-image-uploader">
                          Select other image
                          <CameraTwoTone className="btn btn-light btn-lg" />
                        </label>
                        <input
                          type="file"
                          id="second-image-uploader"
                          accept="image/*"
                          onChange={handleAvatar}
                          hidden
                          disabled
                        />
                      </div>
                    ) : loading ? (
                      <LoadingOutlined className="mt-2" />
                    ) : (
                      <CameraTwoTone className="btn btn-light btn-lg" />
                    )}
                  </label>
                  <input
                    type="file"
                    id="image-uploader"
                    accept="image/*"
                    hidden
                    onChange={handleAvatar}
                    disabled={avatar && avatar.url}
                  />
                </div>
              </div>
              <Input
                title="Enter new username"
                type="text"
                name="username"
                placeholder="Enter new username"
                handleChange={handleChange}
                value={user.username}
              />
              <Input
                title="Enter your first name"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                handleChange={handleChange}
                value={user.firstName}
              />
              <Input
                title="Enter your last name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                handleChange={handleChange}
                value={user.lastName}
              />
              <Input
                title="Enter your date of birth"
                type="date"
                name="dob"
                placeholder="Enter your first name"
                handleChange={handleChange}
                value={user.dob}
              />
              <Input
                title="Enter your address"
                type="text"
                name="address"
                placeholder="Enter your address"
                handleChange={handleChange}
                value={user.address}
              />
              <div className="form-group p-2 d-flex justify-content-center">
                <button className="btn btn-dark">
                  {loading ? <SyncOutlined spin className="py-1" /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
