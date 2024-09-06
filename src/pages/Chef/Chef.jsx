import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../../components/Auth";
import { AuthProvider } from "../../context/AuthContext";
import { LoginChef } from "./LoginChef";
import { MainChef } from "./MainChef";
import { OrderDetailsChef } from "./OrderDetailsChef";
import { OrdersChef } from "./OrdersChef";
import { PrivateChef } from "./PrivateChef";
import { SettingsChef } from "./SettingsChef";

function Chef() {
  return (
    <Routes>
      <Route element={<Auth allowedRoles={["Chef"]} />}>
        <Route path="/chef" element={<MainChef />} />
        <Route path="/chef-password" element={<SettingsChef />} />
        <Route path="/chef-private" element={<PrivateChef />} />
        <Route path="/chef-orders" element={<OrdersChef />} />
        <Route path="/chef-orders/:id" element={<OrderDetailsChef />} />
      </Route>
    </Routes>
  );
  // <>
  {
    /* // <AuthProvider>
    // <BrowserRouter> */
  }

  {
    /* </BrowserRouter>
    // </AuthProvider> */
  }
  // </>
}

export { Chef };
