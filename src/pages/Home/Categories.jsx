import { CategoryCard } from "../../components/CategoryCard";

function Categories() {
  return (
    <section className="categories-section">
      <div className="container">
        <ul className="categories-section__list">
          <li className="categories-section__item">
            <CategoryCard
              imgUrl="/images/categories1.jpeg"
              categoryName="Торти"
              categoryLink="#"
            />
          </li>
          <li className="categories-section__item">
            <CategoryCard
              imgUrl="/images/categories2.jpeg"
              categoryName="Шу"
              categoryLink="#"
            />
          </li>
          <li className="categories-section__item">
            <CategoryCard
              imgUrl="/images/categories3.jpeg"
              categoryName="Тістечка"
              categoryLink="#"
            />
          </li>
          <li className="categories-section__item">
            <CategoryCard
              imgUrl="/images/categories4.jpeg"
              categoryName="Піца"
              categoryLink="#"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export { Categories };
