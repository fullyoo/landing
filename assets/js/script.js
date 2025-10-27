

// ================================
// 1. 고객문의 개인정보 체크 레이어 팝업

// ✅ 개인정보 보기 팝업
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

    $('.dim-layer').on('scroll touchmove mousewheel', function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
};


// ✅ 폼 유효성 검사
$('.form-data').on('submit', function (e) {
    e.preventDefault(); // 기본 전송 막기

    var name = $('#name').val().trim();
    var phone = $('#phone-num').val().trim();
    var phoneKind = $('#phone-kind').val().trim();
    var content = $('#content').val().trim();
    var isChecked = $('#checkTerms').is(':checked');


    // 01.

    // if (!name || !phone || !phoneKind || !content) {
    //     alert('모든 입력란을 채워주세요.');
    //     return false;
    // }

    // if (!isChecked) {
    //     alert('개인정보 수집/이용 동의가 필요합니다.');
    //     return false;
    // }

    // 02.

    if (!name) {
        alert('이름을 입력해 주세요.');
        $('#name').focus();
        return false;
    }

    if (!phone) {
        alert('연락처를 입력해 주세요.');
        $('#phone-num').focus();
        return false;
    }

    if (!phoneKind) {
        alert('폰기종을 입력해 주세요.');
        $('#phone-kind').focus();
        return false;
    }

    if (!content) {
        alert('문의 내용을 입력해 주세요.');
        $('#content').focus();
        return false;
    }

    if (!isChecked) {
        alert('개인정보 수집/이용 동의가 필요합니다.');
        $('#checkTerms').focus();
        return false;
    }

    // ✅ 모든 조건이 충족된 경우 전송
    alert('문의가 정상적으로 접수되었습니다!-테스트 버전입니다');
    // 실제 전송하려면 아래 주석을 해제
    // this.submit();


    // 🔹 입력값 초기화 (폼 리셋)
    $(this).trigger("reset");

});



// ================================
// 2. 링크 탭 애니메이션

document.addEventListener('DOMContentLoaded', function () {
    // 기존 탭 시스템
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // 새로운 탭 시스템
    const navLinks = document.querySelectorAll('.nav-link');
    const navContents = document.querySelectorAll('.nav-content');

    // 기존 탭 시스템 초기화 함수
    function initializeTabs() {
        const hash = window.location.hash;
        if (hash) {
            const targetTab = hash.substring(1);
            const targetLink = document.querySelector(`[data-tab="${targetTab}"]`);
            const targetContent = document.getElementById(targetTab);

            if (targetLink && targetContent) {
                tabLinks.forEach(link => link.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                targetLink.classList.add('active');
                targetContent.classList.add('active');
                return;
            }
        }

        tabLinks[0].classList.add('active');
        tabContents[0].classList.add('active');
    }

    // 새로운 탭 시스템 초기화 함수
    function initializeNavs() {
        const hash = window.location.hash;
        if (hash) {
            const targetNav = hash.substring(1);
            const targetLink = document.querySelector(`[data-nav="${targetNav}"]`);
            const targetContent = document.getElementById(targetNav);

            if (targetLink && targetContent) {
                navLinks.forEach(link => link.classList.remove('active'));
                navContents.forEach(content => content.classList.remove('active'));

                targetLink.classList.add('active');
                targetContent.classList.add('active');
                return;
            }
        }

        navLinks[0].classList.add('active');
        navContents[0].classList.add('active');
    }

    // 기존 탭 클릭 이벤트
    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);

            if (targetContent) {
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                this.classList.add('active');
                targetContent.classList.add('active');

                window.history.pushState(null, null, `#${targetTab}`);
            }
        });
    });

    // 새로운 탭 클릭 이벤트
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetNav = this.getAttribute('data-nav');
            const targetContent = document.getElementById(targetNav);

            if (targetContent) {
                navLinks.forEach(l => l.classList.remove('active'));
                navContents.forEach(content => content.classList.remove('active'));

                this.classList.add('active');
                targetContent.classList.add('active');

                window.history.pushState(null, null, `#${targetNav}`);
            }
        });
    });

    // 브라우저 뒤로가기/앞으로가기 이벤트 처리
    window.addEventListener('popstate', function () {
        initializeTabs();
        initializeNavs();
    });

    // 초기화
    initializeTabs();
    initializeNavs();
});




// ================================
// 3. 우측 TOP 탑 버튼

let btnTop = document.querySelector("#btnTop"),
    headerH = 70;

window.addEventListener("scroll", () => {
    if (window.scrollY > headerH) {
        btnTop.classList.add("show");
    } else {
        btnTop.classList.remove("show");
    }
});
$("#btnTop").on("click", function () {
    $("html, body").stop().animate({ scrollTop: 0 });
});




// ================================
// 4. 리뷰 박스 팝업

// 브랜드 로고 데이터
const brandLogos = {
    'LG U+': 'https://fullyoo.github.io/landing/assets/images/lg.svg',
    'KT': 'https://fullyoo.github.io/landing/assets/images/kt_black.svg',
    'SK Telecom': 'https://fullyoo.github.io/landing/assets/images/sk.svg'
};

// 리뷰 데이터
const reviewData = {
    1: {
        title: "환상적인 서비스!",
        rating: "★★★★☆",
        brand: "LG U+",
        content: "정말 놀라운 경험이었습니다. 직원들이 매우 친절하고 전문적이며, 모든 것이 완벽했습니다. 처음 방문했을 때부터 마지막까지 세심한 배려를 받았어요. 특히 개인 맞춤형 서비스가 인상 깊었고, 제가 원하는 것을 정확히 파악해서 제공해주셨습니다. 이런 수준 높은 서비스를 받아본 것은 정말 오랜만이에요. 앞으로도 계속 이용하고 싶고, 주변 사람들에게도 적극 추천할 예정입니다.",
        author: "김*수",
        date: "2025.09.15"
    },
    2: {
        title: "최고의 품질",
        rating: "★★★★☆",
        brand: "KT",
        content: "제품의 퀄리티가 기대 이상이었어요. 가격 대비 정말 만족스럽고 배송도 빨라서 더욱 좋았습니다. 디테일 하나하나까지 신경쓴 것이 느껴지고, 마감처리나 소재의 품질이 정말 뛰어나네요. 비슷한 가격대의 다른 제품들과 비교해봐도 확실히 차별화되는 점이 많습니다. 내구성도 좋아서 오래 사용할 수 있을 것 같아요. 이런 제품을 만나게 되어 정말 기쁩니다.",
        author: "이*영",
        date: "2025.09.12"
    },
    3: {
        title: "빠른 배송에 감동",
        rating: "★★★★☆",
        brand: "SK Telecom",
        content: "주문한 다음날 바로 받았어요! 포장도 깔끔하고 제품 상태도 완벽했습니다. 요즘 배송이 늦어지는 경우가 많은데, 이렇게 빨리 받을 수 있어서 정말 만족스럽네요. 포장재도 친환경적이고 안전하게 포장되어 있어서 제품 손상 걱정 없이 받을 수 있었어요. 배송 추적 서비스도 실시간으로 잘 업데이트되어서 언제 도착할지 미리 알 수 있어서 좋았습니다. 다음에 또 주문할 때도 이런 서비스를 받을 수 있다면 정말 좋겠어요.",
        author: "박*호",
        date: "2025.09.10"
    },
    4: {
        title: "고객 서비스 최고",
        rating: "★★★★☆",
        brand: "KT",
        content: "문의사항에 대해 신속하고 정확한 답변을 해주셨어요. 이런 서비스는 처음이에요! 상담사분이 정말 친절하시고 전문적이셨습니다. 복잡한 문제였는데도 차근차근 설명해주시고, 해결책까지 제시해주셔서 정말 감사했어요. 전화 응답도 빠르고, 이메일 답변도 당일 내에 받을 수 있어서 놀랐습니다. 고객을 정말 소중하게 생각하는 마음이 느껴져서 더욱 신뢰가 갔어요. 앞으로도 이런 수준의 서비스를 유지해주시길 바랍니다.",
        author: "최*진",
        date: "2025.09.08"
    },
    5: {
        title: "가성비 최고!",
        rating: "★★★★☆",
        brand: "LG U+",
        content: "이 가격에 이런 품질이라니... 정말 놀랍습니다. 다음에도 꼭 이용할게요! 처음에는 가격이 저렴해서 품질이 어떨까 걱정했는데, 실제로 받아보니 비싼 제품들과 비교해도 전혀 뒤지지 않네요. 오히려 불필요한 브랜드 프리미엄 없이 실속있는 제품을 구매할 수 있어서 더 만족스럽습니다. 기능적인 면에서도 충분히 만족스럽고, 디자인도 심플하면서 세련되어서 마음에 듭니다. 이런 가성비 좋은 제품을 찾기 어려운데, 정말 좋은 발견이었어요.",
        author: "장*원",
        date: "2025.09.05"
    },
    6: {
        title: "재구매 의사 100%",
        rating: "★★★★☆",
        brand: "SK Telecom",
        content: "한 번 써보고 바로 팬이 되었어요. 주변 사람들에게도 강력 추천하고 있습니다! 제품 자체의 만족도는 물론이고, 전체적인 쇼핑 경험이 정말 훌륭했어요. 웹사이트 이용도 편리하고, 결제 과정도 간단하고 안전했습니다. 무엇보다 애프터서비스가 정말 좋아서 믿고 구매할 수 있겠더라구요. 이미 두 번째 주문을 준비하고 있고, 친구들과 가족들에게도 적극적으로 추천하고 있어요. 모든 면에서 만족스러운 쇼핑이었습니다.",
        author: "한*석",
        date: "2025.09.02"
    }
};

// DOM 요소들
const reviewItems = document.querySelectorAll('.review-box-list');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close-btn');
const popupTitle = document.getElementById('popup-title');
const popupRating = document.getElementById('popup-rating');
const popupBody = document.getElementById('popup-body');
const popupAuthor = document.getElementById('popup-author');
const popupDate = document.getElementById('popup-date');
const popupBrandLogo = document.getElementById('popup-brand-logo');

// 리뷰 항목 클릭 이벤트
reviewItems.forEach(item => {
    item.addEventListener('click', () => {
        const reviewId = item.getAttribute('data-review');
        const review = reviewData[reviewId];

        if (review) {
            popupTitle.textContent = review.title;
            popupRating.textContent = review.rating;
            popupBody.textContent = review.content;
            popupAuthor.textContent = `- ${review.author}`;
            popupDate.textContent = review.date;
            popupBrandLogo.src = brandLogos[review.brand];
            popupBrandLogo.alt = `Brand ${review.brand}`;

            popup.classList.add('active');


            // 레이어팝업 스크롤 막기
            // JavaScript :: 팝업 창 뒤에 스크롤 막기|작성자 고코슬리 GoKoselig

            document.body.style.overflow = 'hidden';
        }
    });

    // 호버 효과를 위한 이벤트
    // item.addEventListener('mouseenter', () => {
    //     item.style.transform = 'translateY(-8px) scale(1.02)';
    // });

    // item.addEventListener('mouseleave', () => {
    //     item.style.transform = 'translateY(0) scale(1)';
    // });
});

// 팝업 닫기 기능
function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closePopup);

// 오버레이 클릭시 팝업 닫기
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        closePopup();
    }
});

// ESC 키로 팝업 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

// 페이지 로드 애니메이션
// window.addEventListener('load', () => {
//     reviewItems.forEach((item, index) => {
//         setTimeout(() => {
//             item.style.opacity = '0';
//             item.style.transform = 'translateY(30px)';
//             item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

//             setTimeout(() => {
//                 item.style.opacity = '1';
//                 item.style.transform = 'translateY(0)';
//             }, 50);
//         }, index * 100);
//     });
// });




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




// ============================================
// 7. 상단 메인 띠배너

// $(function () {
//     $(".banner-btn").click(function () {
//         $(".top-banner").hide();
//     })
// });


// hide
// $(function () {
//     $(".banner-btn").on("click", function () {
//         $(".top-banner").hide();
//     })
// });

// fadeOut
$(function () {
    $(".banner-btn").on("click", function () {
        $(".top-banner").fadeOut("fast");
    })
});




// ============================================
// 8. 좌우 스와이퍼 네이게이션(폰리스트)
// swiper-slide

// Swiper 인스턴스들을 저장할 배열
var swiperInstances = [];

// 모든 슬라이더에 대해 개별적으로 Swiper 인스턴스 생성
document.querySelectorAll('.latest_slide').forEach(function (slideEl, index) {
    var swiperInstance = new Swiper(slideEl, {
        loop: true,
        speed: 1000,
        slidesPerView: 1,
        spaceBetween: 12,
        pagination: true,
        centeredSlides: true,
        navigation: {
            prevEl: '.slide_arrow .prev',
            nextEl: '.slide_arrow .next',
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        pagination: {
            el: slideEl.querySelector(".swiper-pagination"),
            type: 'bullets',
            clickable: true,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        breakpoints: {
            1025: {
                slidesPerView: 3,
                spaceBetween: 15,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2.5,
                spaceBetween: 15,
                centeredSlides: false,
            },
            481: {
                slidesPerView: 1.5,
                spaceBetween: 15,
                centeredSlides: false,
            },
        },
    });

    // 인스턴스 저장
    swiperInstances.push({
        element: slideEl,
        swiper: swiperInstance
    });

    // 초기 active 상태가 아니면 autoplay 중지
    if (!slideEl.classList.contains('active')) {
        swiperInstance.autoplay.stop();
    }

    // 마우스 오버 시 자동 롤링 멈춤
    slideEl.addEventListener('mouseenter', function () {
        swiperInstance.autoplay.stop();
    });

    slideEl.addEventListener('mouseleave', function () {
        // 현재 활성화된 탭인지 확인
        if (slideEl.classList.contains('active')) {
            swiperInstance.autoplay.start();
        }
    });
});

// 탭 클릭 이벤트
document.querySelectorAll('.tab-link').forEach(function (tabLink) {
    tabLink.addEventListener('click', function (e) {
        e.preventDefault();

        var targetTab = this.getAttribute('data-tab');

        // 모든 탭 비활성화
        document.querySelectorAll('.tab-link').forEach(function (link) {
            link.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(function (content) {
            content.classList.remove('active');
        });

        // 선택한 탭 활성화
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');

        // 모든 슬라이더의 autoplay 중지
        swiperInstances.forEach(function (item) {
            item.swiper.autoplay.stop();
        });

        // 활성화된 탭의 슬라이더만 autoplay 시작
        swiperInstances.forEach(function (item) {
            if (item.element.id === targetTab) {
                item.swiper.params.autoplay = {
                    delay: 2000,
                    disableOnInteraction: false,
                };
                item.swiper.autoplay.start();
            }
        });
    });
});

// ============================================
// 9. 키비주얼 롤링

const swiper01 = new Swiper(".kv-slider", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    effect: "slide",
    // 기본값은 좌우이동("slide" 따옴표를 비우면 됨)
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
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    effect: "slide",
    // 기본값은 좌우이동("slide" 따옴표를 비우면 됨)
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



// ============================================
// 11. 리뷰 롤링

feather.replace();
var reviewSwiper = new Swiper(".review-slide .review-item", {
    speed: 700,
    slidesPerView: '1',
    spaceBetween: 20,
    autoHeight: true,
    loop: true,
    centeredSlides: false,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    pagination: {
        el: ".review-wrap .swiper-pagination",
        type: "progressbar"
    },

    breakpoints: {
        1025: {
            slidesPerView: '3',
            spaceBetween: 30,
            centeredSlides: false
        },

        769: {
            slidesPerView: '2',
            spaceBetween: 20,
            centeredSlides: false
        },

        481: {
            slidesPerView: '1.5',
            spaceBetween: 20,
            centeredSlides: false
        }
    }
});


// hover 시 autoplay 멈추고 다시 시작하는 기능 추가
$('.review-slide .swiper-slide').on('mouseenter', function () {
    reviewSwiper.autoplay.stop();
});

$('.review-slide .swiper-slide').on('mouseleave', function () {
    reviewSwiper.autoplay.start();
});


// ============================================
// 12. 포트폴리오 용도 팝업 코드 작성

//12-1. 얼럿창
//제이쿼리 방식
// $(window).on('load', function () {
//     alert('본 페이지는 포트폴리오 용도로 제작된 사이트입니다.');
// });



//12-2. 레이어팝업 띄우기
$(window).on('load', function () {
    const $popup = $('#portfolio-popup');
    const $closeBtn = $('#popup-close');

    $popup.css('display', 'flex');

    $closeBtn.on('click', function () {
        $popup.hide();
    });
});