import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import styles from "./CartItem.module.css";

export function CartItem({ product }) {
  const { handleCartAmountChange, handleRemoveCartItem } = useOutletContext();
  const price = parseFloat(product.price * product.amount).toFixed(2);

  return (
    <div data-testid="CartItem" className={styles.cartItemContainer}>
      <img className={styles.itemImg} src={product.image} alt={product.title} />

      <div>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.price}>{"$" + price}</p>
      </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.amountContainer}>
          <button
            type="button"
            className={styles.amountBtn}
            onClick={() => {
              if (product.amount === 0) return;
              const updatedProduct = { ...product };
              updatedProduct.amount--;
              handleCartAmountChange(updatedProduct);
            }}
          >
            -
          </button>
          <input
            type="number"
            className={styles.amount}
            data-testid="ProductAmount"
            value={product.amount}
            onChange={(e) => {
              const updatedProduct = { ...product };
              let inputAmount = parseInt(e.target.value);
              if (isNaN(inputAmount)) inputAmount = "";
              if (inputAmount < 0) inputAmount = 0;
              updatedProduct.amount = inputAmount;
              handleCartAmountChange(updatedProduct);
            }}
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault();
              }
            }}
          />
          <button
            type="button"
            className={styles.amountBtn}
            onClick={() => {
              const updatedProduct = { ...product };
              updatedProduct.amount++;
              handleCartAmountChange(updatedProduct);
            }}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => {
            handleRemoveCartItem(product);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
};
