// import useFetch from "../hooks/useFetch";
import Cart from "../../icons/Cart";
import Heart from "../../icons/Heart";
import "../../styles/slider.scss";
import {useSelector,useDispatch} from "react-redux"
import { addCart, addWishlist } from "../services/actions";

const Slider = () => {
  
  const product = useSelector(state => state.product)
  
  const productSlider = (!product) ? <></> : Object.keys(product).map((key) => (<SlideContainer key={key} slide={{ sliderTitle: key, product: product[`${key}`] }} />))

  return (<>
    {productSlider}
    </>
  );
};

const SlideContainer = ({ slide }) => {
  const { sliderTitle, product } = slide;
  return (
    <>
      <section className="slider-container">
        <h3 className="title">shop for your {sliderTitle}</h3>
        <div className="slider">
          {product.data && product.data.map((item) => {
            return <Slide product={item} key={item._id}/>
          })}
        </div>
      </section>
    </>
  );
};

const Slide = ({ product }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  
  
  const favHandler = () => {
    dispatch(addWishlist(product))
  }

  const cartHandler = () => {
    dispatch(addCart(product))
  }
  
  const { title, thumbnail, price, size } = product;
  
  return (
    <div className="slide">
      <div className="img">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="desc">
        <h4>
          {title} {size}
        </h4>
        <div className="price">
          <span>
            <h4>{`₹ ${price.price}`}</h4>
            <h6>
              <del>{price.retail_price}</del>
            </h6>
          </span>
          <h5>{`${Math.round(
            Math.abs((price.price / price.retail_price) * 100 - 100)
          )}% off`}</h5>
        </div>
      </div>
      {isAuthenticated && <div className="cta">
        <Heart handler={favHandler} />
        <Cart handler={cartHandler} />
      </div>}
    </div>
  );
}

export default Slider;
