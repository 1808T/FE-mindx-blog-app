import React, { useState, useContext } from "react";
import { UserContext } from "../context";
import { Avatar } from "antd";
import { CameraTwoTone, LoadingOutlined } from "@ant-design/icons";

const AvatarUpload = ({ title, hidden, uploadAvatar, uploading, avatar, deleteAvatar }) => {
  const [state] = useContext(UserContext);

  return (
    <div className="form-group p-2 d-flex flex-column justify-content-center align-items-center">
      <div className="text-muted mb-2" style={{ fontSize: "80%" }}>
        {title}
      </div>
      <div className="d-flex flex-column align-items-center">
        <Avatar size={250} src={state.user.avatar} className="mb-3" hidden={hidden} />
        <label htmlFor="image-uploader">
          {avatar && avatar.url ? (
            <Avatar size={250} src={avatar.url} />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraTwoTone className="btn btn-light btn-lg" />
          )}
        </label>
        <input
          type="file"
          id="image-uploader"
          accept="image/*"
          onChange={uploadAvatar}
          hidden
          disabled={avatar && avatar.url}
        />
        {avatar && avatar.url ? (
          <div className="btn btn-primary mt-2" onClick={deleteAvatar}>
            Cancel
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
