import { useOutletContext } from "react-router-dom";
import styles from "./ProductCard.module.css";

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
            type="text"
            data-testid="ProductAmount"
            className={styles.amount}
            value={product.amount}
            onChange={(e) => {
              const updatedProduct = { ...product };
              const inputAmount = e.target.value;
              if (inputAmount < 0) e.target.value = 0;
              updatedProduct.amount = e.target.value;
              handleAmountChange(updatedProduct);
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
