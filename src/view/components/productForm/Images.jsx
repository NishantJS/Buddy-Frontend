import { useState } from "react";
import "../../../styles/image_upload.scss";
import { addToast } from "../../services/actions/toast.js";
import { addProduct } from "../../services/actions/seller.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import ImageList from "./ImageList.jsx";
import Switcher from "./Switcher.jsx";
import DropImage from "./DropImage";
import { useNavigate } from "react-router-dom";

const Images = ({ prevStep, state }) => {
  const [images, setImages] = useState(() => []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const formData = new FormData();

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        validateStatus: () => true,
      };

      images?.forEach((image) => formData.append("product_image", image));
      Object.keys(state.meta)?.forEach((key) =>
        formData.append(key, state["meta"][key])
      );
      formData.append("sizes", JSON.stringify(state.sizes));

      const { data } = await axios.post(
        `/seller/product/add`,
        formData,
        config
      );
      if (data.error) throw new Error(data.data);
      dispatch(addProduct({ id: data.product._id, title: data.product.title }));
      addMessage(data.data, "success");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
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
      <Switcher prevStep={prevStep} handleSubmit={uploadImages} />
    </>
  );
};

export default Images;
