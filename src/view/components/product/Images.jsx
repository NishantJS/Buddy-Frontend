import { memo } from "react";

const Images = ({ images, title }) => {
  const handleImageLoadError = (event) => {
    event.target.src = process.env.REACT_APP_PLACEHOLDER_IMAGE;
  };
  return (
    <div className="intro">
      <img src={images[0]} alt={title} onError={handleImageLoadError} />
      <h1>{title}</h1>
    </div>
  );
};

export default memo(Images);
