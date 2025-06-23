import { useOutletContext } from "react-router-dom";
import { CartItem } from "./CartItem/CartItem.jsx";
import styles from "./Cart.module.css";

export function Cart() {
  const { cartItems, handleCheckout } = useOutletContext();
  let totalPrice = 0;

  const cartItemList = cartItems.map((product) => {
    totalPrice += product.price * product.amount;
    return <CartItem product={product} key={product.id} />;
  });

  totalPrice = parseFloat(totalPrice).toFixed(2);

  const emptyText = (
    <p className={styles.emptyText}>Your shopping cart is empty</p>
  );

  return (
    <div data-testid="Cart">
      {cartItems.length > 0 ? cartItemList : emptyText}
      <div className={styles.checkoutContainer}>
        {cartItems.length > 0 && (
          <>
            <p className={styles.total}>Total:</p>
            <p className={styles.totalPrice} data-testid="TotalPrice">
              {"$" + totalPrice}
            </p>
            <button
              type="button"
              className={styles.checkoutBtn}
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
