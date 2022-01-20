import "../../styles/setting.scss";
import { useSelector } from "react-redux";
import LoggedIn from "../components/setting/LoggedIn";
import Theme from "../components/setting/Theme.jsx";
import { connect } from "react-redux";
import Container from "../components/setting/Container";

const Settings = ({dispatch}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const seller = useSelector((state) => state.auth.seller);
  
  const isSeller =
    seller &&
    Object.keys(seller).length !== 0 &&
    seller.constructor === Object;
  
  return (
    <section className="settings">
    
      {isAuthenticated ? <LoggedIn dispatch={dispatch} /> : <></>}
    
      <Theme dispatch={dispatch} />
    
      {isAuthenticated ? (
        !isSeller ? (
          <GetSellerMenu />
        ) : (
          <GetUserMenu />
        )
      ) : (
        <>
          <GetSellerMenu />
          <GetUserMenu />
        </>
      )}
    </section>
  );
};

export default connect()(Settings);

const GetSellerMenu = () => {
  const sellerContent = [
    {
      path: "/auth/seller_login",
      title: "Login",
    },
    {
      path: "/auth/seller_register",
      title: "Registeration",
    },
  ];

  return <Container heading="Seller" content={sellerContent}/>
};

const GetUserMenu = () => {
    const userContent = [
      {
        path: "/auth/login",
        title: "Login",
      },
      {
        path: "/auth/register",
        title: "Registeration",
      },
    ];

  return <Container heading="User" content={userContent} />;
};
