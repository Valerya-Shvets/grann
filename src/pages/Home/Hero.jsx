import { LiaTelegram } from "react-icons/lia";
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <h1 className="hero-section__title">Grann</h1>
        <p className="hero-section__paragraph">авторські десерти</p>
        <div className="hero-section__flex-container">
          <div className="hero-section__container-image">
            <img
              className="hero-section__img"
              src="./images/hero-section-cake.png"
              alt="Шоколадний торт з вишнями"
              width="545"
              height="340"
            />
          </div>
          <div className="hero-section__socials">
            <ul>
              <li>
                <a href="">
                  <LiaTelegram className="hero-section__link" />
                </a>
              </li>
              <li>
                <a href="">
                  <TiSocialFacebook className="hero-section__link" />
                </a>
              </li>
              <li>
                <a href="">
                  <FaInstagram className="hero-section__link" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          className="hero-section__button button"
          onClick={() => navigate("/catalog")}
        >
          До каталогу
        </a>
      </div>
    </section>
  );
}

export { Hero };
