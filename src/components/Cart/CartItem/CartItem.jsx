import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

export function CartItem({ product }) {
  const { handleCartAmountChange, handleRemoveCartItem } = useOutletContext();
  const price = parseFloat(product.price * product.amount).toFixed(2);

  return (
    <div data-testid="CartItem">
      <img src={product.image} alt={product.title} />
      <p>{product.title}</p>
      <p>{"$" + price}</p>
      <div>
        <button
          type="button"
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
        onClick={() => {
          handleRemoveCartItem(product);
        }}
      >
        Delete
      </button>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
};
