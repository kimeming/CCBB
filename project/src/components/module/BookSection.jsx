// 메인페이지 게시판 섹션
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import bookData from "../../js/data/book_data.json"; // 도서 데이터 임포트
import { monthlyData } from "../../js/data/monthly_data"; // 이달의도서 데이터 임포트
import { sortByNewest, sortByBest } from "../../js/function/sort-books"; // 정렬 함수

function BookSection() {
  const paginationRef = useRef(null); // paginationRef 생성
  const [selectedTab, setSelectedTab] = useState("newest");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 탭 변경 시 데이터 정렬
    const sortedBooks = selectedTab === "newest" ? sortByNewest(bookData) : sortByBest(bookData);
    setBooks(sortedBooks);
  }, [selectedTab]);

  return (
    <>
      {/* section-book s */}
      <section className="section book">
        <h2 className="blind">이달의 추천 도서, 신착도서, 베스트셀러 영역</h2>

        {/* 이달의 추천 도서 */}
        <div className="inner">
          <div className="monthly-book-wrap">
            <h3>이달의 추천 도서</h3>
            <div className="monthly-slide">
              <div className="book-info-wrap">
                <div className="book-info">
                  <div className="book-title">
                    <p>{monthlyData[0].bName}</p>
                    <a href="/monthly/recommend" className="more-btn">
                      <span className="blind">추천도서 더보기</span>
                    </a>
                  </div>
                  <ul className="book-info-list">
                    <li>
                      <em>작가</em>
                      <span>{monthlyData[0].bAuthor}</span>
                    </li>
                    <li>
                      <em>출판사</em>
                      <span>{monthlyData[0].bPublisher}</span>
                    </li>
                    <li>
                      <em>카테고리</em>
                      <span>{monthlyData[0].bGenre}</span>
                    </li>
                    <li>
                      <em>ISBN</em>
                      <span>{monthlyData[0].bNum}</span>
                    </li>
                    <li>
                      <em>상태</em>
                      <span>{monthlyData[0].bStatus}</span>
                    </li>
                  </ul>
                </div>
                <div className="slide-control">
                  <div className="btn-prev"></div>
                  <div ref={paginationRef} className="swiper-pagination">
                    <span className="swiper-pagination-current"></span> /{" "}
                    <span className="swiper-pagination-total"></span>
                  </div>
                  <div className="btn-next"></div>
                </div>
              </div>
              <div className="book-image">
                <Swiper
                  modules={[Navigation, Pagination]}
                  loop={true}
                  spaceBetween={20}
                  breakpoints={{
                    500: { slidesPerView: 1.5, centeredSlides: true },
                    768: { slidesPerView: 3, centeredSlides: true },
                    1024: { slidesPerView: 3, centeredSlides: false },
                  }}
                  pagination={{
                    el: paginationRef.current, // ref 연결
                    type: "fraction",
                  }}
                  navigation={{
                    nextEl: ".slide-control .btn-next",
                    prevEl: ".slide-control .btn-prev",
                  }}
                  className="monthlySwiper book-img-list"
                  onSwiper={(swiper) => {
                    if (paginationRef.current) {
                      swiper.params.pagination.el = paginationRef.current;
                      swiper.pagination.init();
                      swiper.pagination.update();
                    }
                  }}
                >
                  {[...monthlyData].map((book, index) => (
                    <SwiperSlide key={index} className="item">
                      <img src={`../img/monthly/img-${book.bImg}.jpg`} alt={book.bName} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        {/* 신착도서 & 베스트도서 */}
        <div className="inner">
          <div className="book-wrap">
            {/* 탭 버튼 */}
            <ul className="book-tab">
              <li className={selectedTab === "newest" ? "on" : ""}>
                <button type="button" onClick={() => setSelectedTab("newest")}>신착도서</button>
              </li>
              <li className={selectedTab === "best" ? "on" : ""}>
                <button type="button" onClick={() => setSelectedTab("best")}>베스트도서</button>
              </li>
            </ul>

            {/* 도서 목록 */}
            <div className="book-contents">
              <div className="book-tab-cont">
                  <Swiper
                    key={selectedTab} // 탭 변경 시 Swiper 리렌더링
                    loop={true}
                    slidesPerView={2.2}
                    spaceBetween={10}
                    navigation={{ nextEl: ".btn-next", prevEl: ".btn-prev" }}
                    breakpoints={{
                      500: { slidesPerView: 2.5 },
                      768: { slidesPerView: 3, spaceBetween: 15 },
                      1024: { slidesPerView: 4, spaceBetween: 25 },
                    }}
                    className="book-slide"
                  >
                    {books.map((book) => (
                      <SwiperSlide key={book.ISBN} className="item">
                         <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault(); // a태그 기본 동작 방지
                              navigate(`/book/${book.ISBN}`); // 상세 페이지 이동
                            }}
                          >
                          <img src={`../img/book/img-${book.ISBN}.jpg`} alt={book.title} />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
              </div>
            </div>
          </div>
        </div>
        {/* 스크롤 텍스트 */}
        <div className="scroll-text">
          <span>
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
            <img src="../img/main/bg-scroll-text.svg" alt="스크롤텍스트" />
          </span>
        </div>
      </section>
      {/* section-book e */}
    </>
  );
}

export default BookSection;
