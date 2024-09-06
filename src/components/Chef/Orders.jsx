import React from "react";
import { OrderCard } from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChefOrders } from "../../redux/actions/chefsActions";

function Orders() {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.chef.chefOrders);

  useEffect(() => {
    dispatch(getChefOrders());
  }, []);

  return (
    <section className="orders-section">
      <h2 className="orders-section__title">Замовлення</h2>
      <div className="orders-section__list">
        {ordersList.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })}
      </div>
    </section>
  );
}

export { Orders };
