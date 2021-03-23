import Category from "../components/Category";
import User from "../components/User";
// import Slider from "../components/Slider";


const Home = () => {
  return (
    <>
      <Category />
      <User/>
      {/* <Slider path="dog/food/?type=wet" title="top in dog wet food" />
      <Slider path="dog/food/?type=dry" title="top in dog dry food" />
      <Slider path="dog/food/?type=dry" title="top in dog dry food" />
      <Slider path="dog/food/?type=wet" title="top in dog wet food" /> */}
    </>
  );
};

export default Home;

/*
todo API
GET http://localhost:9000/shop_for_your_dog/food/?type=wet
###
GET http://localhost:9000/shop_for_your_dog/food/?title=Puppy Dog Food
###
GET http://localhost:9000/shop_for_your_dog/food/
*/
