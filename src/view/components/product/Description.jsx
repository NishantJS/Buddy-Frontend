import { Fragment, lazy, memo } from "react";
import DescriptionItems from "./DescriptionItems.jsx";
const FeedingGuide = lazy(() => import("./FeedingGuide.jsx"));

const Description = ({ description }) => {
  const { feeding_guide = false } = description;

  return (
    <div className="desc">
      {Object.keys(description).map((item, index) => {
        if (
          typeof description[item] === "string" ||
          typeof description[item] === "number"
        )
          return (
            <DescriptionItems
              heading={item}
              value={description[item]}
              key={item}
            />
          );
        else return <Fragment key={index}></Fragment>;
      })}
      {feeding_guide && <FeedingGuide feeding_guide={feeding_guide} />}
    </div>
  );
};

export default memo(Description);
