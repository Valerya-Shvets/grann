import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "swiper/element/bundle";
import { CatalogCard } from "../components/CatalogCard";
import { ItemCard } from "../components/ItemCard";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { CatalogSwiperMobile } from "../components/CatalogSwiperMobile";
import { CatalogPagination } from "../components/CatalogPagination";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogProducts } from "../redux/actions/productsActions";
import { useEffect } from "react";
register();

function Catalog() {
  const dispatch = useDispatch();

  const catalogProducts = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getCatalogProducts());
    // console.log("catalog", catalogProducts);
  }, []);
  const navigate = useNavigate();

  const handleChecked = (e) => {
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked");
    } else {
      e.target.classList.add("checked");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="catalog-section">
          <div className="container">
            <p className="path">
              <a className="prev-path" onClick={() => navigate("/")}>
                Головна
              </a>
              / Каталог
            </p>
            <h2 className="catalog-section__title title">Каталог</h2>

            {/* 
            //////////////////
            Swiper for mobile
            //////////////////
            */}

            <CatalogSwiperMobile handleChecked={handleChecked} />

            <div className="catalog-section__categories">
              <div
                id="1"
                className="catalog-section__category"
                onClick={(e) => handleChecked(e)}
              >
                Торти
              </div>

              <div
                id="2"
                className="catalog-section__category"
                onClick={(e) => handleChecked(e)}
              >
                Тістечка
              </div>

              <div
                id="3"
                className="catalog-section__category"
                onClick={(e) => handleChecked(e)}
              >
                Шу
              </div>

              <div
                id="4"
                className="catalog-section__category"
                onClick={(e) => handleChecked(e)}
              >
                Піца
              </div>
            </div>

            <CatalogPagination products={catalogProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export { Catalog };
