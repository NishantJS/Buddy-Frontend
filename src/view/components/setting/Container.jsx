import React from 'react';
import { Link } from 'react-router-dom';

const Container = (props) => {
  const { heading,content } = props;
 return (
    <section className="container">
      <h4 className="title">{heading}</h4>
      <div className="box-container">
        <ContentMap content={content} />
      </div>
    </section>
  );
};

const ContentMap = ({content}) => {
  return content.map(({ path, title}) => {
    return (
      <Link to={path} key={path+Math.random()}>
        <div className="box">
          <span>{title}</span>
        </div>
      </Link>
    );
  });
}

export default Container;
export { ContentMap };
