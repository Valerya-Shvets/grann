import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CatalogCard(props) {
  const { imgUrl, imgAlt, cakeName, price, weight } = props;
  const navigate = useNavigate();

  return (
    <article className="catalog-card">
      <img
        className="catalog-card__image"
        src="./images/bestsellers1.jpeg"
        alt="Cake"
        width="168"
        height="185"
      />
      <div className="catalog-card__flex-container">
        <a className="catalog-card__name" onClick={() => navigate("/product")}>
          Мусовий торт “Манго-маракуйя”
        </a>
        <IoMdCart className="catalog-card__cart" />
      </div>
      <p className="catalog-card__price">1200 грн/ 3 кг</p>
    </article>
  );
}

export { CatalogCard };
