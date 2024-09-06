import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { UpdateChefModal } from "./UpdateChefModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAdminChef } from "../../redux/actions/adminActions";

function ChefsCardAdmin({ chef }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const currYear = new Date(Date.now());

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <article className="chefs-card-admin">
        <h3 className="chefs-card-admin__title">{`${chef.lastName} ${chef.firstName} ${chef.middleName}`}</h3>
        <div className="chefs-card-admin__container">
          <img
            src="./images/chef-icon.jpg"
            width="150"
            height="100"
            alt="Chef icon"
          />
          <div className="chefs-card-admin__info">
            <p>
              <span className="accent">Посада:</span> {chef.position}
            </p>
            <p>
              <span className="accent">Досвід: </span>
              {currYear.getFullYear() - new Date(chef.workSince).getFullYear()}
            </p>
            <p className="accent">Teл.: {chef.phoneNumber}</p>
            <p className="accent">{chef.email}</p>
          </div>
        </div>
        <div className="chefs-card-admin__btn-container">
          <div className="button-ed-del edit" onClick={handleOpenModal}>
            <MdEdit />
            <span>Редагувати</span>
          </div>
          <div
            className="button-ed-del delete"
            onClick={() => dispatch(deleteAdminChef(chef.id))}
          >
            <MdDelete />
            <span>Видалити</span>
          </div>
        </div>
      </article>

      {/* 
        ///////////////////////////////////
        Modal window for editing chef
        /////////////////////////////////// 
    */}
      <UpdateChefModal
        openWindow={openModal}
        handleOpenWindow={handleOpenModal}
      />
    </>
  );
}

export { ChefsCardAdmin };
