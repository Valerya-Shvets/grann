import { useSelector } from "react-redux";

function CartProduct({ product }) {
  const handleTotal = () => {
    let sum = 0;

    const wPrice = product.servings.find(
      (item) => item.id === parseInt(product.selectedServing)
    );
    sum += wPrice.price;

    const tPrice = product.types.find(
      (item) => item.id === parseInt(product.selectedType)
    );
    sum += tPrice.price;

    const dPrice = product.decors.find(
      (item) => item.id === parseInt(product.selectedDecor)
    );
    sum += dPrice.price;

    product.sum = sum;

    return sum;
  };

  return (
    <article className="cart-product">
      <div className="cart-product__product-container">
        <div>
          <img
            className="cart-product__image"
            src={`http://localhost:5145/api/photo/${product.imageId}`}
            width="168"
            height="176"
          />
        </div>

        <div>
          <h3 className="cart-product__title">{product.name}</h3>
          <ul className="cart-product__list">
            <li className="cart-product__item">
              <p>Вид:</p>
              <p className="cart-product__item1">
                {
                  product.types.find((item) => item.id === product.selectedType)
                    .option
                }
              </p>
            </li>
            <li className="cart-product__item">
              <p>Декор:</p>
              <p className="cart-product__item1">
                {
                  product.decors.find(
                    (item) => item.id === product.selectedDecor
                  ).option
                }
              </p>
            </li>
            <li className="cart-product__item">
              <p>Вага:</p>
              <p className="cart-product__item1">
                {
                  product.servings.find(
                    (item) => item.id === product.selectedServing
                  ).option
                }
              </p>
            </li>
            <li className="cart-product__item accent">
              <p>Сума:</p>
              <p className="cart-product__item1">{`${handleTotal()} грн`}</p>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}

export { CartProduct };
