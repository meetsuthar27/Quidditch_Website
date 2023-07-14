const lis = document.querySelectorAll("li");
const lbs = document.querySelectorAll("polygon");
const ul = document.querySelector("ul");
const lineDash = document.querySelector(".line-top");

var dashOrigin = -35; //pixels
var selectedLi = -35; //pixels
var speed = 500; //move this many pixels in one second.
var distance = 0;
var time = 0;

// initial animation and class for Home
TweenLite.to(lbs[0], 0.6, {
  y: -43,
  ease: Bounce.easeOut,
  delay: 1
});

lis[0].classList.add("active");

// push all the bottom lines down
function pushDownLb() {
  for (let k = 0; k < lbs.length; ++k) {
    TweenLite.to(lbs[k], 0.5, {
      y: 0,
      ease: Power3.easeOut
    });
  }
}

ul.addEventListener(
  "mouseleave",
  function (e) {
    if (e.relatedTarget) {
      distance = Math.abs(dashOrigin - selectedLi);
      time = distance / speed;
      dashOrigin = selectedLi;
      if (time) {
        TweenLite.to(lineDash, time, {
          strokeDashoffset: selectedLi,
          ease: Bounce.easeOut
        });
      }
    }
  },
  false
);

for (let i = 0; i < 4; ++i) {
  lis[i].addEventListener("mouseover", function () {
    distance = Math.abs(-250 * i - 35 - dashOrigin);
    time = distance / speed;
    dashOrigin = -250 * i - 35;
    if (time) {
      TweenLite.to(lineDash, time, {
        strokeDashoffset: -250 * i - 35,
        ease: Bounce.easeOut
      });
    }
  });

  lis[i].addEventListener("click", function () {
    selectedLi = -250 * i - 35;
    pushDownLb();
    let current = document.getElementsByClassName("active");
    current[0].classList.remove("active");
    lis[i].classList.add("active");
    TweenLite.to(lbs[i], 0.5, {
      y: -43,
      ease: Bounce.easeOut
    });
  });
}
