import React from "react";
import { CatalogAdmin } from "../../components/Admin/CatalogAdmin";
import { ChefsAdmin } from "../../components/Admin/ChefsAdmin";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { SettingAdmin } from "../../components/Admin/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function MainPage() {
  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
        </div>
      </div>
    </>
  );
}

export { MainPage };
