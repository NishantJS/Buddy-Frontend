import Back from "../../icons/Back.jsx";
import { useState } from "react";
import Slide from "./Slide.jsx";
import "../../styles/slider.scss";

const SlideContainer = ({ slide }) => {
  const { sliderTitle, product } = slide;
  const [sliderRef, setSliderRef] = useState(null);

  const scroll = (isLeft = true) => {
    if (!sliderRef) return;
    let element = sliderRef;

    let element_width = 180;
    let visible_elements = Math.floor(element.offsetWidth / element_width);
    let padding = visible_elements * 20;
    let visible_content_width = visible_elements * element_width;

    let moveBy = isLeft
      ? element.scrollLeft + padding + visible_content_width
      : element.scrollLeft - padding - visible_content_width;
    element.scrollTo({
      top: 0,
      left: moveBy,
      behavior: "smooth",
    });
  };

  return (
    <>
      {!product?.error && product?.data?.length >= 1 && (
        <section
          className="slider-container"
          onWheel={(event) => scroll(event.deltaY > 0)}
        >
          <>
            <h3 className="title">{sliderTitle}</h3>
            <div
              className="slider"
              ref={(sliderRef) => setSliderRef(sliderRef)}
            >
              {product.data.map((item) => {
                return item?.sizes.map((sizes, index) => (
                  <Slide
                    product={{ ...item, currentSize: sizes }}
                    key={item._id + index}
                    variant={index}
                  />
                ));
                // return <></>;
              })}
              {sliderRef && window.screen.width - 40 < sliderRef?.scrollWidth && (
                <>
                  <button
                    className="scroll_btn left"
                    onClick={() => scroll(false)}
                  >
                    <Back isNavigation={false} />
                  </button>
                  <button className="scroll_btn right" onClick={scroll}>
                    <Back isNavigation={false} />
                  </button>
                </>
              )}
            </div>
          </>
        </section>
      )}
    </>
  );
};

export default SlideContainer;
