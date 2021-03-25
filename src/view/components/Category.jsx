import "../../styles/category.scss";
import { Link } from "react-router-dom";
import categoryData from "../../data/categoryData";

const Category = () => {
  return (
    <div className="category-container">
      {categoryData.map((category) => {
        let { title, thumbnail } = category;
        return (
          <Link to={`shop/${title.toLowerCase()}`} key={title} className="category">
            {thumbnail}
            <h5>{title}</h5>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
