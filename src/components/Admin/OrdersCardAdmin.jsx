import React from "react";
import moment from "moment";

function OrdersCardAdmin({ order }) {
  return (
    <article className="order-card">
      <p className="order-card__order accent">Замовлення №{order.orderId} </p>
      <div className="order-card__container">
        <div>
          <img
            src={`http://localhost:5145/api/photo/${order.imageId}`}
            width="180"
            height="180"
          />
        </div>
        <div className="order-card__info">
          <p className="accent">{order.name}</p>
          <p>
            Дата замовлення:{" "}
            <span className="accent">
              {moment(order.createdAt).format("DD.MM.YYYY")}
            </span>
          </p>
          <p>
            Дата доставки:{" "}
            <span className="accent">
              {moment(order.deliveryDate).format("DD.MM.YYYY")}
            </span>
          </p>
          <p>
            Статус:{" "}
            <span className="accent-blue accent">
              {order.status === 0
                ? "створено"
                : order.status === 1
                ? "прийнято"
                : order.status === 2
                ? "готово"
                : "доставлено"}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

export { OrdersCardAdmin };
