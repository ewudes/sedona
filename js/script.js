var trigger = document.querySelector(".button-trigger");
var modal = document.querySelector(".form-search");
var form = document.querySelector("form");
var date = document.querySelector(".date");

modal.classList.add("form-search-hide");

trigger.addEventListener("click", function() {
    if (modal.classList.contains("form-search-hide")) {
        modal.classList.remove("animated-hide");
        modal.classList.remove("form-search-hide");
        modal.classList.add("animated-add");
    } else {
        modal.classList.remove("animated-add");
        modal.classList.add("form-search-hide");
        modal.classList.add("animated-hide");
    }
});

form.addEventListener("submit", function(evt) {
    if (!date.value) {
        evt.preventDefault();
    } 
});