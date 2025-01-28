import { useSelector } from "react-redux";
import { SectionTitle, CheckoutForm, CartTotals } from "../components/index";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Please login to continue");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  if (cartItems.length === 0) {
    return <SectionTitle text="Cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="my-8 grid gap-8 md:grid-cols-2 place-items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};

export default Checkout;
