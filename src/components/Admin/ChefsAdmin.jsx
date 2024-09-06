import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLink } from "../../redux/actions/userActions";
import { getChefsList } from "../../redux/actions/adminActions";
import { ChefLinkModal } from "./ChefLinkModal";
import { ChefsCardAdmin } from "./ChefsCardAdmin";

function ChefsAdmin() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const dispatch = useDispatch();
  const chefList = useSelector((state) => state.admin.chefsList);

  useEffect(() => {
    dispatch(getLink());
    dispatch(getChefsList());
  }, []);

  return (
    <section className="admin-section">
      <div className="admin-section__head">
        <h2 className="admin-section__head-title">Кухарі</h2>
        <a className="button-blue" onClick={handleOpenModal}>
          + Додати
        </a>
      </div>
      <div className="chefs-admin-section__chefs">
        {chefList.map((chef) => {
          return <ChefsCardAdmin chef={chef} />;
        })}
        {/* <ChefsCardAdmin />
        <ChefsCardAdmin />
        <ChefsCardAdmin />
        <ChefsCardAdmin />
        <ChefsCardAdmin />
        <ChefsCardAdmin />
        <ChefsCardAdmin /> */}
      </div>

      {/* 
        ///////////////////////////////////
        Modal window for adding new chef
        /////////////////////////////////// 
    */}
      <ChefLinkModal
        openWindow={openModal}
        handleOpenWindow={handleOpenModal}
      />
    </section>
  );
}

export { ChefsAdmin };
