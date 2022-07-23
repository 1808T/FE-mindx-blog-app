import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { Image } from "antd";
import { SyncOutlined, CameraTwoTone, LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const CreatePost = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState({ text: "" });
  const [image, setImage] = useState({
    url: "",
    public_id: ""
  });
  const [loading, setLoading] = useState(false);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/new-post", {
        title,
        description,
        content,
        image
      });
      console.log(data);
      toast.success(data.message, { theme: "colored" });
      setTitle("");
      setDescription("");
      setContent({ text: "" });
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const handleImage = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const { data } = await axios.post("/upload-image", formData);
      setImage({
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

  if (state === null) navigate("/");

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Create Post</h1>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <form className="form-group" onSubmit={handleSubmit}>
              <Input
                title="Title *"
                type="text"
                name="title"
                placeholder="Article title"
                value={title}
                handleChange={handleTitleChange}
              />
              <Input
                title="Description *"
                type="text"
                name="description"
                placeholder="Article description"
                value={description}
                handleChange={handleDescriptionChange}
              />
              <div className="form-group p-2">
                <small>
                  <label className="text-muted">Content *</label>
                </small>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="form-control"
                />
              </div>
              <div className="form-group p-2 d-flex justify-content-between">
                <div>
                  <p className="text-muted" style={{ fontSize: "80%" }}>
                    Upload image
                  </p>
                  <label htmlFor="image-uploader">
                    {image && image.url ? (
                      <div>
                        <div className="mb-3">
                          <Image width={500} src={image.url} />
                        </div>
                        <label htmlFor="second-image-uploader">
                          Select other image
                          <CameraTwoTone className="btn btn-light btn-lg" />
                        </label>
                        <input
                          type="file"
                          id="second-image-uploader"
                          accept="image/*"
                          onChange={handleImage}
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
                    onChange={handleImage}
                    disabled={image && image.url}
                  />
                </div>
              </div>
              <div className="form-group p-2 d-flex justify-content-center">
                <button className="btn btn-dark" disabled={!title || !content}>
                  {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
