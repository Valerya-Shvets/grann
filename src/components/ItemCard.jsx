import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct } from "../redux/actions/cartActions";
import { getProduct } from "../redux/actions/productsActions";
import api from "../api/axios";
import { useState } from "react";

function ItemCard({ productId, imgId, cakeName, price, weight }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCart = () => {
    api
      .get(`api/product/${productId}`)
      .then((response) => {
        let orderProduct = structuredClone(response.data);
        orderProduct.selectedServing = orderProduct.servings[0].id;
        orderProduct.selectedDecor = orderProduct.decors[0].id;
        orderProduct.selectedType = orderProduct.types[0].id;
        dispatch(addCartProduct(orderProduct));
        alert("Товар додано у кошик!");
      })
      .catch((error) => console.log("error: ", error));
  };

  return (
    <article className="item-card">
      <div className="item-card__container">
        <img
          className="item-card__container-image"
          src={`http://localhost:5145/api/photo/${imgId}`}
          alt={cakeName}
          width="355"
          height="393"
        />
        <div className="item-card__container-middle">
          <a
            className="item-card__detail"
            href="#"
            onClick={() => navigate(`/product/${productId}`)}
          >
            Детальніше
          </a>
        </div>
      </div>
      <div className="item-card__flex-container">
        <a
          className="item-card__desc"
          onClick={() => navigate(`/product/${productId}`)}
        >
          {cakeName}
        </a>
        <IoMdCart className="item-card__cart" onClick={handleAddCart} />
      </div>
      <p>
        {`${price} грн`} / {weight}
      </p>
    </article>
  );
}

export { ItemCard };
