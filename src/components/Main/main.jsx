import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../styles/reset.css";
import { routes } from "../../routes/routes.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../styles/reset.css";
import "../../styles/theme.css";
import "../../styles/main.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
