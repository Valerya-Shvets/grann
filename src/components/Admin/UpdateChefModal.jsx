import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

function UpdateChefModal({ openWindow, handleOpenWindow }) {
  return (
    <div className={`new-chef ${openWindow ? "is-open" : ""}`}>
      <div className="new-chef__container">
        <div className="new-chef__heading">
          <h2 className="new-chef__title">Змінити дані кухаря</h2>
          <IoClose className="new-chef__close-btn" onClick={handleOpenWindow} />
        </div>

        <form className="new-chef__form" name="product" autoComplete="off">
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
          </div>

          <div className="new-chef__form-column">
            <div className="new-chef__form-column">
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
            <button className="new-chef__form-submit button-red">
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { UpdateChefModal };
