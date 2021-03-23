import "../../styles/category.scss";
import { Link } from "react-router-dom";
import categoryData from "../../data/categoryData";

const Category = () => {
  return (
    <div className="category-container">
      {categoryData.map((category) => {
        let { title, thumbnail, path } = category;
        return (
          <Link to={path} key={title} className="category">
            {thumbnail}
            <h5>{title}</h5>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
