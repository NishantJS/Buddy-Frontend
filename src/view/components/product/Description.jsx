import { lazy, memo } from "react";
const FeedingGuide = lazy(() => import("./FeedingGuide.jsx"));

const Description = ({ description }) => {
  const { feeding_guide = false, main = "" } = description;

  return (
    <div className="desc">
      {main}
      {feeding_guide && <FeedingGuide feeding_guide={feeding_guide} />}
    </div>
  );
};

export default memo(Description);
