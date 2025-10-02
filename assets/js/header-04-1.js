
// ================================
// 5. 헤더 header

// 5-1. 제이쿼리 버전(닫기버튼 따로)
$(function () {
    $(".mo-btn").click(function () {
        $(".header-nav").toggleClass("on");

        //  딤효과시 추가 2개
        $(".header-dim").toggleClass("on");
        $(".line").toggleClass("on");
        $(".header-menu").toggleClass("on");
        $(".header-logo").toggleClass("off");

        // 추가 3개
        $(".logo-w").toggleClass("on");
        $(".logo").toggleClass("off");
        // $(".line").toggleClass("on");

    });
});


$(".header-logo").on("click", function () {
    $(".header-nav").removeClass("on");
});


$(".links").on("click", function () {
    $(".header-nav").removeClass("on");
    $(".sec").css("padding-top", "40px");
    $(".menu-wrap").removeClass("open");
    $(".logo").toggleClass("off");
    $(".logo-w").toggleClass("on");
});


$(function () {
    $(".links").click(function () {
        $(".header-logo").toggleClass("off");
        $(".line").toggleClass("on");
        $(".header-dim").toggleClass("on");

    });
});


// gnb 시간 순차 추가_250927

$(function () {
    let isOpen = false;

    // 메뉴 버튼 클릭 시
    $(".mo-btn").on("click", function () {
        let $links = $(".header-nav .links");

        if (!isOpen) {
            // 열림 효과 (순차 등장)
            $links.css({ opacity: 0, transform: "translateX(50px)" });

            $links.each(function (i) {
                $(this)
                    .delay(i * 150)
                    .queue(function (next) {
                        $(this).css({
                            opacity: 1,
                            transform: "translateX(0)",
                            transition: "all 0.4s ease"
                        });
                        next();
                    });
            });

            $(".header-nav").addClass("active");
            isOpen = true;
        } else {
            // 닫힘 효과 (순차X, 바로 사라짐)
            $(".header-nav").removeClass("active");
            $links.css({
                opacity: 0,
                transform: "translateX(0px)"
            });
            isOpen = false;
        }
    });

    // a 링크 클릭 시 nav 닫기
    $(".header-nav .links").on("click", function () {
        $(".header-nav").removeClass("active");
        $(".header-nav .links").css({
            opacity: 0,
            transform: "translateX(0px)"
        });
        isOpen = false;
    });
});






// 토글메뉴 참조

// $("#menuBar").on("click", function () {
//     $(this).toggleClass("on");
//     header.toggleClass("all");
//     allMenu.stop().fadeToggle();
//     $(this).find(".all").stop().fadeToggle();
// })


// ============================================
// 5-2. 모바일-메뉴버튼-클릭-시-x버튼-닫기버튼으로-변경

let menu = document.querySelector('.menu-wrap');

menu.addEventListener('click', function () {
    // contains: 클래스 유지하고 있으면,
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
    }
});



// ============================================
//5-3. 스크롤 막기


$('.header-nav-row').on('scroll touchmove mousewheel', function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
});

$('.header-dim').on('scroll touchmove mousewheel', function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
});





