import { useOutletContext } from "react-router-dom";
import { CartItem } from "./CartItem/CartItem.jsx";

export function Cart() {
  const { cartItems } = useOutletContext();

  const cartItemList = cartItems.map((product) => (
    <CartItem product={product} key={product.id} />
  ));

  const emptyText = <p>Your shopping cart is empty</p>;

  return (
    <div data-testid="Cart">
      {cartItems.length > 0 ? cartItemList : emptyText}
    </div>
  );
}
