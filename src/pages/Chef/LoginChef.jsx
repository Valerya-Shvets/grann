import React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { sendRegisterToken } from "../../redux/actions/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";

function LoginChef() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);

  const initialValues = {
    lastname: "",
    firstname: "",
    middlename: "",
    position: "",
    experience: "",
    email: "",
    phone: "",
    dateofbirth: "",
    password: "",
    token: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const chef = {
      firstName: values.firstname,
      lastName: values.lastname,
      middleName: values.middlename,
      position: values.position,
      phoneNumber: values.phone,
      email: values.email,
      workSince: values.experience,
      dateOfBirth: values.dateofbirth,
      password: values.password,
      passwordConfirmation: values.password,
    };
    dispatch(sendRegisterToken(chef, values.token, navigate));
    setSubmitting(false);
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.lastname) {
      errors.lastname = 'Поле "Прізвище" є обов\'язковим';
    }
    if (!values.firstname) {
      errors.firstname = "Поле \"Ім'я\" є обов'язковим";
    }
    if (!values.middlename) {
      errors.middlename = 'Поле "По батькові" є обов\'язковим';
    }
    if (!values.position) {
      errors.position = 'Поле "Посада" є обов\'язковим';
    }
    if (!values.phone) {
      errors.phone = 'Поле "Номер телефону" є обов\'язковим';
    }
    if (!values.email) {
      errors.email = 'Поле "E-mail" є обов\'язковим';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Некоректна адреса електронної пошти";
    }
    if (!values.experience) {
      errors.experience = 'Поле "Працює з" є обов\'язковим';
    }
    if (!values.dateofbirth) {
      errors.dateofbirth = 'Поле "Дата народження" є обов\'язковим';
    }
    if (!values.password) {
      errors.password = 'Поле "Пароль" є обов\'язковим';
    }
    if (!values.token) {
      errors.token = 'Поле "Введіть посилання" є обов\'язковим';
    }
    return errors;
  };

  return (
    <div className="new-chef is-open">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="new-chef__form">
            <div className="new-chef__form-column">
              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="lastname"
                >
                  Прізвище
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="lastname"
                  // placeholder="Прізвище"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="lastname"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="firstname"
                >
                  Ім'я
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="firstname"
                  // placeholder="Ім'я"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="firstname"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="middlename"
                >
                  По батькові
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="middlename"
                  // placeholder="По батькові"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="middlename"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="position"
                >
                  Посада
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="position"
                  // placeholder="Посада"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="position"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="experience"
                >
                  Працює з
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="date"
                  name="experience"
                  // placeholder="Працює з"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="experience"
                  component="div"
                />
              </div>
            </div>

            <div className="new-chef__form-column">
              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="email"
                  name="email"
                  // placeholder="E-mail"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="email"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="phone"
                >
                  Номер телефону
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="phone"
                  // placeholder="Номер телефону"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="phone"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="dateofbirth"
                >
                  Дата народження
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="date"
                  name="dateofbirth"
                  // placeholder="Дата народження"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="dateofbirth"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="password"
                >
                  Пароль
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="password"
                  name="password"
                  // placeholder="Пароль"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="password"
                  component="div"
                />
              </div>

              <div className="new-chef__form-field input-admin">
                <label
                  className="new-chef__form-label input-admin__label"
                  htmlFor="token"
                  title="Посилання надає адміністратор"
                >
                  Введіть посилання
                </label>
                <Field
                  className="new-chef__form-input input-admin__control"
                  type="text"
                  name="token"
                  // placeholder="Введіть посилання"
                />
                <ErrorMessage
                  className="login-input__error"
                  name="token"
                  component="div"
                />
              </div>

              <button
                className="new-chef__form-submit button-red"
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
              >
                Зареєструватися
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* <form className="new-chef__form" name="product" autoComplete="off">
        <div className="new-chef__form-column">
          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="lastname"
            >
              Прізвище
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="text"
              id="lastname"
            />
          </div>

          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="firstname"
            >
              Ім'я
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="text"
              id="firstname"
            />
          </div>

          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="middlename"
            >
              По батькові
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="text"
              id="middlename"
            />
          </div>

          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="position"
            >
              Посада
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="text"
              id="position"
            />
          </div>

          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="experience"
            >
              Працює з
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="date"
              id="experience"
            />
          </div>
        </div>

        <div className="new-chef__form-column">
          <div className="new-chef__form-column">
            <div className="new-chef__form-field input-admin">
              <label
                className="new-chef__form-label input-admin__label"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                className="new-chef__form-input input-admin__control"
                type="email"
                id="email"
              />
            </div>

            <div className="new-chef__form-field input-admin">
              <label
                className="new-chef__form-label input-admin__label"
                htmlFor="phone"
              >
                Номер телефону
              </label>
              <input
                className="new-chef__form-input input-admin__control"
                type="phone"
                id="phone"
              />
            </div>

            <div className="new-chef__form-field input-admin">
              <label
                className="new-chef__form-label input-admin__label"
                htmlFor="birthday"
              >
                Дата народження
              </label>
              <input
                className="new-chef__form-input input-admin__control"
                type="date"
                id="birthday"
              />
            </div>

            <div className="new-chef__form-field input-admin">
              <label
                className="new-chef__form-label input-admin__label"
                htmlFor="password"
              >
                Пароль
              </label>
              <input
                className="new-chef__form-input input-admin__control"
                type="password"
                id="password"
              />
            </div>

            <div className="new-chef__form-field input-admin">
              <label
                className="new-chef__form-label input-admin__label"
                htmlFor="passwordRep"
              >
                Повторіть пароль
              </label>
              <input
                className="new-chef__form-input input-admin__control"
                type="password"
                id="passwordRep"
              />
            </div>
          </div>
          <div className="new-chef__form-field input-admin">
            <label
              className="new-chef__form-label input-admin__label"
              htmlFor="token"
              title="Посилання надає адміністратор"
            >
              Введіть посилання
            </label>
            <input
              className="new-chef__form-input input-admin__control"
              type="token"
              id="token"
            />
          </div>
          <button className="new-chef__form-submit button-red">
            Зареєструватися
          </button>
        </div>
      </form> */}
    </div>
  );
}

export { LoginChef };
