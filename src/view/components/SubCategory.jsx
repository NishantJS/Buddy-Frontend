import Food from "../../icons/Food"
import Grooming from "../../icons/Grooming"
import Health from "../../icons/Health"
import Toys from "../../icons/Toys"
import Treats from "../../icons/Treats"
import "../../styles/sub_category.scss"

const SubCategory = ({ location, match, history }) => {
  const param = match.params.type;
  switch (param) {
    case "dog":
    case "cat":
    case "bird":
      break;
    default:
      history.push("/shop/dog")
  }
  return (
    <section className="sub_category">
      {subCategoryData.map(({title,icon})=> {
        return (
          <section className="category_item">
            <div className="icon">{icon}</div>
            <div className="title">{title}</div>
          </section>
        );
      })}
    </section>
  )
}

export default SubCategory


const subCategoryData = [
  {
    title: "Food",
    icon: <Food />,
  },
  {
    title: "Treats",
    icon: <Treats />,
  },
  {
    title: "Health",
    icon: <Health />,
  },
  {
    title: "Toys",
    icon: <Toys />,
  },
  {
    title: "Grooming",
    icon: <Grooming/>,
  }
];