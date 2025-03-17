import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GP } from "../module/Contexter";
import $ from "jquery";

// data
// component
import SubTop from "../module/SubTop";
// css
import "../../css/page/community.scss";
import "../../css/page/article.scss";

function Article({ gnb1, gnb2 }) {
  // hook
  const context = useContext(GP);
  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  const userName = user !== null ? user.name : null;
  // console.log("유저", user, "유저이름", userName, "로그인 상황", loginState);

  // 데이터
  const { id } = useParams();
  const listIdx = location.state.listIdx;
  const data = location.state.data;
  const typeBranch = gnb2 === "공지사항" ? "notice" : "freeboard";
  const communityData = JSON.parse(localStorage.getItem("community_data"));
  const articleData = communityData.find((v) => v.type === typeBranch && v.idx === Number(id));
  const commentList = articleData.comment.sort((a, b) => (a.date == b.date ? 0 : a.date < b.date ? -1 : 1));
  // useState
  const [comment, setComment] = useState(commentList);

  // Fn
  // ================ handleGoBack
  const handleGoBack = () => {
    window.history.back();
  };

  // ================ goLogin
  const goLogin = () => {
    if (!loginState) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };
  // ================ enterKey
  const enterKey = (e) => {
    let commentText = $(e.target).val();
    if (e.key === "Enter") {
      if (commentText !== "") postData(commentText, userName);
      else {
        alert("한글자 이상 입력해주세요.");
      }
    }
  };

  // ================ getTxt
  const getTxt = () => {
    let commentText = $("#text-comment").val();
    console.log(commentText);
    if (commentText !== "") postData(commentText, userName);
    else {
      alert("한글자 이상 입력해주세요.");
    }
  };

  // ================ postData
  const postData = (commentText, userName) => {
    let today = new Date();
    const formattedDate = `
    ${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() + 1 < 10 ? "0" + (today.getDate() + 1) : today.getDate() + 1}`.trim();
    postComment(userName, formattedDate, commentText);
  };

  // ================ postComment
  const postComment = (userName, formattedDate, commentText) => {
    if (commentList.length > 0) {
      let temp = Math.max.apply(null,commentList.map((v) => v.cNum));
      commentList.push({
        cNum: temp + 1,
        name: userName,
        date: formattedDate,
        comment: commentText,
      });
    } else {
      commentList.push({
        cNum: 1,
        name: userName,
        date: formattedDate,
        comment: commentText,
      });
    }
    localStorage.setItem("community_data", JSON.stringify(communityData));
    setComment(commentList);
    window.location.reload();
    $("#text-comment").val("");
  };

  // ================d eleteArticle
  const deleteArticle = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const updatedArticle = communityData.filter((v) => v!==articleData);
      localStorage.setItem("community_data", JSON.stringify(updatedArticle));
      navigate(`/community/${data}`);
    }
  };

  // ================ deleteComment
  const deleteComment = (cNum, data) => {
    let getCommentData = JSON.parse(localStorage.getItem("community_data"));
    let filterCommentData = getCommentData.find((v) => v.type === data && v.idx === listIdx).comment;
    let updateComment = filterCommentData.filter((v) => v.cNum !== cNum);
    getCommentData.find((v) => v.type === data && v.idx === listIdx).comment = updateComment;
    setComment(updateComment);
    console.log(getCommentData);
    localStorage.setItem("community_data", JSON.stringify(getCommentData));
  };

  // useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
 
  // 로그인 상태 확인
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="content">
          <div className="article-section">
            <div className="article-header">
              <div className="article-title">
                <h3>{articleData.title}</h3>
              </div>
              <div className="writer-info">
                <div className="profile">{articleData.user}</div>
                <div className="date">{articleData.date}</div>
                {articleData.user === userName && (
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => {
                      deleteArticle();
                    }}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
            <div className="article-content">
              {data === "freeboard" && articleData.image !== "" && <img src={`/img/freeboard/${articleData.image}.jpg`} alt="사용자 이미지" />}
              {String(articleData.content)
                .split(".")
                .map((v, i) => (
                  <p key={i}>{v}</p>
                ))}
            </div>
            <div className="underline"></div>
            <div className="comment">
              <h4>댓글</h4>
              <ul className="comment-list">
                {comment.map((v) => (
                  <li className="comment-item" key={v.cNum}>
                    <div className="comment-top">
                      <p className="comment-writer">{v.name}</p>
                      <span className="comment-date">{v.date}</span>
                    </div>
                    <div className="comment-content">
                      <p>{v.comment}</p>
                    </div>
                    {v.name === userName && (
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => {
                          if (window.confirm("삭제하시겠습니까?")) {
                            deleteComment(v.cNum, data);
                            alert("삭제제되었습니다.");
                          } else return;
                        }}
                      >
                        삭제
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <div className="form-group write-comment">
                <textarea id="text-comment" name="comment" placeholder={!loginState ? "로그인하고 댓글을 남겨보세요!" : "댓글을 작성해보세요!"} required />
                <button
                  onClick={() => {
                    if (loginState) {
                      getTxt();
                      // alert("등록되었습니다.");
                    } else if (!loginState) {
                      goLogin();
                    }
                  }}
                  type="button"
                  className="register-btn"
                >
                  등록
                </button>
              </div>
              <button className="to-list" type="submit" onClick={handleGoBack}>
                목록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
