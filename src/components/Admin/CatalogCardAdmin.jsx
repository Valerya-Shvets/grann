import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCatalogProduct } from "../../redux/actions/adminActions";
import { ChangeProductModal } from "./ChangeProductModal";

function CatalogCardAdmin({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <article className="catalog-card-admin">
        <img
          className="catalog-card-admin__image"
          src={`http://localhost:5145/api/photo/${product.imageId}`}
          alt={product.name}
          width="168"
          height="185"
        />
        <p>{product.name}</p>
        <p className="catalog-card-admin__price">{`${product.serving.price} грн / ${product.serving.option}`}</p>
        <div className="catalog-card-admin__btn-container">
          <div
            className="button-ed-del edit"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <MdEdit />
            <span>Редагувати</span>
          </div>
          <div
            className="button-ed-del delete"
            onClick={() => dispatch(deleteCatalogProduct(product.id))}
          >
            <MdDelete />
            <span>Видалити</span>
          </div>
        </div>
      </article>

      <ChangeProductModal
        openWindow={openModal}
        handleOpenWindow={handleOpenModal}
      />
    </>
  );
}

export { CatalogCardAdmin };
