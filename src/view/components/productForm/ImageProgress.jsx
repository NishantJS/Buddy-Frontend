import { useState, useEffect } from "react";

const ImageProgress = ({ image, upload = false }) => {
  const [uploading] = useState(() => upload);
  const imageURL = image?.name ? URL.createObjectURL(image) : false;

  useEffect(() => {
    return () => {
      imageURL && URL.revokeObjectURL(imageURL);
    };
  });

  return (
    <div className="uploaded-area">
      <ol>
        <li>
          {/* <JPG /> */}
          <img src={imageURL} alt={image["name"]} width={150} height={100} />
          <div className="content">
            <span className="name">{image?.name}</span>
            {uploading && <span>Uploading</span>}
            {uploading ? (
              <div className="progress-bar">
                <progress value={20} max={100}></progress>
              </div>
            ) : (
              <span className="size">
                {Intl.NumberFormat("en", {
                  style: "unit",
                  unit: "kilobyte",
                  notation: "compact",
                }).format(image.size / 1024)}
              </span>
            )}
          </div>
          {/* {!uploading && <PNG />} */}
        </li>
      </ol>
    </div>
  );
};

export default ImageProgress;
