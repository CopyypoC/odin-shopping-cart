import { useEffect, useState } from "react";
import { getProducts } from "../../api/getProducts.js";
import { ProductCard } from "./ProductCard/ProductCard.jsx";
import styles from "./Shop.module.css";

export function Shop() {
  const [products, setProducts] = useState([]);

  const handleAmountChange = (selectedProduct) => {
    const newProducts = [...products];
    let selectedIndex;
    products.forEach((product, index) => {
      if (selectedProduct.id === product.id) {
        selectedIndex = index;
        newProducts[selectedIndex] = selectedProduct;
        setProducts(newProducts);
        return;
      }
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      const productsData = await getProducts(controller.signal);
      productsData.forEach((product) => (product.amount = 0));
      setProducts(productsData);
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const productList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      handleAmountChange={handleAmountChange}
    />
  ));

  return <div className={styles.shopContainer}>{productList}</div>;
}
