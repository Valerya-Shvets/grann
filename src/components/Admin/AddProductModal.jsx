import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { InputPanel } from "./InputPanel";
import { InputPanelPrice } from "./InputPanelPrice";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProductDecor,
  deleteProductIngredient,
  deleteProductType,
  deleteProductWeight,
  setProductDecor,
  setProductIngredients,
  setProductTypes,
  setProductWeight,
  setProduct,
} from "../../redux/actions/productsActions.js";
import { createPhoto } from "../../redux/actions/photoActions";

function AddProductModal({
  title,
  submitBtnName,
  openWindow,
  handleOpenWindow,
}) {
  const [titleCake, setTitleCake] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState([]);
  const [decor, setDecor] = useState([]);
  const [weight, setWeight] = useState([]);

  const dispatch = useDispatch();
  const photoId = useSelector((state) => state.photo.photoId);
  const componentsList = useSelector((state) => state.product.ingredients);
  let componentsL = [];
  const typesList = useSelector((state) => state.product.types);
  let typesL = [];
  const decorList = useSelector((state) => state.product.decor);
  let decorL = [];
  const weightList = useSelector((state) => state.product.weight);
  let weightL = [];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setSelectedImage(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);

      const formData = new FormData();
      formData.append("image", selectedFile);
      console.log(selectedFile.name);

      dispatch(createPhoto(selectedFile.name, formData));
    } else {
      setPreview(null);
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
  };

  const handleAddIngredient = () => {
    const newIngredient = Date.now();
    setIngredients((i) => [...i, newIngredient]);
    // handleSetIngredient(e, id);
  };

  // const handleSetIngredient = (e, id) => {
  //   const listIngredients = ingredients.map((item) => {
  //     if (item !== id) {
  //       return item;
  //     } else {
  //       return e.target.value;
  //     }
  //   });

  //   setIngredients(listIngredients);
  // };

  const handleDeleteIngredient = (item) => {
    let newState = ingredients.filter((i) => i !== item);
    setIngredients(newState);
    dispatch(deleteProductIngredient(item));
  };

  const handleAddType = () => {
    const newType = Date.now();
    setType((i) => [...i, newType]);
  };

  const handleDeleteType = (item) => {
    let newState = type.filter((i) => i !== item);
    setType(newState);
    dispatch(deleteProductType(item));
  };

  const handleAddDecor = () => {
    const newDecor = Date.now();
    setDecor((i) => [...i, newDecor]);
  };

  const handleDeleteDecor = (item) => {
    let newState = decor.filter((i) => i !== item);
    setDecor(newState);
    dispatch(deleteProductDecor(item));
  };

  const handleAddWeightPrice = () => {
    const newWeight = Date.now();
    setWeight((i) => [...i, newWeight]);
  };

  const handleDeleteWeightPrice = (item) => {
    let newStateW = weight.filter((i) => i !== item);
    setWeight(newStateW);
    dispatch(deleteProductWeight(item));
  };

  const handleCreateLists = () => {
    componentsL = componentsList.map((item) => item.value);
    typesL = typesList.map((item) => {
      return { option: item.value, price: parseFloat(item.price) };
    });
    decorL = decorList.map((item) => {
      return { option: item.value, price: parseFloat(item.price) };
    });
    weightL = weightList.map((item) => {
      return { option: item.value, price: parseFloat(item.price) };
    });
  };

  const handleClear = () => {
    setTitleCake("");
    setDescription("");
    setPreview(null);
    setSelectedImage(null);
    setDecor([]);
    setIngredients([]);
    setType([]);
    setWeight([]);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    handleCreateLists();
    const product = {
      name: titleCake,
      category: category,
      description: description,
      imageId: photoId,
      components: componentsL,
      types: typesL,
      decors: decorL,
      servings: weightL,
    };
    dispatch(setProduct(product));
    dispatch(createProduct(product));
    handleClear();
  };

  return (
    <div className={`new-product ${openWindow ? "is-open" : ""}`}>
      <div className="new-product__container">
        <div className="new-product__heading">
          <h2 className="new-product__title">{title}</h2>
          <IoClose
            className="new-product__close-btn"
            onClick={handleOpenWindow}
          />
        </div>

        <form
          className="new-product__form"
          name="product"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleAddProduct}
        >
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
                  onChange={(e) => setTitleCake(e.target.value)}
                  value={titleCake}
                />
              </div>

              {preview ? (
                <div className="new-product__form-image-container">
                  <img
                    className="new-product__form-image"
                    alt="not found"
                    src={preview}
                    width="330"
                    height="310"
                  />
                </div>
              ) : (
                <div className="new-product__form-image-container"></div>
              )}

              <div className="new-product__form-upload">
                <label
                  htmlFor="product"
                  className="new-product__form-upload-label"
                >
                  Додати фото
                </label>
                <input
                  className="new-product__form-upload-input"
                  id="product"
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
                {preview && (
                  <a
                    className="new-product__form-upload-label"
                    onClick={handleDeleteImage}
                  >
                    Видалити
                  </a>
                )}
              </div>

              <textarea
                className="new-product__form-description"
                placeholder="Опис"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
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
                  id="categoryAdd"
                  list="categoriesAdd"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />

                <datalist id="categoriesAdd">
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
                setOptions={setProductIngredients}
                deleteState={handleDeleteIngredient}
                priceOption={false}
              />

              <InputPanel
                title="Вид"
                placeholder="Вид"
                nameId="type"
                state={type}
                setState={handleAddType}
                setOptions={setProductTypes}
                deleteState={handleDeleteType}
                priceOption={true}
              />

              <InputPanel
                title="Декор"
                placeholder="Декор"
                nameId="decor"
                state={decor}
                setState={handleAddDecor}
                setOptions={setProductDecor}
                deleteState={handleDeleteDecor}
                priceOption={true}
              />
            </div>

            <div className="new-product__form-column">
              <InputPanelPrice
                weight={weight}
                setWeightPrice={handleAddWeightPrice}
                setOptions={setProductWeight}
                deleteWeightPrice={handleDeleteWeightPrice}
              />
              <button
                type="submit"
                className="new-product__form-submit button-red"
                // onClick={handleAddProduct}
              >
                {submitBtnName}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export { AddProductModal };
