import { useState } from "react";
import "../../../styles/image_upload.scss";
import { addToast } from "../../services/actions/toast.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import ImageList from "./ImageList.jsx";
import Switcher from "./Switcher.jsx";
import DropImage from "./DropImage";

const Images = ({ prevStep, nextStep, title = false }) => {
  const [images, setImages] = useState(() => []);

  const dispatch = useDispatch();
  const addMessage = (message = "", color = "danger") => {
    dispatch(
      addToast({
        message,
        color,
      })
    );
  };
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, prev_index) => prev_index !== index));
  };

  const updateImages = (files) => {
    setImages((prev) => [...prev, ...files]);
  };

  const moveImages = (arr = [], index, draggedIndex) => {
    const middleElement = images[draggedIndex];
    setImages(() => {
      let array = [...arr];
      array.splice(draggedIndex, 1);
      return [...array.slice(0, index), middleElement, ...array.slice(index)];
    });
  };

  const uploadImages = async () => {
    try {
      // if (!title) return prevStep();
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        validateStatus: () => true,
        onUploadProgress: (progressEvent) =>
          console.log(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          ),
      };

      images.forEach((image) => formData.append("product_image", image));
      const { data } = await axios.post(
        `/seller/upload/${title}`,
        formData,
        config
      );
      if (data.error) throw new Error(data.data);
      addMessage(data.data);
      nextStep();
    } catch (error) {
      addMessage(error?.message || "File upload failed! Please try again!");
    }
  };

  return (
    <>
      <div className="wrapper">
        <DropImage
          images={images}
          addMessage={addMessage}
          updateImages={updateImages}
        />
        <ImageList
          images={images}
          removeImage={removeImage}
          moveImages={moveImages}
        />
      </div>
      <Switcher prevStep={prevStep} nextStep={uploadImages} />
    </>
  );
};

export default Images;
