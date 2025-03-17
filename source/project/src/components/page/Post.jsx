import React, { use, useContext, useState } from "react";
import { GP } from "../module/Contexter";
import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";

// css
import "../../css/page/post.scss";
// component
import SubTop from "../module/SubTop";

function Post({ gnb1, gnb2 }) {
  // hook
  const context = useContext(GP);
  const navigate = useNavigate();
  const postLocation = useLocation();

  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  const userName = user !== null ? user.name : null;
  console.log("유저", user, "유저이름", userName, "로그인 상황", loginState);

  const getContent = () => {
    const title = $("#title").val();
    const content = $("#text-content").val();
    if (title === "" || content === "") {
      alert("제목과 내용을 모두 입력하세요.");
    } else {
      setArticle(title, content);
      alert("등록되었습니다.");
      navigate("/community/freeboard");
    }

    console.log(title, content);
  };
  const setArticle = (title, content) => {
    const communityData = JSON.parse(localStorage.getItem("community_data"));
    let freeboardList = communityData.filter((v) => v.type === "freeboard");
    let filterIdx = freeboardList.map((v) => v.idx);
    let maxIdx = Math.max(...filterIdx);
    if (localStorage.community_data) {
      const communityData = JSON.parse(localStorage.getItem("community_data"));
      const today = new Date().toJSON().substr(0, 10);
      communityData.push({
        idx: Number(maxIdx) + 1,
        type: "freeboard",
        image: "",
        title: title,
        user: userName,
        id: user.id,
        content: content,
        date: today,
        comment: [],
      });
      localStorage.setItem("community_data", JSON.stringify(communityData));
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="post-section">
        <div className="write-board">
          <form action="write_process.php" method="post" encType="multipart/form-data">
            <div className="write-form">
              <div className="form-group title">
                <input type="text" id="title" name="title" placeholder="제목" required />
              </div>
              <div className="form-group text-content">
                <input id="text-content" name="content" placeholder="내용을 입력하세요." required />
              </div>
              <div className="btn-wrap">
                <button type="button" className="submit-btn" onClick={getContent}>
                  등록
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => {
                    handleGoBack();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
