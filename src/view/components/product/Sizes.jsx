const Sizes = ({ sizes = [], selectedSize = 0, updateSelected }) => {
  return (
    <div className="size">
      {sizes?.map((element, index) => {
        return (
          element?.price && (
            <div
              className={`box${selectedSize === index ? " selected" : ""}`}
              onClick={() => updateSelected(index)}
              title={
                element?.price &&
                `Buy ${element?.size || "this size"} at just ${element?.price}`
              }
              key={index + element?.price}
              role="checkbox"
              aria-checked={selectedSize === index}
            >
              <span className="name">
                {element?.size || `size ${index + 1}`}
              </span>
              <span className="price">
                {new Intl.NumberFormat("en", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                }).format(element?.price)}
              </span>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Sizes;
