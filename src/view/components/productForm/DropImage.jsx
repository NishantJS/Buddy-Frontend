import Upload from "../../../icons/Upload.jsx";

const DropImage = ({ images, addMessage, updateImages }) => {
  const getImageData = (event) => {
    event?.preventDefault();
    const alreadyAdded = (file) => {
      return images.some(
        (image) => image.name === file.name && image.size === file.size
      );
    };

    const dataTransfer = event.dataTransfer || false;
    const targetFiles = dataTransfer ? dataTransfer.files : event.target.files;
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
    if (files) updateImages(files);
  };

  return (
    <form
      className="image_form"
      onDragOver={(event) => event?.preventDefault()}
      onDrop={getImageData}
    >
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
  );
};

export default DropImage;
