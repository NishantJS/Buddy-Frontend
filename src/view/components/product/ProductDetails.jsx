import { useState } from "react";
import Description from "./Description";
import Images from "./Images.jsx";
import Sizes from "./Sizes.jsx";
import { useSelector } from "react-redux";
import AddTo from "./AddTo.jsx";
import Title from "./Title.jsx";

const ProductDetails = ({ data, variant = 0 }) => {
  const {
    sizes = [],
    title = "",
    description = {},
    images = [],
    uci = false,
    seller = "Buddy",
  } = data;

  const user = useSelector((state) => state.auth.user);
  const isUser = user._id ? true : false;
  const [selectedSize, setSelectedSize] = useState(
    variant < sizes.length ? variant : 0
  );

  const updateSelected = (index) => {
    setSelectedSize((p) => index);
  };

  return (
    <section className="product">
      <Images images={images} />
      <Details>
        <Title title={title} seller={seller} uci={uci} />
        <Sizes
          sizes={sizes}
          updateSelected={updateSelected}
          selectedSize={selectedSize}
        />
        {isUser && <AddTo user={user} variant={variant} product={data} />}
        <Description description={description} />
      </Details>
    </section>
  );
};

const Details = ({ children }) => {
  return <div className="details">{children}</div>;
};

export default ProductDetails;