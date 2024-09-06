import React, { useState } from "react";
import { CatalogCardAdmin } from "./CatalogCardAdmin";
import { AddProductModal } from "./AddProductModal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductsList } from "../../redux/actions/adminActions";

function CatalogAdmin({ products }) {
  const [openWindow, setOpenWindow] = useState(false);
  const dispatch = useDispatch();

  const productsList = products;

  const handleOpenWindow = () => {
    setOpenWindow(!openWindow);
  };

  return (
    <>
      <section className="admin-section">
        <div className="admin-section__head">
          <h2 className="admin-section__head-title">Каталог</h2>
          <a className="button-blue" onClick={handleOpenWindow}>
            + Додати
          </a>
        </div>
        <div className="catalog-admin-section__products">
          {productsList.map((product) => {
            return <CatalogCardAdmin product={product} />;
          })}
        </div>
      </section>

      {/* 
        ///////////////////////////////////
        Modal window for adding new product
        /////////////////////////////////// 
    */}
      <AddProductModal
        title="Додати товар"
        submitBtnName="Додати"
        imageBtnName="Додати фото"
        openWindow={openWindow}
        handleOpenWindow={handleOpenWindow}
      />
    </>
  );
}

export { CatalogAdmin };
