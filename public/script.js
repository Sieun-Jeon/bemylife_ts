var resizeTimeout;
let startX = 0;
let startY = 0;


function addEventOn(elementName, eventClass) {
  if (null !== document.getElementById(elementName)) {
    document.getElementById(elementName).classList.add(eventClass);
  } else {
    document
      .getElementsByClassName(elementName)
      .item(0)
      .classList.add(eventClass);
  }
}
function removeEventOn(elementName, eventClass) {
  if (null !== document.getElementById(elementName)) {
    document.getElementById(elementName).classList.remove(eventClass);
  } else {
    //TODO FORLOOP
    document
      .getElementsByClassName(elementName)
      .item(0)
      .classList.remove(eventClass);
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   placeRandomStars();

//   window.addEventListener("resize", onWindowResize);
// });

function onWindowResize() {
  fadeOutAndAdjustStarPositions();
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    removeExistingStars();
    placeRandomStars();
  }, 1000);
}

function placeRandomStars() {
  // Pixel density: 1 star per 5000 pixels
  const pixelDensity = 5000;

  const bodyWidth = document.body.clientWidth - 2;
  const bodyHeight = document.body.clientHeight - 2;

  const totalPixels = bodyWidth * bodyHeight;

  const numberOfStars = Math.floor(totalPixels / pixelDensity);

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const randomX = Math.floor(Math.random() * bodyWidth);
    const randomY = Math.floor(Math.random() * bodyHeight);

    star.dataset.percentX = randomX / bodyWidth;
    star.dataset.percentY = randomY / bodyHeight;

    star.style.left = `${randomX}px`;
    star.style.top = `${randomY}px`;

    const pulseDuration = 2 + Math.random() * 8;
    star.style.animation = `pulse ${pulseDuration}s infinite`;

    document.getElementById("illust").appendChild(star);

    void star.offsetWidth;

    // Fade in the star
    setTimeout(() => (star.style.opacity = "1"), 10);
  }
}

function fadeOutAndAdjustStarPositions() {
  const bodyWidth = document.body.clientWidth - 2;
  const bodyHeight = document.body.clientHeight - 2;

  const existingStars = document.querySelectorAll(".star");
  existingStars.forEach((star) => {
    star.style.opacity = "0";

    const adjustedX = star.dataset.percentX * bodyWidth;
    const adjustedY = star.dataset.percentY * bodyHeight;

    star.style.left = `${adjustedX}px`;
    star.style.top = `${adjustedY}px`;
  });
}

function removeExistingStars() {
  const existingStars = document.querySelectorAll(".star");
  existingStars.forEach((star) => {
    document.getElementById("illust").removeChild(star);
  });
}

function enterView() {
  document.getElementsByClassName("foreground").item(0).classList.add("action_open");
    setTimeout(() => {
      addEventOn("door", "do-not-display");
      addEventOn("bouncer", "do-not-display");
      addEventOn("poles", "do-not-display");
      addEventOn("illust", "background-inside");
      document.getElementById("couple").style.display = "flex";
      addEventOn("information", "dark-mode");
      placeRandomStars();
	document.querySelectorAll(".tag").forEach((item) => {
  		item.style.display="flex";
	});
      
      setTimeout(()=>{
        document.getElementById("menu").style.animation="popup 0.5s ease-out";
         document.getElementById("menu").style.opacity = 1;
        document.getElementById("menu").style.visibility = "visible";
      },800);
    
    }, 1800);
}

document.getElementById("rsvp-attend").addEventListener("click", () => {
  const couple = document.getElementById("couple");
  if (document.querySelector('input[name="rsvp-attend"]:checked') != null) {
    if (
      document.querySelector('input[name="rsvp-attend"]:checked').id === "yes"
    ) {
      if (couple.classList.contains("sad")) {
        removeEventOn("couple", "sad");
      }
      addEventOn("rsvp-number", "appear-down");
    } else if (
      document.querySelector('input[name="rsvp-attend"]:checked').id === "no"
    ) {
      addEventOn("couple", "sad");
      addEventOn("rsvp-name", "appear-down");
      removeEventOn("rsvp-number", "appear-down");
      document
        .querySelectorAll('input[name="rsvp-number"]')
        .forEach((radio) => (radio.checked = false));
    }
  }
});

document.getElementById("rsvp-number").addEventListener("click", () => {
  document.querySelector('input[name="rsvp-attend"]:checked');
  addEventOn("rsvp-name", "appear-down");
});

document.querySelector('input[type="text"]').addEventListener("click", () => {
  if (document.querySelector('input[type="text"]').value === "성함") {
    document.querySelector('input[type="text"]').value = "";
  }
});



var animateButton = function(e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}



window.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener("touchmove", (e) => {
  const deltaX = e.touches[0].clientX - startX;
  const deltaY = e.touches[0].clientY - startY;

  e.preventDefault();

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      console.log("오른쪽으로 스와이프");
    } else {
      console.log("왼쪽으로 스와이프");
    }
  } else {
    if (deltaY > 0) {
      console.log("아래로 스와이프");
    } else {
      console.log("위로 스와이프");
    }
  }
}, { passive: false });





enterView();