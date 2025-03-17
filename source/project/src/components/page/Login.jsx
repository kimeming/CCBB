//  Login 컴포넌트 - Login.jsx
import { useEffect, useState, useContext } from 'react';
import { GP } from '../module/Contexter';
import { useNavigate } from 'react-router-dom';
import SubTop from '../module/SubTop';
import login from '../../css/page/login.scss';
import member_data from '../../js/data/member_data.json';

// 로컬스토리지 회원 데이터 저장 (초기 1회)
if (!localStorage.getItem('member_data')) {
  localStorage.setItem('member_data', JSON.stringify(member_data));
}
// 정규식 상수
const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;
const PW_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#+\^])[A-Za-z\d@$!%*?&#+\^]{8,16}$/;

function Login({ gnb1, gnb2 }) {
  const context = useContext(GP);
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneValid, setphoneValid] = useState(false);
  const [pw, setPw] = useState('');
  const [pwValid, setpwValid] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  const userName = user !== null ? user.name : null;

  // 핸드폰 번호 입력 핸들러
  const handlePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNum(value);
    // 'admin' 입력 시 바로 로그인 버튼 활성화
    if (value === 'admin') {
      setNotAllow(false);
    } else {
      setNotAllow(!(PHONE_REGEX.test(value) && PW_REGEX.test(pw)));
    }
  };

  // 비밀번호 입력 핸들러
  const handlePw = (e) => {
    const value = e.target.value;
    setPw(value);
    setNotAllow(!(PHONE_REGEX.test(phoneNum) && PW_REGEX.test(value)));
  };

  // 로그인 처리 함수
  const onClickConfirmButton = () => {
    const cleanPhoneNum = phoneNum.replace(/\D/g, ''); // 숫자만 남기기
    const member_data = JSON.parse(localStorage.getItem('member_data')) || []; // 로컬스토리지 데이터 가져오기

    if (phoneNum === 'admin') {
      // admin이면 유효성 검사 없이 바로 로그인 처리
      const adminUser = {
        name: 1,
        id: 1,
        pw, // 보안상 비밀번호를 그대로 저장하는 것은 위험! 실제 서비스에서는 해싱 필요
        bData: '',
        iLoveIt: '',
        profileImage: '/img/sub/img-profile-temp.png',
        currentData: [],
      }; // admin 사용자 정보

      sessionStorage.setItem('loggedInUser', JSON.stringify(adminUser));
      alert('관리자 로그인 성공🎉');
      navigate('/'); // 로그인 성공 후 메인페이지 이동
      context.setLogin(true);
      return;
    }

    const user = member_data.find(
      (m) => m.id.replace(/\D/g, '') === cleanPhoneNum && m.pw === pw
    );

    if (user) {
      // 로그인 성공 시 사용자 정보 세션스토리지에 저장
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('로그인 성공🎉');
      console.clear();
      navigate('/'); // 로그인 성공 후 메인페이지 이동
      context.setLogin(true);
    } else {
      alert('휴대폰번호 혹은 비밀번호를 확인해주세요.');
    }
  };

  // 휴대폰 번호, 비밀번호 유효성을 통과할 때만 로그인 버튼 활성화
  useEffect(() => {
    if (phoneValid && pwValid) {
      setNotAllow(false);
      return;
    } // if //
    setNotAllow(true);
  }, [phoneValid, pwValid]);

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='page-cover'>
        <div className='login-container' id='login'>
          <section className='login-wrap'>
            <div className='input-wrap'>
              <input
                type='text'
                className='input-box'
                placeholder='휴대폰 번호'
                value={phoneNum}
                onChange={handlePhoneNumber}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    document.querySelector('.login-btn').click();
                  }
                }}
              />
              <div className='errorMessageWrap'>
                {!PHONE_REGEX.test(phoneNum) && phoneNum.length > 0 && (
                  <div>올바른 휴대폰번호를 입력해주세요.</div>
                )}
              </div>
              <div className='password-wrap'>
                <input
                  type={showPw ? 'text' : 'password'} // 비밀번호 보이기/숨기기
                  className='input-box'
                  placeholder='비밀번호'
                  value={pw}
                  onChange={handlePw}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      document.querySelector('.login-btn').click();
                    }
                  }}
                />{' '}
                <span
                  className='toggle-password'
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? '🙈' : '👁️'}{' '}
                  {/* 아이콘으로 비밀번호 보이기/숨기기 상태 표시 */}
                </span>
              </div>
              <div className='errorMessageWrap'>
                {!PW_REGEX.test(pw) && pw.length > 0 && (
                  <div>올바른 비밀번호를 입력해주세요.</div>
                )}
              </div>
            </div>
            <button
              onClick={onClickConfirmButton}
              disabled={notAllow}
              className='login-btn'
            >
              로그인
            </button>
            <hr className='divider' />
            <button className='join-btn'>회원가입</button>
          </section>
        </div>
      </div>
    </>
  );
}
export default Login;
