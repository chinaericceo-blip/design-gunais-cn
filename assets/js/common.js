document.addEventListener('contextmenu', function (event) {
	event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
	// 导航菜单点击
	var navbarToggle = document.querySelector('.navbar-toggle');
	var nav = document.querySelector('.nav');
	
	if (navbarToggle) {
		navbarToggle.addEventListener('click', function() {
			nav.classList.toggle('open');
			document.body.classList.toggle('navopen');
			document.documentElement.classList.toggle('act');
		});
	}
	
	if (nav) {
		nav.addEventListener('click', function(e) {
			if (e.target === nav || e.target.classList.contains('links')) {
				nav.classList.remove('open');
				document.body.classList.remove('navopen');
				document.documentElement.classList.remove('act');
			}
		});
		
		var navLinks = nav.querySelectorAll('.links .item a');
		navLinks.forEach(function(link) {
			link.addEventListener('click', function() {
				nav.classList.remove('open');
				document.body.classList.remove('navopen');
				document.documentElement.classList.remove('act');
			});
		});
	}
	
	// 微信弹窗功能
	var wechatTriggers = document.querySelectorAll('.wechat-qr-trigger');
	wechatTriggers.forEach(function(trigger) {
		trigger.addEventListener('mouseenter', function() {
			var popup = trigger.querySelector('.qr-popup');
			if (popup) popup.style.display = 'block';
		});
		trigger.addEventListener('mouseleave', function() {
			var popup = trigger.querySelector('.qr-popup');
			if (popup) popup.style.display = 'none';
		});
	});
	
	// 首屏 Logo 白色锁定
var heroHeight = window.innerHeight;
window.addEventListener('scroll', function() {
    var logoText = document.querySelector('.header .logo .logo-text');
    var navLines = document.querySelectorAll('.header .navbar-toggle span');
    if (window.scrollY < heroHeight * 0.5) {
        // 首屏区域内：强制白色
        if (logoText) logoText.style.color = '#ffffff';
        navLines.forEach(function(line) { line.style.backgroundColor = '#ffffff'; });
    } else {
        // 滚出首屏：移除强制，恢复默认
        if (logoText) logoText.style.color = '';
        navLines.forEach(function(line) { line.style.backgroundColor = ''; });
    }
});

// 其他 jQuery 功能
	var videos = document.querySelectorAll('video');
	videos.forEach(function(video) {
		video.setAttribute('controlsList', 'nodownload');
	});
	
	if (window.location.hash === '') {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	// 回到顶部按钮
	var goTopBtn = document.getElementById('goTop');
	if (goTopBtn) {
		goTopBtn.addEventListener('click', function() {
			if (window.lenis) {
				window.lenis.scrollTo(0);
			} else {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	}
	
	// pheader navbox
	var navbox = document.querySelector('.pheader .navbox');
	var menuList = document.querySelector('.menuList');
	if (navbox && menuList) {
		navbox.addEventListener('click', function() {
			navbox.classList.toggle('activeBox');
			menuList.style.display = menuList.style.display === 'none' ? 'block' : 'none';
		});
	}
});

// Lenis Smooth Scroll
if (typeof Lenis !== 'undefined') {
	window.lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		direction: 'vertical',
		gestureDirection: 'vertical',
		smooth: true,
		smoothTouch: false,
		touchMultiplier: 2,
		lerp: 0.06,
	});
	
	function raf(time) {
		window.lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}
