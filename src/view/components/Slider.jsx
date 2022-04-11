import SlideContainer from "./SliderContainer.jsx";

const Slider = ({ product, title = false }) => {
  const productSlider = !product ? (
    <></>
  ) : (
    Object.keys(product).map((key) => (
      <SlideContainer
        key={key}
        slide={{
          sliderTitle: `shop for your ${key}`,
          product: product[`${key}`],
        }}
      />
    ))
  );

  return <>{productSlider}</>;
};

export default Slider;
