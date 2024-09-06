import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { Settings } from "../../components/Admin/Settings";

function SettingsPage() {
  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
          <Settings />
        </div>
      </div>
    </>
  );
}

export { SettingsPage };
