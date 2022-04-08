import { memo, useState, useEffect } from "react";

const Images = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(() => 0);
  const handleImageLoadError = (event) => {
    event.target.src = process.env.REACT_APP_PLACEHOLDER_IMAGE;
  };

  const updateSelectedImage = (
    index = selectedImage === images.length - 1 ? 0 : selectedImage + 1
  ) => {
    setSelectedImage(index);
  };

  useEffect(() => {
    const interval = setInterval(() => updateSelectedImage(), 10000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="intro">
      <a href={images[selectedImage]} target="_blank" rel="noopener noreferrer">
        <img
          className="selected_image"
          src={images[selectedImage]}
          alt={title}
          height={384}
          loading="lazy"
        />
      </a>
      <div className="image_slider">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt={title}
              onError={handleImageLoadError}
              className={`${selectedImage === index ? "selected" : ""}`}
              onClick={() => updateSelectedImage(index)}
              key={index + image}
              width={70}
              height={70}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Images);
