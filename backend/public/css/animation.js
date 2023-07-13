let Text = document.getElementById("Text");
let castle2 = document.getElementById("castle2");
let castle1 = document.getElementById("castle1");
let rings = document.getElementById("rings");
let stars = document.getElementById("stars");

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    Text.style.marginTop = value * 2.5 + 'px';
    stars.style.top = value * 1.5 + 'px';
    // Text.style.marginTop = value * 2.5 + 'px';
    // castle2.style.top = value * 1 + 'px';
})