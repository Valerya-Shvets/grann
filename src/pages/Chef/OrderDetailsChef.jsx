import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { OrderDetails } from "./OrderDetails";
import { MenuChef } from "../../components/Chef/MenuChef";

function OrderDetailsChef() {
  return (
    <>
      <HeaderAdmin title="Hello, chef!" />
      <div className="container-admin">
        <div className="main-page__container">
          <MenuChef />
          <OrderDetails />
        </div>
      </div>
    </>
  );
}

export { OrderDetailsChef };
