import React from "react";
import { Avatar } from "antd";
import { CameraTwoTone, LoadingOutlined } from "@ant-design/icons";

const AvatarUpload = ({ title, uploadAvatar, uploading, avatar, replaceAvatar }) => {
  return (
    <div className="form-group mb-3 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        <label htmlFor="avatar-uploader">
          {avatar && avatar.url ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="text-muted mb-2" style={{ fontSize: "80%" }}>
                {title}
              </div>
              <Avatar size={150} src={avatar && avatar.url} />
            </div>
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <p>Upload your avatar here</p>
              <CameraTwoTone className="btn btn-light btn-lg" />
            </div>
          )}
        </label>
        <input
          type="file"
          id="avatar-uploader"
          accept="image/*"
          onChange={uploadAvatar}
          hidden
          disabled={avatar && avatar.url}
        />
        {avatar && avatar.url ? (
          <div className="mt-3">
            <label htmlFor="upload-other-avatar">
              {uploading ? (
                <LoadingOutlined className="mt-2" />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p>Choose other avatar</p>
                  <CameraTwoTone className="btn btn-light btn-lg" />
                </div>
              )}
            </label>
            <input
              type="file"
              id="upload-other-avatar"
              accept="image/*"
              onChange={replaceAvatar}
              hidden
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
