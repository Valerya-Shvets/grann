import { ItemCard } from "../../components/ItemCard";
import { register } from "swiper/element/bundle";
import { useNavigate } from "react-router-dom";
import { BestsellersPagination } from "../../components/BestsellersPagination";
import { useDispatch, useSelector } from "react-redux";
import { getBestsellers } from "../../redux/actions/productsActions";
import { useEffect } from "react";
import api from "../../api/axios";
import { useState } from "react";
register();

function Bestsellers() {
  const navigate = useNavigate();
  const [bestsellersList, setBestsellersList] = useState([]);

  useEffect(() => {
    api
      .get("api/product/bestsellers")
      .then((response) => setBestsellersList(response.data))
      .catch((error) => console.log("error: ", error));
  }, []);

  return (
    <section className="bestsellers-section" id="bestsellers">
      <div className="container">
        <h2 className="bestsellers-section__title title">Бестселлери</h2>

        <BestsellersPagination products={bestsellersList} />

        {/* 
        /////////////
        Mobile list
        /////////////
        */}
        <ul className="bestsellers-section__list">
          <li>
            <ItemCard />
          </li>
          <li>
            <ItemCard />
          </li>
        </ul>
        <a
          href="#"
          className="bestsellers-section__button button"
          onClick={() => navigate("/catalog")}
        >
          Переглянути весь асортимент
        </a>
      </div>
    </section>
  );
}

export { Bestsellers };
