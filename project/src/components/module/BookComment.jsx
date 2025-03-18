import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import commentData from "../../js/data/book_comment_data.json";
import { GP } from "../module/Contexter";

export default function BookComment() {
  const { isbn } = useParams();
  const context = useContext(GP);

  // 로그인 정보
  const loginState = context.loginState.isLogin;
  const user = loginState ? context.user : null;
  const userName = user ? user.name : null;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const bookLocalComments = savedComments.filter(
      (comment) => comment.bookISBN === isbn
    );
    const bookDataComments = commentData.filter(
      (comment) => comment.bookISBN === isbn
    );
    setComments([...bookLocalComments, ...bookDataComments]);
  }, [isbn]);

  // 댓글 등록
  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      bookISBN: isbn,
      name: userName,
      text: newComment,
    };

    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    localStorage.setItem(
      "comments",
      JSON.stringify([...savedComments, newCommentObj])
    );

    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  // 댓글 수정
  const handleEditComment = (id, text) => {
    setEditCommentId(id);
    setNewComment(text);
  };

  const handleSaveEdit = () => {
    const updatedComments = comments.map((comment) =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );

    setComments(updatedComments);

    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedSavedComments = savedComments.map((comment) =>
      comment.id === editCommentId ? { ...comment, text: newComment } : comment
    );
    localStorage.setItem("comments", JSON.stringify(updatedSavedComments));

    setNewComment("");
    setEditCommentId(null);
  };

  // 댓글 삭제
  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);

    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedSavedComments = savedComments.filter(
      (comment) => comment.id !== id
    );
    localStorage.setItem("comments", JSON.stringify(updatedSavedComments));
  };

  return (
    <>
      <div className="comment-wrap">
        <h4 className="comment-tit">한줄코멘트</h4>
        <ul className="comment-list">
          {comments.map((comment) => (
            <li
              key={comment.id || comment.text}
              className={comment.name === userName ? "my-comment" : ""}
            >
              <div className="comment">
                <span className="name">{comment.name}</span>
                <p>{comment.text}</p>
              </div>
              {comment.name === userName && comment.id && (
                <div className="comment-util">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditComment(comment.id, comment.text)}
                  >
                    수정
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {user ? (
          <>
            <strong className="noti">
              광고, 비방, 근거 없는 악성댓글, 욕설 등은 임의로 삭제될 수 있어요
            </strong>
            <div className="reply-wrap">
              <textarea
                name="reply"
                id="reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="button"
                className="reply-btn"
                onClick={editCommentId ? handleSaveEdit : handleCommentSubmit}
              >
                {editCommentId ? "수정하기" : "등록하기"}
              </button>
            </div>
          </>
        ) : (
          <p className="login-message">로그인 후 이용 가능해요</p>
        )}
      </div>
    </>
  );
}
