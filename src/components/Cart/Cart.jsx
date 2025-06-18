import { useOutletContext } from "react-router-dom";
import { CartItem } from "./CartItem/CartItem.jsx";

export function Cart() {
  const { cartItems } = useOutletContext();
  let totalPrice = 0;

  const cartItemList = cartItems.map((product) => {
    totalPrice += product.price * product.amount;
    return <CartItem product={product} key={product.id} />;
  });

  const emptyText = <p>Your shopping cart is empty</p>;

  return (
    <div data-testid="Cart">
      {cartItems.length > 0 ? cartItemList : emptyText}
      <div>
        {cartItems.length > 0 && (
          <>
            <p data-testid="TotalPrice">{totalPrice}</p>
            <button type="button">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
}
