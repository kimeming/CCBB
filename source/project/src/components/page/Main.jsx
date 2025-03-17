//  Main 컴포넌트 - Main.jsx
import { useRef } from "react"; // react

// component
import IntroSection from "../module/IntroSection.jsx"
import BoardSection from "../module/BoardSection.jsx"
import BookSection from "../module/BookSection.jsx"

// import { sortByBest, sortByNewest } from "../../js/function/sort-books.js";

import "../../css/page/main.scss";
import "../../js/function/main.js";

function Main() {
  return (
    <>
      <IntroSection></IntroSection>
      <BoardSection></BoardSection>
      <BookSection></BookSection>
    </>
  );
}

export default Main;
