
//  Join 컴포넌트 - Join.jsx
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTop from '../module/SubTop';

import join from '../../css/page/join.scss';


function Join({ gnb1, gnb2 }) {
  // useNavigate 훅 사용
  const Navigate = useNavigate();
  // 휴대폰 //
  const [phoneNum, setphoneNum] = useState('');
  const [phoneValid, setphoneValid] = useState(false); // 유효성 검사

  // 이름 //
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false); // 유효성 검사

  // 비밀번호 //
  const [pw, setpw] = useState('');
  const [passwordregex, setPasswordregex] = useState({
    // 유효성 검사 초기값
    length: false,
    upper: false,
    noRepeat: false,
  });
  const [showPw, setshowPw] = useState(false); // 비밀번호 보이기 토글

  // 비밀번호 확인 //
  const [pwCheck, setpwCheck] = useState('');
  const [pwCheckValid, setpwCheckValid] = useState(false); // 유효성 검사
  const [showCheckPw, setshowCheckPw] = useState(false); // 비밀번호 보이기 토글

  //  회원가입 버튼 활성화
    const [notAllow, setNotAllow] = useState(true);

  // 핸드폰 번호 입력 시 자동 포맷
const handlePhoneNumber = (e) => {
  let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기

  // 000-0000-0000 형식으로 변환
  if (value.length >= 11) {
    value = value.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (value.length >= 7) {
    value = value.replace(/(\d{3})(\d{3,4})/, "$1-$2");
  }

  setphoneNum(value);

  // 유효성 검사
  const regex = /^01[016789]-\d{3,4}-\d{4}$/;
  setphoneValid(regex.test(value));
};

  // 이름 유효성 검사 //
  const handleName = (e) => {
    const newName = e.target.value;
    setName(newName); // 상태 업데이트 -> 비동기 처리 보완
    const regex = /^[A-Za-z가-힣]{2,20}$/;
    if (regex.test(newName)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 비밀번호 유효성 검사 //
  const handlePw = (e) => {
    const newPw = e.target.value;
    setpw(newPw); // 상태 업데이트 -> 비동기 처리 보완

    // 유효성 조건 //
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#+\^])[A-Za-z\d@$!%*?&#+\^]{8,16}$/;
    const hasUpper = /[A-Z]/;
    const noRepeat = /^(?!.*\s{1})(?!.*(.)\1{2,}).*$/.test(newPw);

    // 조건 충족여부 상태관리 //
    const isValidregex = regex.test(newPw);
    const isValidUpper = hasUpper.test(newPw);
    const isValidNoRepeat = noRepeat;

    // passwordChecks 업데이트 (각 조건 충족 여부)
    setPasswordregex({
      length: isValidregex,
      upper: isValidUpper,
      noRepeat: isValidNoRepeat,
    });
  };

  // 비밀번호 , 비밀번호 확인 대조//
  const handlePwCheck = (e) => {
    const newPwCheck = e.target.value;
    setpwCheck(newPwCheck); // 상태 업데이트 -> 비동기처리 보완

    // 비밀번호 일치 확인 //
    if (newPwCheck === pw) {
      // 비밀번호 일치시에 true 값 리턴
      setpwCheckValid(true);
    } else {
      setpwCheckValid(false);
    }
  };

    // 모든 유효성을 통과할 때만 회원가입 버튼 활성화
    useEffect(() => {
      if (phoneValid && nameValid && passwordregex && pwCheckValid
        ) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [phoneValid, nameValid, passwordregex, pwCheckValid]);

    const handleJoin = () => {
      if (notAllow) return; // 버튼이 비활성화 상태면 실행하지 않음
    
      // 기존 회원 데이터 가져오기
      const getData = JSON.parse(localStorage.getItem('member_data')) || [] ;

      // 중복 확인
      const isDuplicate = getData.some(member => member.id === phoneNum);
      if (isDuplicate) {
        alert('이미 사용되고 있는 휴대폰번호입니다.');
        return; // 회원가입 중단
      }

      // 새로운 회원 데이터
      const newMember = {
        name,
        id: phoneNum,
        pw, // 보안상 비밀번호를 그대로 저장하는 것은 위험! 실제 서비스에서는 해싱 필요
        bData:'',
        iLoveIt:'',
        currentData:[]
      };
    
      // 새로운 데이터 추가 후 로컬스토리지에 저장
      const updatedData = [...getData, newMember];
      localStorage.setItem('member_data', JSON.stringify(updatedData));
    
      alert('회원가입이 완료되었습니다.');
    
      // 입력 필드 초기화
      setphoneNum('');
      setName('');
      setpw('');
      setpwCheck('');
      setPasswordregex({ length: false, upper: false, noRepeat: false });
      setNotAllow(true);

      // 로그인 페이지 이동
      Navigate('/login');
    };

  // 비밀번호 보이기/숨기기 처리 함수 //
  const togglePw = () => {
    setshowPw(!showPw); // showPassword 상태를 반전시킴
  };
  // 비밀번호 보이기/숨기기 처리 함수 //
  const togglecheckPw = () => {
    setshowCheckPw(!showCheckPw); // showPassword 상태를 반전시킴
  };

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='join-container' id='join'>
        <section className='join-wrap'>
          <div className='input-wrap'>
            <input
              type='text'
              className='input-box'
              placeholder='휴대폰번호를 입력해주세요.'
              value={phoneNum}
              onChange={handlePhoneNumber}
            />
            <div className='errorMessageWrap'>
              {!phoneValid && phoneNum.length > 0 && (
                <div>올바른 휴대폰번호를 입력해주세요.</div>
              )}
            </div>
            <input
              type='text'
              className='input-box'
              placeholder='이름을 입력해주세요.'
              value={name}
              onChange={handleName}
            />
            <div className='errorMessageWrap'>
              {!nameValid && name.length > 0 && (
                <div>올바른 형식으로 입력해주세요.</div>
              )}
            </div>
            <div className='password-wrap'>
              <input
                type={showPw ? 'text' : 'password'} // 비밀번호 보이기/숨기기
                id='password'
                className='input-box'
                placeholder='비밀번호를 입력해주세요.'
                value={pw}
                onChange={handlePw}
              />
              <span className='toggle-password' onClick={togglePw}>
                {showPw ? '🙈' : '👁️'}{' '}
                {/* 아이콘으로 비밀번호 보이기/숨기기 상태 표시 */}
              </span>
            </div>
            <div className='errorMessageWrap'></div>
          </div>
          <div className='validation-wrap'>
            <ul className='password-checklist'>
              <li className={passwordregex.length ? 'valid' : ''}>
                ✔ 영문, 숫자, 특수문자 포함 8자리 이상
              </li>
              <li className={passwordregex.upper ? 'valid' : ''}>
                ✔ 대문자 포함
              </li>
              <li className={passwordregex.noRepeat ? 'valid' : ''}>
                ✔ 공백 및 3자 이상의 연속/중복 문자 사용 불가
              </li>
            </ul>
          </div>
          <div className='password-wrap'>
            <input
              type={showCheckPw ? 'text' : 'password'} // 비밀번호 보이기/숨기기
              className='input-box'
              placeholder='비밀번호확인'
              value={pwCheck}
              onChange={handlePwCheck}
            />
            <span className='toggle-password' onClick={togglecheckPw}>
              {showCheckPw ? '🙈' : '👁️'}{' '}
              {/* 아이콘으로 비밀번호 보이기/숨기기 상태 표시 */}
            </span>
          </div>
          <div className='errorMessageWrap'>
            {!pwCheckValid && pwCheck.length > 0 && (
              <div>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <button disabled={notAllow} className='join-btn' onClick={handleJoin}>
            회원가입
          </button>
        </section>
      </div>
    </>
  );
}
export default Join;
