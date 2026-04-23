document.addEventListener('contextmenu', function (event) {
	event.preventDefault();
});

$('video').attr('controlsList', 'nodownload');
// AOS.init({
// 	easing: 'ease-out-back',
// 	duration: 2000,
// });
if (location.hash == '') {
	$('html, body').animate({ scrollTop: 0 }, 800);
}
new WOW().init();

jQuery(window).on('scroll', function (e) {
	scroll_now = jQuery(window).scrollTop();
	if (scroll_now > 300) {
		$('.goTop').addClass('show');
	} else {
		$('.goTop').removeClass('show');
	}
});

// $('.header .box').mouseenter(function () {
// 	$(this).children('.links').stop().slideDown(500);
// });

// $('.header .box').mouseleave(function () {
// 	$(this).children('.links').stop().slideUp(500);
// 	$('.header .links .item').removeClass('on');
// 	$('.header .links .item').children('.pList').stop().slideUp(500);
// });
$('.navbar-toggle').on('click',function () {
	$('body').toggleClass('navopen');
	$('html').toggleClass('act');
});
$('.nav').on('click', function () {
	$('body').toggleClass('navopen');
	$('html').toggleClass('act');
});
$('.nav .links .item a').on('click', function () {
	$('body').removeClass('navopen');
	$('html').removeClass('act');
});
$('.nav').on('click', '.links', function (e) {
	e.stopPropagation();
});

// $('.header .links .item').click(function () {
// 	$(this).stop().addClass('on').siblings('.item').removeClass('on');
// 	$(this).children('.pList').stop().slideToggle(500);
// 	$(this).siblings('.item').children('.pList').stop().slideUp(500);
// });

$('#goTop').click(function () {
	lenis.scrollTo(0);
});

$('.pheader .navbox').click(function () {
	$(this).toggleClass('activeBox');
	$('.menuList').stop().slideToggle();
});

$('.menuList .item .tb').click(function () {
	$(this).children('img').toggleClass('rotate');
	$(this).siblings('.types_top').stop().slideToggle();
	$(this).parents('.item').siblings().children('.types_top').stop().slideUp();
	$(this).parents('.item').siblings().find('img').removeClass('rotate');
});

const lenis = new Lenis({
	lerp: 0.06,
});
lenis.on('scroll', (e) => {
	scrollTop = e.animatedScroll;

	// getScrollTop(e.animatedScroll)
});
function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
