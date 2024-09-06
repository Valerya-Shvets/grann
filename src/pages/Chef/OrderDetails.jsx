import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getOrderById,
  acceptOrder,
  finishOrder,
} from "../../redux/actions/chefsActions";
import moment from "moment";

function OrderDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [accepted, setAccepted] = useState(false);
  const productsOrderList = useSelector((state) => state.chef.chefOrders);

  const orderProduct = productsOrderList.find((item) => item.id == id);

  const handleAccepted = () => {
    dispatch(acceptOrder(orderProduct.id)).then((res) => {
      setAccepted(!accepted);
    });
  };

  const handleFinished = () => {
    dispatch(finishOrder(orderProduct.id));
  };

  return (
    <>
      <section className="orders-section">
        <h2 className="orders-section__title">
          Замовлення №{orderProduct.orderId} |
          <span className="accent-blue"> {orderProduct.name}</span>
        </h2>
        <div className="order-details__flex-container">
          <div>
            <img
              src={`http://localhost:5145/api/photo/${orderProduct.imageId}`}
              width="400"
              height="422"
            />
          </div>

          <div className="order-details__info">
            <p className="order-details__head accent">Стандартні складники:</p>

            <ul className="order-details__ingredients-list">
              {orderProduct.components.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>

            <p className="order-details__head accent">
              Декор:{" "}
              <span className="order-details__options">
                {orderProduct.decor.option}
              </span>
            </p>
            <p className="order-details__head accent">
              Вид:{" "}
              <span className="order-details__options">
                {orderProduct.type.option}
              </span>
            </p>
            <p className="order-details__head accent">
              Вага готового виробу / Кількість:{" "}
              <span className="order-details__options">
                {orderProduct.serving.option}
              </span>
            </p>
            <p className="order-details__head accent">
              Дата замовлення:{" "}
              <span className="order-details__options">
                {moment(orderProduct.createdAt).format("DD.MM.YYYY")}
              </span>
            </p>
            <p className="order-details__head accent">
              Дата доставки:{" "}
              <span className="accent-red">
                {moment(orderProduct.deliveryDate).format("DD.MM.YYYY")}
              </span>
            </p>
            {orderProduct.status === 0 ? (
              <a
                className="order-details__button button-blue"
                onClick={handleAccepted}
              >
                Прийняти
              </a>
            ) : orderProduct.status === 1 ? (
              <a
                className="order-details__button button-red"
                onClick={handleFinished}
              >
                {" "}
                Завершити{" "}
              </a>
            ) : orderProduct.status === 2 ? (
              "завершено"
            ) : (
              "доставлено"
            )}
          </div>
        </div>

        <div
          className="order-details__back"
          onClick={() => navigate("/chef-orders")}
        >
          <IoIosArrowBack className="order-details__back-arrow" />
          <span className="order-details__back-text">Повернутися</span>
        </div>
      </section>
    </>
  );
}

export { OrderDetails };
