// levelCardFn.js //

export function initCardEffect(cardElement) {
    if (!cardElement) return;

    const img = cardElement.querySelector('.img');
    let autoRotate = true;
    let angleX = 0;
    let angleY = 0;
    let animationFrame;
  
    // 🌟 자동 회전 함수
    function startAutoRotate() {
      if (!autoRotate) return;
      
      angleX += 1; // X축 회전 속도
      angleY += 1; // Y축 회전 속도
      img.style.transform = `rotateY(${angleX}deg)`;
  
      animationFrame = requestAnimationFrame(startAutoRotate);
    }
  
     // 🌟 마우스 올리면 자동 회전 정지하고, 현재 마우스 위치를 기준으로 초기화
     cardElement.addEventListener('mouseenter', (e) => {
        autoRotate = false;
        // 마우스 위치로 angleX, angleY 초기화
        const { width, height, left, top } = cardElement.getBoundingClientRect();
        angleX = (e.clientX - left - width / 2) / 20;
        angleY = (e.clientY - top - height / 2) / 20;
        
        img.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg)`; // 초기화된 값으로 회전
        
        cancelAnimationFrame(animationFrame); // 자동 회전 정지
      });
  
    // 🌟 마우스 이동 효과 (호버 시 직접 회전)
    cardElement.addEventListener('mousemove', (e) => {
      if (autoRotate) return;
  
      const { width, height, left, top } = cardElement.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 20;
      const y = (e.clientY - top - height / 2) / 20;
  
      img.style.transform = `rotateY(${x}deg) `;
    });
  
    // 🌟 마우스 떼면 다시 자동 회전 시작
    cardElement.addEventListener('mouseleave', () => {
      autoRotate = true;
      startAutoRotate();

    });
  
    // 🌟 초기에 자동 회전 시작
    startAutoRotate();
  }