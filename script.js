let currentSlide = 1;

function nextSlide(to) {
  const currentElem = document.getElementById("slide" + currentSlide);
  if (currentElem) currentElem.classList.add("hidden");

  let nextId = (typeof to === "number") ? "slide" + to : to;
  const nextElem = document.getElementById(nextId);
  if (nextElem) nextElem.classList.remove("hidden");

  if (typeof to === "number") currentSlide = to;
}

function launchConfetti() {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff69b4","#ff1493","#ffb6c1","#ffffff","#ff85c0"],
    ticks: 300
  });

  setTimeout(function(){
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      shapes: ["heart"],
      colors: ["#ff69b4","#ff1493"]
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      shapes: ["heart"],
      colors: ["#ff69b4","#ff1493"]
    });
  }, 400);
}

document.addEventListener("DOMContentLoaded", function () {
  var yesBtn = document.getElementById("yesBtn");
  var noBtn = document.getElementById("noBtn");
  var responseText = document.getElementById("responseText");

  if (!noBtn || !yesBtn) return;

  var noHoverCount = 0;
  var maxHovers = 8;
  var lastEnterTime = 0;
  var minInterval = 700;

  noBtn.addEventListener("pointerenter", function (e) {
    var now = Date.now();
    if (now - lastEnterTime < minInterval) return;

    if (noHoverCount < maxHovers) {
      var rect = noBtn.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;

      var clientX = e.clientX;
      var clientY = e.clientY;

      var dx = centerX - clientX;
      var dy = centerY - clientY;

      var len = Math.hypot(dx, dy) || 1;
      var distance = 140 + Math.random() * 80;

      dx = (dx / len) * distance;
      dy = (dy / len) * distance;

      dx += (Math.random() - 0.5) * 30;
      dy += (Math.random() - 0.5) * 30;

      noBtn.style.transition = "transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1)";
      noBtn.style.transform = "translate(" + dx + "px, " + dy + "px) scale(1.03)";

      noHoverCount++;
      lastEnterTime = now;

      if (noHoverCount >= maxHovers - 3) {
        noBtn.classList.add("soft-pulse");
      }
    }
  });

  noBtn.addEventListener("pointerleave", function () {
    noBtn.style.transition = "transform 0.75s ease-out";
    noBtn.style.transform = "translate(0, 0) scale(1)";
  });

  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide("slide-refuse");
  });

  yesBtn.addEventListener("mouseenter", function (e) {
    for (var i = 0; i < 6; i++) {
      setTimeout(function () {
        var heart = document.createElement("span");
        heart.textContent = "💕";
        heart.className = "yes-particle";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        document.body.appendChild(heart);

        setTimeout(function () {
          heart.style.transform = "translate(" + (Math.random()*200-100) + "px, " + (Math.random()*-200-100) + "px) scale(0)";
          heart.style.opacity = "0";
        }, 50);

        setTimeout(function () { heart.remove(); }, 1200);
      }, i * 80);
    }
  });

  yesBtn.addEventListener("click", function () {
    if (responseText) responseText.textContent = "Урааа! Ты моя валентинка навсегда! 💖💖💖";
    nextSlide(3);
    launchConfetti();
    setTimeout(launchConfetti, 800);
  });
});
