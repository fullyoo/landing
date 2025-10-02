

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
        // $(".logo-w").toggleClass("on");
        // $(".logo").toggleClass("off");
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
});


$(function () {
    $(".links").click(function () {
        $(".header-logo").toggleClass("off");
        $(".line").toggleClass("on");
        $(".header-dim").toggleClass("on");

    });
});


// 토글메뉴 참조
// 
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
// 

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



// ============================================
// 6. 헤더 스크롤 스파이 기능 구현_클릭시 해당위치로 이동 및 표시해주기

class ScrollSpy {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.links');
        this.navbar = document.querySelector('.navbar');

        this.init();
    }

    init() {
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 10));

        // 네비게이션 클릭 이벤트
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // 초기 활성화 설정
        this.handleScroll();
    }

    handleScroll() {
        const scrollPos = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // 네비게이션 배경 투명도 조절
        // if (scrollPos > 50) {
        //     this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        //     this.navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        // } else {
        //     this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        //     this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        // }

        // 현재 보이는 섹션 찾기
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // 네비게이션 높이 고려
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });

        // 마지막 섹션 처리
        if (scrollPos + windowHeight >= document.documentElement.scrollHeight - 10) {
            currentSection = this.sections[this.sections.length - 1].getAttribute('id');
        }

        // 네비게이션 링크 활성화
        this.updateNavigation(currentSection);
    }

    updateNavigation(activeSection) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavClick(e) {
        e.preventDefault();

        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // 네비게이션 높이 고려

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // 스크롤 이벤트 최적화를 위한 쓰로틀링
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;

        return function (...args) {
            const currentTime = Date.now();

            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// 페이지 로드 시 스크롤 스파이 초기화
document.addEventListener('DOMContentLoaded', () => {
    new ScrollSpy();
});

// 추가 애니메이션 효과
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 섹션 페이드인 효과
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-content');

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});


// ================================
// 1. 고객문의 개인정보 체크 레이어 팝업

$('.btn-example').click(function () {
    var $href = $(this).attr('href');
    layer_popup($href);
});

function layer_popup(el) {

    var $el = $(el);    //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg'); //dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight / 2,
            marginLeft: -$elWidth / 2
        })
    } else {
        $el.css({ top: 0, left: 0 });
    }

    $el.find('a.btn-layerClose').click(function () {
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $el.find('.close-btn').click(function () {
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function () {
        $('.dim-layer').fadeOut();
        return false;
    });



    //스크롤 막기
    // https://eunyoe.tistory.com/209
    $('.dim-layer').on('scroll touchmove mousewheel', function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });


}


// ============================================
// 9. 키비주얼 롤링

const swiper01 = new Swiper(".kv-slider", {
    slidesPerView: 1,
    loop: true,
    // autoplay: {
    //     delay: 1500,
    //     disableOnInteraction: false,
    // },
    effect: "slide",
    // 기본값은 좌우이동("" 따옴표를 비우면 됨)
    // 전환 효과. 'slide', 'fade', 'cube', 'coverflow', 'flip', 'creative'또는'cards'

    crossFade: true, //fade 이펙트 겹침 현상 시 해결

    speed: 1000,
    spaceBetween: 0,
    // mousewheel: {  // 마우스휠 허용
    //     invert: false,
    // },

    navigation: {
        nextEl: ".kv-sec .swiper-button-next",
        prevEl: ".kv-sec .swiper-button-prev",
    },
    pagination: {
        el: ".kv-sec .swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' / ' +
                '<span class="' + totalClass + '"></span>';
        },
        formatFractionCurrent: function (number) {
            return number < 10 ? '' + number : number;  // 현재 슬라이드 숫자에 0 추가
        },
        formatFractionTotal: function (number) {
            return number < 10 ? '' + number : number;  // 총 슬라이드 숫자에 0 추가
        },
    },
});
// 9-1 키비주얼 슬라이더 컨트롤
const stopButton01 = document.querySelector('.kv-sec .stop'); // 더 구체적인 선택자 사용
let isPlaying01 = true; // 변수명 수정

stopButton01.addEventListener('click', function () {
    if (isPlaying01) {
        // Swiper 일시 정지
        swiper01.autoplay.stop();
        // 버튼에 'play' 클래스 추가
        stopButton01.classList.add('play');
        isPlaying01 = false;
    } else {
        // Swiper 재생
        swiper01.autoplay.start();
        // 'play' 클래스 제거
        stopButton01.classList.remove('play');
        isPlaying01 = true;
    }
});


// ============================================
// 10. 이벤트 롤링

const swiper02 = new Swiper(".event-slider", {
    slidesPerView: 1,
    loop: true,
    // autoplay: {
    //     delay: 1500,
    //     disableOnInteraction: false,
    // },
    effect: "slide",
    // 기본값은 좌우이동("" 따옴표를 비우면 됨)
    // 전환 효과. 'slide', 'fade', 'cube', 'coverflow', 'flip', 'creative'또는'cards'

    crossFade: true, //fade 이펙트 겹침 현상 시 해결

    speed: 1000,
    spaceBetween: 0,
    // mousewheel: {  // 마우스휠 허용
    //     invert: false,
    // },

    navigation: {
        nextEl: ".event-sec .swiper-button-next",
        prevEl: ".event-sec .swiper-button-prev",
    },
    pagination: {
        el: ".event-sec .swiper-pagination",
        type: "fraction",
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' / ' +
                '<span class="' + totalClass + '"></span>';
        },
        formatFractionCurrent: function (number) {
            return number < 10 ? '' + number : number;  // 현재 슬라이드 숫자에 0 추가
        },
        formatFractionTotal: function (number) {
            return number < 10 ? '' + number : number;  // 총 슬라이드 숫자에 0 추가
        },
    },
});
// 10-1 이벤트 슬라이더 컨트롤
const stopButton02 = document.querySelector('.event-sec .stop'); // 더 구체적인 선택자 사용
let isPlaying02 = true; // 고유한 변수명 사용

stopButton02.addEventListener('click', function () {
    if (isPlaying02) { // 올바른 변수명 사용
        // Swiper 일시 정지
        swiper02.autoplay.stop();
        // 버튼에 'play' 클래스 추가
        stopButton02.classList.add('play');
        isPlaying02 = false;
    } else {
        // Swiper 재생
        swiper02.autoplay.start();
        // 'play' 클래스 제거
        stopButton02.classList.remove('play');
        isPlaying02 = true;
    }
});


