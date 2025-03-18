import React from "react";
import { Link } from "react-router-dom";

export const TabSection = ({ props }) => {
  // props
  const data = props.data;
  const activeTab = props.activeTab;
  const setActiveTab = props.setActiveTab;

  return (
    <div className="tab-section">
      <div className="tabs">
        <div
          id="notice-tab"
          className={activeTab === "notice" ? "tab notice-tab-button active" : "tab notice-tab-button"}
          onClick={() => {
            setActiveTab("notice");
          }}
        >
          <Link to={"/community/notice"}>공지사항</Link>
        </div>
        <div
          id="faq-tab"
          className={activeTab === "faq" ? "tab faq-tab-button active" : "tab faq-tab-button"}
          onClick={() => {
            setActiveTab("faq");
          }}
        >
          <Link to={"/community/faq"}>FAQ</Link>
        </div>
        <div
          id="freeboard-tab"
          className={activeTab === "freeboard" ? "tab freeboard-tab-button active" : "tab freeboard-tab-button"}
          onClick={() => {
            setActiveTab("freeboard");
          }}
        >
          <Link to={"/community/freeboard"}>자유게시판</Link>
        </div>
      </div>
    </div>
  );
};
