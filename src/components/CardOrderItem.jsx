import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartProduct } from "../redux/actions/cartActions";

function CardOrderItem({ item, total, setTotal }) {
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(item.sum);

  const handleMultiple = (e) => {
    setTotal(total - subTotal);
    setSubTotal(e.target.value * item.sum);
  };

  const handleDeleteItem = () => {
    setTotal(total - subTotal);
    dispatch(deleteCartProduct(item.id));
  };

  useEffect(() => {
    setTotal(total + subTotal);
    item.subtotal = subTotal;
  }, [subTotal]);

  return (
    <li className="cart-product__order-item">
      <p>{item.name}</p>
      <input
        type="number"
        className="cart-product__order-amount"
        defaultValue={1}
        onChange={(e) => handleMultiple(e)}
        min={1}
      />
      <p>{`${subTotal} грн`}</p>
      <p className="cart-product__order-delete" onClick={handleDeleteItem}>
        x
      </p>
    </li>
  );
}

export { CardOrderItem };
