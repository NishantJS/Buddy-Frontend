const Sizes = ({price=[],selectedSize,updateSelected}) => {
  return (
    <div className="size">
      {price.map((element, index) => {
        return (
          element?.price && (
            <div
              className={`box${selectedSize === index ? " selected" : ""}`}
              onClick={() => updateSelected(index)}
              title={element?.size || "size"}
              key={index + element?.price}
            >
              <span className="name">{element.size || `size ${index + 1}`}</span>
              <span className="price">₹ {element.price}</span>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Sizes
