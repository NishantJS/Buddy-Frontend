import "../../styles/category.scss";
import { Link } from "react-router-dom";
import { categoryData ,subCategoryData} from "../../data/categoryData";
import {Fragment,useState} from "react";

const Category = () => {
  return (
    <div className="category-container">
      {categoryData.map(({title,thumbnail}) => <CategoryItem title={title} thumbnail={thumbnail} key={title} />)}
    </div>
  );
};

export default Category;


const CategoryItem = ({title,thumbnail}) => {
  let [isActive, setActive] = useState(false);
  return (
    <Fragment key={title}>
      <div className="category" onClick={() => setActive((p) => !p)}>
        {thumbnail}
        <h5>{title}</h5>
      </div>
      <SubCategoryItem active={isActive} title={title}/>
    </Fragment>
  );
};

const SubCategoryItem=({active,title})=>{
  return subCategoryData?.map(cat => {
    return (
      <Link
        to={`shop/${title.toLowerCase()}/${cat.title.toLowerCase()}`}
        key={cat.title}
        className={`category ${active?"":"hidden"}`}
      >
        {cat.icon}
        <h5>{cat.title}</h5>
      </Link>
    );
  })
};

