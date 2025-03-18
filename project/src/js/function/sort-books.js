// 신착도서 (최신순 10개 제한)
export const sortByNewest = (books) => {
  return [...books]
    .sort((a, b) => {
      const compare = new Date(b.pDate) - new Date(a.pDate);
      return compare !== 0 ? compare : b.bNum - a.bNum;
    })
    .slice(0, 10); // 상위 10개만 가져오기
};

// 베스트셀러 (베스트순 10개 제한)
export const sortByBest = (books) => {
  return [...books]
    .sort((a, b) => b.bNum - a.bNum)
    .slice(0, 10); // 상위 10개만 가져오기
};

// 도서 카테고리 분류
export const getCategory = (isbn) => {
  const prefix = isbn.substring(0, 3);
  const categories = {
    "996": "문학",
    "997": "인문사회",
    "998": "예술",
    "999": "매거진",
  };
  return categories[prefix] || "기타";
};
