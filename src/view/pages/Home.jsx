import { useSelector } from "react-redux";
import Category from "../components/Category";
import Slider from "../components/Slider";

const Home = () => {
  const product = useSelector((state) => state.product);

  return (
    <>
      <Category />
      <Slider product={product} />
    </>
  );
};

export default Home;
