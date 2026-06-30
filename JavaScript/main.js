/* ==================== SCROLL-TO-TOP ==================== */
window.onscroll = function() { scrollFunction(); };

function scrollFunction() {
    var btn = document.getElementById("scrollBtn");
    if (!btn) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

var scrollBtn = document.getElementById("scrollBtn");
if (scrollBtn) {
    scrollBtn.addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

/* ==================== NAV SCROLL BEHAVIOUR ==================== */
var nav = document.getElementById('header');
var lastScroll = 0;

window.addEventListener("scroll", scrollHandler);

function scrollHandler() {
    var currentScroll = window.pageYOffset;
    if (!nav) return;
    if (currentScroll > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}

/* ==================== CART SIDEBAR ==================== */
var closeCartEl = document.querySelector('.closeCart');
var iconCartEl  = document.querySelector('.icon-cart');
var bodyEl      = document.querySelector('body');

if (iconCartEl) {
    iconCartEl.addEventListener('click', function() {
        bodyEl.classList.toggle('showCart');
    });
}
if (closeCartEl) {
    closeCartEl.addEventListener('click', function() {
        bodyEl.classList.toggle('showCart');
    });
}

function viewCart() {
    window.location.href = "cartPage.html";
}

/* ==================== PRELOADER ==================== */
window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1900);
    }
});

/* ==================== SCROLL REVEAL ==================== */
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
    revealObserver.observe(el);
});
