import { useLoaderData } from "react-router-dom";
import { Filter, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

const allProductQuery = (queryParams) => {
  const { search, categoey, company, sort, price, shipping, page } =
    queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      categoey ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? "100000",
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log("search", params);
    try {
      const { data } = await queryClient.ensureQueryData(
        allProductQuery(params)
      );
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
