import { useSelector } from "react-redux";
import SlideContainer from "./SliderContainer.jsx";
import "../../styles/slider.scss";

const Slider = () => {
  const product = useSelector((state) => state.product);
  const productSlider = !product ? (
    <></>
  ) : (
    Object.keys(product).map((key) => (
      <SlideContainer
        key={key}
        slide={{ sliderTitle: key, product: product[`${key}`] }}
      />
    ))
  );

  return <>{productSlider}</>;
};

export default Slider;
