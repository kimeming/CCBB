//  Monthly 컴포넌트 - Monthly.jsx

import SubTop from "../module/SubTop";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 모듈 CSS 불러오기 ////
import "../../css/page/monthly.scss";

// 데이터 불러오기 /////
import { monthlyData } from "../../js/data/monthly_data";
import { useState } from "react";

function Monthly({ gnb1, gnb2 }) {
  // 후크 상태변수 셋팅!
  // 배열 순번값 셋업
  const [seq, setSeq] = useState(0);
  const selData = monthlyData[seq];

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="monthly-recommend">
          <div className="book-swiper">
            <Swiper
              loop={true}
              spaceBetween={20}
              slidesPerView={1.5}
              centeredSlides={true}
              breakpoints={{
                500: { slidesPerView: 3, centeredSlides: true },
                768: { slidesPerView: 3, centeredSlides: true },
                1024: { slidesPerView: 5, centeredSlides: true },
              }}
              // 슬라이드 변경시 실행코드구역 ////
              onSlideChange={(me) => {
                console.log("Slide change!!!", me.realIndex);
                // 슬라이드 변경시 실제 순번을
                // 데이터 순번 상태변수에 업데이트하기
                setSeq(me.realIndex);
              }}
            >
              {monthlyData.map((v, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={"../img/monthly/img-" + v.bImg + ".jpg"}
                    alt="도서 이미지"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="book-info-box">
          <div className="tit">{selData.bName}</div>
          <div className="info-wrap">
            <div className="left">
              <div className="sub-tit">도서 상세정보</div>
              <div className="author">저자 : {selData.bAuthor}</div>
              <div className="publ">출판사 : {selData.bPublisher}</div>
              <div className="genre">장르 : {selData.bGenre}</div>
            </div>
            <div className="right">
              <div className="sub-tit">책소개</div>
              <div className="sub-info">{selData.bDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monthly;
