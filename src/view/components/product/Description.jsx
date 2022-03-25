import { lazy } from "react";

const Description = ({ description }) => {
  const { feeding_guide = false, main = "", ...remaining } = description;

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

export default Description;
