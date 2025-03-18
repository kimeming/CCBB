import $ from "jquery";

function initLayout() {
  window.$ = $;
  // variables
  const $body = $("body"),
    $dimm = $(".dimm"),
    $searchDimm = $(".search-dimm"),
    $innerHeaderWrap = $(".inner-header-wrap"),
    $menuBtn = $(".menu-btn"),
    $menuClose = $(".menu-close-btn"),
    $gnbWrap = $(".gnb-wrap"),
    $gnb = $(".gnb"),
    $dep1 = $gnb.find(".dep1>a"),
    $dep2 = $(".dep2"),
    $totalSearchBtn = $(".total-search-btn"),
    $searchCloseBtn = $(".search-close-btn"),
    $searchWrap = $(".search-wrap");

  mobGnb();
  webGnb();

  // mobile gnb
  function mobGnb() {
    function reset() {
      if (window.innerWidth < 1024) {
        $innerHeaderWrap.removeClass("open");
        $gnbWrap.removeClass("open");
        $dimm.removeClass("on");
        $body.removeClass("on");
        $dep1.parent().removeClass("on");
        $dep2.removeClass("show");

        if (!$searchWrap.hasClass("on")) {
          searchClose();
        }
      }
    }

    $menuBtn.on("click", function () {
      $body.addClass("on");
      $gnbWrap.addClass("open");
      searchClose();
    });

    $menuClose.on("click", reset);

    $dep1.on("click", function () {
      if (window.innerWidth < 1024) {
        if (!$(this).parent().hasClass("on")) {
          $(this).parent().addClass("on").siblings().removeClass("on");
          $dep2.removeClass("show");
          $(this).next($dep2).addClass("show");
        } else {
          $(this).parent().removeClass("on");
          $dep2.removeClass("show");
        }
      }
    });

    $dep2.find("a").on("click", function () {
      reset();
    });

    $(".account-btn").on("click", reset);
  }

  // web gnb
  function webGnb() {
    function reset() {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.removeClass("open");
        $gnbWrap.removeClass("open");
        $dimm.removeClass("on");
        $body.removeClass("on");
        $dep1.parent().removeClass("on");
      }
    }

    $(window).on("resize", function () {
      reset();
    });

    $dep1.on("mouseenter focusin", function () {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.addClass("open");
        $dimm.addClass("on");
        if ($searchWrap.hasClass("on")) {
          searchClose();
        }
      }
    });

    $dep1.on("click", function (e) {
      if (window.innerWidth >= 1024) {
        e.preventDefault();
      }
    });

    $innerHeaderWrap.on("mouseleave", function () {
      if (window.innerWidth >= 1024) {
        $innerHeaderWrap.removeClass("open");
        $dimm.removeClass("on");
      }
    });
  }

  // total search
  searchOpen();

  function searchClose() {
    $searchDimm.removeClass("on");
    $searchWrap.removeClass("on");
    $searchWrap.stop().slideUp();
    $totalSearchBtn.removeClass("on");
    $searchCloseBtn.removeClass("on");
  }

  function searchOpen() {
    $totalSearchBtn.on("click", function () {
      $totalSearchBtn.each(function () {
        $(this).addClass("on");
      });
      $searchWrap.addClass("on");
      $searchWrap.stop().slideDown();
      $searchCloseBtn.addClass("on");
      $dimm.removeClass("on");
      $searchDimm.addClass("on");
      if ($innerHeaderWrap.hasClass("open")) {
        $innerHeaderWrap.removeClass("open");
      }
    });

    $searchCloseBtn.on("click", function () {
      searchClose();
    });

    $searchDimm.on("click", function () {
      searchClose();
    });
  }

  //footer
  const $btnSite = $(".family-site>button"),
    $siteList = $(".site-list");

  $btnSite.on({
    click: function () {
      const $familyList = $(this).siblings(".site-list");
      if (!$(this).hasClass("active")) {
        $siteList.stop().slideUp();
        $btnSite.removeClass("active").find("span").text("닫힘");

        $(this).addClass("active").find("span").text("열림");
        $familyList.stop().slideDown();
      } else {
        $(this).removeClass("active").find("span").text("닫힘");
        $familyList.stop().slideUp();
      }
    },
  });

  $(".site-list>li:last-child>a").on("keydown", function (e) {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 9 && !e.shiftKey) {
      e.preventDefault();
      $(this)
        .parents(".site-list")
        .stop()
        .slideUp()
        .siblings()
        .removeClass("active")
        .find("span")
        .text("닫힘");
    }
  });

  $(document).mouseup(function (e) {
    if (
      $siteList.has(e.target).length === 0 &&
      !$(e.target).is(".family-site>button")
    ) {
      $siteList.slideUp();
      $btnSite.removeClass("active").find("span").text("닫힘");
    }
  });
}

function searchClose() {
  window.$ = $;
  const $searchDimm = $(".search-dimm"),
    $totalSearchBtn = $(".total-search-btn"),
    $searchCloseBtn = $(".search-close-btn"),
    $searchWrap = $(".search-wrap");

  $searchDimm.removeClass("on");
  $searchWrap.removeClass("on");
  $searchWrap.stop().slideUp();
  $totalSearchBtn.removeClass("on");
  $searchCloseBtn.removeClass("on");
}

export { initLayout, searchClose };
