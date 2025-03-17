//  도서대출
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Culture({ gnb1, gnb2 }) {
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        
      </div>
    </>
  );
}

export default Culture;
