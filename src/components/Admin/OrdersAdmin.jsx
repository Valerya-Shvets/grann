import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders } from "../../redux/actions/adminActions";
import { OrdersCardAdmin } from "./OrdersCardAdmin";

function OrdersAdmin() {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.admin.ordersList);

  useEffect(() => {
    dispatch(getAdminOrders());
  }, []);

  return (
    <section className="admin-section">
      <div className="admin-section__head">
        <h2 className="admin-section__head-title">Замовлення</h2>
      </div>
      <div className="admin-section__list">
        {ordersList.map((order) => {
          return <OrdersCardAdmin key={order.id} order={order} />;
        })}
      </div>
    </section>
  );
}

export { OrdersAdmin };
