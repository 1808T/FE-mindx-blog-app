import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/Input";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ImageUpload from "../../../components/ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const EditPost = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState({ text: "" });
  const [image, setImage] = useState({
    url: "",
    public_id: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  let path = window.location.pathname;

  useEffect(() => {
    if (state && state.token) getUserPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.token]);

  const getUserPost = async () => {
    try {
      const { data } = await axios.get(`/your-posts/${post_id}`);
      setCategory(data.post.category.name);
      setTitle(data.post.title);
      setDescription(data.post.description);
      setContent(data.post.content);
      setImage({
        url: data.post.image.url,
        public_id: data.post.image.public_id
      });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, { theme: "colored" });
    }
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/your-posts/edit/${post_id}`, {
        category,
        title,
        description,
        content,
        image
      });
      toast.success(data.message, { theme: "colored" });
      setLoading(false);
    } catch (err) {
      console.log(err);
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
      <div className="container-fluid edit-post-form">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex align-items-center justify-content-center font-face-mulish">
              <h1>Edit Post</h1>
            </div>
            <form className="form-group" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <small>
                  <label className="text-black">Topic *</label>
                </small>
                <select
                  className="form-select form-select-sm"
                  value={category}
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
                title="Change your post image"
                uploadImage={uploadImage}
                uploading={uploading}
                image={image}
                replaceImage={replaceImage}
                path={path}
              />
              <div className="form-group p-2 d-flex justify-content-center">
                <button className="btn btn-dark" disabled={!title || !content}>
                  {loading ? <SyncOutlined spin className="py-1" /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
