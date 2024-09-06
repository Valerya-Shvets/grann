import React from "react";
import { GiCook } from "react-icons/gi";
import { IoBookSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <aside className="menu">
      <nav>
        <ul className="menu__list">
          <li className="menu__item" onClick={() => navigate("/products")}>
            <IoBookSharp className="menu__item-icon" />
            <p>Каталог</p>
          </li>
          <li className="menu__item" onClick={() => navigate("/chefs")}>
            <GiCook className="menu__item-icon" />
            <p>Кухарі</p>
          </li>

          <li className="menu__item" onClick={() => navigate("/orders")}>
            <IoCalendarNumberOutline className="menu__item-icon" />
            <p>Замовлення</p>
          </li>
          <li className="menu__item" onClick={() => navigate("/settings")}>
            <IoMdSettings className="menu__item-icon" />
            <p>Налаштування</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export { Menu };
