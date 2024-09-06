import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ItemCard } from "./ItemCard";

function CatalogPagination({ products }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 15;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  return (
    <>
      <ul className="catalog-section__list">
        {currentItems.map((product) => {
          return (
            <ItemCard
              key={product.id}
              product={product}
              productId={product.id}
              imgId={product.imageId}
              cakeName={product.name}
              price={product.serving.price}
              weight={product.serving.option}
            />
          );
        })}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="←"
        renderOnZeroPageCount={null}
        containerClassName="catalog-section__pagination"
        pageLinkClassName="catalog-section__pagination-num"
        previousLinkClassName="catalog-section__pagination-arrow"
        nextLinkClassName="catalog-section__pagination-arrow"
        activeLinkClassName="catalog-section__pagination--active"
      />
    </>
  );
}

export { CatalogPagination };
