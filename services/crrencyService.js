exports.formatIRR = (value) => {
  return new Intl.NumberFormat("fa", {
    style: "currency",
    currency: "IRR",
  }).format(value);
};

exports.formatToman = (value) => {
  const toman = value / 10;
  const formattedValue = new Intl.NumberFormat("fa", {
    maximumFractionDigits: 0,
  }).format(toman);
  return `${formattedValue} تومان`;
};
