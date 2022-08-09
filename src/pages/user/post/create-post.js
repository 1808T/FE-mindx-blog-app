import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ImageUpload from "../../../components/ImageUpload";
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
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/new-post", {
        title,
        description,
        content,
        image,
        category
      });
      toast.success(data.message, { theme: "colored" });
      setTitle("");
      setDescription("");
      setContent({ text: "" });
      setImage({
        url: "",
        public_id: ""
      });
      setCategory("");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message, { theme: "colored" });
      setLoading(false);
    }
  };

  const uploadImage = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post("/image", formData);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      setUploading(false);
      toast.success(data.message, { theme: "colored" });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setUploading(false);
    }
  };

  const clear = async () => {
    const public_id = image.public_id;
    if (!public_id) {
      setTitle("");
      setDescription("");
      setContent({ text: "" });
      toast.info("Clear!!!", { theme: "colored" });
    } else {
      try {
        const { data } = await axios.delete("/image", {
          data: { public_id }
        });
        setTitle("");
        setDescription("");
        setContent({ text: "" });
        setImage({
          url: "",
          public_id: ""
        });
        toast.info(data.message, { theme: "colored" });
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message, { theme: "colored" });
      }
    }
  };

  const replaceImage = async e => {
    const public_id = image.public_id;
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    formData.append("public_id", public_id);
    try {
      setUploading(true);
      const { data } = await axios.put("/image", formData);
      console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      toast.info(data.message, { theme: "colored" });
      setUploading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
      setUploading(false);
    }
  };

  if (state === null) navigate("/");

  return (
    <>
      <div className="container-fluid create-post-form">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex align-items-center justify-content-center font-face-mulish">
              <h1>New post</h1>
            </div>
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <small>
                  <label className="text-black">Topic *</label>
                </small>
                <select
                  className="form-select form-select-sm"
                  defaultValue="Select topic"
                  name="question"
                  onChange={handleCategoryChange}>
                  <option disabled hidden>
                    Select topic
                  </option>
                  <option>Art</option>
                  <option>Book</option>
                  <option>Food</option>
                  <option>Game</option>
                  <option>Health And Fitness</option>
                  <option>Music</option>
                  <option>Photography</option>
                  <option>Technology</option>
                </select>
              </div>
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
              <div className="form-group mb-3">
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
              <ImageUpload
                title="Upload your post image"
                uploadImage={uploadImage}
                uploading={uploading}
                image={image}
                replaceImage={replaceImage}
              />
              <div className="form-group p-2 d-flex justify-content-between">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={clear}
                  disabled={!(image && image.url)}>
                  {loading ? <SyncOutlined spin className="py-1" /> : "Clear"}
                </button>
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
