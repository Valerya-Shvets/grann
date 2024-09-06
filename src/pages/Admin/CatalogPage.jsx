import React from "react";
import { HeaderAdmin } from "../../components/Admin/Header";
import { Menu } from "../../components/Admin/Menu";
import { CatalogAdmin } from "../../components/Admin/CatalogAdmin";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductsList } from "../../redux/actions/adminActions";

function CatalogPage() {
  const products = useSelector((state) => state.admin.productsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsList());
  }, []);

  return (
    <>
      <HeaderAdmin title="Admin" />
      <div className="container-admin">
        <div className="main-page__container">
          <Menu />
          <CatalogAdmin products={products} />
        </div>
      </div>
    </>
  );
}

export { CatalogPage };
