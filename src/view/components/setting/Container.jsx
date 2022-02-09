import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = (props) => {
  const { heading, content } = props;
 return (
    <section className="container">
      <h4 className="title">{heading}</h4>
      <div className="box-container">
        <ContentMap content={content} />
      </div>
    </section>
  );
};

const ContentMap = ({ content }) => {
  const [click, setClick] = useState(false);

  return content.map(({ path=false, title="", description=""}) => {
    return path ? (
      <Link to={path} key={path}>
        <div className="box">
          <span>{title}</span>
        </div>
      </Link>
    ) : (
      <div className="box desc" key={title} onClick={()=>setClick(p=>!p)}>
        <span>{title}</span>
        {click? <span className="desc">{description}</span>:<></>}
      </div>
    );
  });
}

export default Container;
export { ContentMap };
