import "../../styles/setting.scss";
import { useSelector } from "react-redux";
import LoggedIn from "../components/setting/LoggedIn";
import Theme from "../components/setting/Theme.jsx";
import { connect } from "react-redux";
import Container from "../components/setting/Container";

const Settings = ({dispatch}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const seller = useSelector((state) => state.auth.seller);
  const isSeller = seller._id ? true : false;
  
  return (
    <section className="settings">
      {isAuthenticated ? <LoggedIn dispatch={dispatch}/> : <></>}

      <Theme dispatch={dispatch} />

      {isAuthenticated ? (
        !isSeller ? (
          <>
            <GetUserControls />
            <GetSellerMenu />
          </>
        ) : (
          <GetUserMenu />
        )
      ) : (
        <>
          <GetSellerMenu />
          <GetUserMenu />
        </>
      )}
      <Others/>
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

const GetUserControls = () => {
  const user = useSelector((state) => state.auth.user);
  
  const userContent = [
    {
      path: "/my_cart",
      title: "Cart",
    },
    {
      path: "/my_wishlist",
      title: "Wishlist",
    },
    {
      path: "/my_notifications",
      title: "Notifications",
    },
    {
      title: "Logged in using",
      description: user.email
    }
  ];

  return <Container heading="Quick Links" content={userContent} />;
};

const Others = () => {
  const content = [
    {
      path: "/policy",
      title: "Policy",
    },
    {
      title: "Creator",
      description: "Nishant Chorge"
    },
    {
      title: "Credits",
      description: "Iconscout, Github, Heroku, Namecheap"
    },
  ];

  return <Container heading="Other" content={content} />;
};