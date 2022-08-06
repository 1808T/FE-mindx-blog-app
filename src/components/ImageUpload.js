import React from "react";
import { Image } from "antd";
import { CameraTwoTone, LoadingOutlined } from "@ant-design/icons";

const ImageUpload = ({ title, uploadImage, uploading, image, replaceImage }) => {
  return (
    <div className="form-group p-2 d-flex flex-column justify-content-center align-items-center">
      <div className="text-muted mb-2 align-self-start" style={{ fontSize: "80%" }}>
        {title}
      </div>
      <div className="d-flex flex-column align-items-center">
        <label htmlFor="image-uploader">
          {image && image.url ? (
            <Image width={600} src={image.url} />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <div>
              <CameraTwoTone className="btn btn-light btn-lg" />
            </div>
          )}
        </label>
        <input
          type="file"
          id="image-uploader"
          accept="image/*"
          onChange={uploadImage}
          hidden
          disabled={image && image.url}
        />
        {image && image.url ? (
          <div className="mt-3">
            <label htmlFor="upload-other-image">
              {uploading ? (
                <LoadingOutlined className="mt-2" />
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p>Choose other image</p>
                  <CameraTwoTone className="btn btn-light btn-lg" />
                </div>
              )}
            </label>
            <input
              type="file"
              id="upload-other-image"
              accept="image/*"
              onChange={replaceImage}
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

export default ImageUpload;
