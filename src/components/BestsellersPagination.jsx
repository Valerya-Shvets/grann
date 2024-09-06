import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ItemCard } from "./ItemCard";

function BestsellersPagination({ products }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 3;

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
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="←"
        renderOnZeroPageCount={null}
        containerClassName="bestsellers-section__pagination"
        pageLinkClassName="bestsellers-section__pagination-num"
        previousLinkClassName="bestsellers-section__pagination-arrow"
        nextLinkClassName="bestsellers-section__pagination-arrow"
        activeLinkClassName="bestsellers-section__pagination--active"
      />
      <ul className="bestsellers-section__swiper">
        {currentItems.map((product) => {
          return (
            <ItemCard
              productId={product.id}
              imgId={product.imageId}
              cakeName={product.name}
              price={product.serving.price}
              weight={product.serving.option}
            />
          );
        })}
      </ul>
    </>
  );
}

export { BestsellersPagination };
