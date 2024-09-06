import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { sendLogin, setEmail, setPassword } from "../redux/actions/userActions";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useEffect, useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.password);

  const { auth, setAuth } = useContext(AuthContext);

  const [tabIndex, setTabIndex] = useState(0);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(sendLogin(values.email, values.password, navigate, setAuth));
    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Поле "Пошта" є обов\'язковим';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Некоректна адреса електронної пошти";
    }
    if (!values.password) {
      errors.password = 'Поле "Пароль" є обов\'язковим';
    }
    return errors;
  };

  return (
    <section className="login">
      {/* <h1 className="login__title title">
        Вітаємо у <span>Grann!</span>
      </h1> */}
      <div className="login__container">
        <div className="login__image-container">
          <img
            className="login__image"
            src="./images/hero-section-cake.png"
            alt="Cake"
            width="830"
            height="520"
          />
        </div>

        <Tabs
          className="login__tabs"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="login__tabs-list">
            <Tab className={tabIndex === 0 ? "checked" : ""}>Вхід</Tab>
            <Tab
              className={tabIndex === 1 ? "checked" : ""}
              onClick={() => navigate("/login-chef")}
            >
              Реєстрація
            </Tab>
          </TabList>

          <TabPanel>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validateForm}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className="login__form">
                  <div className="login-input">
                    <Field
                      className="login-input__control"
                      type="text"
                      name="email"
                      placeholder="Пошта"
                    />
                    <ErrorMessage
                      className="login-input__error"
                      name="email"
                      component="div"
                    />
                  </div>

                  <div className="login-input">
                    <Field
                      className="login-input__control"
                      type="password"
                      name="password"
                      placeholder="Пароль"
                    />
                    <ErrorMessage
                      className="login-input__error"
                      name="password"
                      component="div"
                    />
                  </div>

                  <button
                    className="login__button button-brown"
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    Увійти
                  </button>
                </Form>
              )}
            </Formik>
          </TabPanel>

          <TabPanel></TabPanel>
        </Tabs>
      </div>
    </section>
  );
}

export { Login };
