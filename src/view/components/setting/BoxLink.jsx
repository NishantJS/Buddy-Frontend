import { Link } from "react-router-dom";

const BoxLink = ({ path, title }) => {
  return (
    <Link to={path}>
      <div className="box">
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default BoxLink;
