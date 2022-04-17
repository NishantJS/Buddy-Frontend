import React from "react";
import { useState } from "react";
import Upload from "../../../icons/Upload.jsx";
import "../../../styles/image_upload.scss";
import ImageProgress from "./ImageProgress.jsx";
import { addToast } from "../../services/actions/toast.js";
import { useDispatch } from "react-redux";
import axios from "axios";

const Review = () => {
  const [images, setImages] = useState(() => []);
  const title = "product_title";

  const dispatch = useDispatch();
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) =>
          console.log(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          ),
      };

      images.forEach((image, index) => formData.append("product_image", image));
      const file = await axios.post(`/upload/${title}`, formData, config);
      console.log(file);
    } catch (err) {
      console.log("file upload failed");
    }
  };

  const getImageData = (event) => {
    const alreadyAdded = (file) => {
      return images.some(
        (image) => image.name === file.name && image.size === file.size
      );
    };

    const addMessage = (message = "", color = "danger") => {
      dispatch(
        addToast({
          message,
          color,
        })
      );
    };

    const targetFiles = event.target.files;
    const length = targetFiles.length;
    const files = [];
    for (let i = 0; i < length; i++) {
      if (targetFiles[i].type !== "image/png")
        addMessage(
          "Unsupported file type! Please only use PNG transparent images"
        );
      else if (alreadyAdded(targetFiles[i])) addMessage("Image already Added");
      else files.push(targetFiles[i]);
    }
    if (files) {
      setImages((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="wrapper">
      <form className="image_form">
        <label htmlFor="images_input">
          <Upload />
          <h3>Browse files to upload or drag here</h3>
        </label>
        <input
          type="file"
          id="images_input"
          onChange={getImageData}
          accept=".png"
        />
      </form>
      {images?.map((image, index) => (
        <ImageProgress image={image} key={image?.name | +index} title={title} />
      ))}
      <input type="submit" value="submit" onClick={uploadImages} />
    </div>
  );
};

export default Review;
