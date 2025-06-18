import PropTypes from "prop-types";

export function CartItem({ product }) {
  return (
    <div data-testid="CartItem">
      <p>{product.title}</p>
    </div>
  );
}

CartItem.PropTypes = {
  product: PropTypes.object.isRequired,
};
