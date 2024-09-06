import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCartProduct,
  setCartProduct,
} from "../redux/actions/cartActions";
import { addOrderProduct } from "../redux/actions/orderActions";
import { CardOrderItem } from "./CardOrderItem";

function OrderCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const [total, setTotal] = useState(0);

  const handleOrder = () => {
    dispatch(setCartProduct(cartProducts));
    navigate("/order");
  };

  return (
    <div className="cart-product__order-container">
      <div className="cart-product__order">
        <p className="cart-product__order-heading">Ваше замовлення:</p>
        <ul className="cart-product__order-list">
          {cartProducts.map((item) => {
            return (
              <CardOrderItem item={item} setTotal={setTotal} total={total} />
            );
          })}
        </ul>
        <hr />
        <div className="cart-product__order-item total">
          <p>Загальна сума:</p>
          <p>{total} грн</p>
        </div>
      </div>
      <button
        className="cart-product__button button-brown"
        type="button"
        onClick={handleOrder}
      >
        Оформити
      </button>
    </div>
  );
}

export { OrderCard };
