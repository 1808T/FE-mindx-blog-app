import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import AvatarUpload from "../../components/AvatarUpload";

const Profile = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [ok, setOk] = useState(false);
  const [user, setUser] = useState({
    username: "",
    gender: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    phone: ""
  });
  const [avatar, setAvatar] = useState({
    url: "",
    public_id: ""
  });
  const [type, setType] = useState("text");

  useEffect(() => {
    if (state && state.token) getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.token]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleOnFocus = () => {
    setType("date");
  };

  const uploadAvatar = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post("current-user/avatar", formData);
      setAvatar({
        url: data.url,
        public_id: data.public_id
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setUploading(false);
    }
  };

  // const deleteAvatar = async () => {
  //   const public_id = avatar.public_id;
  //   try {
  //     setUploading(true);
  //     const { data } = await axios.delete("current-user/avatar", {
  //       data: { public_id }
  //     });
  //     toast.success(data.message);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.response.data.message, { theme: "colored" });
  //     setUploading(false);
  //   }
  // };

  const replaceAvatar = async e => {
    const public_id = avatar.public_id;
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    formData.append("public_id", public_id);
    try {
      setUploading(true);
      const { data } = await axios.put("current-user/avatar", formData);
      setAvatar({
        url: data.url,
        public_id: data.public_id
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put("/current-user", {
        username: user.username,
        gender: user.gender,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        address: user.address,
        phone: user.phone,
        avatar
      });
      console.log(data);
      // UPDATE LOCAL STORAGE
      const info = JSON.parse(localStorage.getItem("auth"));
      info.user = data.user;
      localStorage.setItem("auth", JSON.stringify(info));
      // UPDATE CONTEXT
      setState({ ...state, user: data.user });
      toast.success(data.message, { theme: "colored" });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user");
      if (!data.user.about) {
        setUser({
          username: data.user.username
        });
        setAvatar(data.user.avatar);
      } else {
        setUser({
          username: data.user.username,
          gender: data.user.about.gender,
          firstName: data.user.about.firstName,
          lastName: data.user.about.lastName,
          dob: data.user.about.dob,
          address: data.user.about.address,
          phone: data.user.about.phone
        });
        setAvatar(data.user.avatar);
      }
      data.ok ? setOk(true) : setOk(false);
    } catch (err) {
      navigate("/login");
      console.log(err);
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
      <main className="container-fluid profile-container-fluid">
        <div className="container d-flex justify-content-center align-items-center font-face-mulish">
          <h1>Edit Profile</h1>
        </div>
        <div className="container profile-container">
          <form onSubmit={handleSubmit}>
            <AvatarUpload
              title="Your Avatar"
              state={state}
              avatar={avatar}
              uploading={uploading}
              uploadAvatar={uploadAvatar}
              replaceAvatar={replaceAvatar}
            />
            <div className="profile-input-group">
              <div className="form-group d-flex justify-content-between" style={{ width: "50%" }}>
                <Input
                  title="Username"
                  type="text"
                  name="username"
                  placeholder="Enter new username"
                  handleChange={handleChange}
                  value={state.user.username}
                  disabled={true}
                />
                <div style={{ width: "2vw" }} className="gender-input__1"></div>
                <div className="form-group mb-3 gender-input__1">
                  <small>
                    <label className="text-black">Gender</label>
                  </small>
                  <select
                    className="form-select form-select-sm"
                    defaultValue={user.gender || "Gender"}
                    name="gender"
                    onChange={handleChange}>
                    <option disabled hidden>
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group mb-3 gender-input__2">
                <small>
                  <label className="text-black">Gender</label>
                </small>
                <select
                  className="form-select form-select-sm"
                  defaultValue={user.gender || "Gender"}
                  name="gender"
                  onChange={handleChange}>
                  <option disabled hidden>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group d-flex justify-content-between" style={{ width: "50%" }}>
                <Input
                  title="First name"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  handleChange={handleChange}
                  value={user.firstName}
                />
                <div style={{ width: "2vw" }} className="last-name-input__1"></div>
                <div className="last-name-input__1" style={{ width: "50%" }}>
                  <Input
                    title="Last name"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    handleChange={handleChange}
                    value={user.lastName}
                  />
                </div>
              </div>
              <Input
                title="Last name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                handleChange={handleChange}
                value={user.lastName}
                className="last-name-input__2"
              />
              <Input
                title="Date of birth"
                type={type}
                name="dob"
                onFocus={handleOnFocus}
                placeholder="Enter your date of birth"
                handleChange={handleChange}
                value={user.dob}
              />
              <Input
                title="Address"
                type="text"
                name="address"
                placeholder="Enter your address"
                handleChange={handleChange}
                value={user.address}
              />
              <Input
                title="Phone"
                type="text"
                name="phone"
                placeholder="Enter your phone"
                handleChange={handleChange}
                value={user.phone}
              />
              <div className="form-group mb-3 d-flex justify-content-center">
                <button className="btn btn-outline-primary">
                  {loading ? <SyncOutlined spin className="py-1" /> : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Profile;
