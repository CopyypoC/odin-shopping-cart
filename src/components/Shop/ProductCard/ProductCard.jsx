import { useOutletContext } from "react-router-dom";
import styles from "./ProductCard.module.css";
import PropTypes from "prop-types";

export function ProductCard({ product, handleAmountChange }) {
  const { handleAddToCart } = useOutletContext();

  return (
    <div data-testid="ProductCard" className={styles.cardContainer}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImg}
      />
      <p className={styles.category}>{product.category}</p>
      <p className={styles.title}>{product.title}</p>

      <div className={styles.cardBottom}>
        <p className={styles.price}>{"$" + product.price}</p>
        <div className={styles.amountContainer}>
          <button
            className={styles.amountBtn}
            type="button"
            onClick={() => {
              if (product.amount === 0) return;
              const updatedProduct = { ...product };
              updatedProduct.amount--;
              handleAmountChange(updatedProduct);
            }}
          >
            -
          </button>

          <input
            type="number"
            data-testid="ProductAmount"
            className={styles.amount}
            value={product.amount}
            onChange={(e) => {
              const updatedProduct = { ...product };
              let inputAmount = parseInt(e.target.value);

              if (isNaN(inputAmount)) inputAmount = "";

              if (inputAmount < 0) inputAmount = 0;

              updatedProduct.amount = inputAmount;
              handleAmountChange(updatedProduct);
            }}
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault();
              }
            }}
          />

          <button
            className={styles.amountBtn}
            type="button"
            onClick={() => {
              const updatedProduct = { ...product };
              updatedProduct.amount++;
              handleAmountChange(updatedProduct);
            }}
          >
            +
          </button>
        </div>
        <button
          className={styles.addCart}
          type="button"
          onClick={() => {
            const updatedProduct = { ...product };
            updatedProduct.amount = 0;
            handleAddToCart(product);
            handleAmountChange(updatedProduct);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAmountChange: PropTypes.func,
};
