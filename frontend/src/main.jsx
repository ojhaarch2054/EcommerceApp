import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/CartContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
     <CartProvider>
    <App />
    </CartProvider>
  </AuthProvider>
);