import { lazy } from "react";

const Description = ({ description }) => {
  const { feeding_guide = false, main = false, ...remaining } = description;
  

const FeedingGuide = feeding_guide ? lazy(() => import("./FeedingGuide.jsx")) : <></>;
  return (
    <div className="desc">
      {JSON.stringify(description)}
      { feeding_guide && <FeedingGuide feeding_guide={feeding_guide} />}
    </div>
  )
}

export default Description;