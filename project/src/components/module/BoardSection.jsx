import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import boardData from "../../js/data/community_data.json";

function BoardSection() {
  const [selectedTab, setSelectedTab] = useState("notice");
  const navigate = useNavigate();

  // 선택된 탭에 맞는 데이터 필터링 후 상위 5개만 가져오기
  const filteredData = boardData
    .filter((item) => item.type === selectedTab)
    .slice(0, 5);

  // 탭에 따른 링크 경로 설정
  const moreLink = selectedTab === "notice" ? "/community/notice" : "/community/freeboard";

  return (
    <section className="section board">
      <div className="inner">
        <div className="board-wrap">
          {/* 탭 버튼 */}
          <div className="board-top">
            <ul className="board-tab">
              <li className={selectedTab === "notice" ? "on" : ""}>
                <button type="button" onClick={() => setSelectedTab("notice")}>
                  공지사항
                </button>
              </li>
              <li className={selectedTab === "freeboard" ? "on" : ""}>
                <button type="button" onClick={() => setSelectedTab("freeboard")}>
                  자유게시판
                </button>
              </li>
            </ul>
            {/* 더보기 버튼 */}
            <a href={moreLink} className="more-btn">
              <span className="blind">게시글 더보기</span>
            </a>
          </div>

          {/* 게시판 내용 */}
          <div className="board-box">
            <ul className="board-content on">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <li key={item.idx}>
                    <a 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // a태그 기본 동작 방지
                      navigate(`/community/${selectedTab === "notice" ? "notice" : "freeboard"}/${item.idx}`, 
                        { state: { user: item.user, listIdx: item.idx, data: selectedTab }}); // 상세 페이지 이동
                    }} 
                    className="item">
                      <div className="list-tit">
                        <span className={`label ${selectedTab === "notice" ? "pink" : "mint"}`}>
                          {selectedTab === "notice" ? "공지" : "자유"}
                        </span>
                        <p>{item.title}</p>
                      </div>
                      <span className="date">{item.date}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li>게시글이 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BoardSection;
