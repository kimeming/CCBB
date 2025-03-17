// TopArea 컴포넌트 - TopArea.jsx
// data & Fn
import { Link, useLocation, useNavigate } from "react-router-dom";
import Gnb from "../module/Gnb";
import { GP } from "../module/Contexter";
import { menu2 } from "../../js/data/gnb_data";
import * as layoutFn from "../../js/function/layout.js";
import { memo, useContext, useEffect, useState } from "react";
import $ from "jquery";

export const TopArea = memo(({ gnb, setGnb, setSubTop }) => {
  // hook
  const context = useContext(GP);
  const navigate = useNavigate();

  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  const userName = user !== null ? user.name : null;
  // console.log("유저", user, "유저이름", userName, "로그인 상황", loginState);

  // valiables
  // 로그인 시 "로그인" 버튼을 제외한 메뉴 필터링
  const filteredMenu = menu2.filter((v) => !(loginState && (v.txt === "로그인" || v.txt === "회원가입")));

  // useState
  const [searchInput, setSearchInput] = useState("검색어를 입력해주세요!");

  // Fn
  // 로그아웃 처리 함수
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("loggedInUser");
      alert("로그아웃이 완료되었습니다.");
      navigate("/");
      console.clear();
      context.setLogin(false);
    }
  };

  // 로그인/로그아웃 클릭 처리
  const handleLoginLogoutClick = (v) => {
    if (v.txt === "로그아웃") {
      handleLogout();
    } else {
      navigate(v.link);
    }
  };

  useEffect(()=>{
    layoutFn.initLayout();
  },[]);

  return (
    <>
      <div className="dimm"></div>
      <div className="search-dimm"></div>
      {/* <!-- header s --> */}
      <header className="header">
        <div className="header-top">
          <ul className="link-list">
            {loginState && (
              <li>
                <button type="button" onClick={handleLogout} className="icon-logout">
                  로그아웃
                </button>
              </li>
            )}

            {/* 필터링된 메뉴 리스트 출력 */}
            {filteredMenu.map((v, i) => (
              <li key={i}>
                <button type="button" onClick={() => handleLoginLogoutClick(v)} className={"icon" + v.class}>
                  {v.txt}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="inner-header-wrap">
          <div className="inner-header">
            <h1 className="logo">
              <Link to="/">
                <img src="/img/common/logo-temp.svg" alt="로고" />
              </Link>
            </h1>
            <Gnb gnb={gnb} setGnb={setGnb} setSubTop={setSubTop} />
            <div className="header-util">
              <button
                type="button"
                className="total-search-btn"
                onClick={() => {
                  $("#mainSearchText").focus();
                }}
              >
                <span className="blind">통합검색 버튼</span>
              </button>
              <button type="button" className="search-close-btn">
                <span className="blind">통합검색 닫기 버튼</span>
              </button>
              <button type="button" className="menu-btn">
                <span className="blind">메뉴 버튼</span>
              </button>
            </div>
            <div className="pc-header-util">
              <button type="button" className="total-search-btn"></button>
              <button type="button" className="search-close-btn"></button>
            </div>
          </div>
        </div>
        <div className="search-wrap">
          <div className="search-form">
            <form action={() => navigate(`totalsearch/:${searchInput}`, { state: { navigateSearchInput: searchInput } })}>
              <fieldset>
                <legend className="blind">도서 통합검색 폼</legend>
                <input
                  type="text"
                  id="mainSearchText"
                  name="searchTxt"
                  title="검색어"
                  placeholder={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                  }}
                  onKeyUp={e=>{
                    if(e.key === 'Enter'){
                      layoutFn.searchClose();
                    }
                  }}
                />
                <button
                  type="button"
                  className="total-search-btn"
                  onClick={() => {
                    navigate(`totalsearch/:${searchInput}`, { state: { navigateSearchInput: searchInput } });
                    layoutFn.searchClose();
                  }}
                ></button>
              </fieldset>
            </form>
          </div>
        </div>
      </header>
    </>
  );
});
