import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  console.log(meta.pagination);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    console.log(pageNumber);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > pageCount) nextPage = 1;
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButton = [];
    // first button
    pageButton.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // dots
    if (page > 2) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-sm" key="dots-1">
          ...
        </button>
      );
    }

    // active current page
    if (page !== 1 && page !== pageCount) {
      pageButton.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    if (page < pageCount - 1) {
      pageButton.push(
        <button className="join-item btn btn-xs sm:btn-sm" key="dots-1">
          ...
        </button>
      );
    }

    // last button
    pageButton.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButton;
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <div className="mt-16 flex justify-end gap-1">
      <button
        className="btn btn-xs sm:btn-md join-item"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pageCount;
          handlePageChange(prevPage);
        }}
      >
        Prev
      </button>
      {renderPageButtons()}
      <button
        className="btn btn-xs sm:btn-md join-item"
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > pageCount) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default ComplexPaginationContainer;
