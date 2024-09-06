import React from "react";
import { MenuChef } from "../../components/Chef/MenuChef";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Settings } from "../../components/Admin/Settings";

function SettingsChef() {
  return (
    <>
      <HeaderAdmin title="Hello, chef!" />
      <div className="container-admin">
        <div className="main-page__container">
          <MenuChef />
          <Settings />
        </div>
      </div>
    </>
  );
}

export { SettingsChef };
