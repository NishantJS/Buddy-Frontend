import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = (props) => {
  const { heading, content } = props;
 return (
    <article className="container">
      <h4 className="title">{heading}</h4>
      <div className="box-container">
        <ContentMap content={content} />
      </div>
    </article>
  );
};

const ContentMap = ({ content }) => {
  return content.map(({ path=false, title="", description=""}) => {
    return path ? (
      <BoxLink path={path} title={title} key={title} />
    ) : (
      <BoxDiv title={title} description={description} key={title} />
    );
  });
}

export default Container;
export { ContentMap };

const BoxDiv = ({ title, description }) => {
  const [click, setClick] = useState(false);

  return (
    <div
      className="box desc"
      onClick={() => setClick((p) => !p)}
    >
      <span>{title}</span>
      {click && <span className="desc">{description}</span>}
    </div>
  );
}

const BoxLink = ({path, title}) => {
  return (
    <Link to={path}>
      <div className="box">
        <span>{title}</span>
      </div>
    </Link>
  );
}