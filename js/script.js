var trigger = document.querySelector(".button-trigger");
var modal = document.querySelector(".form-search");
var form = document.querySelector("form");
var date = document.querySelector(".date");

trigger.addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.toggle("form-search-hide");
});

form.addEventListener("submit", function(evt) {
    if (!date.value) {
        evt.preventDefault();
    } 
});