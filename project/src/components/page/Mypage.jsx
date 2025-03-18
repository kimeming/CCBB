//  Mypage 컴포넌트 - Mypage.jsx
import { useEffect, useState, useContext, useRef } from 'react';
import { initCardEffect } from '../module/mypage/levelCardFn';
import { useNavigate } from 'react-router-dom';
import { GP } from '../module/Contexter';
import confetti from 'canvas-confetti'; // 폭죽 라이브러리
import SubTop from '../module/SubTop';
import mypage from '../../css/page/mypage.scss';
import book_data from '../../js/data/book_data.json';
import badge_data from '../../js/data/badge_data.json';

// 로컬스토리지 도서 데이터 저장 (초기 1회)
if (!localStorage.getItem('book_data')) {
  localStorage.setItem('book_data', JSON.stringify(book_data));
}

// ISBN을 통해 책의 장르를 찾는 함수
const getGenreByISBN = (book) => {
  if (!book || !book.isbn) {
    return null; // isbn이 없으면 null 반환
  }

  const foundBook = book_data.find(
    (b) => b.ISBN && b.ISBN.toString().toLowerCase() === book.isbn.toLowerCase()
  );
  return foundBook ? foundBook.genre : null; // 장르가 없다면 null 반환
};

// 뱃지 데이터
const badgeData = badge_data;

function Mypage({ gnb1, gnb2 }) {
  const navigate = useNavigate();
  const context = useContext(GP);
  const [userTemp, setUser] = useState(null);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [picked, setPicked] = useState(0);
  const [currentBook, setCurrentBook] = useState(0);
  const [finished, setFinished] = useState(0);
  const [pickedBooks, setPickedBooks] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [modalContent, setModalContent] = useState(''); // 모달에 표시할 내용
  const [completedBadges, setCompletedBadges] = useState([]);

  const [showMoreModal, setShowMoreModal] = useState(false);
  const cardRef = useRef(null);

  // 레벨 버튼 클릭 핸들러
  const handleMoreClick = () => {
    setShowMoreModal(true);
  };

  // 모달 닫기 함수
  const closeMoreModal = () => {
    setShowMoreModal(false);
  };

  // 로그인 useContext 관리
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;

  // 세션스토리지 데이터가 없는 경우 알림창 호출 및 메인페이지 강제이동
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/login');
      alert('로그인이 필요합니다.');
    } else {
      // 대출, 찜, 완독 데이터가 있는지 확인 후 업데이트
      if (user.iLoveIt && Array.isArray(user.iLoveIt)) {
        setPicked(user?.iLoveIt ?? []);
      } else {
        setPicked([]);
      }

      if (user.currentData && Array.isArray(user.currentData)) {
        setCurrentBook(user?.currentData ?? []);
      } else {
        setCurrentBook([]);
      }

      if (user.bData && Array.isArray(user.bData)) {
        setFinished(user?.bData ?? []);
      } else {
        setFinished([]);
      }

      // 유저 레벨 업데이트
      updateLevel(user.bData.length || 0);
    }
  }, [user, navigate]);

  // picked의 isbn , book_data의 isbn 비교 후 책 정보 저장
  useEffect(() => {
    if (picked.length > 0) {
      const books = picked
        .map((isbn) =>
          book_data.find(
            (book) => book.ISBN.toLocaleLowerCase() == isbn.toLocaleLowerCase()
          )
        ) // 일치여부
        .filter((book) => book !== undefined); // 존재하는 책만 필터링
      setPickedBooks(books); // 찾은 책 목록을 상태로 저장
    }
  }, [picked]);

  // 레벨 계산 함수
  const updateLevel = (booksRead) => {
    let lvl = 1,
      needed = 0;

    if (booksRead >= 12) {
      lvl = 4;
      needed = 0;
    } else if (booksRead >= 6) {
      lvl = 3;
      needed = 6 - booksRead;
    } else if (booksRead >= 3) {
      lvl = 2;
      needed = 3 - booksRead;
    }

    setLevel(lvl);

    const minBooks = getMinBooks(lvl);
    const maxBooks = getMaxBooks(lvl);
    setCurrent(booksRead - minBooks);
    setTotal(maxBooks - minBooks + 1);
    setProgress(((booksRead - 1 - minBooks) / (maxBooks - minBooks)) * 100);
  };
  // 레벨 최소도서
  const getMinBooks = (lvl) => {
    return [0, 0, 3, 6, 12][lvl];
  };

  // 레벨 최대도서
  const getMaxBooks = (lvl) => {
    return [0, 2, 5, 11, 30][lvl];
  };

  useEffect(() => {
    // 로컬스토리지에서 member_data 가져오기
    if (user) {
      const memberData = localStorage.getItem('member_data');
      if (memberData) {
        const parsedMembers = JSON.parse(memberData);

        // 로그인 유저 프로필 이미지 찾기
        const currentUser = parsedMembers.find(
          (member) => member.id === user.id
        );
        if (currentUser && currentUser.profileImage) {
          setProfileImage(currentUser.profileImage); // 프로필 이미지 상태 업데이트
        } else {
          // 프로필 이미지가 없으면 기본 이미지 설정
          setProfileImage('/img/sub/img-profile-temp.png');
        }
      }
    }
  }, []);

  // 프로필 이미지 선택 핸들러
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64로 이미지 데이터 변환
        setProfileImage(base64Image);

        // 로컬스토리지에 Base64 이미지 URL 저장
        const memberData = localStorage.getItem('member_data');
        if (memberData) {
          const parsedMembers = JSON.parse(memberData);

          if (user) {
            // memberData 배열에서 로그인 데이터 찾아서 프로필 이미지 업데이트
            const updatedMembers = parsedMembers.map((member) =>
              member.id === user.id
                ? { ...member, profileImage: base64Image }
                : member
            );

            // 로컬스토리지에 업데이트된 member_data 저장
            localStorage.setItem('member_data', JSON.stringify(updatedMembers));

            // 세션스토리지에서 로그인한 유저의 프로필 이미지 업데이트
            user.profileImage = base64Image;
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
          }
        }
      };
      reader.readAsDataURL(file); // Base64로 변환
    }
  };

  // 뱃지 시스템 시작 //
  const badges = badgeData;

  // ISBN 장르추출 //
  const getGenreByISBN = (isbn) => {
    const prefix = isbn.toString().slice(0, 3); // ISBN 앞 3자리 추출

    switch (prefix) {
      case '996':
        return '문학';
      case '997':
        return '인문사회과학';
      case '998':
        return '예술';
      case '999':
        return '매거진';
      default:
        return null; // 장르를 찾을 수 없으면 null 반환
    }
  };

  useEffect(() => {
    if (user) {
      if (Array.isArray(user.bData) && user.bData.length > 0) {
        // 카테고리별로 대출된 책의 수를 카운트
        const genreCount = {
          문학: 0,
          인문사회과학: 0,
          예술: 0,
          매거진: 0,
        };

        // ISBN을 통해 카테고리 추출 후 카운트
        user.bData.forEach((book) => {
          const genre = getGenreByISBN(book); // ISBN을 통해 카테고리 추출
          if (genre && genre in genreCount) {
            genreCount[genre]++;
          }
        });

        // 각 카테고리에서 3권 이상 대출한 경우 활성화된 뱃지 필터링
        const unlockedBadges = badgeData.filter((badge) => {
          const genre = badge.badgeDescription.split(' ')[0]; // 뱃지 설명에서 카테고리 추출
          return genreCount[genre] >= 3;
        });

        setUnlockedBadges(unlockedBadges); // 활성화된 뱃지 업데이트
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (Array.isArray(user.bData) && user.bData.length > 0) {
        // 카테고리별로 대출된 책의 수를 카운트
        const genreCount = {
          문학: 0,
          인문사회과학: 0,
          예술: 0,
          매거진: 0,
        };

        // ISBN을 통해 카테고리 추출 후 카운트
        user.bData.forEach((book) => {
          const genre = getGenreByISBN(book); // 카테고리 추출
          if (genre) {
            genreCount[genre]++;
          }
        });

        // 각 카테고리에서 3권 이상 대출한 경우 활성화된 뱃지 필터링
        const unlockedBadges = badgeData.filter((badge) => {
          const genre = badge.badgeDescription.split(' ')[0]; // 뱃지 설명에서 카테고리 추출
          return genreCount[genre] >= 3;
        });

        if (user.bData.length >= 5) {
          unlockedBadges.push({
            badgeTitle: '칙칙북북 킹',
            badgeDescription: '누적 대출도서 5권 달성',
            badgeSrc: '/img/sub/img-badge-king.png',
            badgeAlt: '누적 대출도서 5권 달성 뱃지',
          });
        }

        const badgesWithAnimation = unlockedBadges.map((badge) => ({
          ...badge,
          isActive: true, // 애니메이션 상태 추가
        }));
        setUnlockedBadges(badgesWithAnimation); // 활성화된 뱃지 업데이트

        //  폭죽 실행된 뱃지 정보
        const setCelebratedBadges = user.setCelebratedBadges || [];


        // 이번에 새롭게 활성화된 뱃지만 필터링
        const newBadges = unlockedBadges.filter(
          (badge) =>
            !completedBadges.includes(badge.badgeTitle) &&
            !setCelebratedBadges.includes(badge.badgeTitle)
        );

        if (newBadges.length > 0) {
          // 새로운 뱃지가 하나라도 있으면 한 번만 실행
          setCompletedBadges((prevBadges) => [
            ...prevBadges,
            ...newBadges.map((badge) => badge.badgeTitle),
          ]);

          setShowModal(true); // 모달을 띄운다.
          setModalContent(`축하합니다! 새로운 뱃지를 획득하셨습니다!`);
          triggerConfetti(); // 폭죽 애니메이션 실행

          // 실행된 뱃지를 user 데이터에 저장
          const updatedUser = {
            ...user,
            setCelebratedBadges: [
              ...setCelebratedBadges,
              ...newBadges.map((badge) => badge.badgeTitle),
            ],
          };

          setUser(updatedUser);
          sessionStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
        }
      }
    }
  }, [user, completedBadges]); // 의존성 배열에 `user`와 `completedBadges`만 포함;; // completedBadges가 변경될 때마다 실행

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 폭죽을 3초 동안 터뜨리기
    const interval = setInterval(() => {
      confetti({
        particleCount: 7,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
      });
      if (Date.now() > end) {
        clearInterval(interval); // 폭죽을 끝낸다.
      }
    }, 100);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // 유저 데이터 변경이 있을 때 데이터 저장

  useEffect(() => {
    if (user) {
      // 세션스토리지에서 유저 데이터 가져오기
      const sessionUserData = JSON.parse(
        sessionStorage.getItem('loggedInUser')
      );

      if (sessionUserData) {
        // 로컬스토리지에서 기존 member_data 가져오기
        const localStorageMemberData =
          JSON.parse(localStorage.getItem('member_data')) || [];

        // 로컬스토리지의 member_data와 세션스토리지의 유저 데이터를 비교
        const existingMember = localStorageMemberData.find(
          (member) => member.id === sessionUserData.id
        );

        // 유저 데이터가 다르거나, 새로운 데이터가 있을 경우 업데이트
        if (!existingMember) {
          // 새 유저 데이터를 로컬스토리지에 추가
          localStorage.setItem(
            'member_data',
            JSON.stringify([...localStorageMemberData, sessionUserData])
          );
        } else {
          // 유저 데이터가 변경된 경우 (예: 뱃지 추가 등)
          const updatedMemberData = localStorageMemberData.map((member) =>
            member.id === sessionUserData.id
              ? { ...member, ...sessionUserData }
              : member
          );

          // 변경된 유저 데이터를 로컬스토리지에 저장
          localStorage.setItem(
            'member_data',
            JSON.stringify(updatedMemberData)
          );
        }
      }
    }
  }, [user]); // user 상태가 변경될 때마다 실행

  // 남은 뱃지 계산 //
  const unlockedSet = new Set(unlockedBadges.map(badge => badge.badgeTitle));
  const lockedBadges = badgeData.filter(badge => !unlockedSet.has(badge.badgeTitle));

  // 레벨 카드 //
  useEffect(() => {
    if (cardRef.current) {
      initCardEffect(cardRef.current);
    }
  },[showMoreModal]);

  return (
    <>
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>{modalContent}</h2>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}

      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='contents'>
        <div className='mypage-wrap'>
          <div className='inner-section profile-wrap'>
            <div className='profile-box'>
              <div className='profile-image'>
                <img
                  src={profileImage || '/img/sub/img-profile-temp.png'} // 선택한 이미지나 기본 이미지
                  alt='프로필 이미지'
                  onClick={() =>
                    document.getElementById('profile-image-input').click()
                  } // 이미지 클릭 시 파일 선택
                />
                <input
                  type='file'
                  id='profile-image-input'
                  style={{ display: 'none' }}
                  onChange={handleProfileImageChange}
                />
              </div>
              <div className='user-info'>
                {/* user 상태로부터 직접 렌더링 */}
                {user && (
                  <>
                    <p className='user-name'>{user.name}</p>
                    <span className='user-id'>{user.id}</span>
                  </>
                )}
                <div className='next-level'>
                  <p>다음 레벨까지</p>
                  <div className='progress'>
                    <span
                      className='bar'
                      style={{ width: `${progress}%` }}
                    ></span>
                  </div>
                  <p className='left'>
                    <span className='current'>{current}</span> /{' '}
                    <span className='total'>{total}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='level-box' onClick={handleMoreClick}>
                <div className='level'>
                  <img
                    src={`/img/sub/img-level${level}.svg`}
                    alt={`레벨 ${level}`}
                    className='level-img'
                  />
                  <div className='level-txt'>
                    <p>
                      LV.<span className='level-num'>{level}</span>
                    </p>
                    <em>
                      {
                        [
                          '독서 뚜벅이',
                          '독서 러너',
                          '독서 부릉이',
                          '독서광 폭주열차',
                        ][level - 1]
                      }
                    </em>
                  </div>
                </div>
                <a href='#' className='more-btn' ></a>
              </div>
              {showMoreModal && (
                  <div className='more-modal'>
                    <div className='modal-content'>
                      <div ref={cardRef} className="card">
                        <img
                        className='img'
                        src={`/img/sub/img-level${level}.png`} />
                      </div>
                      <button onClick={closeMoreModal}>닫기</button>
                    </div>
                  </div>
                )}
              <div className='my-book'>
                <div className='book-box borrow'>
                  <p>대출 중</p>
                  <span className='borrow-num'>
                    {currentBook?.length ? currentBook.length : 0}
                  </span>
                </div>
                <div className='book-box picked'>
                  <p>찜</p>
                  <span className='picked-num'>
                    {picked?.length ? picked.length : 0}
                  </span>
                </div>
                <div className='book-box read'>
                  <p>다 읽었어요</p>
                  <span className='read-num'>
                    {finished?.length ? finished.length : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='inner-section my-book-info-wrap'>
            <ul className='my-book-info'>
              <li className='borrow'>
                <p className='section-tit'>대출 중이에요</p>
                <ul className='borrow-list'>
                  {currentBook.length > 0 ? (
                    currentBook.map((book) => {
                      const foundBook = book_data.find(
                        (b) => b.ISBN.toLowerCase() === book.isbn.toLowerCase()
                      );
                      return foundBook ? (
                        <li key={`{borrow-${book.isbn}`}>
                          <a
                            className='book-name'
                            href={
                              book?.isbn
                                ? `/book/${book.isbn.toLowerCase()}`
                                : '#'
                            }
                          >
                            {foundBook.title}
                          </a>
                          <span className='date'>~{book.dueDate}</span>
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li>대출한 책이 없습니다.</li>
                  )}
                </ul>
              </li>
              <li className='pick'>
                <p className='section-tit'>마음에 들어요</p>
                <ul className='pick-list'>
                  {pickedBooks.length > 0 ? (
                    pickedBooks.map((book, index) => (
                      <li key={`pick-${book.ISBN ?? `index-${index}`}`}>
                        <a
                          className='book-name'
                          href={`/book/${book.ISBN ?? ''}`}
                        >
                          {book.title}
                        </a>
                        <span className='label'>
                          {book.genre.replace('인문사회과학', '인문사회')}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>찜한 책이 없습니다.</li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <div className='earned-badge'>
            <h3>획득한 뱃지</h3>
            <div className='inner-section badge-wrap'>
              <ul className='badge-list'>
                {unlockedBadges.length > 0 ? (
                  unlockedBadges.map((badge, index) => (
                    <li
                      key={index}
                      className={`badge-item ${badge.isActive ? 'active' : ''}`}
                    >
                      <div className='img-box'>
                        <img
                          src={badge.badgeSrc || '/img/sub/default-badge.png'}
                          alt={badge.badgeAlt}
                        />
                      </div>
                      <div className='text-box'>
                        <p>{badge.badgeTitle}</p>
                        <span>{badge.badgeDescription}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>획득한 배지가 없습니다.</li>
                )}
              </ul>
            </div>
          </div>
          <div className='remaining-badge'>
            <h3>남아있는 뱃지</h3>
            <div className='inner-section badge-wrap'>
              <ul className='badge-list-remain'>
                {lockedBadges.length > 0 ? (
                  lockedBadges.map((badge, index) => (
                    <li
                      key={index}
                      className={`badge-item ${badge.isActive ? 'active' : ''}`}
                    >
                      <div className='img-box'>
                        <img
                          src={badge.badgeSrc || '/img/sub/default-badge.png'}
                          alt={badge.badgeAlt}
                        />
                      </div>
                      <div className='text-box'></div>
                    </li>
                  ))
                ) : (
                  <li>획득한 배지가 없습니다.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;
