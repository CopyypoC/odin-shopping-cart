import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar.jsx";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleCheckout = () => {
    setCartItems([]);
  };

  const handleAddToCart = (product) => {
    if (product.amount === "" || product.amount === 0) return;

    const newCartItems = [...cartItems];
    let itemExists = false;

    newCartItems.forEach((item) => {
      if (item.id === product.id) {
        item.amount += product.amount;
        itemExists = true;
        setCartItems(newCartItems);
      }
    });

    if (!itemExists) {
      newCartItems.push(product);
      setCartItems(newCartItems);
    }
  };

  const handleCartAmountChange = (selectedItem) => {
    const newCartItems = [...cartItems];
    let selectedIndex;
    newCartItems.forEach((product, index) => {
      if (selectedItem.id === product.id) {
        selectedIndex = index;
        newCartItems[selectedIndex] = selectedItem;
        setCartItems(newCartItems);
      }
    });
  };

  const handleRemoveCartItem = (itemToRemove) => {
    const newCartItems = cartItems.filter((item) => {
      if (itemToRemove.id !== item.id) return item;
    });

    setCartItems(newCartItems);
  };

  console.log(cartItems);

  return (
    <>
      <Navbar />
      <main>
        <Outlet
          context={{
            handleAddToCart,
            cartItems,
            handleCheckout,
            handleCartAmountChange,
            handleRemoveCartItem,
          }}
        />
      </main>
    </>
  );
}

export default App;
