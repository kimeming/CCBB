import $ from "jquery";
window.$ = $;
$(() => {
  // book-wrap tab
  const $bookTabLi = $(".book-wrap .book-tab>li");
  const $bookTabBtn = $(".book-wrap .book-tab>li>button");
  const $bookTabCont = $(".book-wrap .book-tab-cont");
  $bookTabBtn.on({
    click: function () {
      $bookTabBtn.removeAttr("aria-label");
      let txt = $(this).text();
      let label = txt + " 선택됨";
      $(this).attr("aria-label", label);
      $bookTabLi.removeClass("on");
      $(this).closest("li").addClass("on");
      let idx = $(this).closest("li").index();
      $bookTabCont.eq(idx).addClass("on").siblings().removeClass("on");
    },
  });

  // 게시판 tab
  const $boardTabBtn = $(".board-tab").find("button");
  const $boardContent = $(".board-content");

  $boardTabBtn.on("click", function () {
    let curIdx = $(this).parent("li").index();
    $(this).parent().addClass("on").siblings().removeClass("on");
    $boardContent.removeClass("on");
    $boardContent.eq(curIdx).addClass("on");
  });
});
