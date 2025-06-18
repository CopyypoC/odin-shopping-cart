export function CartItem({ product }) {
  return (
    <div data-testid="CartItem">
      <p>{product.title}</p>
    </div>
  );
}
