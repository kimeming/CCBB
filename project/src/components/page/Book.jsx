//  Book 컴포넌트 - Book.jsx
// import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Book({ gnb1, gnb2 }) {
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="sub-section">
          <p className="section-tit">희망도서 신청</p>
          <div className="inner">
            <ul className="bullet-list">
              <li>
                <span className="bullet type1 step1">신청 대상</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">도서관 회원이면 누구나 신청 가능</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      14세 미만 회원은 법적 대리인의 동의 필요
                    </span>
                  </li>
                </ul>
              </li>

              <li>
                <span className="bullet type1 step1">신청 방법</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      도서관 홈페이지 로그인 후 온라인 신청
                    </span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      자료실 방문하여 신청서 작성 후 제출
                    </span>
                  </li>
                </ul>
              </li>

              <li>
                <span className="bullet type1 step1">처리 기간</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">신청 후 약 2~3주의 검토 및 구입 기간 소요</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">도서 도착 후 SMS 또는 이메일로 안내</span>
                  </li>
                </ul>
              </li>

              <li>
                <span className="bullet type1 step1">제외 대상 도서</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">이미 소장 중이거나 구입 예정 도서</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">품절·절판된 도서</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">과도하게 고가의 도서</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">수험서, 문제집, 학습지, 전집류</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">유해 간행물 및 개인 취향이 강한 도서</span>
                  </li>
                </ul>
              </li>

              <li>
                <span className="bullet type1 step1">유의사항</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      신청 후 구입이 확정되더라도 사정에 따라 변경될 수 있음
                    </span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      신청 도서는 신청자의 우선 대출이 가능 (1주일 이내)
                    </span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">
                      신청 내역 확인은 마이페이지에서 가능
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
