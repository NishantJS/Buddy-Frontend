import Google from "../../../icons/Google.jsx";
import Facebook from "../../../icons/Facebook.jsx";
import Twitter from "../../../icons/Twitter.jsx";
import Email from "../../../icons/Email.jsx";

const authData = [
  {
    label: "Google",
    icon: <Google />,
  },
  {
    label: "Facebook",
    icon: <Facebook />,
  },
  {
    label: "Twitter",
    icon: <Twitter />,
  },
  {
    label: "Email",
    icon: <Email />,
  },
];

const Authenticate = ({ method, handler }) => {
  const clickHandler = (index) => {
    switch (index) {
      case 0:
        break;
      case 3:
        handler();
        break;
      default:
    }
  };

  return (
    <>
      {authData.map(({ label, icon }, index) => {
        return (
          <article onClick={() => clickHandler(index)} key={label}>
            {icon}
            <span>
              {method} with {label}
            </span>
          </article>
        );
      })}
    </>
  );
};

export default Authenticate;
