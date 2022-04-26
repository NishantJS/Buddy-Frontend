export const general = [
  {
    name: "full_name",
    type: "text",
    options: {
      minLength: {
        value: 3,
        message: "full name length should be more than 3",
      },
      maxLength: {
        value: 30,
        message: "full name length should not be more than 30",
      },
      required: "Please provide your full name",
      pattern: {
        value: /^[a-zA-z]+([\s][a-zA-Z]+)+$/,
        message: "Invalid Input",
      },
    },
  },
  {
    name: "line1",
    type: "text",
    options: {
      minLength: { value: 3, message: "line1 length should be more than 3" },
      maxLength: {
        value: 30,
        message: "line1 length should not be more than 30",
      },
      required: "Please provide your room no, building name",
      pattern: {
        value: /^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)+$/,
        message: "Invalid Input",
      },
    },
  },
  {
    name: "line2",
    type: "text",
    options: {
      minLength: { value: 3, message: "line2 length should be more than 3" },
      maxLength: {
        value: 30,
        message: "line2 length should not be more than 30",
      },
      required: "Please provide your room no, building name",
      pattern: {
        value: /^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)+$/,
        message: "Invalid Input",
      },
    },
  },
  {
    name: "phone",
    type: "number",
    options: {
      required: "Please provide your primary mobile number",
      pattern: {
        value: /[6-9]{1}[0-9]{9}$/,
        message:
          "Only provide 10 digit mobile number without country code and no special characters.",
      },
    },
  },
  {
    name: "pin",
    type: "number",
    options: {
      required: "Please provide your pin-code",
      pattern: {
        value: /[1-9]{1}[0-9]{5}$/,
        message: "Only provide 6 digit pincode without special characters.",
      },
    },
  },
  {
    name: "city",
    type: "text",
    options: {
      minLength: { value: 3, message: "city length should be more than 3" },
      maxLength: {
        value: 20,
        message: "city length should not be more than 20",
      },
      required: "Please provide your city or district name",
    },
    disabled: true,
  },
  {
    name: "state",
    type: "text",
    options: {
      minLength: { value: 3, message: "state length should be more than 3" },
      maxLength: {
        value: 20,
        message: "state length should not be more than 20",
      },
      required: "Please provide your state name",
    },
    disabled: true,
  },
  {
    name: "isPrimary",
    type: "checkbox",
    value: "Default Address",
  },
];

export default general;
