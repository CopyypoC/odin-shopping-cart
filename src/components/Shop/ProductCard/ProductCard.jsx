export function ProductCard({ product }) {
  return (
    <div data-testid="ProductCard">
      <img src={product.image} alt={product.title} />
      <p>{product.category}</p>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>{"$" + product.price}</p>
      <div>
        <button type="button">-</button>
        <p>0</p>
        <button type="button">+</button>
      </div>
      <button type="button">Add to cart</button>
    </div>
  );
}
