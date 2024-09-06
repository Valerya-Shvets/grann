import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Switch from "react-switch";
import { useDispatch } from "react-redux";

function InputPanelPrice({
  weight,
  setWeightPrice,
  deleteWeightPrice,
  setOptions,
}) {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <div className="input-panel__options">
        <p>Вага</p>
        <Switch
          onChange={handleChange}
          checked={checked}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={"#2f80ed"}
          offColor={"#2f80ed"}
        />
        <p>Кількість</p>
      </div>

      <div className="input-panel-price__container">
        <div className="input-panel input-admin">
          <label
            className="input-panel__label input-admin__label visually-hidden"
            htmlFor={checked ? "amount" : "weight"}
          >
            {checked ? "Кількість" : "Вага"}
          </label>
          <input
            className="input-panel__input input-admin__control"
            type="text"
            placeholder={checked ? "Кількість" : "Вага"}
            id={checked ? "amount" : "weight"}
            onBlur={(e) =>
              dispatch(
                setOptions({
                  id: checked ? "amount" : "weight",
                  value: e.target.value,
                })
              )
            }
            onChange={handleValue}
            required
          />
        </div>

        <div className="input-panel input-admin">
          <label
            className="input-panel__label input-admin__label visually-hidden"
            htmlFor="price"
          >
            Ціна
          </label>
          <input
            className="input-panel__input input-admin__control"
            type="text"
            placeholder="Ціна"
            id="price"
            onBlur={(e) =>
              dispatch(
                setOptions({
                  id: checked ? "amount" : "weight",
                  value: value,
                  price: e.target.value,
                })
              )
            }
            onChange={handlePrice}
            required
          />
        </div>
      </div>

      {weight &&
        weight.map((w) => (
          <div className="input-panel-price__container" key={w}>
            <div className="input-panel input-admin">
              <label
                className="input-panel__label input-admin__label visually-hidden"
                htmlFor={w}
              >
                {checked ? "Кількість" : "Вага"}
              </label>
              <input
                className="input-panel__input input-admin__control"
                type="text"
                placeholder={checked ? "Кількість" : "Вага"}
                id={w}
                onBlur={(e) =>
                  dispatch(setOptions({ id: w, value: e.target.value }))
                }
                onChange={handleValue}
                required
              />
            </div>

            <div className="input-panel input-admin">
              <label
                className="input-panel__label input-admin__label visually-hidden"
                htmlFor={w}
              >
                Ціна
              </label>
              <input
                className="input-panel__input input-admin__control"
                type="text"
                placeholder="Ціна"
                id={w}
                onBlur={(e) =>
                  dispatch(
                    setOptions({
                      id: w,
                      value: value,
                      price: e.target.value,
                    })
                  )
                }
                onChange={handlePrice}
                required
              />
            </div>
            <TiDelete
              className="input-panel__delete-btn"
              onClick={() => deleteWeightPrice(w)}
            />
          </div>
        ))}

      <a className="input-panel__more-btn more-btn" onClick={setWeightPrice}>
        +
      </a>
    </>
  );
}

export { InputPanelPrice };
