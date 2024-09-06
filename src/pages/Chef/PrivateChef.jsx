import React from "react";
import { MenuChef } from "../../components/Chef/MenuChef";
import { HeaderAdmin } from "../../components/Admin/Header";
import { ChefSettings } from "../../components/Chef/ChefSettings";

function PrivateChef() {
  return (
    <>
      <HeaderAdmin title="Hello, chef!" />
      <div className="container-admin">
        <div className="main-page__container">
          <MenuChef />
          <ChefSettings />
        </div>
      </div>
    </>
  );
}

export { PrivateChef };
