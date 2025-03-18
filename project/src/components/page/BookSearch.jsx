//  Search 컴포넌트 - Search.jsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../../js/function/sort-books";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// data
import booksData from "../../js/data/book_data.json";

// compnents
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

// css
import "../../css/page/book-list.scss";
import "../../css/page/search.scss";

function BookSearch({ gnb1, gnb2 }) {
  const booksList = [...booksData];
  const searchOption = ["도서명", "저자명", "ISBN", "출판사", "장르"];
  const navigate = useNavigate();
  const location = useLocation();
  const navigateSearchInput = location.state ? location.state.navigateSearchInput : null;
  console.log(navigateSearchInput);
  // useState
  // 검색 옵션
  const [selectOption, setSelectOption] = useState("도서명");
  // 검색어 입력값
  const [searchInput, setSearchInput] = useState("");
  // 북데이터
  const [list, setList] = useState(booksList);
  // 무한스크롤
  const [page, setPage] = useState(1);
  // 스크롤한번에 보여줄 list 개수
  const visibleLIstCount = 10;
  // 페이지개수 리미트
  const limitPage = Math.ceil(list.length / visibleLIstCount);
  console.log(visibleLIstCount, limitPage);
  // ref : 이것은 React의 ref 객체이다. 감지하고자 하는 DOM 요소에 이 ref를 할당해야 한다.
  // inView : 이것은 불리언(boolean) 값이다. 감시하고 있는 요소가 화면에 보일 때 true가 되고, 화면에서 벗어날 때 false가 된다.
  // threshold : 요소의 어느부분이 뷰포트에 들어와야 inView가 true가 될지 결정 - 0~1의값
  const [ref, inView] = useInView({ threshold: 0 });

  // Fn
  const handleSearchFn = (selectOption, navigateSearchInput) => {
    if (navigateSearchInput !== null) {
      if (selectOption === "도서명") {
        setList(booksList.filter((book) => book.title.toLowerCase().includes(navigateSearchInput.toLowerCase())));
      } else if (selectOption === "저자명") {
        setList(booksList.filter((book) => book.author.toLowerCase().includes(navigateSearchInput.toLowerCase())));
      } else if (selectOption === "ISBN") {
        setList(booksList.filter((book) => book.ISBN.toLowerCase().includes(navigateSearchInput.toLowerCase())));
      } else if (selectOption === "출판사") {
        setList(booksList.filter((book) => book.publisher.toLowerCase().includes(navigateSearchInput.toLowerCase())));
      } else if (selectOption === "장르") {
        setList(booksList.filter((book) => book.genre.toLowerCase().includes(navigateSearchInput.toLowerCase())));
      }
    } else {
      setList(booksList);
    }
  };
  const loadingFn = () => {
    if (inView) {
      // 화면에 보이는 경우 실행할 로직
      setTimeout(() => {
        setPage(page + 1);
        console.log("로딩중~~", page);
      }, 900);
    }
  };
  // useEffect
  // 무한스크롤
  useEffect(() => {
    loadingFn();
  }, [inView]);
  useEffect(() => {
    handleSearchFn(selectOption, navigateSearchInput);
  }, [navigateSearchInput]);
  useEffect(() => {
    console.log(list);
  }, [handleSearchFn]);

  const seachBoxProps = {
    location: `/search/booksearch`,
    searchOption: searchOption,
    selectOption: selectOption,
    setSelectOption: setSelectOption,
    setSearchInput: setSearchInput,
    navigateSearchInput: navigateSearchInput,
  };

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        {/* 도서 리스트 */}
        <SearchBox props={seachBoxProps} />
        {navigateSearchInput && (
          <div className="notice-search-results">
            <span>
              {list.length > 0 ? (
                <>
                  <strong>"{navigateSearchInput}"</strong>
                  {` 에대한색결과 ${list.length}건이 있습니다.`}
                </>
              ) : (
                "검색결과가 없습니다."
              )}
            </span>
          </div>
        )}
        <div className="book-list-wrap">
          {/* <SearchNotice/> */}
          <ul className="book-list">
            {list.map(
              (book, i) =>
                i < visibleLIstCount * page && (
                  <li key={book.ISBN}>
                    <a
                      href="#"
                      className="item"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/book/${book.ISBN}`); // 상세 ��이지 이���
                      }}
                    >
                      <div className="img-box">
                        <img src={`/img/book/img-${book.ISBN}.jpg`} alt={book.title} />
                      </div>
                      <div className="text-box">
                        <div className="book-tit">
                          <p>{book.title}</p>
                          <span className="label">{getCategory(book.ISBN)}</span>
                        </div>
                        <ul className="book-info">
                          <li>
                            <em>저자</em>
                            <span className="writer">{book.author}</span>
                          </li>
                          <li>
                            <em>출판사</em>
                            <span className="publisher">{book.publisher}</span>
                          </li>
                        </ul>
                      </div>
                    </a>
                  </li>
                )
            )}
          </ul>

          {list.length > 10 && page < limitPage && (
            <section ref={ref} className="loading-area">
              {inView === true && <FontAwesomeIcon className="icon-spinner" icon={faSpinner} size="2x" spinPulse />}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default BookSearch;
