import styles from "./ProductCard.module.css";

export function ProductCard({ product, handleAmountChange }) {
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
          <p data-testid="ProductAmount" className={styles.amount}>
            {product.amount}
          </p>
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
        <button className={styles.addCart} type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
