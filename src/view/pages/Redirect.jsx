import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../services/actions/user.js";
import { addSeller } from "../services/actions/seller.js";
import { logoutUser } from "../services/actions/auth.js";
import { useNavigate } from "react-router-dom";
import { fetchProduct } from "../services/actions/product.js";

const Redirect = () => {
  const { data, loading, error } = useFetch("session");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    if (!loading && !error && !data.error) {
      if (data?.user) {
        localStorage.removeItem("seller");
        localStorage.setItem("user", JSON.stringify(data?.user));

        dispatch(addUser(data?.user));

        if (product?.length < 1) dispatch(fetchProduct());

        navigate("/");
      } else if (data?.seller) {
        localStorage.removeItem("user");
        localStorage.setItem("seller", JSON.stringify(data?.seller));

        dispatch(addSeller(data?.seller));

        navigate("/dashboard");
      } else navigate("/");
    } else if (data?.error) {
      navigate("/");
      dispatch(logoutUser({ message: data?.data }));
    }
    return () => {};
  }, [data, dispatch, error, loading, navigate, product]);

  return <section>Redirecting...</section>;
};

export default Redirect;
