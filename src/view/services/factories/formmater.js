const defaultValues = {
  locale: "en",
  currency: "INR",
};

const currencyFormatter = (amount = 0) => {
  return new Intl.NumberFormat(defaultValues.locale, {
    style: "currency",
    currency: defaultValues.currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

const updateDefaultValues = ({
  locale = defaultValues.locale,
  curreny = defaultValues.currency,
}) => {
  defaultValues.locale = locale;
  defaultValues.currency = curreny;
};

const formatters = { currencyFormatter };
export default formatters;
export { currencyFormatter, updateDefaultValues };
