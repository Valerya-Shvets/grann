import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { ChefsAdmin } from "../../components/Admin/ChefsAdmin";

function ChefsPage() {
  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
          <ChefsAdmin />
        </div>
      </div>
    </>
  );
}

export { ChefsPage };
