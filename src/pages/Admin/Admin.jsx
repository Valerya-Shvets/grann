import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./MainPage";
import { CatalogPage } from "./CatalogPage";
import { ChefsPage } from "./ChefsPage";
import { SettingsPage } from "./SettingsPage";
import { OrdersPage } from "./OrdersPage";
import { ChangeProductPage } from "./ChangeProductPage";
import { AuthProvider } from "../../context/AuthContext";
import Auth from "../../components/Auth";

function Admin() {
  return (
    <Routes>
      <Route element={<Auth allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<MainPage />} />
        <Route path="/products" element={<CatalogPage />} />
        <Route path="/chefs" element={<ChefsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products/:id" element={<ChangeProductPage />} />
      </Route>
    </Routes>
  );
  // <>
  {
    /* // <AuthProvider>
    <BrowserRouter> */
  }

  {
    /* </BrowserRouter>
    // </AuthProvider> */
  }
  {
    /* </> */
  }
}

export { Admin };
