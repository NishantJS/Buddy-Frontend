import Dog from "../icons/Dog";
import Cat from "../icons/Cat";
import Bird from "../icons/Bird";
import Food from "../icons/Food";
import Grooming from "../icons/Grooming";
import Health from "../icons/Health";
import Toys from "../icons/Toys";
import Treats from "../icons/Treats";

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
    icon: <Grooming />,
  },
];

const categoryData = [
  {
    title: "DOG",
    thumbnail: <Dog />,
    subCategoryData
  },
  {
    title: "CAT",
    thumbnail: <Cat />,
  },
  {
    title: "BIRD",
    thumbnail: <Bird />,
  },
];
export {categoryData,subCategoryData}
export default categoryData;
