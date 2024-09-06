import React from "react";

function ChefSettings() {
  return (
    <section className="setting-admin-section">
      <h2 className="setting-admin-section__title">Змінити персональні дані</h2>

      <form className="setting-admin-section__form">
        <div className="setting-admin-section__form-field input-admin">
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
          </div>
          <button className="new-chef__form-submit button-red">Зберегти</button>
        </div>
      </form>
    </section>
  );
}

export { ChefSettings };
