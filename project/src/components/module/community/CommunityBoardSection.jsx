import React from "react";
import { useNavigate } from "react-router-dom";

export const CommunityBoardSection = ({ props }) => {
  // props
  const data = props.data;
  const currentList = props.currentList;
  const navigate = useNavigate();

  const toggleListFn = (e) => {
    const list = document.querySelectorAll("#faq-tab .list");
    list.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
  };

  return (
    <div className="board-section">
      <div className="tab-content">
        <div id={`${data}-list`} className="table active">
          <div className="table-top">
            <ul>
              <li className="list-num">번호</li>
              <li className="list-title">제목</li>
              <li className="list-date">날짜</li>
              <li className="list-user">작성자</li>
            </ul>
          </div>
          <ul>
            {currentList.map((v, i) => (
              <li
                key={v.idx}
                className="list"
                data-type={v.type}
                data-key={v.idx}
                onClick={(e) => {
                  toggleListFn(e.currentTarget);
                }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (data === "freeboard" || data === "notice") {
                      navigate(`/community/${data}/${v.idx}`, { state: { user: v.user, listIdx: v.idx, data: data } });
                    }
                  }}
                >
                  <div className="list-header">
                    <p className="list-num">{i + 1}</p>
                    <p className="list-title">{v.title}</p>
                    <p className="list-date">{v.date}</p>
                    <p className="list-user">{v.user}</p>
                  </div>
                  {data === "faq" && (
                    <div className="list-info">
                      <strong>{v.content}</strong>
                    </div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
