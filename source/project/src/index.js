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
import Culture from "./components/page/Culture";
import Article from "./components/page/Article";
import Post from "./components/page/Post";
import TotalSearch from "./components/page/TotalSearch";

// 공통 css
import "./css/common/_core.scss";

export default function MainComponent() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/apply/book" element={<Book gnb1="신청공간" gnb2="도서신청" />} />
          <Route path="/apply/culture" element={<Culture gnb1="신청공간" gnb2="강연신청" />} />
          <Route path="community/notice" element={<Community gnb1="열린공간" gnb2="공지사항" data="notice" />} />
          <Route path="community/notice/search/:results" element={<Community gnb1="열린공간" gnb2="공지사항" data="notice" />} />
          <Route path="community/notice/:id" element={<Article gnb1="열린공간" gnb2="공지사항" />} />
          <Route path="community/faq" element={<Community gnb1="열린공간" gnb2="FAQ" data="faq" />} />
          <Route path="community/faq/:results" element={<Community gnb1="열린공간" gnb2="FAQ" data="faq" />} />
          <Route path="community/freeboard" element={<Community gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          <Route path="community/freeboard/search/:results" element={<Community gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          <Route path="community/freeboard/:id" element={<Article gnb1="열린공간" gnb2="자유게시판" data="freeboard" />} />
          <Route path="community/freeboard/post" element={<Post gnb1="열린공간" gnb2="글쓰기" data="post" />} />
          <Route path="join" element={<Join gnb1="회원가입" gnb2="" />} />
          <Route path="login" element={<Login gnb1="로그인" gnb2="" />} />
          <Route path="mypage" element={<Mypage gnb1="마이페이지" gnb2="" />} />
          <Route path="search/booksearch" element={<BookSearch gnb1="자료검색" gnb2="도서검색" />} />
          <Route path="search/booksearch/:results" element={<BookSearch gnb1="자료검색" gnb2="도서검색" />} />
          <Route path="search/best" element={<BookList gnb1="자료검색" gnb2="베스트셀러" />} />
          <Route path="search/new" element={<BookList gnb1="자료검색" gnb2="신착도서" />} />
          <Route path="monthly/recommend" element={<Monthly gnb1="이달의도서" gnb2="편집장 추천 도서" />} />
          <Route path="book/:isbn" element={<BookDetail />} /> {/* 책 상세 페이지 */}
          <Route path="totalsearch" element={<TotalSearch />}>
            <Route path="totalsearch/:results" element={<TotalSearch />} />
          </Route>
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
