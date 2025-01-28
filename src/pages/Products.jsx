import { useLoaderData } from "react-router-dom";
import { Filter, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log("search", params);
  try {
    const { data } = await customFetch(url, {
      params,
    });
    return { products: data.data, meta: data.meta, params };
  } catch (error) {
    console.log(error);
  }
};
const Products = () => {
  // const { meta } = useLoaderData();
  return (
    <>
      <Filter />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
