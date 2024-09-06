import React from "react";
import { IoMdSettings } from "react-icons/io";
import {
  IoCalendarNumberOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PiPasswordFill } from "react-icons/pi";

function MenuChef() {
  const navigate = useNavigate();
  return (
    <aside className="menu">
      <nav>
        <ul className="menu__list">
          <li className="menu__item" onClick={() => navigate("/chef-orders")}>
            <IoCalendarNumberOutline className="menu__item-icon" />
            <p>Замовлення</p>
          </li>
          <li className="menu__item" onClick={() => navigate("/chef-private")}>
            <IoPersonCircleOutline className="menu__item-icon" />
            <p>Змінити дані</p>
          </li>
          <li className="menu__item" onClick={() => navigate("/chef-password")}>
            <PiPasswordFill className="menu__item-icon" />
            <p>Змінити пароль</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export { MenuChef };
