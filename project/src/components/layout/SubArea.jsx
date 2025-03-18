// SubArea 컴포넌트 - SubArea.jsx

import { Outlet } from "react-router-dom";

export default function SubArea() {
  return (
    <main className="sub-container" id="main">
      <Outlet />
    </main>
  );
} //////////// MainArea 컴포넌트 ///////////
