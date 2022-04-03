import { useNavigate, useNavigationType } from "react-router-dom";

const Back = ({ isNavigation = true, handler = () => {} }) => {
  const navigate = useNavigate();
  const navType = useNavigationType();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 20"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={"navigation"}
      aria-label="back"
      tabIndex={1}
      onClick={() =>
        isNavigation
          ? navType !== "POP"
            ? navigate(-1)
            : navigate("/")
          : handler()
      }
      className={`back ${isNavigation ? "nav_icon" : ""}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="12" x2="11" y2="18" />
      <line x1="5" y1="12" x2="11" y2="6" />
    </svg>
  );
};

export default Back;
