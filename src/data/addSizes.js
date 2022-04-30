const pattern = {
  value: /^[0-9]+$/,
  message: "Invalid Input, Only numbers are valid.",
};

export const sizesOptions = [
  {
    name: "size",
    type: "text",
    options: {
      minLength: { value: 1, message: "size should not be empty." },
      maxLength: {
        value: 10,
        message: "size length should not be more than 10.",
      },
      required: "Please provide size name.",
      pattern: {
        value: /^[A-Za-z0-9_-]+$/,
        message:
          "Invalid Input, Only single word with '_' or '-' symbols are valid",
      },
    },
  },
  {
    name: "allowed",
    type: "number",
    options: {
      pattern,
      required: "Please provide allowed items per transaction",
      max: {
        value: 99,
        message:
          "Max 99 products are allowed to be purchased for a single transaction",
      },
      min: {
        value: 1,
        message: "Customer should be able to add at least 1 item",
      },
    },
  },
  {
    name: "stock",
    type: "number",
    options: {
      pattern,
      required: "Please provide total stock items you have for selling",
      max: {
        value: 99999,
        message: "Max 99999 products are allowed to add as stock",
      },
      min: {
        value: 1,
        message: "You should have at least 1 item in stock.",
      },
    },
  },
  {
    name: "price",
    type: "number",
    options: {
      pattern,
      required: "Please provide price you are providing for this product.",
      max: {
        value: 999999,
        message: "If you want to sell an IPhone this is not the place.",
      },
      min: {
        value: 1,
        message:
          "If you want to sell it for free, contact me I will accept everything.",
      },
    },
  },
  {
    name: "retail_price",
    type: "number",
    options: {
      pattern,
      required:
        "Please provide retail price for this product. Here you can add MRP for the product.",
      max: {
        value: 999999,
        message: "Tooooooooooo costly🥵",
      },
      min: {
        value: 1,
        message: "Tooooooooooooo cheap😯",
      },
    },
  },
];
