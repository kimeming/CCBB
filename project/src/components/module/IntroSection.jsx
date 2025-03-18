// 메인페이지 소개 섹션
import React from "react";
function IntroSection() {
  return (
    <>
      {/* section-intro s */}
      <section className="section intro">
        <div className="inner">
          <h2 className="intro-tit">
            당신의 취향을 발견하는 공간, <strong>칙칙북북</strong>입니다.
          </h2>
          <div className="link-box-wrap">
            <a href="/totalsearch" className="link-box">
              <p>대출하기</p>
              <span className="link-box-bg bg01"></span>
            </a>
            <a href="/book/reserve" className="link-box">
              <p>예약하기</p>
              <span className="link-box-bg bg02"></span>
            </a>
            <a href="/monthly/recommend" className="link-box">
              <p>추천도서</p>
              <span className="link-box-bg bg03"></span>
            </a>
            <a href="/community/notice" className="link-box">
              <p>열린공간</p>
              <span className="link-box-bg bg04"></span>
            </a>
          </div>
        </div>
      </section>
      {/* section-intro e */}
    </>
  );
}

export default IntroSection;
