import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { InputPanel } from "./InputPanel";
import { InputPanelPrice } from "./InputPanelPrice";

function ChangeProductAdmin() {
  const [changeImage, setChangeImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState([]);
  const [decor, setDecor] = useState([]);
  const [weight, setWeight] = useState([]);

  const handleChooseImage = (e) => {
    setChangeImage(e.target.files[0]);
    console.log(changeImage);
  };

  const handleAddIngredient = () => {
    const newIngredient = Date.now();
    setIngredients((i) => [...i, newIngredient]);
  };

  const handleDeleteIngredient = (value) => {
    let newState = ingredients.filter((i) => i !== value);
    setIngredients(newState);
  };

  const handleAddType = () => {
    const newType = Date.now();
    setType((i) => [...i, newType]);
  };

  const handleDeleteType = (value) => {
    let newState = type.filter((i) => i !== value);
    setType(newState);
  };

  const handleAddDecor = () => {
    const newDecor = Date.now();
    setDecor((i) => [...i, newDecor]);
  };

  const handleDeleteDecor = (value) => {
    let newState = decor.filter((i) => i !== value);
    setDecor(newState);
  };

  const handleAddWeightPrice = () => {
    const newWeight = Date.now();
    setWeight((i) => [...i, newWeight]);
  };

  const handleDeleteWeightPrice = (value) => {
    let newStateW = weight.filter((i) => i !== value);
    setWeight(newStateW);
  };

  return (
    <>
      <section className="admin-section">
        {/* <div className="admin-section__head">
          <h2 className="admin-section__head-title">Змінити</h2>
        </div> */}

        <div className="new-product__container">
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
                      alt="cake"
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
                    onChange={handleChooseImage}
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
                    list="categories"
                  />
                  <datalist id="categories">
                    <option value="Торт">Торт</option>
                    <option value="Тістечко">Тістечко</option>
                    <option value="Шу">Шу</option>
                    <option value="Піца">Піца</option>
                  </datalist>
                </div>
                <InputPanel
                  title="Стандартні складники"
                  placeholder="Складник"
                  nameId="ingredient"
                  state={ingredients}
                  setState={handleAddIngredient}
                  deleteState={handleDeleteIngredient}
                  priceOption={false}
                />

                <InputPanel
                  title="Вид"
                  placeholder="Вид"
                  nameId="type"
                  state={type}
                  setState={handleAddType}
                  deleteState={handleDeleteType}
                  priceOption={true}
                />

                <InputPanel
                  title="Декор"
                  placeholder="Декор"
                  nameId="decor"
                  state={decor}
                  setState={handleAddDecor}
                  deleteState={handleDeleteDecor}
                  priceOption={true}
                />
              </div>

              <div className="new-product__form-column">
                <InputPanelPrice
                  weight={weight}
                  setWeightPrice={handleAddWeightPrice}
                  deleteWeightPrice={handleDeleteWeightPrice}
                />
                <button className="new-product__form-submit button-red">
                  Зберегти
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export { ChangeProductAdmin };
