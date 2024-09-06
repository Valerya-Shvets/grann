import React from "react";
import { useState } from "react";
import { useId } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { setProductIngredients } from "../../redux/actions/productsActions";

function InputPanel(props) {
  const {
    title,
    placeholder,
    nameId,
    state,
    setState,
    deleteState,
    setOptions,
    priceOption,
  } = props;

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  // const handleClearState = () => {
  //   console.log("clear");
  //   setValue("");
  //   setPrice("");
  //   return "";
  // };

  return (
    <>
      <p className="input-panel__paragraph">{title}</p>
      <div className="input-panel__field input-admin">
        <label
          className="input-panel__label input-admin__label visually-hidden"
          htmlFor={nameId}
        >
          {title}
        </label>
        <div className="input-panel__container">
          <input
            className="input-panel__input margin input-admin__control"
            type="text"
            placeholder={placeholder}
            id={nameId}
            onBlur={(e) =>
              dispatch(setOptions({ id: nameId, value: e.target.value }))
            }
            onChange={handleValue}
            required
          />
          {priceOption ? (
            <input
              className="input-panel__input margin input-admin__control"
              type="text"
              placeholder="Ціна"
              onBlur={(e) =>
                dispatch(
                  setOptions({
                    id: nameId,
                    value: value,
                    price: e.target.value,
                  })
                )
              }
              onChange={handlePrice}
              required
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {state &&
        state.map((item) => (
          <div className="input-panel__field input-admin" key={item}>
            <label
              className="input-panel__label input-admin__label visually-hidden"
              htmlFor={item}
            >
              {title}
            </label>
            <div className="input-panel__container">
              <input
                className="input-panel__input margin input-admin__control"
                type="text"
                placeholder={placeholder}
                id={item}
                onBlur={(e) =>
                  dispatch(setOptions({ id: item, value: e.target.value }))
                }
                onChange={handleValue}
                required
              />
              {priceOption ? (
                <input
                  className="input-panel__input margin input-admin__control"
                  type="text"
                  placeholder="Ціна"
                  onBlur={(e) =>
                    dispatch(
                      setOptions({
                        id: item,
                        value: value,
                        price: e.target.value,
                      })
                    )
                  }
                  onChange={handlePrice}
                  required
                />
              ) : (
                <></>
              )}
              <TiDelete
                className="input-panel__delete-btn"
                onClick={() => deleteState(item)}
              />
            </div>
          </div>
        ))}
      <a className="input-panel__more-btn more-btn" onClick={setState}>
        +
      </a>
    </>
  );
}

export { InputPanel };
