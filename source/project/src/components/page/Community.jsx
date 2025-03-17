import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { GP } from "../module/Contexter";

// data
import communityData from "../../js/data/community_data.json";

// css
import "../../css/page/community.scss";

// components
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";
import { Pagenation } from "../module/community/Pagenation";
import { TabSection } from "../module/community/TabSection";
import { CommunityBoardSection } from "../module/community/CommunityBoardSection";

// 데이터 로컬스토리지 저장
if (!localStorage.community_data) {
  localStorage.setItem("community_data", JSON.stringify(communityData));
}
function Community({ gnb1, gnb2, data }) {
  const { results } = useParams();
  // hook
  const context = useContext(GP);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateSearchInput = location.state === null ? null : location.state.navigateSearchInput;
  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  // const userName = user !== null ? user.name : null;
  // console.log("유저", user, "유저이름", userName, "로그인 상황", loginState);

  // variables
  const searchOption = ["제목", "내용", "작성자"];
  const listData = JSON.parse(localStorage.getItem("community_data"))
    .filter((x) => x.type === data)
    .sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1));
  // useState
  const [activeTab, setActiveTab] = useState(data);
  // 검색 옵션
  const [selectOption, setSelectOption] = useState("제목");
  // 검색어 입력값
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState(listData);

  // function
  const handleSearchFn = (selectOption, value) => {
    if (value !== null) {
      if (selectOption === "제목") {
        setList(listData.filter((v) => v.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
      } else if (selectOption === "내용") {
        setList(listData.filter((v) => v.content.toLowerCase().trim().includes(value.toLowerCase().trim())));
      } else if (selectOption === "작성자") {
        setList(listData.filter((v) => v.user.toLowerCase().trim().includes(value.toLowerCase().trim())));
      }
      // 초기 검색값없을때 전체셋팅
    } else setBoardListFn(data);
  };

  const setBoardListFn = (e) => {
    const listData = JSON.parse(localStorage.getItem("community_data"));
    setList(listData.filter((x) => x.type === e).sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1)));
  };
  const goLogin = () => {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
  };
  // 레이아웃 렌더링
  useEffect(() => {
    setActiveTab(data);
    setBoardListFn(data);
    window.scrollTo(0, 0);
  }, [data]);
  useEffect(() => {
    if (navigateSearchInput !== null) {
      handleSearchFn(selectOption, navigateSearchInput);
    }
  }, [navigateSearchInput]);
  // 로그인 상태 확인

  // 페이지네이션 변수 할당
  const [currentPage, setcurrentPage] = useState(1);
  const perPage = 10;
  const totalPage = Math.ceil(list.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentList = list.slice(startIndex, endIndex);

  // pagenation props
  const pagenationProps = {
    data: data,
    user: user,
    loginState: loginState,
    totalPage,
    currentList,
    currentPage,
    setcurrentPage,
    goLogin: goLogin,
    setBoardListFn,
  };
  useEffect(() => {}, [setcurrentPage]);

  // props
  const seachBoxProps = {
    location: `/community/${data}/search`,
    searchOption: searchOption,
    selectOption: selectOption,
    setSelectOption: setSelectOption,
    setSearchInput: setSearchInput,
    navigateSearchInput: navigateSearchInput,
  };
  const TabSectionProps = {
    data: data,
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };
  const CommunityBoardSectionProps = {
    data: data,
    currentList: currentList,
  };

  // return
  return (
    <>
      {/* <!-- sub-top s --> */}
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      {/* <!-- sub-top e --> */}

      {/* <!-- contents s --> */}
      <div className="contents">
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
        <TabSection props={TabSectionProps} />
        <CommunityBoardSection props={CommunityBoardSectionProps} />
        <Pagenation props={pagenationProps} />
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
