import React, { useState } from "react";
import SearchBox from "../module/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import $ from "jquery";

// css
import "../../css/page/totalsearch.scss";

function TotalSearch() {
  // data
  const bookData = JSON.parse(localStorage.getItem("book_data"));
  const communityData = JSON.parse(localStorage.getItem("community_data"));
  const noticeData = communityData.filter((v) => v.type === "notice");
  const freeboardData = communityData.filter((v) => v.type === "freeboard");
  const faqData = communityData.filter((v) => v.type === "faq");

  // hook
  const location = useLocation();
  const navigateSearchInput = location.state === null ? null : location.state.navigateSearchInput;
  console.log(navigateSearchInput);

  // useState
  const searchOption = ["통합검색"];
  const [searchInput, setSearchInput] = useState(navigateSearchInput);
  const [bookList, setbookList] = useState([]);
  const [noticeList, setnoticeList] = useState([]);
  const [freeboardList, setfreeboardList] = useState([]);
  const [faqList, setfaqList] = useState([]);
  console.log(searchInput);
  // Fn
  const handleSearchFn = (selectOption, value) => {
    if (value !== null) {
      
      setbookList(bookData.filter((book) => book.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
      setnoticeList(noticeData.filter((notice) => notice.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
      setfreeboardList(freeboardData.filter((freeboard) => freeboard.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
      setfaqList(faqData.filter((faq) => faq.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
    } else {
      setbookList([]);
      setnoticeList([]);
      setfreeboardList([]);
      setfaqList([]);
    }
  };
  useEffect(() => {
    setSearchInput(searchInput);
  }, [searchInput]);
  useEffect(() => {
    handleSearchFn(null, navigateSearchInput);
  }, [navigateSearchInput]);
  console.log(bookList);

  const seachBoxProps = {
    location: `/${location.pathname.split("/")[1]}`,
    searchOption: searchOption,
    selectOption: null,
    setSelectOption: null,
    setSearchInput: setSearchInput,
    navigateSearchInput: navigateSearchInput,
  };

  return (
    <>
      <div className="contents">
        <Outlet/>
        <SearchBox props={seachBoxProps} />
          {navigateSearchInput && (
        <div className="notice-search-results">
            <span>
              {bookList.length + noticeList.length + freeboardList.length + faqList.length > 0 ? (
                <>
                  <strong>"{navigateSearchInput}"</strong>
                  {` 에대한색결과 ${bookList.length + noticeList.length + freeboardList.length + faqList.length}건이 있습니다.`}
                </>
              ) : (
                "검색결과가 없습니다."
              )}
            </span>
        </div>
          )}
        <div className="search-result">
          <section className="result-section">
            <h3 className="category-tit">도서</h3>
            <div className="result-list books-list">
              <ul>
                {bookList.length > 0 ? (
                  bookList.map((v, i) => (
                    <li className="list" key={i}>
                      <Link to={`/book/${v.ISBN}`}>
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">공지사항</h3>
            <div className="result-list notice-list">
              <ul>
                {noticeList.length > 0 ? (
                  noticeList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section faq-list">
            <h3 className="category-tit">FAQ</h3>
            <div className="result-list">
              <ul>
                {faqList.length > 0 ? (
                  faqList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">자유게시판</h3>
            <div className="result-list freeboard-list">
              <ul>
                {freeboardList.length > 0 ? (
                  freeboardList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default TotalSearch;
