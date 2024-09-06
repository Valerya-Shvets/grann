import { IoMdCart } from "react-icons/io";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { CartProduct } from "./CartProduct";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "./CartOrderCard";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cartProducts);

  const [isActive, setActive] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleOpenCart = () => {
    if (cartProducts.length !== 0) {
      setCartOpen(!cartOpen);
    } else {
      alert("Кошик порожній");
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__container">
            <nav className="header__navigation">
              <ul className="header__list">
                <li className="header__item">
                  <a
                    className="header__item-link"
                    onClick={() => navigate("/catalog")}
                  >
                    Каталог
                  </a>
                </li>
                <li className="header__item">
                  <a
                    className="header__item-link"
                    href="#bestsellers"
                    onClick={() => navigate("/")}
                  >
                    Бестселлери
                  </a>
                </li>
              </ul>

              <a href="/">
                <img
                  src="../../logoGrann.png"
                  className="header__logo"
                  alt="Grann logo"
                  width="90"
                  height="80"
                />
              </a>

              <ul className="header__list">
                <li className="header__item">
                  <a
                    className="header__item-link"
                    href="#delivery"
                    onClick={() => navigate("/")}
                  >
                    Доставка
                  </a>
                </li>
                <li className="header__item">
                  <a
                    className="header__item-link"
                    href="#contacts"
                    onClick={() => navigate("/")}
                  >
                    Контакти
                  </a>
                </li>
              </ul>
            </nav>

            <p className="header__cart-container">
              <IoMdCart className="header__cart" onClick={handleOpenCart} />
              <span className="header__cart-amount header__cart-amount--desktop">
                {cartProducts.length}
              </span>
            </p>

            <a className="header__item-link" onClick={() => navigate("/login")}>
              ВХІД
            </a>

            {/*           
            /////////////////
            Menu for mobile
            /////////////////
            */}
            <div className="header__container-icons">
              <IoMenu className="header__icon" onClick={handleToggle} />
              <IoMdCart className="header__icon" onClick={handleOpenCart} />
              <span className="header__cart-amount">{cartProducts.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/*           
        /////////////////
        Modal window for mobile
        /////////////////
      */}
      <div className={`mobile-menu ${isActive ? "is-open" : ""}`}>
        <IoClose className="mobile-menu__close-btn" onClick={handleToggle} />
        <nav>
          <ul className="mobile-menu__list">
            <li>
              <a
                className="mobile-menu__link"
                href="#bestsellers"
                onClick={() => navigate("/")}
              >
                Бестселлери
              </a>
            </li>
            <li>
              <a
                className="mobile-menu__link"
                href="#catalog"
                onClick={() => navigate("/catalog")}
              >
                Каталог
              </a>
            </li>
            <li>
              <a
                className="mobile-menu__link"
                href="#delivery"
                onClick={() => navigate("/")}
              >
                Доставка
              </a>
            </li>
          </ul>
        </nav>
        <div className="mobile-menu__ins">
          <p
            className="mobile-menu__ins-rotate"
            style={{ transform: "rotate(-20deg)" }}
          >
            from
          </p>
          <p className="mobile-menu__ins-rotate">Grann</p>
          <p
            style={{ transform: "rotate(23deg)" }}
            className="mobile-menu__ins-rotate"
          >
            with
          </p>
          <p
            style={{ transform: "rotate(25deg)" }}
            className="mobile-menu__ins-rotate"
          >
            love
          </p>
        </div>
        <img
          className="mobile-menu__image"
          src="./images/mobile-menu-cake.png"
          alt="Медовик з ягодами"
          width="182"
          height="152"
        />
      </div>

      {/*           
        /////////////////
        Modal window for cart order
        /////////////////
      */}

      <div className={`mobile-cart ${cartOpen ? "is-open" : ""}`}>
        <div className="container">
          <div className="mobile-cart__heading">
            <p>Ваше замовлення:</p>
            <IoClose
              className="mobile-cart__close-btn"
              onClick={handleOpenCart}
            />
          </div>
          {cartProducts.map((product) => {
            return <CartProduct product={product} key={product.id} />;
          })}
          <OrderCard />
        </div>
      </div>
    </>
  );
}

export { Header };
