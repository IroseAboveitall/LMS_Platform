export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(price)
    .replace(/^(\D+)/, "$1 ")
    .replace(/\s+/g, " ");
};


// Adding a space Resource :  https://stackoverflow.com/questions/44533919/space-after-symbol-with-js-intlg