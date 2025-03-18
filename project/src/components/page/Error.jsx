//  Error 컴포넌트 - Error.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";

// css
import "../../css/page/error.scss";

function Error() {
  return (
    <div className="contents">
      <div className="error-wrap">
        <img src="../img/main/error.png" alt="error" />
        <div className="text-wrap">
          <h2>서비스 이용 불가</h2>
          <p>
            현재 서비스가 일시적으로 중단되었습니다. 
            <br></br>
            잠시 후 다시 시도해 주세요.
          </p>
          <p>불편을 드려 죄송합니다.</p>
        </div>
        <a href="/" className="homepage">홈페이지로 돌아가기</a>
      </div>
    </div>
  );
}

export default Error;
