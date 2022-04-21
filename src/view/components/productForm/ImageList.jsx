import React, { useEffect, useRef } from "react";
import ImageProgress from "./ImageProgress.jsx";

const ImageList = ({ images, removeImage, moveImages }) => {
  const dragRef = useRef(null);
  useEffect(() => {
    const dragContainer = dragRef.current;
    if (!dragContainer) return;
    let dragged;

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
      moveImages(images, index, draggedIndex);
    };
    const getDraggingElement = () =>
      (dragged = dragContainer.getElementsByClassName("dragging")[0]);
    dragContainer?.addEventListener("dragstart", getDraggingElement);
    dragContainer?.addEventListener("dragend", reorderImages);
    return () => {
      dragContainer?.removeEventListener("dragstart", getDraggingElement);
      dragContainer?.removeEventListener("dragend", reorderImages);
    };
  }, [images, moveImages]);
  return (
    <div className="uploaded-area">
      <ol ref={dragRef}>
        {images.map((image, index) => (
          <ImageProgress
            image={image}
            key={image?.name}
            removeHandler={removeImage}
            index={index}
          />
        ))}
      </ol>
    </div>
  );
};

export default ImageList;
