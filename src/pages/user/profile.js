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
  const [hidden, setHidden] = useState(false);
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
      setHidden(true);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setUploading(false);
    }
  };

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
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        address: user.address,
        avatar: avatar
      });
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
      console.log(data);
      if (!data.user.about) {
        setUser({
          username: data.user.username
        });
      } else {
        setUser({
          username: data.user.username,
          firstName: data.user.about.firstName,
          lastName: data.user.about.lastName,
          dob: data.user.about.dob,
          address: data.user.about.address
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
              <AvatarUpload
                title="Your Avatar"
                hidden={hidden}
                avatar={avatar}
                uploading={uploading}
                uploadAvatar={uploadAvatar}
                replaceAvatar={replaceAvatar}
              />
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
                type={type}
                name="dob"
                onFocus={handleOnFocus}
                placeholder="Enter your date of birth"
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
