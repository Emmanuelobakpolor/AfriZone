var currentSlide = 1;
window.addEventListener("load",function(){
    // slider not run in small window
    if (window.innerWidth > 767) {
    if (document.querySelectorAll(".slider .slide-content").length > 0) {
        theChecker();
        playSlider();
    }
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