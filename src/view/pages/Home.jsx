import Category from "../components/Category";
// import User from "../components/User";
import Slider from "../components/Slider";


const Home = () => {
  return (
    <>
      <Category />
      {/* <User/> */}
      <Slider />
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
