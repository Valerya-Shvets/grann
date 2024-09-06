import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { OrdersAdmin } from "../../components/Admin/OrdersAdmin";

function OrdersPage() {
  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
          <OrdersAdmin />
        </div>
      </div>
    </>
  );
}

export { OrdersPage };
