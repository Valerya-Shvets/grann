function CategoryCard(props) {
  const { imgUrl, categoryName, categoryLink } = props;

  return (
    <>
      <div
        className="category-card"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + imgUrl})`,
        }}
      ></div>
      <a className="category-card__link" href={categoryLink}>
        {categoryName}
      </a>
    </>
  );
}

export { CategoryCard };
