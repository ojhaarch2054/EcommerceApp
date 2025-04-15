import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import { CartProvider } from "./context/CartContext";
import AuthProvider from "./context/AuthContext.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
     <CartProvider>
    <App />
    </CartProvider>
  </AuthProvider>
);