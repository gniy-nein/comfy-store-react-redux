import { FeaturedProducts, Hero } from "../components/index";
import { customFetch } from "../utils";

const url = "/products?featured=true";

export const loader = async () => {
  const { data } = await customFetch(url);
  const products = data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
