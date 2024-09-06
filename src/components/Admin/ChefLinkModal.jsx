import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { resetLink } from "../../redux/actions/userActions";

function ChefLinkModal({ openWindow, handleOpenWindow }) {
  const link = useSelector((state) => state.user.link).toString();

  const [copy, setCopy] = useState("Copy");

  const dispatch = useDispatch();

  const handleCopy = () => {
    console.log(typeof link);
    setCopy("Copied!");
    navigator.clipboard.writeText(link);

    setTimeout(() => {
      setCopy("Copy");
    }, 1000);
  };

  const handleReset = () => {
    dispatch(resetLink());
  };

  return (
    <div className={`new-chef ${openWindow ? "is-open" : ""}`}>
      <div className="new-chef__container">
        <div className="new-chef__heading">
          <h2 className="new-chef__title">Посилання для реєстрації</h2>
          <IoClose className="new-chef__close-btn" onClick={handleOpenWindow} />
        </div>

        <div className="chef-link-modal">
          <label htmlFor="url" className="visually-hidden">
            Посилання для реєстрації:
          </label>
          <input
            className="chef-link-modal__input"
            type="url"
            name="url"
            id="url"
            value={link}
            readOnly
          />
          <div className="chef-link-modal__buttons">
            <button
              className="chef-link-modal__btn button-blue"
              type="button"
              onClick={handleCopy}
            >
              {copy}
            </button>
            <button
              className="chef-link-modal__btn button-blue"
              type="button"
              onClick={handleReset}
            >
              Reset URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChefLinkModal };
