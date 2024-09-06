import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { MenuChef } from "../../components/Chef/MenuChef";

function MainChef() {
  return (
    <>
      <HeaderAdmin title="Hello, chef!" />
      <div className="container-admin">
        <div className="main-page__container">
          <MenuChef />
        </div>
      </div>
    </>
  );
}

export { MainChef };
