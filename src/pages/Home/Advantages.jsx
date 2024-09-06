function Advantages() {
  return (
    <section className="advantages-section">
      <div className="container">
        <h2 className="advantages-section__title title">Чому саме Grann?</h2>
        <div className="advantages-section__container">
          <ul className="advantages-section__list">
            <li>
              <h3 className="advantages-section__item__heading">
                Всі інгредієнти свіжі та якісні!
              </h3>
              <p className="advantages-section__item__paragraph">
                Всі продукти замовляються тільки у тих постачальників, які мають
                сертифікати якості.
              </p>
            </li>
            <li>
              <h3 className="advantages-section__item__heading">
                Можливість замовити десерт згідно ваших побажань
              </h3>
              <p className="advantages-section__item__paragraph">
                Якщо з якихось причин ви не вживаєте окремі продукти десерту, є
                можливість зробити замовлення згідно ваших побажаннь.
              </p>
            </li>
            <li>
              <h3 className="advantages-section__item__heading">
                Зручна вага торту
              </h3>
              <p className="advantages-section__item__paragraph">
                Не обов'язково чекати на свято, щоб замовити смачненьке. Наша
                кондитерська робить мініторти і десерти. <br />
                <br />
                Мінімальна вага замовлення: Наполеон і медовик - від 0,5 кг.
                Мусові торти - від 0,8 кг.
              </p>
            </li>
          </ul>

          <div className="advantages-section__image-block">
            <div className="advantages-section__ins">
              <p
                className="advantages-section__ins-rotate"
                style={{ transform: "rotate(-20deg)" }}
              >
                from
              </p>
              <p className="advantages-section__ins-rotate">Grann</p>
              <p
                style={{ transform: "rotate(23deg)" }}
                className="advantages-section__ins-rotate"
              >
                with
              </p>
              <p
                style={{ transform: "rotate(25deg)" }}
                className="advantages-section__ins-rotate"
              >
                love
              </p>
            </div>
            <img
              className="advantages-section__img"
              src="./images/mobile-menu-cake.png"
              alt="Медовик з ягодами"
              width="355"
              height="295"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Advantages };
