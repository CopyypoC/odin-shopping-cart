import { useEffect, useState } from "react";
import { getProducts } from "../../api/getProducts.js";
import { ProductCard } from "./ProductCard/ProductCard.jsx";

export function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      const productsData = await getProducts(controller.signal);
      setProducts(productsData);
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const productList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return <div>{productList}</div>;
}
