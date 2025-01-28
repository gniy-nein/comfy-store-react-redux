import axios from "axios";

const productionURL = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionURL,
});

export const formatPrice = (price) => {
  const totalAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // }).format(Math.round(price / 33));
  }).format((price / 100).toFixed(2));
  return totalAmount;
};

export const generateAmountOptions = (amount) => {
  return Array.from({ length: amount }, (_, index) => {
    const item = index + 1;
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });
};
