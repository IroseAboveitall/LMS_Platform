export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(price)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/g, " ");
};
