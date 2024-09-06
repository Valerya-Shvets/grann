import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productsActions";
import { useEffect } from "react";
import { addCartProduct } from "../redux/actions/cartActions";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product.product);

  const [tabIndex, setTabIndex] = useState(0);
  const [weight, setWeight] = useState(0);
  const [priceW, setPriceW] = useState(0);
  const [decor, setDecor] = useState(0);
  const [type, setType] = useState(0);

  const handlePriceWeight = (e) => {
    setWeight(parseInt(e.target.value));
    const wPrice = product.servings.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setPriceW(wPrice.price);
  };

  const handleDecor = (e) => {
    setDecor(parseInt(e.target.value));
    console.log(decor);
  };

  const handleType = (e) => {
    setType(parseInt(e.target.value));
    console.log(type);
  };

  const handleTotal = () => {
    let sum = 0;
    if (weight) {
      const wPrice = product.servings.find(
        (item) => item.id === parseInt(weight)
      );
      sum += wPrice.price;
    }
    if (type) {
      const tPrice = product.types.find((item) => item.id === parseInt(type));
      sum += tPrice.price;
    }
    if (decor) {
      const dPrice = product.decors.find((item) => item.id === parseInt(decor));
      sum += dPrice.price;
    }

    return sum;
  };

  const handleValidate = () => {
    if (weight === 0 || decor === 0 || type === 0) {
      alert("Слід обрати всі опції!");
      return;
    } else {
      let orderProduct = structuredClone(product);
      orderProduct.selectedServing = weight;
      orderProduct.selectedDecor = decor;
      orderProduct.selectedType = type;
      dispatch(addCartProduct(orderProduct));
      alert("Товар додано у кошик!");
    }
  };

  useEffect(() => {
    console.log("product", product);
    dispatch(getProduct(id));
  }, []);

  if (product.servings === undefined) return "Loading...";

  return (
    <>
      <Header />
      <main>
        <section className="product-section">
          <div className="container">
            <p className="product-section__path path">
              <a className="prev-path" onClick={() => navigate("/")}>
                Головна
              </a>
              /
              <a className="prev-path" onClick={() => navigate("/catalog")}>
                Каталог
              </a>
              / {product.name}
            </p>

            <h3 className="product-section__title">{product.name}</h3>

            <div className="product-section__flex-container">
              <div>
                <img
                  className="product-section__image"
                  src={`http://localhost:5145/api/photo/${product.imageId}`}
                  width="355"
                  height="372"
                />
              </div>

              <div className="product-section__info">
                <h3 className="product-section__title-desktop">
                  {product.name}
                </h3>

                <div className="product-section__standart">
                  <ul className="product-section__list">
                    {product.components.map((item) => {
                      return <li>{item}</li>;
                    })}
                  </ul>

                  <div className="product-section__weight-price">
                    <select
                      className="product-section__select select"
                      name="weight"
                      id="weight"
                      onChange={handlePriceWeight}
                    >
                      <option value="" selected disabled hidden>
                        Вага готового виробу
                      </option>
                      {product.servings !== undefined
                        ? product.servings.map((item) => {
                            return (
                              <>
                                <option value={item.id}>{item.option}</option>
                              </>
                            );
                          })
                        : ""}
                    </select>
                    <p>Вартість: {priceW} грн</p>
                  </div>
                </div>

                <div className="product-section__selects">
                  <select
                    className="product-section__select select"
                    name="appearance"
                    id="appearance"
                    onChange={handleType}
                  >
                    <option value="" selected disabled hidden>
                      Вид
                    </option>
                    {product.types !== undefined
                      ? product.types.map((item) => {
                          return (
                            <option
                              value={item.id}
                            >{`${item.option}  +  ${item.price} грн`}</option>
                          );
                        })
                      : ""}
                  </select>

                  <select
                    className="product-section__select select"
                    name="decoration"
                    id="decoration"
                    onChange={handleDecor}
                  >
                    <option value="" selected disabled hidden>
                      Декор
                    </option>
                    {product.decors.map((item) => {
                      return (
                        <option
                          value={item.id}
                        >{`${item.option}  +  ${item.price} грн`}</option>
                      );
                    })}
                  </select>
                </div>

                <hr className="product-section__line line" />
                <div className="product-section__price-container">
                  <p className="product-section__price">
                    Загалом: {handleTotal()} грн
                  </p>
                  <button
                    className="product-section__button button-brown"
                    type="button"
                    onClick={handleValidate}
                  >
                    Додати у кошик
                  </button>
                </div>
              </div>
            </div>

            <Tabs
              className="product-section__tabs"
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="product-section__tab-list">
                <Tab
                  className={`product-section__tab-list-t ${
                    tabIndex == 0 ? "checked" : ""
                  }`}
                >
                  Опис
                </Tab>
                <Tab
                  className={`product-section__tab-list-t ${
                    tabIndex == 1 ? "checked" : ""
                  }`}
                >
                  Умови зберігання
                </Tab>
                <Tab
                  className={`product-section__tab-list-t ${
                    tabIndex == 2 ? "checked" : ""
                  }`}
                >
                  Доставка
                </Tab>
              </TabList>

              <TabPanel>
                <p>{product.description}</p>
              </TabPanel>
              <TabPanel>
                <p>
                  Зберігати в холодильнику при температурі до +6°С не більше 3-х
                  діб.
                </p>
              </TabPanel>
              <TabPanel>
                <p>Доставка здійснюється двома способами: </p>
                <ol>
                  <li>Самовивіз з Металургійного р-ну м. Кривого Рогу</li>
                  <li>На таксі (за тарифами служби таксі) </li>
                </ol>
              </TabPanel>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export { Product };
