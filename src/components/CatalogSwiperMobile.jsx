import React from "react";

function CatalogSwiperMobile({ handleChecked }) {
  return (
    <swiper-container
      slides-per-view="2.5"
      space-between={10}
      class="catalog-section__swiper"
    >
      <swiper-slide
        onClick={(e) => handleChecked(e)}
        class="catalog-section__slide"
        style={{ width: "fit-content" }}
      >
        <div id="1" className={`catalog-section__category`}>
          Торти
        </div>
      </swiper-slide>
      <swiper-slide
        onClick={(e) => handleChecked(e)}
        class="catalog-section__slide"
        style={{ width: "fit-content" }}
      >
        <div id="2" className={`catalog-section__category`}>
          Тістечка
        </div>
      </swiper-slide>
      <swiper-slide
        onClick={(e) => handleChecked(e)}
        class="catalog-section__slide"
        style={{ width: "fit-content" }}
      >
        <div id="3" className={`catalog-section__category`}>
          Шу
        </div>
      </swiper-slide>
      <swiper-slide
        onClick={(e) => handleChecked(e)}
        class="catalog-section__slide"
        style={{ width: "fit-content" }}
      >
        <div id="4" className={`catalog-section__category`}>
          Піца
        </div>
      </swiper-slide>
    </swiper-container>
  );
}

export { CatalogSwiperMobile };
