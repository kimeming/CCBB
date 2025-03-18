import React, { useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 JS
import "./css/common/_core.scss";
import Main from "./components/page/Main";
import Book from "./components/page/Book";
import Community from "./components/page/Community";
import Error from "./components/page/Error";
import Join from "./components/page/Join";
import Mypage from "./components/page/Mypage";
import Login from "./components/page/Login";
import BookSearch from "./components/page/BookSearch";
import Monthly from "./components/page/Monthly";
import BookList from "./components/page/BookList";
import BookDetail from "./components/page/BookDetail";
import Article from "./components/page/Article";
import Post from "./components/page/Post";
import TotalSearch from "./components/page/TotalSearch";

// 공통 css
import "./css/common/_core.scss";

export default function MainComponent() {
  return (
    <BrowserRouter basename="/CCBB">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 메인  */}
          <Route index element={<Main />} />
          {/* 도시신청  */}
          <Route path="/apply/book" element={<Book gnb1="신청공간" gnb2="도서신청" />} />
          {/* 커뮤니티 공지  */}
          <Route path="community/notice" element={<Community gnb1="열린공간" gnb2="공지사항" data="notice" />} />
          {/* 커뮤니티 공지 검색  */}
          <Route path="community/notice/search/:results" element={<Community gnb1="열린공간" gnb2="공지사항" data="notice" />} />
          {/* 커뮤니티 공지 보기  */}
          <Route path="community/notice/:id" element={<Article gnb1="열린공간" gnb2="공지사항" />} />
          {/* 커뮤니티 공지 글쓰기  */}
          <Route path="community/notice/post" element={<Post gnb1="열린공간" gnb2="공지사항" data="notice" />} />
          {/* 커뮤니티 faq  */}
          <Route path="community/faq" element={<Community gnb1="열린공간" gnb2="FAQ" data="faq" />} />
          {/* 커뮤니티 faq 검색 */}
          <Route path="community/faq/search/:results" element={<Community gnb1="열린공간" gnb2="FAQ" data="faq" />} />
          {/* 커뮤니티 faq 글쓰기  */}
          <Route path="community/faq/post" element={<Post gnb1="열린공간" gnb2="FAQ" data="faq" />} />
          {/* 커뮤니티 자유게시판  */}
          <Route path="community/freeboard" element={<Community gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          {/* 커뮤니티 자유게시판 검색 */}
          <Route path="community/freeboard/search/:results" element={<Community gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          {/* 커뮤니티 자유게시판 보기 */}
          <Route path="community/freeboard/:id" element={<Article gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          {/* 커뮤니티 자유게시판 글쓰기 */}
          <Route path="community/freeboard/post" element={<Post gnb1="열린공간" gnb2="글쓰기" data="post" />} />
          {/* 회원가입 */}
          <Route path="join" element={<Join gnb1="회원가입" gnb2="" />} />
          {/* 로그인 */}
          <Route path="login" element={<Login gnb1="로그인" gnb2="" />} />
          {/* 마이페이지 */}
          <Route path="mypage" element={<Mypage gnb1="마이페이지" gnb2="" />} />
          {/* 도서검색 */}
          <Route path="search/booksearch" element={<BookSearch gnb1="자료검색" gnb2="도서검색" />} />
          {/* 도서검색 검색어 */}
          <Route path="search/booksearch/:results" element={<BookSearch gnb1="자료검색" gnb2="도서검색" />} />
          {/* 베스트도서 */}
          <Route path="search/best" element={<BookList gnb1="자료검색" gnb2="베스트셀러" />} />
          {/* 신착도서 */}
          <Route path="search/new" element={<BookList gnb1="자료검색" gnb2="신착도서" />} />
          {/* 이달의 도서 */}
          <Route path="monthly/recommend" element={<Monthly gnb1="이달의도서" gnb2="사서 추천 도서" />} />
          {/* 책 대출창 */}
          <Route path="book/:isbn" element={<BookDetail />} /> {/* 책 상세 페이지 */}
          {/* 통합검색 */}
          <Route path="totalsearch" element={<TotalSearch />} />
          {/* 통합검색 검색어 */}
          <Route path="totalsearch/:results" element={<TotalSearch />} />
          {/* 에러페이지 */}
          <Route path="error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const ScrollTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // console.log("라우터경로:", pathname);
  }, [pathname]);
  return null;
};

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(<MainComponent />);
