// import useFetch from "../hooks/useFetch";
import Cart from "../../icons/Cart";
import Heart from "../../icons/Heart";
import "../../styles/slider.scss";

const Slider = ({ path, title }) => {
  
  return (
    <section className="slider-container">
      <h3 className="title">{title}</h3>
      <div className="slider">
            <Slide key={Math.random() * 1000} />
         </div>
    </section>
  );
};

export default Slider;

const Slide = (props) => {
  const {
    title,
    thumbnail,
    price: { price, retail_price },
  } = props.slide;

  return (
    <>
      <div className="slide">
        <div className="img">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="desc">
          <h4>{title}</h4>
          <div className="price">
            <span>
              <h4>{`₹ ${price}`}</h4>
              <h6>
                <del>{retail_price}</del>
              </h6>
            </span>
            <h5>{`${Math.round(
              Math.abs((price / retail_price) * 100 - 100)
            )}% off`}</h5>
          </div>
        </div>
        <div className="cta">
          <Heart data={props.slide} />
          <Cart data={props.slide} />
        </div>
      </div>
    </>
  );
};
