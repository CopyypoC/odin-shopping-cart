import App from "../components/App/App.jsx";
import { Home } from "../components/Home/Home.jsx";
import { Shop } from "../components/Shop/Shop.jsx";
import { Cart } from "../components/Cart/Cart.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];
