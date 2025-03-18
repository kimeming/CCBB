// Gnb 컴포넌트 - Gnb.jsx
import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../../js/data/gnb_data.js";

function Gnb({}) {
  const navigate = useNavigate();
  return (
    <div className="gnb-wrap">
      <div className="gnb-top">
        <div className="gnb-util">
          <button 
          className="account-btn"
          onClick={() => {
            navigate(`/mypage`);
          }}
          >
            <span className="blind">나의공간</span>
          </button>
          <button className="menu-close-btn">
            <span className="blind">메뉴닫기</span>
          </button>
        </div>
      </div>
      <nav className="gnb">
        <ul className="gnb-list">
          {menu.map((v, i) => (
            <li className="dep1" key={i}>
              <Link to={v.sub[0].link}>{v.txt}</Link>
              <ul className="dep2">
                {v.sub.map((v2, i2) => (
                  <li key={i2}>
                    <Link to={v2.link}>{v2.txt}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Gnb;
