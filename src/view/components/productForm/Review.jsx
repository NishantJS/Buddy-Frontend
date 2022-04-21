import { useState, useRef, useEffect } from "react";
import Upload from "../../../icons/Upload.jsx";
import "../../../styles/image_upload.scss";
import { addToast } from "../../services/actions/toast.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import ImageList from "./ImageList.jsx";

const Review = () => {
  const [images, setImages] = useState(() => []);
  const title = "product_title ";
  const dragRef = useRef(null);

  const dispatch = useDispatch();
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, prev_index) => prev_index !== index));
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
        validateStatus: (status) => status < 513,
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
      dispatch(addToast({ message: data.data }));
    } catch (error) {
      dispatch(
        addToast({
          message: error?.message || "File upload failed! Please try again!",
          color: "danger",
        })
      );
    } finally {
      setImages(() => []);
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
    let length = targetFiles.length;
    if (length + images.length > 5) {
      length = 5;
      addMessage("Image limit exceeds! Please select less than 5 Images!");
    }
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

  useEffect(() => {
    const dragContainer = dragRef.current;
    if (!dragContainer) return;
    let dragged;
    const swapImages = (arr, index, draggedIndex) => {
      const middleElement = images[draggedIndex];
      setImages(() => {
        let array = [...arr];
        array.splice(draggedIndex, 1);
        return [...array.slice(0, index), middleElement, ...array.slice(index)];
      });
    };
    const reorderImages = (event) => {
      //? preventDefault to remove cursor icon only on container
      event?.preventDefault();
      const draggedIndex = dragged?.dataset.index;
      const getAfterElement = (Y) => {
        //? get All childrens except selected one
        const draggableElements = [
          ...dragContainer.querySelectorAll(".draggable:not(.dragging)"),
        ];

        return draggableElements?.reduce(
          (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = Y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
              return { offset, element: child };
            }
            return closest;
          },
          { offset: Number.NEGATIVE_INFINITY }
        )?.element;
      };
      const afterElement = getAfterElement(event.clientY);
      const index = afterElement?.dataset.index;
      if (!draggedIndex || !index || draggedIndex === index) return;
      swapImages(images, index, draggedIndex);
    };
    const getDraggingElement = () =>
      (dragged = dragContainer.getElementsByClassName("dragging")[0]);
    dragContainer?.addEventListener("dragstart", getDraggingElement);
    dragContainer?.addEventListener("dragend", reorderImages);
    return () => {
      dragContainer?.removeEventListener("dragstart", getDraggingElement);
      dragContainer?.removeEventListener("dragend", reorderImages);
    };
  }, [images]);

  return (
    <div className="wrapper">
      <form className="image_form" draggable={true}>
        <label htmlFor="images_input">
          <Upload />
          <h3>Browse files to upload or drag here</h3>
        </label>
        <input
          type="file"
          id="images_input"
          onChange={getImageData}
          accept=".png"
          multiple
        />
      </form>
      <ImageList
        images={images}
        dragRef={dragRef}
        title={title}
        removeImage={removeImage}
      />
      <input type="submit" value="submit" onClick={uploadImages} />
    </div>
  );
};

export default Review;
