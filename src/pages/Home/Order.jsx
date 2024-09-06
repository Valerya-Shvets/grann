function Order() {
  return (
    <section className="order-section" id="contacts">
      <div className="container">
        <div className="order-section__container">
          <div className="order-section__text-content">
            <h3 className="order-section__title">
              Давайте зробимо щось унікальне разом!
            </h3>
            <p className="order-section__paragraph">
              Ви можете замовити свій власний рецепт десерту, який вам буде до
              вподоби. Заповніть заявку та наш менеджер зв'яжється з вами, аби
              обговорити деталі замовлення.
            </p>
          </div>
          <form
            className="order-section__form"
            name="order-form"
            autoComplete="off"
          >
            <div className="input">
              <label
                className="input__label visually-hidden"
                htmlFor="user-name"
              >
                Ім'я
              </label>
              <input
                className="input__control"
                type="text"
                placeholder="Ім'я"
                name="user-name"
              />
            </div>
            <div className="input">
              <label
                className="input__label visually-hidden"
                htmlFor="phone-number"
              >
                Номер телефону
              </label>
              <input
                className="input__control"
                type="tel"
                placeholder="Номер телефону"
                name="phone-number"
              />
            </div>
            <textarea
              className="order-section__form-textarea input__control"
              name="user-wishes"
              id="user-wishes"
              cols="30"
              rows="10"
              placeholder="Опишіть ваші побажання:"
            ></textarea>
            <button className="order-section__form-button button" type="submit">
              Надіслати
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export { Order };
