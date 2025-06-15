import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar.jsx";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
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

  console.log(cartItems);

  return (
    <>
      <Navbar />
      <main>
        <Outlet context={{ handleAddToCart, cartItems }} />
      </main>
    </>
  );
}

export default App;
