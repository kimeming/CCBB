import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Pagenation = memo(({ props }) => {
  const navigate = useNavigate();
  const data = props.data;
  const user = props.user;
  const goLogin = props.goLogin;
  const loginState = props.loginState;
  const currentPage = props.currentPage;
  const totalPage = props.totalPage;
  const currentList = props.currentList;
  const setcurrentPage = props.setcurrentPage;

  // Fn
  const handlePageChange = (currentPage) => {
    navigate(`/community/${data}?page=${currentPage}`);
  };
  const handleWrite = () => {
    if (!loginState) goLogin();
    else navigate(`/community/${data}/post`, {state:{data}});
  };

  // console.log("currentPage", currentPage, "totalPage", totalPage, "currentList", currentList);

  return (
    <div className="pagenate-section">
      <button type="button" className="btn-prev"></button>
      <ul>
        {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
          <li
            key={page}
            onClick={() => {
              handlePageChange();
              setcurrentPage(page);
              console.log("page", page);
            }}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </li>
          
        ))}
      </ul>
      <button type="button" className="btn-next"></button>

      {data === "freeboard" && (
        <button type="button" className="write-btn" onClick={handleWrite}>
          글쓰기
        </button>
      )}
      {user !== null
        ? (data === "notice" || data === "faq") &&
          user.id === 1 && (
            <button type="button" className="write-btn" onClick={handleWrite}>
              관리자
            </button>
          )
        : null}
    </div>
  );
});
