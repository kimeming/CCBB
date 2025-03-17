import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom"; 
import { GP } from "../module/Contexter";
import { FooterArea } from "./FooterArea";
import MainArea from "./MainArea";
import SubArea from "./SubArea";
import { TopArea } from "./TopArea";

export default function Layout() {
  // 로그인 데이터
  const user = sessionStorage.getItem("loggedInUser") 
    ? JSON.parse(sessionStorage.getItem("loggedInUser")) 
    : null;
  const [isLogin, setLogin] = useState(user ? true : false);
  const loginState = { isLogin, setLogin };

  // 현재 경로 가져오기
  const location = useLocation();
  const isMainPage = location.pathname === "/" || location.pathname === "/home";

  // 📌 오늘 날짜와 8일 후 날짜 설정
  const today = useMemo(() => new Date(), []);
  const testToday = useMemo(() => {
    const newDate = new Date(today);
    // 오늘 날짜
    // newDate.setDate(newDate.getDate());
    // 8일 후 날짜
    newDate.setDate(newDate.getDate() + 8);
    return newDate;
  }, [today]);

  return (
    <GP.Provider value={{ user, loginState, setLogin, testToday }}>
      <TopArea />
      {isMainPage ? <MainArea /> : <SubArea />}
      <FooterArea />
    </GP.Provider>
  );
}
