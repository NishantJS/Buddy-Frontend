import { useState, useEffect, useRef } from "react";

const ImageProgress = ({ image, upload = false, index, removeHandler }) => {
  const [uploading] = useState(() => upload);
  const imageURL = image?.name ? URL.createObjectURL(image) : false;

  const dragRef = useRef(null);
  useEffect(() => {
    const dragElement = dragRef.current;
    if (!dragElement) return;

    const addClass = () => dragElement?.classList.add("dragging");
    const removeClass = () => dragElement?.classList.remove("dragging");

    dragElement?.addEventListener("dragstart", addClass);
    dragElement?.addEventListener("dragend", removeClass);

    return () => {
      dragElement?.removeEventListener("dragstart", addClass);
      dragElement?.removeEventListener("dragend", removeClass);

      imageURL && URL.revokeObjectURL(imageURL);
    };
  });

  return (
    <li draggable={true} ref={dragRef} className="draggable" data-index={index}>
      <img src={imageURL} alt={image["name"]} width={150} height={100} />
      <div className="content">
        <span className="name" title={image?.name}>
          {image?.name}
        </span>
        {uploading && <span>Uploading</span>}
        {uploading ? (
          <div className="progress-bar">
            <progress value={20} max={100}></progress>
          </div>
        ) : (
          <div className="size_and_remove">
            <span className="size">
              {Intl.NumberFormat("en", {
                style: "unit",
                unit: "kilobyte",
                notation: "compact",
              }).format(image?.size / 1024)}
            </span>
            <span onClick={() => removeHandler(index)}>Remove</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default ImageProgress;
