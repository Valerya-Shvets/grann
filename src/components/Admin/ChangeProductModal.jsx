import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { InputPanel } from "./InputPanel";
import { InputPanelPrice } from "./InputPanelPrice";

function ChangeProductModal({ openWindow, handleOpenWindow }) {
  const [changeImage, setChangeImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState([]);
  const [decor, setDecor] = useState([]);
  const [weight, setWeight] = useState([]);
  const [price, setPrice] = useState([]);

  const handleAddIngredient = () => {
    const newIngredient = Date.now();
    setIngredients((i) => [...i, newIngredient]);
  };

  const handleAddType = () => {
    const newType = Date.now();
    setType((i) => [...i, newType]);
  };

  const handleAddDecor = () => {
    const newDecor = Date.now();
    setDecor((i) => [...i, newDecor]);
  };

  const handleAddWeight = () => {
    const newWeight = Date.now();
    setWeight((i) => [...i, newWeight]);
  };

  const handleAddPrice = () => {
    const newPrice = Date.now();
    setPrice((i) => [...i, newPrice]);
  };

  return (
    <div className={`new-product ${openWindow ? "is-open" : ""}`}>
      <div className="new-product__container">
        <div className="new-product__heading">
          <h2 className="new-product__title">Змінити товар</h2>
          <IoClose
            className="new-product__close-btn"
            onClick={handleOpenWindow}
          />
        </div>

        <form className="new-product__form" name="product" autoComplete="off">
          <div className="new-product__form-container">
            <div className="new-product__form-column">
              <div className="new-product__form-field input-admin">
                <label
                  className="new-product__form-label input-admin__label visually-hidden"
                  htmlFor="title"
                >
                  Назва
                </label>
                <input
                  className="new-product__form-input input-admin__control"
                  type="text"
                  placeholder="Назва"
                  id="title"
                />
              </div>

              {changeImage ? (
                <div className="new-product__form-image-container">
                  <img
                    className="new-product__form-image"
                    alt="product"
                    src={URL.createObjectURL(changeImage)}
                    width="330"
                    height="310"
                  />
                </div>
              ) : (
                <div className="new-product__form-image-container"></div>
              )}

              <div className="new-product__form-upload">
                <label
                  htmlFor="image"
                  className="new-product__form-upload-label"
                >
                  Змінити фото
                </label>
                <input
                  className="new-product__form-upload-input"
                  id="image"
                  type="file"
                  onChange={(e) => {
                    setChangeImage(e.target.files[0]);
                  }}
                />
                {changeImage && (
                  <a
                    className="new-product__form-upload-label"
                    onClick={() => setChangeImage(null)}
                  >
                    Видалити
                  </a>
                )}
              </div>

              <textarea
                className="new-product__form-description"
                placeholder="Опис"
              ></textarea>
            </div>

            <div className="new-product__form-column">
              <div className="new-product__form-field input-admin">
                <label
                  className="new-product__form-label input-admin__label visually-hidden"
                  htmlFor="category"
                >
                  Категорія
                </label>
                <input
                  className="new-product__form-input input-admin__control"
                  type="text"
                  placeholder="Категорія"
                  id="category"
                />
              </div>
              <InputPanel
                title="Стандартні складники"
                placeholder="Складник"
                nameId="ingredient"
                state={ingredients}
                setState={handleAddIngredient}
              />

              <InputPanel
                title="Вид"
                placeholder="Вид"
                nameId="type"
                state={type}
                setState={handleAddType}
              />

              <InputPanel
                title="Декор"
                placeholder="Декор"
                nameId="decor"
                state={decor}
                setState={handleAddDecor}
              />
            </div>

            <div className="new-product__form-column">
              <InputPanelPrice
                weight={weight}
                setWeight={handleAddWeight}
                price={price}
                setPrice={handleAddPrice}
              />
              <button className="new-product__form-submit button-red">
                Зберегти
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { ChangeProductModal };
