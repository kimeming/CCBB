import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function SubTop({ gnb1, gnb2 }) {
  const [isCopyActive, setIsCopyActive] = useState(false);
  const urlInputRef = useRef(null);

  // URL 값 설정
  useEffect(() => {
    if (urlInputRef.current) {
      urlInputRef.current.value = window.location.href;
    }
  }, [isCopyActive]); // 버튼 클릭 시 업데이트되도록 설정

  // URL 복사 기능
  const handleCopyUrl = () => {
    if (urlInputRef.current) {
      navigator.clipboard.writeText(urlInputRef.current.value)
        .then(() => alert("URL 주소가 복사 되었습니다."))
        .catch(() => alert("URL 복사에 실패했습니다."));
    }
  };

  // 프린트 기능
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="sub-top">
      <ul className="breadcrumb">
        <li className="home">
          <Link to="/">
            <span className="icon home"></span>
          </Link>
        </li>
        <li className="1depth">{gnb1}</li>
        {gnb2 && <li className="2depth">{gnb2}</li>}
      </ul>
      <div className="title-box">
        <h3 className="sub-title">{gnb2 || gnb1}</h3>
        <ul className="sub-link">
          <li className="link-copy">
            <button
              type="button"
              className={isCopyActive ? "active" : ""}
              onClick={() => setIsCopyActive(!isCopyActive)}
            >
              <img src="/img/common/icon-link.svg" alt="링크 공유 버튼" />
            </button>
            {isCopyActive && (
              <div className="url-copy on">
                <input type="text" id="urlCopy" ref={urlInputRef} readOnly />
                <label htmlFor="urlCopy"></label>
                <button type="button" onClick={handleCopyUrl}>복사</button>
              </div>
            )}
          </li>
          <li className="link-print">
            <button type="button" onClick={handlePrint}>
              <img src="/img/common/icon-print.svg" alt="페이지 프린트 버튼" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SubTop;
