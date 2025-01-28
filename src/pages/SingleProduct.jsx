import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOptions } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      const response = await queryClient.ensureQueryData(
        singleProductQuery(params.id)
      );
      return { product: response.data.data };
    } catch (error) {
      console.log(error);
    }
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;

  const formattedPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);

  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* Products */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="object-cover w-96 h-96 rounded-lg lg:w-full"
        />
        {/* Product */}
        <div>
          <h1 className="capitalize  text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formattedPrice}</p>
          <p className="mt-6 leading-8">{description}</p>
          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">
              {colors.map((item) => {
                return (
                  <button
                    key={item}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      item === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: item }}
                    onClick={() => setProductColor(item)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Amount
              </h4>
            </label>
            <select
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {/* {Array.from({ length: 3 }, (_, i) => i + 1).map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })} */}
              {generateAmountOptions(3)}
            </select>
          </div>
          {/* Button */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
