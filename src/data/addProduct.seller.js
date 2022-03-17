export const general = [
  {
    name: "title",
    type: "text",
    minLength: { value: 3, message: "Product length should be more than 3" },
    maxLength: {
      value: 100,
      message: "Product length should not be more than 90",
    },
    required: "Please provide product name",
  },
  {
    name: "allowed",
    type: "number",
    min: {
      value: 1,
      message: "Customer should be able to order at least 1 item",
    },
    max: {
      value: 10,
      message: "Customer should be able to order in bulk, i.e. more than 10",
    },
    required: "Please provide allowed quantity for every transaction",
  },
  {
    name: "stock",
    type: "number",
    min: {
      value: 1,
      message: "Your stock should be greater than 1 to be listed",
    },
    max: {
      value: 99999,
      message: "Please provide a valid stock value from 1 to 99,999",
    },
    required: "Please provide total stock for the product",
  },
];

export default general;

const images = [
  {
    name: "front",
    type: "file",
    accept: "image/png, image/gif, image/jpeg",
    required: "Please provide front side of the product",
  },
  {
    name: "back",
    type: "file",
    accept: "image/png, image/gif, image/jpeg",
  },
  {
    name: "side-left",
    type: "file",
    accept: "image/png, image/gif, image/jpeg",
  },
  {
    name: "side-right",
    type: "file",
    accept: "image/png, image/gif, image/jpeg",
  },
  {
    name: "top",
    type: "file",
    accept: "image/png, image/gif, image/jpeg",
  },
];
export { images };

