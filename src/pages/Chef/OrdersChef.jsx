import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { MenuChef } from "../../components/Chef/MenuChef";
import { Orders } from "../../components/Chef/Orders";

function OrdersChef() {
  return (
    <>
      <HeaderAdmin title="Hello, chef!" />
      <div className="container-admin">
        <div className="main-page__container">
          <MenuChef />
          <Orders />
        </div>
      </div>
    </>
  );
}

export { OrdersChef };
