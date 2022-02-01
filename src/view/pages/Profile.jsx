import { useSelector } from "react-redux";
import NeedAuth from "../components/NeedAuth";
import "../../styles/profile.scss";

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const seller = useSelector((state) => state.auth.seller);
  
  const isSeller =
    seller && Object.keys(seller).length !== 0 && seller.constructor === Object;
  
  return (
    <section>
      {isAuthenticated ? isSeller ? <SellerAuthenticated seller={seller}/>:<UserAuthenticated/>:<NeedAuth/>}
    </section>
  )
}

const UserAuthenticated = () => {
  // const user = useSelector((state) => state.auth.user);

  return (
    <>
      <ProfileForm/>
      <h1>User Authenticated</h1>
    </>
  );
};

const SellerAuthenticated = ({seller}) => {
  

  return (
    <>
      <ProfileForm/>
      <h1>Seller Authenticated</h1>
    </>
  );
};

export default Profile;


const ProfileForm = () => {
  
  return (
    <>
      hello
    </>
  );
}