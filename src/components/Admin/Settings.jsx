import React from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/actions/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Settings() {
  const dispatch = useDispatch();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(changePassword(values.oldPassword, values.newPassword));
    setSubmitting(false);
    resetForm();
  };

  const validateForm = (values) => {
    const errors = {};
    if (!values.oldPassword) {
      errors.oldPassword = 'Поле "Старий пароль" є обов\'язковим';
    }
    if (!values.newPassword) {
      errors.newPassword = 'Поле "Новий пароль" є обов\'язковим';
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Поле має містити мінімум 8 символів";
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = 'Поле "Повторіть пароль" є обов\'язковим';
    } else if (values.newPassword !== values.repeatPassword) {
      errors.repeatPassword = "Поле не відповідає новому паролю";
    }

    return errors;
  };

  return (
    <section className="setting-admin-section">
      <h2 className="setting-admin-section__title">Зміна пароля</h2>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="setting-admin-section__form">
            <div className="setting-admin-section__form-field input-admin">
              <label
                className="setting-admin-section__form-label input-admin__label"
                htmlFor="oldPassword"
              >
                Старий пароль
              </label>
              <Field
                className="setting-admin-section__form-input input-admin__control"
                type="password"
                name="oldPassword"
              />
              <ErrorMessage
                className="login-input__error"
                name="oldPassword"
                component="div"
              />
            </div>

            <div className="setting-admin-section__form-field input-admin">
              <label
                className="setting-admin-section__form-label input-admin__label"
                htmlFor="newPassword"
              >
                Новий пароль (мінімум 8 символів)
              </label>
              <Field
                className="setting-admin-section__form-input input-admin__control"
                type="password"
                name="newPassword"
              />
              <ErrorMessage
                className="login-input__error"
                name="newPassword"
                component="div"
              />
            </div>

            <div className="setting-admin-section__form-field input-admin">
              <label
                className="setting-admin-section__form-label input-admin__label"
                htmlFor="repeatPassword"
              >
                Повторіть пароль
              </label>
              <Field
                className="setting-admin-section__form-input input-admin__control"
                type="password"
                name="repeatPassword"
              />
              <ErrorMessage
                className="login-input__error"
                name="repeatPassword"
                component="div"
              />
            </div>

            <button
              className="setting-admin-section__form-submit button-red"
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Змінити пароль
            </button>
          </Form>
        )}
      </Formik>

      {/* <form className="setting-admin-section__form">
        <div className="setting-admin-section__form-field input-admin">
          <label
            className="setting-admin-section__form-label input-admin__label"
            htmlFor="old-password"
          >
            Старий пароль
          </label>
          <input
            className="setting-admin-section__form-input input-admin__control"
            id="old-password"
            type="password"
          />
        </div>
        <div className="setting-admin-section__form-field input-admin">
          <label
            className="setting-admin-section__form-label input-admin__label"
            htmlFor="new-password"
          >
            Новий пароль (мінімум 8 символів)
          </label>
          <input
            className="setting-admin-section__form-input input-admin__control"
            id="new-password"
            type="password"
          />
        </div>
        <div className="setting-admin-section__form-field input-admin">
          <label
            className="setting-admin-section__form-label input-admin__label"
            htmlFor="repeat-password"
          >
            Повторіть пароль
          </label>
          <input
            className="setting-admin-section__form-input input-admin__control"
            id="repeat-password"
            type="password"
          />
        </div>
        <button
          className="setting-admin-section__form-submit button-red"
          onClick={() => handleChangePassword}
        >
          Змінити пароль
        </button>
      </form> */}
    </section>
  );
}

export { Settings };
