import "../../styles/not_found.scss";
import Icon404 from "../../icons/Icon404.jsx";

const NotFound = ({ message = false }) => {
  // const dispatch = useDispatch();

  // if (error) dispatch(addToast({ message : error}))
  
  return (
    <section className="notfound">
      <div className="image">
        <Icon404 />
      </div>
      <div className="message">
        {message ? <h2>{message}</h2> : <Error404 />}
      </div>
    </section>
  );
};

const Error404 = () => {
  return (
    <>
      <h1>404</h1>
      <h2>"It's embarrasing to say...</h2>
      <h2>But our cat hid this page somewhere...</h2>
    </>
  );
}

export default NotFound;
