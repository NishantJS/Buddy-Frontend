import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  // location.pathname = "/"
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // !isAuthenticated &&
  //   window.history.replaceState(null, "Home", "/");

  const seller = useSelector((state) => state.auth.seller);
  
  console.log({ isAuthenticated, is: seller === true, seller, history });
  // todo add profile page
  const isSeller =
    seller && Object.keys(seller).length !== 0 && seller.constructor === Object;
  
  
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
