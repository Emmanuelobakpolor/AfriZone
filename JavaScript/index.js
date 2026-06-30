var currentSlide = 1;
window.addEventListener("load",function(){
    if (document.querySelectorAll(".slider .slide-content").length > 0) {
        theChecker();
        playSlider();
        initSliderTouch();
    }
    getTrendingProducts();
});

function nextSlider() {
    var btnNext = document.getElementsByClassName("next")[0];
    if (btnNext.classList.contains('disabled')) {
        return false;
    } else {
        currentSlide++;
        theChecker();
    }
}

function prevSlider() {
    var btnPrev = document.getElementsByClassName("prev")[0];
    if (btnPrev.classList.contains('disabled')) {
        return false;
    } else {
        currentSlide--;
        theChecker();
    }
}

function theChecker() {
    var imgSlider = document.querySelectorAll(".slide-content");
    var btnNext = document.getElementsByClassName("next")[0];
    var btnPrev = document.getElementsByClassName("prev")[0];
    imgSlider.forEach(function (img) {
        img.classList.remove('active');
    });

    imgSlider[currentSlide - 1].classList.add('active');

    if (currentSlide == 1) {
        btnPrev.classList.add('disabled');
    } else {
        btnPrev.classList.remove('disabled');
    }

    if (currentSlide == imgSlider.length) {
        btnNext.classList.add('disabled');
    } else {
        btnNext.classList.remove('disabled');
    }

    // Update dots
    var dots = document.querySelectorAll('.slider-dot');
    dots.forEach(function(dot, index) {
        dot.classList.toggle('active', index === currentSlide - 1);
    });
}

function goToSlide(n) {
    currentSlide = n;
    theChecker();
}
function playSlider() {
   var imgSlider = document.querySelectorAll(".slide-content");
   setInterval(function() {
        if (currentSlide < imgSlider.length) {
            currentSlide++;
        } else {
            currentSlide = 1;
        }
        theChecker();
    }, 3000);
}

async function getTrendingProducts() {
    let response = await fetch('json/products.json');
    let products = await response.json();
    let trendingProducts = products.filter(product => product.isTrending);
    displayTrendingProducts(trendingProducts);
}
function displayTrendingProducts(trendingProducts){
    let content = ``;
    for(let i = 0 ; i < trendingProducts.length ; i++){
        content += `
        <div class="product-card" data-id="${trendingProducts[i].id}">
            <div class="card-img">
                <img src="${trendingProducts[i].images[0]}" onclick="displayDetails(${trendingProducts[i].id})">
                <div class="card-overlay">
                    <a href="" class="addToCart">
                        <ion-icon name="bag-add-outline"></ion-icon>
                        <span>Add to Cart</span>
                    </a>
                </div>
            </div>
            <div class="card-info">
                <h4 class="product-name" onclick="displayDetails(${trendingProducts[i].id})">${trendingProducts[i].name}</h4>
                <div class="card-meta">
                    <span class="product-price">${trendingProducts[i].price}</span>
                    <button class="card-quick-view" onclick="displayDetails(${trendingProducts[i].id})">Quick View</button>
                </div>
            </div>
        </div>`
    }
    
document.querySelector(".top_products .products").innerHTML = content;
let addToCartLinks = document.querySelectorAll('.addToCart');
addToCartLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        let productCard = event.target.closest('.product-card');
        if (productCard && productCard.dataset.id) {
            let id_product = productCard.dataset.id;
            addToCart(id_product);
            showCart();
        }
        });
    });
}
function showCart(){
    let body = document.querySelector('body');
    body.classList.add('showCart');
}
function displayDetails(productId){
    window.location.href = `ProductDetails.html?productId=${productId}`;
}

function initSliderTouch() {
    var slider = document.querySelector('.slider');
    if (!slider) return;
    var touchStartX = 0;
    var touchStartY = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    slider.addEventListener('touchend', function(e) {
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        // Only register horizontal swipes (avoid triggering on scroll)
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        var total = document.querySelectorAll('.slide-content').length;
        if (dx < 0) {
            // swipe left → next (loop)
            currentSlide = currentSlide < total ? currentSlide + 1 : 1;
        } else {
            // swipe right → prev (loop)
            currentSlide = currentSlide > 1 ? currentSlide - 1 : total;
        }
        theChecker();
    }, { passive: true });
}