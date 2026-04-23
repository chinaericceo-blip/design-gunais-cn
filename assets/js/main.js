/*!
 * GUNAIS Website - Main JS
 * Replicated from CCD Cheng Chung Design
 * Adapted for GUNAIS brand
 */

document.addEventListener('DOMContentLoaded', function () {

    // ===== SMOOTH SCROLL (Lenis-like, fallback native) =====
    let scrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', function () {
        scrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(function () {
                onScroll(scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===== HEADER TOGGLE (desktop) =====
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            nav.classList.toggle('open');
            // 导航打开时header恢复正常显示
            header.classList.toggle('open');
        });
    }

    // ===== MOBILE MENU =====
    const navbox = document.querySelector('.pheader .navbox');
    const menuList = document.querySelector('.menuList');

    if (navbox && menuList) {
        navbox.addEventListener('click', function () {
            menuList.classList.toggle('open');
        });

        // Mobile sub-menu expand
        const mItems = menuList.querySelectorAll('.item .tb');
        mItems.forEach(function (tb) {
            tb.addEventListener('click', function () {
                const types = tb.nextElementSibling;
                const arrow = tb.querySelector('img');
                if (types && types.classList.contains('types_top')) {
                    types.classList.toggle('show');
                    if (arrow) arrow.classList.toggle('rotated');
                }
            });
        });
    }

    // ===== SCROLL EFFECTS =====
    const clientHeight = document.documentElement.clientHeight;
    const section1 = document.querySelector('.section1');
    const section6 = document.querySelector('.section6');
    const bigImg = document.querySelector('.section1 .big_img');
    const video1 = document.getElementById('video');
    const video2 = document.getElementById('video2');
    const goTopBtn = document.getElementById('goTop');
    const logoImg = document.querySelector('.header .logo img');

    function onScroll(scrollTop) {
        // GoTop button
        if (goTopBtn) {
            if (scrollTop > 400) {
                goTopBtn.classList.add('show');
            } else {
                goTopBtn.classList.remove('show');
            }
        }

        // Parallax effect on big image
        if (bigImg && section1) {
            var off = bigImg.getBoundingClientRect().top + scrollTop;
            var start = off - clientHeight;
            var y = (scrollTop - start) * 0.3;
            if (scrollTop >= start) {
                var imgEl = bigImg.querySelector('img');
                if (imgEl) imgEl.style.transform = 'translateY(' + y + 'px)';
            }
        }

        // Video1: pause when scroll past banner
        if (video1 && section1) {
            var banner_top = section1.getBoundingClientRect().top + scrollTop - 300;
            if (scrollTop >= banner_top) {
                video1.pause();
            } else {
                video1.play().catch(function(){});
            }
        }

        // Video2: play when section6 in view
        if (video2 && section6) {
            var s6Offset = section6.getBoundingClientRect().top + scrollTop;
            var s6Height = section6.offsetHeight;
            var s6Bottom = s6Offset + s6Height;
            if (scrollTop + window.innerHeight >= s6Offset && scrollTop < s6Bottom) {
                if (video2.paused) video2.play().catch(function(){});
            } else {
                if (!video2.paused) video2.pause();
            }
        }
    }

    // ===== GO TOP =====
    if (goTopBtn) {
        goTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== WOW-LIKE SCROLL REVEAL =====
    const wowEls = document.querySelectorAll('.wow');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.style.animationName = 'fadeInUp_';
                entry.target.style.animationDuration = '0.8s';
                entry.target.style.animationFillMode = 'both';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    wowEls.forEach(function (el) {
        el.style.visibility = 'hidden';
        observer.observe(el);
    });

    // ===== SWIPER - SERVICES SLIDER (与 CCD 网站相同配置) =====
    
    function initServicesSwiper() {
        var swiperEl = document.querySelector('.swiper1');
        if (!swiperEl) return;
        if (typeof Swiper === 'undefined') {
            console.error('Swiper not loaded!');
            return;
        }
        
        new Swiper('.swiper1', {
            speed: 1000,
            slidesPerView: 4,
            slideToClickedSlide: true,
            spaceBetween: '2%',
            loop: true,
            pagination: {
                el: '.section2 .swiper-pagination',
                type: 'progressbar',
            },
            breakpoints: {
                100: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                },
            },
            on: {
                slideChange: function() {
                    var cutLists = document.querySelectorAll('.section2 .t .cut .cut_list');
                    cutLists.forEach(function(el, i) {
                        el.classList.remove('on');
                    });
                    // 使用 realIndex 获取真实索引（排除 loop 克隆的 slides）
                    var realIndex = this.realIndex;
                    if (cutLists[realIndex]) {
                        cutLists[realIndex].classList.add('on');
                    }
                }
            }
        });
    }
    
    // DOM 加载完成后初始化
    initServicesSwiper();

    // ===== DOWN ARROW CLICK =====
    const downArrow = document.querySelector('.banner .down');
    if (downArrow) {
        downArrow.addEventListener('click', function () {
            if (section1) {
                section1.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== BANNER VIDEO AUTOPLAY FIX (iOS) =====
    if (video1) {
        if (/iPhone|iPad|iPod|iOS/i.test(navigator.userAgent)) {
            document.addEventListener('touchstart', function () {
                video1.play().catch(function () {});
            }, { once: true });
        }
        video1.play().catch(function () {});
    }

    // ===== INITIAL SCROLL =====
    onScroll(window.scrollY);

    // ===== URL PARAM: ?type=1 scroll to about =====
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type') === '1' && section1) {
        setTimeout(function () {
            section1.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
});
