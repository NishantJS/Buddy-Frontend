import { lazy, memo } from "react";

const Description = ({ description }) => {
  const { feeding_guide = false, main = "" } = description;

  const FeedingGuide = feeding_guide ? (
    lazy(() => import("./FeedingGuide.jsx"))
  ) : (
    <></>
  );
  return (
    <div className="desc">
      {main}
      {feeding_guide && <FeedingGuide feeding_guide={feeding_guide} />}
    </div>
  );
};

export default memo(Description);
