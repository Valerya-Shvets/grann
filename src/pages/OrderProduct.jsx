import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendOrder } from "../redux/actions/clientsActions";
import { useEffect } from "react";

function OrderProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState(false);
  const [isActive, setActive] = useState(false);

  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const productsCart = structuredClone(cartProducts);

  let total = 0;

  const handleAddress = (add) => {
    setAddress(add);
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleTotal = () => {
    console.log("reduce func");
    const initialValue = 0;
    total = productsCart
      .map((product) => {
        return product.subtotal;
      })
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
    return total;
  };

  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    date: "",
    delivery: "",
    street: "",
    house: "",
    corps: "",
    entrance: "",
    floor: "",
    flat: "",
    payment: "",
    message: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const order = {
      clientInfo: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
      deliveryInfo: {
        deliveryDate: new Date(values.date),
        deliveryType: values.delivery === "taxi" ? 0 : 1,
        street: values.street,
        building: values.house,
        corps: values.corps,
        entrance: values.entrance,
        floor: values.floor,
        flat: values.flat,
        delivered: false,
      },
      paymentType: values.payment === "cash" ? 0 : 1,
      products: productsCart.map((product) => {
        return {
          productId: product.id,
          typeOptionId: product.selectedType,
          decorOptionId: product.selectedDecor,
          servingOptionId: product.selectedServing,
        };
      }),
      comment: values.message,
    };
    dispatch(sendOrder(order)).then((res) => {
      setSubmitting(false);
      resetForm();
      handleToggle();
    });
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Поле \"Ім'я\" є обов'язковим";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Поле "Номер телефону" є обов\'язковим';
    }
    if (!values.email) {
      errors.email = 'Поле "Пошта" є обов\'язковим';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Некоректна адреса електронної пошти";
    }
    if (!values.date) {
      errors.date = 'Поле "Дата доставки" є обов\'язковим';
    }
    if (!values.delivery) {
      errors.delivery = "Поле вибору способу доставки є обов'язковим";
    } else if (values.delivery == "таксі") {
      if (!values.street) {
        errors.street = 'Поле "Вулиця" є обов\'язковим';
      }
      if (!values.house) {
        errors.house = 'Поле "Будинок" є обов\'язковим';
      }
      if (!values.corps) {
        errors.corps = 'Поле "Корпус" є обов\'язковим';
      }
      if (!values.entrance) {
        errors.entrance = "Поле \"Під'їзд\" є обов'язковим";
      }
      if (!values.floor) {
        errors.floor = 'Поле "Поверх" є обов\'язковим';
      }
      if (!values.flat) {
        errors.flat = 'Поле "Квартира" є обов\'язковим';
      }
    }
    if (!values.payment) {
      errors.payment = "Вибір поля способу оплати є обов'язковим";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <main>
        <section className="order-product-section">
          <div className="container">
            <a
              className="order-product-section__path prev-path"
              onClick={() => navigate("/catalog")}
            >
              Продовжити покупки
            </a>
            <h2 className="order-product-section__title title">
              Оформлення замовлення
            </h2>

            <div className="order-product-section__form-container">
              <div className="order-product-section__products-list">
                <p className="accent">Ваше замовлення:</p>
                <div className="order-product-section__product">
                  <div className="order-product-section__product-container">
                    {productsCart.map((product) => {
                      return (
                        <div className="order-product-section__product-item">
                          <p className="order-product-section__product-name">
                            {product.name}
                          </p>
                          <p className="order-product-section__product-amount">
                            К-сть: {product.subtotal / product.sum}
                          </p>
                          <p className="order-product-section__product-price">
                            <span>{product.subtotal} грн</span>
                            <IoClose className="order-product-section__product-delete" />
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="order-product-section__form-order">
                <p className="order-product-section__contact-p">Контакти:</p>

                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validate={validateForm}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form className="order-product-section__form">
                      <div className="order-product-section__form-fields">
                        <div className="input">
                          <Field
                            className="order-product-section__input input__control"
                            type="text"
                            placeholder="Ім'я"
                            name="name"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="name"
                            component="div"
                          />
                        </div>

                        <div className="input">
                          <Field
                            className="order-product-section__input input__control"
                            type="tel"
                            placeholder="Номер телефону"
                            name="phoneNumber"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="phoneNumber"
                            component="div"
                          />
                        </div>
                        <div className="input">
                          <Field
                            className="order-product-section__input input__control"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="email"
                            component="div"
                          />
                        </div>
                        <div className="input">
                          <Field
                            className="order-product-section__input input__control"
                            type="text"
                            placeholder="Дата доставки"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            name="date"
                            id="date"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="date"
                            component="div"
                          />
                        </div>
                      </div>
                      <p className="order-product-section__delivery-p">
                        Спосіб доставки
                      </p>
                      <div className="order-product-section__delivery-fields">
                        <div className="input">
                          <Field
                            type="radio"
                            name="delivery"
                            value="byOwn"
                            id="byOwn"
                            onClick={() => handleAddress(false)}
                          />
                          <label htmlFor="byOwn">
                            Самовивіз з Металургійного р-ну м. Кривий Ріг
                          </label>
                          <ErrorMessage
                            className="login-input__error"
                            name="delivery"
                            component="div"
                          />
                        </div>
                        <div className="input">
                          <Field
                            type="radio"
                            name="delivery"
                            value="taxi"
                            id="taxi"
                            onClick={() => handleAddress(true)}
                          />
                          <label htmlFor="taxi">
                            На таксі (за тарифами служби таксі)
                          </label>
                          <ErrorMessage
                            className="login-input__error"
                            name="delivery"
                            component="div"
                          />
                        </div>
                      </div>

                      <div
                        className={`order-product-section__address ${
                          !address ? "hide" : ""
                        }`}
                      >
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="street"
                            placeholder="Вулиця"
                            name="street"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="street"
                            component="div"
                          />
                        </div>
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="house"
                            placeholder="Будинок"
                            name="house"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="house"
                            component="div"
                          />
                        </div>
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="corps"
                            placeholder="Корпус"
                            name="corps"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="corps"
                            component="div"
                          />
                        </div>
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="entrance"
                            placeholder="Під'їзд"
                            name="entrance"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="entrance"
                            component="div"
                          />
                        </div>
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="floor"
                            placeholder="Поверх"
                            name="floor"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="floor"
                            component="div"
                          />
                        </div>
                        <div className="order-product-section__address-field">
                          <Field
                            className="order-product-section__address-input input__control"
                            type="text"
                            id="flat"
                            placeholder="Квартира"
                            name="flat"
                          />
                          <ErrorMessage
                            className="login-input__error"
                            name="flat"
                            component="div"
                          />
                        </div>
                      </div>

                      <p className="order-product-section__delivery-p">
                        Спосіб оплати
                      </p>
                      <div className="order-product-section__delivery-fields">
                        <div>
                          <Field
                            type="radio"
                            name="payment"
                            value="cash"
                            id="cash"
                          />
                          <label htmlFor="cash">Готівка</label>
                          <ErrorMessage
                            className="login-input__error"
                            name="payment"
                            component="div"
                          />
                        </div>
                        <div>
                          <Field
                            type="radio"
                            name="payment"
                            value="liqpay"
                            id="liqpay"
                          />
                          <label htmlFor="liqpay">Liqpay</label>
                          <ErrorMessage
                            className="login-input__error"
                            name="payment"
                            component="div"
                          />
                        </div>
                      </div>

                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        placeholder="Додати коментар"
                        className="order-product-section__textarea"
                      />
                      <ErrorMessage name="message" component="div" />

                      <div className="order-product-section__total">
                        <p>Всього до сплати:</p>
                        <p className="order-product-section__total-price">
                          {handleTotal()} грн
                        </p>
                      </div>

                      <button
                        className="order-product-section__submit-btn button"
                        type="submit"
                        disabled={isSubmitting || !isValid || !dirty}
                      >
                        Оформити замовлення
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <div className={`mobile-order ${isActive ? "is-open" : ""}`}>
        <div className="container">
          <IoClose className="mobile-order__close-btn" onClick={handleToggle} />
          <div className="mobile-order__ins">
            <p
              className="mobile-order__ins-rotate"
              style={{ transform: "rotate(-20deg)" }}
            >
              from
            </p>
            <p className="mobile-order__ins-rotate">Grann</p>
            <p
              style={{ transform: "rotate(23deg)" }}
              className="mobile-order__ins-rotate"
            >
              with
            </p>
            <p
              style={{ transform: "rotate(25deg)" }}
              className="mobile-order__ins-rotate"
            >
              love
            </p>
          </div>
          <img
            className="mobile-order__image"
            src="./images/mobile-menu-cake.png"
            alt="Медовик з ягодами"
            width="145"
            height="120"
          />

          <h2 className="mobile-order__title title">Дякую за замовлення!</h2>
          <p className="mobile-order__paragraph">
            Ваше замовлення прийняте в обробку та незабаром вам зателефонує
            менеджер для уточнення деталей
          </p>
          <div className="mobile-order__button-container">
            <a className="mobile-order__main-btn button" href="/">
              На головну
            </a>
            <a
              className="mobile-order__continue-btn button-brown"
              href="/catalog"
            >
              продовжити покупки
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export { OrderProduct };
