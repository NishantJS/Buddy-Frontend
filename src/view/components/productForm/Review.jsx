import { Fragment } from "react";
import SizeList from "./SizeList";
import Switcher from "./Switcher";

const Review = ({ prevStep, nextStep, data }) => {
  const { meta, sizes } = data;

  return (
    <>
      <dl>
        <MetaReview data={meta} />
      </dl>
      <div>
        <SizeList sizes={sizes} />
      </div>
      <Switcher nextStep={nextStep} prevStep={prevStep} />
    </>
  );
};

export default Review;

const MetaReview = ({ data }) => {
  return Object.keys(data)?.map((key) => {
    return (
      <Fragment key={key}>
        <dt>{key}</dt>
        <dd>{data[key]}</dd>
      </Fragment>
    );
  });
};
