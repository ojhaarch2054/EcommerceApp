import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx';
import { AuthProvider } from "./context/authContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);