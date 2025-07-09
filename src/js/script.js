var trigger = document.querySelector(".button-trigger");
var form = document.querySelector("form");
var checkin = document.querySelector(".checkin");
var checkinItem = document.querySelector(".form-item-checkin");
var checkout = document.querySelector(".checkout");
var checkoutItem = document.querySelector(".form-item-checkout");
var imgMap = document.querySelector(".img-map");
var iframeMap = document.querySelector(".iframe-map");
var item = document.querySelector(".form-item");

form.classList.add("form-search-hide");

form.addEventListener("submit", function(evt) {
    if (!checkin.value) {
        evt.preventDefault();
        checkinItem.classList.remove("form-error");
        checkinItem.offsetWidth = checkinItem.offsetWidth;
        checkinItem.classList.add("form-error");
    }
    if (!checkout.value) {
        evt.preventDefault();
        checkoutItem.classList.remove("form-error");
        checkoutItem.offsetWidth = checkoutItem.offsetWidth;
        checkoutItem.classList.add("form-error");
    }
});

trigger.addEventListener("click", function() {
    if (form.classList.contains("form-search-hide")) {
        form.classList.remove("animated-hide");
        form.classList.remove("form-search-hide");
        form.classList.add("animated-show");
    } else {
        form.classList.remove("animated-show");
        form.classList.add("form-search-hide");
        form.classList.add("animated-hide");
    }
});

iframeMap.addEventListener('load', function () {
    imgMap.classList.add("hide-map");
    iframeMap.classList.remove("hide-map");
});
