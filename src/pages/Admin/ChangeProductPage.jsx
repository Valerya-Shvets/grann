import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { ChangeProductAdmin } from "../../components/Admin/ChangeProductAdmin";

function ChangeProductPage() {
  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
          <ChangeProductAdmin />
        </div>
      </div>
    </>
  );
}

export { ChangeProductPage };
