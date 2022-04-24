import {
  ADD_PRODUCT_FORM_SECTION,
  REMOVE_PRODUCT_FORM_SECTIONS,
} from "../constants/";
// import axios from "axios";

export const addProductSection = (payload = {}) => {
  return {
    type: ADD_PRODUCT_FORM_SECTION,
    payload,
  };
};

export const removeProductSections = (payload = {}) => {
  return {
    type: REMOVE_PRODUCT_FORM_SECTIONS,
    payload,
  };
};
